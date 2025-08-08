# Branding Implementation

This document describes the branding system implementation that provides shared branding data across header and footer components.

## Overview

The branding system fetches data from Strapi API endpoint `/api/branding` and provides:
- Logo (media)
- Company name and tagline
- Social media links
- Contact information
- Address details
- VAT number

## Architecture

### 1. Types (`src/types/branding.ts`)
- `BrandingData` - Main interface for branding data
- `SocialLink` - Social media platform and URL
- `Contact` - Contact information with type, value, label, notes
- `Address` - Complete address structure
- `BrandingStore` - Zustand store interface

### 2. API Layer (`src/lib/api.ts`)
- `fetchBrandingData()` - Fetches data from Strapi with multiple fallback approaches
- `getBrandingDataForISR()` - Server-side function for ISR
- Fallback data when Strapi is unavailable

### 3. API Route (`src/app/api/branding/route.ts`)
- GET endpoint that returns branding data
- Error handling and response formatting

### 4. State Management (`src/store/brandingStore.ts`)
- Zustand store with caching (5 minutes)
- Loading states and error handling
- Optimized to fetch once and share across components

### 5. Hook (`src/hooks/useBranding.ts`)
- React hook for easy access to branding data
- Automatic fetching on component mount

### 6. Components
- `Branding` - Reusable component for logo, name, tagline, social links
- `Contacts` - Contact information and address display

## Usage

### In Header Component
```tsx
import Branding from '@/components/Branding';

// Logo, name, and tagline
<Branding 
  variant="header" 
  showLogo={true}
  showName={true}
  showTagline={true}
  showSocialLinks={false}
/>

// Social links only
<Branding 
  variant="header" 
  showLogo={false}
  showName={false}
  showTagline={false}
  showSocialLinks={true}
/>
```

### In Footer Component
```tsx
import Branding from '@/components/Branding';
import Contacts from '@/components/Contacts';

// Branding section
<Branding variant="footer" />

// Contacts section
<Contacts />
```

## Strapi Content Type Structure

The branding content type should have the following fields:

### Basic Information
- `logo` (Media) - Company logo
- `name` (Text) - Company name
- `tagLine` (Text) - Company tagline

### Social Links (Repeatable Component)
- `platform` (Enumeration) - facebook, instagram, twitter, youtube, linkedin
- `url` (Text) - Social media URL

### Contacts (Repeatable Component)
- `type` (Enumeration) - phone, email, pec, fax, website
- `value` (Text) - Contact value (phone number, email, etc.)
- `label` (Text) - Display label
- `notes` (Rich Text) - Additional notes

### Main Address (Component)
- `label` (Text) - Address label
- `street` (Text) - Street name
- `streetNumber` (Text) - Street number
- `zip_code` (Text) - Postal code
- `city` (Text) - City
- `province` (Text) - Province/State
- `region` (Text) - Region
- `country` (Text) - Country
- `latitude` (Number) - GPS latitude
- `longitude` (Number) - GPS longitude
- `full_address` (Text) - Complete formatted address

### Additional
- `vatNumber` (Text) - VAT/Tax number

## Testing

Visit `/test-branding` to see:
- Raw branding data
- Branding component variants
- Contacts component
- API test functionality

## Optimization Features

1. **Caching**: Data is cached for 5 minutes to avoid unnecessary API calls
2. **Shared State**: Single fetch shared across all components
3. **Fallback Data**: Graceful degradation when Strapi is unavailable
4. **Multiple API Approaches**: Tries different Strapi query methods
5. **Error Handling**: Comprehensive error handling with user-friendly fallbacks

## Integration Points

- **Header**: Logo, name, tagline, social links
- **Footer**: Logo, name, tagline, contacts, address, VAT number
- **Future**: Can be extended to other components as needed 