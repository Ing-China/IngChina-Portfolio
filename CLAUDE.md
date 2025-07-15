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
- **Email Service**: Resend API for contact form functionality

### Project Structure

- `app/`: App Router pages with file-based routing
  - `api/contact/route.ts`: Contact form API endpoint using Resend
  - `layout.tsx`: Root layout with theme provider and navigation
  - `page.tsx`: Homepage with animated About section
  - Individual route folders: `/resume`, `/projects`, `/articles`, `/contact`
- `components/`: Reusable UI components (Header, Footer, ThemeToggle, ThemeProvider)
- `public/images/`: Static assets including logo.png and profile images
- `.env.local`: Environment variables (RESEND_API_KEY)

### Component Architecture

- **Layout System**: Single root layout wraps all pages with consistent header/footer
- **Theme System**: Dark/light mode using `next-themes` with CSS custom properties
- **Navigation**: Responsive header with mobile hamburger menu, smooth transitions, and scroll-based border visibility
- **Component Patterns**: Functional components with explicit `"use client"` directives for interactivity
- **Styling**: Utility-first Tailwind with custom CSS variables for theming

### Email System Architecture

The contact form uses a sophisticated email system built on Resend:

- **API Route**: `/app/api/contact/route.ts` handles form submissions
- **Validation**: Client and server-side validation for name, email, and message
- **Email Templates**: Professional HTML and plain text versions
- **Domain Setup**: Configured for `ingchina.dev` domain with proper headers
- **Error Handling**: Comprehensive error responses and status management
- **Security**: Input validation, proper headers, and anti-spam measures

### Interactive Features

- **Scroll Detection**: Header shows border only when scrolled (useEffect pattern)
- **Form State Management**: React hooks for form data, submission state, and status feedback
- **Mobile Navigation**: Collapsible menu with smooth animations and proper cleanup
- **Theme Toggle**: Persistent dark/light mode with system preference detection

### Code Style Conventions

- **Components**: React Arrow Function Component Export (rafce) pattern
- **Naming**: PascalCase for components, descriptive names without "Page" suffix
- **TypeScript**: Strict mode with ES2017 target and `@/*` path alias
- **Responsive Design**: Mobile-first approach with consistent spacing patterns
- **Client Components**: Use `"use client"` directive for any component requiring interactivity
- **API Routes**: RESTful patterns with proper error handling and validation

### Environment Configuration

- **RESEND_API_KEY**: Required for contact form functionality
- **Domain**: Currently set up for `ingchina.dev` with fallback to `onboarding@resend.dev`
- **Email Target**: All contact form submissions go to `ingchina2004@gmail.com`
