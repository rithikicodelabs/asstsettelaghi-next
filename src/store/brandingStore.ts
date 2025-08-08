import { create } from 'zustand';
import { BrandingData, BrandingStore } from '@/types/branding';
import { fetchBrandingData } from '@/lib/api';

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Global fetch promise to prevent multiple simultaneous requests
let fetchPromise: Promise<BrandingData> | null = null;

export const useBrandingStore = create<BrandingStore>((set, get) => ({
  brandingData: null,
  isLoading: false,
  error: null,
  lastFetched: null,

  fetchBrandingData: async () => {
    const { lastFetched, brandingData, isLoading } = get();
    const now = Date.now();

    // Prevent multiple simultaneous requests
    if (isLoading) {
      console.log('Branding data fetch already in progress');
      return;
    }

    // If there's already a fetch in progress, wait for it
    if (fetchPromise) {
      console.log('Waiting for existing branding data fetch');
      try {
        await fetchPromise;
        return;
      } catch {
        console.log('Previous fetch failed, starting new one');
      }
    }

    // Check if we have cached data and it's still valid
    if (brandingData && lastFetched && (now - lastFetched) < CACHE_DURATION) {
      console.log('Using cached branding data');
      return;
    }

    set({ isLoading: true, error: null });

    // Create the fetch promise
    fetchPromise = (async () => {
      try {
        console.log('Fetching branding data...');
        const data = await fetchBrandingData();
        set({ 
          brandingData: data, 
          isLoading: false, 
          lastFetched: now,
          error: null 
        });
        console.log('Branding data fetched successfully');
        return data;
      } catch (err) {
        console.error('Error fetching branding data:', err);
        set({ 
          isLoading: false, 
          error: err instanceof Error ? err.message : 'Failed to fetch branding data' 
        });
        throw err;
      } finally {
        fetchPromise = null;
      }
    })();

    // Don't return the promise to match the expected signature
    await fetchPromise;
  },

  setBrandingData: (data: BrandingData) => {
    set({ brandingData: data, lastFetched: Date.now() });
  },

  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },

  setError: (error: string | null) => {
    set({ error });
  },
})); 