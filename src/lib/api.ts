import axios from 'axios';
import { HeaderData, StrapiResponse } from '@/types/header';
import { config, getApiHeaders } from './config';

const api = axios.create({
  baseURL: `${config.strapi.baseUrl}/api`,
  headers: getApiHeaders(),
  timeout: 10000, // 10 second timeout
});

// Fallback header data in case Strapi is unavailable
const fallbackHeaderData: HeaderData = {
  topBar: {
    regionalPortal: {
      linkType: 'external',
      label: 'Portale Regionale',
      url: '#',
      openInNewTab: true,
    },
    personalArea: {
      linkType: 'internal',
      label: 'Area Personale',
      url: '#',
      openInNewTab: false,
    },
  },
  middleBar: {
    socialLabel: 'Seguici sui social',
    searchLabel: 'Cerca',
    searchEnabled: true,
  },
  mainNavigation: {
    id: 1,
    mainNavigationItem: [
      {
        id: 1,
        linkType: 'internal',
        label: 'Home',
        url: '/',
        openInNewTab: false,
      },
      {
        id: 2,
        linkType: 'internal',
        label: 'Servizi',
        url: '/servizi',
        openInNewTab: false,
      },
      {
        id: 3,
        linkType: 'internal',
        label: 'Contatti',
        url: '/contatti',
        openInNewTab: false,
      },
    ],
  },
  bottomBar: {
    id: 1,
    phoneNumbers: [
      {
        label: 'Centralino',
        phoneNumber: '+39 123 456 7890',
        callToAction: 'Chiama ora',
      },
    ],
  },
};

export const fetchHeaderData = async (): Promise<HeaderData> => {
  try {
    console.log('Fetching header data from Strapi...');
    console.log('Strapi URL:', `${config.strapi.baseUrl}/api`);
    
    // Try multiple approaches to get header data
    const approaches = [
      // Approach 1: Direct fetch with populate
      async () => {
        console.log('Approach 1: Direct fetch with populate...');
        const response = await api.get<StrapiResponse<HeaderData>>('/header', {
          params: {
            'populate': {
              'topBar': {
                'populate': '*'
              },
              'middleBar': {
                'populate': '*'
              },
              'mainNavigation': {
                'populate': '*'
              },
              'bottomBar': {
                'populate': '*'
              }
            }
          }
        });
        
        if (response.data.data) {
          console.log('✅ Approach 1 successful');
          // Check if data is in attributes or directly in data
          const headerData = response.data.data.attributes || response.data.data;
          console.log('Extracted header data:', headerData);
          return headerData;
        }
        throw new Error('No data in response');
      },
      
      // Approach 2: URL-encoded populate
      async () => {
        console.log('Approach 2: URL-encoded populate...');
        const response = await api.get<StrapiResponse<HeaderData>>('/header', {
          params: {
            'populate[topBar][populate]': '*',
            'populate[middleBar][populate]': '*',
            'populate[mainNavigation][populate]': '*',
            'populate[bottomBar][populate]': '*'
          }
        });
        
        if (response.data.data) {
          console.log('✅ Approach 2 successful');
          // Check if data is in attributes or directly in data
          const headerData = response.data.data.attributes || response.data.data;
          console.log('Extracted header data:', headerData);
          return headerData;
        }
        throw new Error('No data in response');
      },
      
      // Approach 3: Simple populate
      async () => {
        console.log('Approach 3: Simple populate...');
        const response = await api.get<StrapiResponse<HeaderData>>('/header?populate=*');
        
        if (response.data.data) {
          console.log('✅ Approach 3 successful');
          // Check if data is in attributes or directly in data
          const headerData = response.data.data.attributes || response.data.data;
          console.log('Extracted header data:', headerData);
          return headerData;
        }
        throw new Error('No data in response');
      },
      
      // Approach 4: Document ID approach
      async () => {
        console.log('Approach 4: Document ID approach...');
        
        // First get document ID
        const docResponse = await api.get('/header');
        let documentId: string | null = null;
        
        if (docResponse.data.data && docResponse.data.data.documentId) {
          documentId = docResponse.data.data.documentId;
          console.log('Found document ID:', documentId);
        }
        
        if (documentId) {
          const response = await api.get('/header', {
            params: {
              'filters[documentId][$eq]': documentId,
              'populate[topBar][populate]': '*',
              'populate[middleBar][populate]': '*',
              'populate[mainNavigation][populate]': '*',
              'populate[bottomBar][populate]': '*'
            }
          });
          
          if (response.data.data && response.data.data.length > 0) {
            console.log('✅ Approach 4 successful');
            // Check if data is in attributes or directly in data
            const headerData = response.data.data[0].attributes || response.data.data[0];
            console.log('Extracted header data:', headerData);
            return headerData;
          }
        }
        throw new Error('Document ID approach failed');
      }
    ];
    
    // Try each approach until one works
    for (let i = 0; i < approaches.length; i++) {
      try {
        const result = await approaches[i]();
        return result;
      } catch (error) {
        console.log(`❌ Approach ${i + 1} failed:`, error);
        if (i === approaches.length - 1) {
          throw error; // Last approach failed
        }
      }
    }
    
    throw new Error('All approaches failed');
  } catch (error) {
    console.error('Error fetching header data from Strapi:', error);
    
    // Check if it's a network error (Strapi not running)
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
        console.warn('Strapi server not available, using fallback data');
        return fallbackHeaderData;
      }
      
      if (error.response?.status === 404) {
        console.warn('Header endpoint not found, using fallback data');
        return fallbackHeaderData;
      }
    }
    
    console.warn('Using fallback header data due to error');
    return fallbackHeaderData;
  }
};

// Server-side function for ISR
export const getHeaderDataForISR = async (): Promise<HeaderData> => {
  try {
    const data = await fetchHeaderData();
    return data;
  } catch (error) {
    console.error('Error in ISR header fetch:', error);
    return fallbackHeaderData;
  }
};

// Function to test Strapi connection
export const testStrapiConnection = async (): Promise<{ connected: boolean; message: string }> => {
  try {
    // Try to connect to the header endpoint instead of root
    const response = await api.get('/header');
    return { connected: true, message: 'Strapi is running and header endpoint accessible' };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNREFUSED') {
        return { connected: false, message: 'Strapi server is not running' };
      }
      if (error.code === 'ENOTFOUND') {
        return { connected: false, message: 'Strapi URL not found' };
      }
      if (error.response?.status === 404) {
        return { connected: false, message: 'Header endpoint not found (404)' };
      }
      return { connected: false, message: `Strapi error: ${error.message} (Status: ${error.response?.status})` };
    }
    return { connected: false, message: 'Unknown error connecting to Strapi' };
  }
};

// Function to discover available content types
export const discoverContentTypes = async (): Promise<string[]> => {
  const commonEndpoints = [
    'heade', 'header', 'headers', 'global', 'site-settings', 
    'api-settings', 'config', 'settings', 'content', 'data'
  ];
  
  const availableEndpoints: string[] = [];
  
  for (const endpoint of commonEndpoints) {
    try {
      await api.get(`/${endpoint}`);
      availableEndpoints.push(endpoint);
      console.log(`✅ Found endpoint: /${endpoint}`);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        console.log(`❌ Endpoint not found: /${endpoint}`);
      } else {
        console.log(`⚠️ Error checking /${endpoint}:`, error);
      }
    }
  }
  
  return availableEndpoints;
};

// Function to fetch header by specific document ID
export const fetchHeaderByDocumentId = async (documentId: string): Promise<HeaderData | null> => {
  try {
    console.log(`Fetching header data by document ID: ${documentId}`);
    const response = await api.get('/header', {
      params: {
        'filters[documentId][$eq]': documentId,
        'populate': {
          'topBar': {
            'populate': '*'
          },
          'middleBar': {
            'populate': '*'
          },
          'mainNavigation': {
            'populate': '*'
          },
          'bottomBar': {
            'populate': '*'
          }
        }
      }
    });
    
    if (response.data.data && response.data.data.length > 0) {
      console.log('Header data fetched successfully by document ID');
      // Check if data is in attributes or directly in data
      const headerData = response.data.data[0].attributes || response.data.data[0];
      console.log('Extracted header data:', headerData);
      return headerData;
    } else if (response.data.data) {
      // Single item response (not an array)
      console.log('Header data fetched successfully by document ID (single item)');
      const headerData = response.data.data.attributes || response.data.data;
      console.log('Extracted header data:', headerData);
      return headerData;
    }
    
    console.log('No data found for document ID:', documentId);
    return null;
  } catch (error) {
    console.error('Error fetching header by document ID:', error);
    return null;
  }
}; 