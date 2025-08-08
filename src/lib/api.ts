import axios from 'axios';
import { HeaderData, StrapiResponse } from '@/types/header';
import { FooterData, StrapiFooterResponse } from '@/types/footer';
import { BrandingData, StrapiBrandingResponse, RawStrapiBrandingData } from '@/types/branding';
import { config, getApiHeaders } from './config';
import { fallbackBrandingData, fallbackFooterData, fallbackHeaderData } from './fallbackData';

const api = axios.create({
  baseURL: `${config.strapi.baseUrl}/api`,
  headers: getApiHeaders(),
  timeout: 10000, // 10 second timeout
});


export const fetchHeaderData = async (): Promise<HeaderData> => {
  try {
    const approaches = [
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
    await api.get('/header');
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


export const fetchFooterData = async (): Promise<FooterData> => {
  try {
    console.log('Fetching footer data from Strapi...');
    
    // Try multiple approaches to get footer data
    const approaches = [
      async () => {
        const response = await api.get<StrapiFooterResponse<FooterData>>('/footer', {
          params: {
            'populate': {
              'sections': {
                'populate': '*'
              }
            }
          }
        });
        
        if (response.data.data) {
          console.log('✅ Approach 1 successful');
          const footerData = response.data.data.attributes || response.data.data;
          console.log('Extracted footer data:', footerData);
          return footerData;
        }
        throw new Error('No data in response');
      },
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
    console.error('Error fetching footer data from Strapi:', error);
    
    // Check if it's a network error (Strapi not running)
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
        console.warn('Strapi server not available, using fallback footer data');
        return fallbackFooterData;
      }
      
      if (error.response?.status === 404) {
        console.warn('Footer endpoint not found, using fallback data');
        return fallbackFooterData;
      }
    }
    
    console.warn('Using fallback footer data due to error');
    return fallbackFooterData;
  }
};

// Server-side function for ISR
export const getFooterDataForISR = async (): Promise<FooterData> => {
  try {
    const data = await fetchFooterData();
    return data;
  } catch (error) {
    console.error('Error in ISR footer fetch:', error);
    return fallbackFooterData;
  }
};


export const fetchBrandingData = async (): Promise<BrandingData> => {
  try {
    const approaches = [
      async () => {
        const response = await api.get<StrapiBrandingResponse<BrandingData>>('/branding', {
          params: {
            'populate': {
              'logo': {
                'populate': '*'
              },
              'socialLinks': {
                'populate': '*'
              },
              'contacts': {
                'populate': '*'
              },
              'mainAddress': {
                'populate': '*'
              }
            }
          }
        });
        
        if (response.data.data) {
          console.log('✅ Approach 1 successful');
          const brandingData = response.data.data.attributes || response.data.data;
          console.log('Extracted branding data:', brandingData);
          return processBrandingData(brandingData as RawStrapiBrandingData);
        }
        throw new Error('No data in response');
      },
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
    console.error('Error fetching branding data from Strapi:', error);
    
    // Check if it's a network error (Strapi not running)
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
        console.warn('Strapi server not available, using fallback branding data');
        return fallbackBrandingData;
      }
      
      if (error.response?.status === 404) {
        console.warn('Branding endpoint not found, using fallback data');
        return fallbackBrandingData;
      }
    }
    
    console.warn('Using fallback branding data due to error');
    return fallbackBrandingData;
  }
};

// Function to process and normalize branding data
const processBrandingData = (data: RawStrapiBrandingData): BrandingData => {
  // Fix logo URL to be absolute
  const logo = data.logo ? {
    id: data.logo.id || 1,
    url: data.logo.url?.startsWith('http') 
      ? data.logo.url
      : `${config.strapi.baseUrl}${data.logo.url}`,
    alternativeText: data.logo.alternativeText,
    width: data.logo.width,
    height: data.logo.height,
  } : undefined;

  // Normalize social links platform names to lowercase
  const socialLinks = data.socialLinks?.map((link) => ({
    id: link.id || 1,
    platform: (link.platform?.toLowerCase() as 'facebook' | 'instagram' | 'twitter' | 'youtube' | 'linkedin') || 'facebook',
    url: link.url || '',
  })) || [];

  // Process contacts
  const contacts = data.contacts?.map((contact) => ({
    id: contact.id || 1,
    type: (contact.type?.toLowerCase() as 'phone' | 'email' | 'pec' | 'fax' | 'website') || 'email',
    value: contact.value || '',
    label: contact.label,
    notes: contact.notes,
  })) || [];

  // Process address
  const mainAddress = data.mainAddress ? {
    label: data.mainAddress.label,
    street: data.mainAddress.street || '',
    streetNumber: data.mainAddress.streetNumber || '',
    zip_code: data.mainAddress.zip_code || '',
    city: data.mainAddress.city || '',
    province: data.mainAddress.province || '',
    region: data.mainAddress.region || '',
    country: data.mainAddress.country || '',
    latitude: data.mainAddress.latitude,
    longitude: data.mainAddress.longitude,
    full_address: data.mainAddress.full_address || 
      `${data.mainAddress.street || ''}, ${data.mainAddress.streetNumber || ''} ${data.mainAddress.zip_code || ''} ${data.mainAddress.city || ''} (${data.mainAddress.province || ''})`
  } : fallbackBrandingData.mainAddress;

  return {
    id: data.id || fallbackBrandingData.id,
    documentId: data.documentId || fallbackBrandingData.documentId,
    createdAt: data.createdAt || fallbackBrandingData.createdAt,
    publishedAt: data.publishedAt || fallbackBrandingData.publishedAt,
    updatedAt: data.updatedAt || fallbackBrandingData.updatedAt,
    name: data.name || fallbackBrandingData.name,
    tagLine: data.tagLine || fallbackBrandingData.tagLine,
    logo,
    socialLinks,
    contacts,
    mainAddress,
    vatNumber: data.vatNumber || fallbackBrandingData.vatNumber,
  };
};

// Server-side function for ISR
export const getBrandingDataForISR = async (): Promise<BrandingData> => {
  try {
    const data = await fetchBrandingData();
    return processBrandingData(data as RawStrapiBrandingData);
  } catch (error) {
    console.error('Error in ISR branding fetch:', error);
    return fallbackBrandingData;
  }
};