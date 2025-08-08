import { useEffect, useRef } from 'react';
import { useBrandingStore } from '@/store/brandingStore';

export const useBranding = () => {
  const { 
    brandingData, 
    isLoading, 
    error, 
    fetchBrandingData 
  } = useBrandingStore();

  // Use ref to track if we've already fetched data
  const hasFetched = useRef(false);

  useEffect(() => {
    // Only fetch if we haven't already and don't have data
    if (!hasFetched.current && !brandingData && !isLoading) {
      hasFetched.current = true;
      fetchBrandingData();
    }
  }, [fetchBrandingData, brandingData, isLoading]);

  return {
    brandingData,
    isLoading,
    error,
    refetch: fetchBrandingData,
  };
}; 