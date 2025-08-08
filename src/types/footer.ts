export interface FooterLink {
  id: number;
  linkType: string;
  label: string;
  url: string;
  openInNewTab: boolean;
  ariaLabel?: string | null;
  icon?: string | null;
  style?: string;
}

export interface FooterSection {
  id: number;
  label: string;
  link: FooterLink[];
}

export interface FooterData {
  id: number;
  documentId: string;
  createdAt: string;
  publishedAt: string;
  updatedAt: string;
  sections: FooterSection[];
}

export interface StrapiFooterResponse<T> {
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

export interface FooterStore {
  footerData: FooterData | null;
  isLoading: boolean;
  error: string | null;
  lastFetched: number | null;
  fetchFooterData: () => Promise<void>;
  setFooterData: (data: FooterData) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
} 