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
- **Typography**: JetBrains Mono font family via next/font/google
- **Language**: TypeScript with strict mode enabled
- **Linting**: ESLint with Next.js configuration

### Project Structure

- `app/`: App Router pages with file-based routing
  - `layout.tsx`: Root layout with theme provider and navigation
  - `page.tsx`: Homepage with animated About section
  - Individual route folders: `/resume`, `/projects`, `/articles`, `/contact`
- `components/`: Reusable UI components (Header, Footer, ThemeToggle, ThemeProvider)
- `public/`: Static assets and custom images

### Component Architecture

- **Layout System**: Single root layout wraps all pages with consistent header/footer
- **Theme System**: Dark/light mode using `next-themes` with CSS custom properties
- **Navigation**: Responsive header with mobile hamburger menu and smooth transitions
- **Component Patterns**: Functional components with explicit `"use client"` directives
- **Styling**: Utility-first Tailwind with custom CSS variables for theming

### Code Style Conventions

- **Components**: React Arrow Function Component Export (rafce) pattern
- **Naming**: PascalCase for components, descriptive names without "Page" suffix
- **TypeScript**: Strict mode with ES2017 target and `@/*` path alias
- **Responsive Design**: Mobile-first approach with consistent spacing patterns
