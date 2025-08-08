import { create } from 'zustand';

interface MobileNavState {
  isDrawerOpen: boolean;
  isSearchOpen: boolean;
  isLanguageOpen: boolean;
  toggleDrawer: () => void;
  closeDrawer: () => void;
  openDrawer: () => void;
  toggleSearch: () => void;
  closeSearch: () => void;
  toggleLanguage: () => void;
  closeLanguage: () => void;
  closeAll: () => void;
}

export const useMobileNavStore = create<MobileNavState>((set, get) => ({
  isDrawerOpen: false,
  isSearchOpen: false,
  isLanguageOpen: false,

  toggleDrawer: () => {
    const { isDrawerOpen } = get();
    set({ 
      isDrawerOpen: !isDrawerOpen,
      isSearchOpen: false,
      isLanguageOpen: false 
    });
  },

  closeDrawer: () => {
    set({ isDrawerOpen: false });
  },

  openDrawer: () => {
    set({ 
      isDrawerOpen: true,
      isSearchOpen: false,
      isLanguageOpen: false 
    });
  },

  toggleSearch: () => {
    const { isSearchOpen } = get();
    set({ 
      isSearchOpen: !isSearchOpen,
      isDrawerOpen: false,
      isLanguageOpen: false 
    });
  },

  closeSearch: () => {
    set({ isSearchOpen: false });
  },

  toggleLanguage: () => {
    const { isLanguageOpen } = get();
    set({ 
      isLanguageOpen: !isLanguageOpen,
      isDrawerOpen: false,
      isSearchOpen: false 
    });
  },

  closeLanguage: () => {
    set({ isLanguageOpen: false });
  },

  closeAll: () => {
    set({ 
      isDrawerOpen: false,
      isSearchOpen: false,
      isLanguageOpen: false 
    });
  },
})); 