# AsstSettelaghi Next.js App

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Header Implementation

The app includes a dynamic header system that fetches data from Strapi CMS with the following features:

### Features
- **ISR (Incremental Static Regeneration)** with 15-minute revalidation
- **Zustand state management** with localStorage persistence
- **TypeScript interfaces** for type safety
- **Error handling** with fallback to basic navbar
- **Responsive design** with Bootstrap Italia components

### Header Data Structure
The header consists of four main sections:
1. **Top Bar**: Regional portal and personal area links
2. **Middle Bar**: Social label and search functionality
3. **Main Navigation**: Dynamic navigation items
4. **Bottom Bar**: Phone numbers and contact information

### Setup

1. **Environment Variables**
   Create a `.env.local` file with:
   ```env
   NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
   STRAPI_API_TOKEN=your_strapi_api_token_here
   ```

2. **Strapi Content Type**
   Ensure your Strapi content type is named `header` with the following structure:
   - `topBar` (Component: Header Top Bar)
   - `middleBar` (Component: Header Middle Bar)
   - `mainNavigation` (Repeatable Component: Header Main Navigation)
   - `bottomBar` (Repeatable Component: Header Bottom Bar)

3. **API Endpoint**
   The header data is fetched from: `/api/header?populate=deep`

### Usage

The header is automatically loaded in the layout at `src/app/(home)/layout.tsx` and will:
- Fetch data on component mount
- Cache data for 15 minutes
- Persist data in localStorage
- Show loading state while fetching
- Fallback to basic navbar on errors

### Files Structure
```
src/
├── types/header.ts          # TypeScript interfaces
├── lib/api.ts              # API utilities
├── store/headerStore.ts    # Zustand store
├── components/Header.tsx   # Header component
└── app/
    ├── api/header/route.ts # ISR API route
    └── (home)/layout.tsx   # Layout with header
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
