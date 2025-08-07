export const config = {
  strapi: {
    baseUrl: process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1373',
    apiToken: process.env.STRAPI_API_TOKEN,
    headerEndpoint: '/api/header',
  },
  isr: {
    revalidateTime: 15 * 60, // 15 minutes in seconds
    staleWhileRevalidate: 5 * 60, // 5 minutes in seconds
  },
  localStorage: {
    headerKey: 'header-storage',
  },
} as const;

export const getStrapiUrl = (endpoint: string) => {
  return `${config.strapi.baseUrl}${endpoint}`;
};

export const getApiHeaders = () => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (config.strapi.apiToken) {
    headers.Authorization = `Bearer ${config.strapi.apiToken}`;
  }

  return headers;
}; 