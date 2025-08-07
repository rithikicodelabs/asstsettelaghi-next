import { useEffect } from 'react';
import { useHeaderStore } from '@/store/headerStore';

export const useHeader = () => {
  const {
    headerData,
    isLoading,
    error,
    lastFetched,
    fetchHeaderData,
    setHeaderData,
    setLoading,
    setError,
  } = useHeaderStore();

  useEffect(() => {
    fetchHeaderData();
  }, [fetchHeaderData]);

  const isStale = () => {
    // Always return true since we removed caching
    return true;
  };

  const refetch = async () => {
    setLoading(true);
    setError(null);
    try {
      await fetchHeaderData();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch header data');
    }
  };

  return {
    headerData,
    isLoading,
    error,
    lastFetched,
    isStale: isStale(),
    refetch,
    setHeaderData,
    setLoading,
    setError,
  };
}; 