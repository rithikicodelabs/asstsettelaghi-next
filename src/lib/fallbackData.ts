import { BrandingData } from "@/types/branding";
import { FooterData } from "@/types/footer";
import { HeaderData } from "@/types/header";

// Fallback header data in case Strapi is unavailable
export const fallbackHeaderData: HeaderData = {
  topBar: {
    regionalPortal: {
      linkType: 'external',
      label: 'Portale Regionale',
      url: '#',
      openInNewTab: true,
    },
    personalArea: {
      linkType: 'internal',
      label: 'Area Personale',
      url: '#',
      openInNewTab: false,
    },
  },
  middleBar: {
    socialLabel: 'Seguici sui social',
    searchLabel: 'Cerca',
    searchEnabled: true,
  },
  mainNavigation: {
    id: 1,
    mainNavigationItem: [
      {
        id: 1,
        linkType: 'internal',
        label: 'Home',
        url: '/',
        openInNewTab: false,
      },
      {
        id: 2,
        linkType: 'internal',
        label: 'Servizi',
        url: '/servizi',
        openInNewTab: false,
      },
      {
        id: 3,
        linkType: 'internal',
        label: 'Contatti',
        url: '/contatti',
        openInNewTab: false,
      },
    ],
  },
  bottomBar: {
    id: 1,
    phoneNumbers: [
      {
        label: 'Centralino',
        phoneNumber: '+39 123 456 7890',
        callToAction: 'Chiama ora',
      },
    ],
  },
};

// Fallback footer data in case Strapi is unavailable
export const fallbackFooterData: FooterData = {
  id: 1,
  documentId: 'fallback',
  createdAt: new Date().toISOString(),
  publishedAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  sections: [
    {
      id: 1,
      label: 'Area Informativa',
      link: [
        {
          id: 1,
          linkType: 'Url',
          label: 'Servizi e prestazioni',
          url: '/servizi',
          openInNewTab: false,
          style: 'default',
        },
        {
          id: 2,
          linkType: 'Url',
          label: 'Come fare per',
          url: '/come-fare-per',
          openInNewTab: false,
          style: 'default',
        },
      ],
    },
    {
      id: 2,
      label: 'Area Istituzionale',
      link: [
        {
          id: 3,
          linkType: 'Url',
          label: 'Organizzazione',
          url: '/organizzazione',
          openInNewTab: false,
          style: 'default',
        },
        {
          id: 4,
          linkType: 'Url',
          label: 'Contatti',
          url: '/contatti',
          openInNewTab: false,
          style: 'default',
        },
      ],
    },
  ],
};

// Fallback branding data in case Strapi is unavailable
export const fallbackBrandingData: BrandingData = {
  id: 1,
  documentId: 'fallback',
  createdAt: new Date().toISOString(),
  publishedAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  name: 'Nome della ASL',
  tagLine: 'Portale Sanitario Regionale',
  logo: {
    id: 1,
    url: '/assets/logo.svg',
    alternativeText: 'ASL Logo',
  },
  socialLinks: [
    {
      id: 1,
      platform: 'facebook',
      url: 'https://facebook.com',
    },
    {
      id: 2,
      platform: 'instagram',
      url: 'https://instagram.com',
    },
    {
      id: 3,
      platform: 'twitter',
      url: 'https://twitter.com',
    },
  ],
  contacts: [
    {
      id: 1,
      type: 'phone',
      value: '+39 0609090909',
      label: 'Centralino',
    },
    {
      id: 2,
      type: 'email',
      value: 'info@asl.example.it',
      label: 'Email',
    },
    {
      id: 3,
      type: 'pec',
      value: 'indirizzopecdellente@pec.gov.it',
      label: 'PEC',
    },
  ],
  mainAddress: {
    street: 'Via della Sede',
    streetNumber: '23',
    zip_code: '09872',
    city: 'Città',
    province: 'AA',
    region: 'Regione',
    country: 'Italia',
    full_address: 'Via della Sede, 23 09872 Città (AA)',
  },
  vatNumber: 'P.IVA XXXXXXXXXXX',
};