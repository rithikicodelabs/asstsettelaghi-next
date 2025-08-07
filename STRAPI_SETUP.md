# Strapi Setup Guide

## Quick Setup

### 1. Install Strapi (if not already installed)
```bash
npx create-strapi-app@latest my-strapi-app --quickstart
```

### 2. Create Content Type
In your Strapi admin panel, create a new content type called `header` with the following structure:

#### Content Type: `header` (Single Type)
- **topBar** (Component: Header Top Bar)
  - `regionalPortal` (Component: Link)
  - `personalArea` (Component: Link)

- **middleBar** (Component: Header Middle Bar)
  - `socialLabel` (Text)
  - `searchLabel` (Text)
  - `searchEnabled` (Boolean)

- **mainNavigation** (Repeatable Component: Header Main Navigation)
  - `mainNavigationItem` (Repeatable Component: Link)

- **bottomBar** (Repeatable Component: Header Bottom Bar)
  - `phoneNumbers` (Repeatable Component: Phone Number)

#### Component: Link
- `linkType` (Enumeration: internal, external)
- `label` (Text)
- `url` (Text)
- `openInNewTab` (Boolean)
- `icon` (Enumeration: optional)
- `ariaLabel` (Text)
- `style` (Enumeration: optional)

#### Component: Phone Number
- `label` (Text)
- `phoneNumber` (Text)
- `callToAction` (Text)

### 3. Environment Variables
Create `.env.local` in your Next.js project:
```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1373
STRAPI_API_TOKEN=your_api_token_here
```

### 4. Get API Token
1. Go to Strapi Admin → Settings → API Tokens
2. Create a new token with "Full access" or "Read-only" permissions
3. Copy the token to your `.env.local` file

### 5. Test Connection
Visit `/test-header` in your Next.js app to check the connection status.

## Troubleshooting

### Strapi Not Running
```bash
# Start Strapi
cd my-strapi-app
npm run develop
```

### Wrong Content Type Name
The app uses the `/api/header` endpoint and tries to:
1. Get the document ID from `/api/header`
2. Fetch the actual data using document ID filter
3. Fall back to direct `/api/header?populate=*` if needed

If your content type has a different name, update the endpoint in `src/lib/api.ts`.

### CORS Issues
In Strapi, go to Settings → Users & Permissions Plugin → Roles → Public → find your content type and enable "find" and "findOne".

### Fallback Data
If Strapi is unavailable, the app will use fallback data so your site continues to work.

## API Endpoints

### Test Strapi Connection
```bash
curl http://localhost:1373/api/header
```

### Get Header Data
```bash
curl http://localhost:1373/api/header?populate=deep
```

## Next Steps

1. Start your Strapi server
2. Create the content type structure
3. Add some test data
4. Test the connection at `/test-header`
5. Your header should now display the data from Strapi! 