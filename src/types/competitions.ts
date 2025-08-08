// Clean interfaces for competitions data
export interface Competition {
  id: number;
  title: string;
  slug: string;
  createdAt: string;
  publishedAt: string;
  updatedAt: string;
}

// Raw Strapi data interfaces
export interface RawStrapiCompetition {
  id?: number;
  title?: string;
  slug?: string;
  createdAt?: string;
  publishedAt?: string;
  updatedAt?: string;
  [key: string]: unknown;
}

// Strapi response wrapper
export interface StrapiCompetitionResponse<T> {
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

// Store interface for competitions
export interface CompetitionStore {
  competitions: Competition[];
  currentCompetition: Competition | null;
  isLoading: boolean;
  error: string | null;
  lastFetched: number | null;
  fetchCompetitions: () => Promise<void>;
  fetchCompetitionBySlug: (slug: string) => Promise<void>;
  setCompetitions: (data: Competition[]) => void;
  setCurrentCompetition: (data: Competition | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}