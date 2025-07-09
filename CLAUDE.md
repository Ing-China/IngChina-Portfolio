# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev`: Start development server with Turbopack (opens at http://localhost:3000)
- `npm run build`: Build the application for production
- `npm run start`: Start production server
- `npm run lint`: Run ESLint to check for code quality issues

## Architecture Overview

This is a Next.js 15 portfolio project using the App Router architecture with the following key characteristics:

- **Framework**: Next.js 15.3.5 with App Router
- **Styling**: Tailwind CSS v4 with PostCSS
- **Typography**: Geist font family (Sans and Mono variants)
- **Language**: TypeScript with strict mode enabled
- **Linting**: ESLint with Next.js configuration

### Project Structure

- `app/`: Main application directory using App Router
  - `layout.tsx`: Root layout with font configuration and metadata
  - `page.tsx`: Homepage component
  - `globals.css`: Global styles
- `public/`: Static assets (SVG icons and images)
- TypeScript path alias `@/*` maps to project root

### Key Technical Details

- Uses `next/font/google` for optimized font loading
- Configured for dark mode support with CSS variables
- Turbopack enabled for faster development builds
- Strict TypeScript configuration with modern ES2017 target
- CSS-in-JS styling patterns using Tailwind utility classes