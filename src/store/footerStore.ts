import { create } from 'zustand';
import { FooterData, FooterStore } from '@/types/footer';
import { fetchFooterData } from '@/lib/api';

export const useFooterStore = create<FooterStore>((set, get) => ({
  footerData: null,
  isLoading: false,
  error: null,
  lastFetched: null,

  fetchFooterData: async () => {
    const { lastFetched } = get();
    const now = Date.now();
    
    // Cache for 5 minutes
    if (lastFetched && now - lastFetched < 5 * 60 * 1000) {
      return;
    }

    set({ isLoading: true, error: null });

    try {
      const data = await fetchFooterData();
      set({ 
        footerData: data, 
        isLoading: false, 
        lastFetched: now,
        error: null 
      });
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch footer data' 
      });
    }
  },

  setFooterData: (data: FooterData) => set({ footerData: data }),
  setLoading: (loading: boolean) => set({ isLoading: loading }),
  setError: (error: string | null) => set({ error }),
})); 