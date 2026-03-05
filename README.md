# Solo Loft

A modern, SEO-optimized real estate marketplace website for browsing, searching, and inquiring about properties. Built with Next.js 16 and powered by a Hygraph (headless CMS). This platform showcases apartments, houses, and commercial spaces for sale or rent.

## Features

- **Property Listings**: Browse all available properties with filterable cards displaying key information
- **Detailed Property Pages**: Individual property pages with:
  - Photo and video galleries with carousel navigation
  - Comprehensive property features and amenities
  - Interactive location maps (Leaflet)
  - Transaction type indicators (sale or rent)
  - YouTube video embeds
- **About Us**: Company information and history
- **Contact Form**: Multi-field inquiry form with:
  - Property selection dropdown
  - Form validation (React Hook Form + Zod)
  - Cloudflare Turnstile CAPTCHA protection
  - Toast notifications for user feedback
- **SEO Optimization**:
  - Dynamic metadata generation
  - XML sitemap generation
  - Open Graph image generation
  - Robots.txt configuration
- **ISR (Incremental Static Regeneration)**: Webhook endpoint for on-demand content revalidation

## Tech Stack

### Frontend
- **Next.js 16.1.6** (App Router)
- **React 19.2.4**
- **TypeScript**
- **SCSS Modules** for component styling
- **React Slick** for image carousels
- **Leaflet** for interactive maps
- **React Modal** for dialogs
- **React Hot Toast** for notifications

### Backend & Data
- [**Hygraph**](https://hygraph.com) - Headless CMS for content management
- **GraphQL** with `graphql-request` for data fetching
- **Codegen** - Automatic TypeScript type generation from GraphQL schema
- [**Hero Tofu**](https://herotofu.com/) - mailing service

### Form Handling
- **React Hook Form** - Form state management
- **Zod** - Schema validation
- **React Phone Input 2** - International phone number input

### Security & Analytics
- **Cloudflare Turnstile** - CAPTCHA protection
- **Vercel Analytics** - Usage tracking

## Getting Started

### Prerequisites
- Node.js (LTS version recommended)
- pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/SKOLZ/solo-loft-website.git
cd solo-loft-website
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables (create a `.env.local` file):
```env
HYGRAPH_BASE_URL
HYGRAPH_TOKEN
HEROTOFU_API_URL
NEXT_PUBLIC_TURNSTILE_SITE_KEY
NEXT_PRIVATE_TURNSTILE_SECRET_KEY
```

### Development

Run the development server with automatic GraphQL code generation:

```bash
pnpm dev
```

This command automatically runs `graphql-codegen` in watch mode and starts the Next.js development server.

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build

Build the application for production:

```bash
pnpm build
```

This generates optimized production assets and runs GraphQL code generation.

### Start Production Server

```bash
pnpm start
```

### Other Commands

- `pnpm lint` - Run ESLint
- `pnpm codegen` - Manually run GraphQL code generation

## Project Structure

```
solo-loft-website/
├── src/
│   ├── app/                      # Next.js App Router pages
│   │   ├── layout.tsx            # Root layout
│   │   ├── about-us/             # About page
│   │   ├── contact/              # Contact form page
│   │   ├── properties/           # Properties listing & detail pages
│   │   │   └── [slug]/           # Dynamic property detail pages
│   │   ├── api/                  # API routes
│   │   │   ├── og_image/         # Open Graph image generation
│   │   │   └── webhook/revalidate/ # ISR revalidation endpoint
│   │   └── _components/          # Shared components
│   │       ├── Carousel/         # Image carousel
│   │       ├── Footer/           # Site footer
│   │       ├── Header/           # Header with hero & navbar
│   │       ├── PropertyFeatures/ # Property amenities display
│   │       └── ...               # Other shared components
│   ├── services/                 # GraphQL queries & fragments
│   │   ├── client.ts             # GraphQL client configuration
│   │   ├── properties/           # Property-related queries
│   │   ├── aboutUs/              # About page queries
│   │   └── contactInformation/   # Contact info queries
│   ├── generated/                # Auto-generated GraphQL types
│   │   └── graphql.ts            # Generated TypeScript types
│   ├── styles/                   # Global styles & overrides
│   ├── utils/                    # Utility functions
│   └── assets/                   # Static assets
├── public/                       # Public static files
├── codegen.ts                    # GraphQL Code Generator config
└── next.config.ts                # Next.js configuration
```

## GraphQL & Code Generation

This project uses GraphQL Code Generator to automatically create TypeScript types from GraphQL queries and fragments.

- **Schema Source**: Hygraph
- **Queries**: Located in `src/services/*/queries/`
- **Fragments**: Located in `src/services/*/fragments/`
- **Generated Types**: Output to `src/generated/graphql.ts`

The code generation runs automatically during `dev` and `build` commands. To manually regenerate types:

```bash
pnpm codegen
```

## Deployment

The application is optimized for deployment on [Vercel](https://vercel.com):

1. Connect your repository to Vercel
2. Configure environment variables
3. Deploy

The webhook endpoint at `/api/webhook/revalidate` can be used to trigger on-demand revalidation when content changes in Hygraph.

## License

Private project.
Copyright (c) 2026 SKOLZ

This repository is public for reference purposes only.
No permission is granted to use, copy, modify, or distribute
the code without explicit permission from the author.
