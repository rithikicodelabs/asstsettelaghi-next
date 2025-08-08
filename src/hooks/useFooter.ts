import { useEffect } from 'react';
import { useFooterStore } from '@/store/footerStore';

export const useFooter = () => {
  const { footerData, isLoading, error, fetchFooterData } = useFooterStore();

  useEffect(() => {
    if (!footerData) {
      fetchFooterData();
    }
  }, [footerData, fetchFooterData]);

  return {
    footerData,
    isLoading,
    error,
    refetch: fetchFooterData,
  };
}; 