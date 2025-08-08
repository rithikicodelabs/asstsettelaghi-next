export interface SocialLink {
  id: number;
  platform: 'facebook' | 'instagram' | 'twitter' | 'youtube' | 'linkedin';
  url: string;
}

export interface Contact {
  id: number;
  type: 'phone' | 'email' | 'pec' | 'fax' | 'website';
  value: string;
  label?: string;
  notes?: string;
}

export interface Address {
  label?: string;
  street: string;
  streetNumber: string;
  zip_code: string;
  city: string;
  province: string;
  region: string;
  country: string;
  latitude?: number;
  longitude?: number;
  full_address?: string;
}

export interface BrandingData {
  id: number;
  documentId: string;
  createdAt: string;
  publishedAt: string;
  updatedAt: string;
  logo?: {
    id: number;
    url: string;
    alternativeText?: string;
    width?: number;
    height?: number;
  };
  name: string;
  tagLine?: string;
  socialLinks: SocialLink[];
  contacts: Contact[];
  mainAddress: Address;
  vatNumber?: string;
}

export interface StrapiBrandingResponse<T> {
  data: {
    id: number;
    attributes: T;
  };
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface BrandingStore {
  brandingData: BrandingData | null;
  isLoading: boolean;
  error: string | null;
  lastFetched: number | null;
  fetchBrandingData: () => Promise<void>;
  setBrandingData: (data: BrandingData) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
} 