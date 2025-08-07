export interface Link {
  id?: number;
  linkType: string;
  label: string;
  url: string | null;
  publicCompetition?: any;
  communication?: any;
  document?: any;
  event?: any;
  person?: any;
  procedure?: any;
  service?: any;
  facility?: any;
  organizationalUnit?: any;
  openInNewTab?: boolean;
  icon?: string | null;
  ariaLabel?: string | null;
  style?: string;
}

export interface PhoneNumber {
  id?: number;
  label: string;
  phoneNumber: string;
  callToAction?: string;
}

export interface TopBar {
  id?: number;
  regionalPortal: Link;
  personalArea: Link;
}

export interface MiddleBar {
  id?: number;
  socialLabel?: string;
  searchLabel?: string;
  searchEnabled?: boolean;
}

export interface MainNavigation {
  id?: number;
  mainNavigationItem: Link[];
}

export interface BottomBar {
  id?: number;
  phoneNumbers: PhoneNumber[];
}

export interface HeaderData {
  topBar: TopBar;
  middleBar: MiddleBar;
  mainNavigation: MainNavigation;
  bottomBar: BottomBar;
}

export interface StrapiResponse<T> {
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

export interface HeaderStore {
  headerData: HeaderData | null;
  isLoading: boolean;
  error: string | null;
  lastFetched: number | null;
  fetchHeaderData: () => Promise<void>;
  setHeaderData: (data: HeaderData) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
} 