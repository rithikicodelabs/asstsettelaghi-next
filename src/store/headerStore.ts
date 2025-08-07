import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { HeaderData, HeaderStore } from '@/types/header';
import { fetchHeaderData } from '@/lib/api';

export const useHeaderStore = create<HeaderStore>()(
  persist(
    (set, get) => ({
      headerData: null,
      isLoading: false,
      error: null,
      lastFetched: null,

      fetchHeaderData: async () => {
        set({ isLoading: true, error: null });

        try {
          const data = await fetchHeaderData();
          set({ 
            headerData: data, 
            isLoading: false, 
            lastFetched: Date.now(),
            error: null 
          });
        } catch (error) {
          set({ 
            isLoading: false, 
            error: error instanceof Error ? error.message : 'Failed to fetch header data' 
          });
        }
      },

      setHeaderData: (data: HeaderData) => {
        set({ headerData: data, lastFetched: Date.now() });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      setError: (error: string | null) => {
        set({ error });
      },
    }),
    {
      name: 'header-storage', // localStorage key
      partialize: (state) => ({
        // Only persist headerData, not lastFetched since we removed caching
        headerData: state.headerData,
      }),
    }
  )
); 