'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { BrandingData } from '@/types/branding';
import { fetchBrandingData } from '@/lib/api';

interface BrandingContextType {
  brandingData: BrandingData | null;
  isLoading: boolean;
  error: string | null;
}

const BrandingContext = createContext<BrandingContextType>({
  brandingData: null,
  isLoading: true,
  error: null,
});

export const useBrandingContext = () => {
  const context = useContext(BrandingContext);
  if (!context) {
    throw new Error('useBrandingContext must be used within a BrandingProvider');
  }
  return context;
};

interface BrandingProviderProps {
  children: React.ReactNode;
}

export const BrandingProvider: React.FC<BrandingProviderProps> = ({ children }) => {
  const [brandingData, setBrandingData] = useState<BrandingData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadBrandingData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        console.log('BrandingProvider: Fetching branding data...');
        const data = await fetchBrandingData();
        
        if (isMounted) {
          setBrandingData(data);
          setIsLoading(false);
          console.log('BrandingProvider: Branding data loaded successfully', data);
        }
      } catch (err) {
        if (isMounted) {
          console.error('BrandingProvider: Error loading branding data:', err);
          setError(err instanceof Error ? err.message : 'Failed to load branding data');
          setIsLoading(false);
        }
      }
    };

    loadBrandingData();

    return () => {
      isMounted = false;
    };
  }, []);

  const value: BrandingContextType = {
    brandingData,
    isLoading,
    error,
  };

  return (
    <BrandingContext.Provider value={value}>
      {children}
    </BrandingContext.Provider>
  );
}; 