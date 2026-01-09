# Next.js App

## Overview
A Next.js 15 application with TypeScript, Tailwind CSS, ESLint, and the App Router.

## Project Structure
```
├── src/
│   └── app/
│       ├── globals.css    # Global styles with Tailwind
│       ├── layout.tsx     # Root layout
│       └── page.tsx       # Home page
├── public/                # Static assets
├── next.config.ts         # Next.js configuration
├── tailwind.config.ts     # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies and scripts
```

## Scripts
- `npm run dev` - Start development server on port 5000
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Configuration
- Import alias: `@/*` maps to `./src/*`
- Dev server runs on port 5000 (0.0.0.0)
- Tailwind CSS with dark mode support
