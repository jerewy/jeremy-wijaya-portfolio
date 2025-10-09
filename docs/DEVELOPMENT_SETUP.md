# Development Setup Guide

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Project Setup](#project-setup)
3. [Development Workflow](#development-workflow)
4. [Environment Configuration](#environment-configuration)
5. [Code Structure & Conventions](#code-structure--conventions)
6. [Testing Setup](#testing-setup)
7. [Deployment](#deployment)
8. [Troubleshooting](#troubleshooting)

## Prerequisites

### Required Software

#### Core Development Tools
- **Node.js 18.17+** - JavaScript runtime environment
- **npm 9.0+** or **yarn 1.22+** - Package manager
- **Git 2.40+** - Version control system

#### Recommended Development Tools
- **Visual Studio Code** - Code editor with excellent TypeScript support
- **GitHub Desktop** - Git GUI client (optional)
- **Chrome DevTools** - Browser development tools
- **Postman** - API testing (for backend projects)

#### VS Code Extensions (Recommended)

```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense",
    "ms-vscode.vscode-json",
    "yzhang.markdown-all-in-one",
    "ms-vscode.vscode-wordcount"
  ]
}
```

### System Requirements

- **Operating System**: Windows 10+, macOS 10.15+, or Linux (Ubuntu 18.04+)
- **Memory**: Minimum 8GB RAM (16GB recommended)
- **Storage**: At least 2GB free disk space
- **Network**: Stable internet connection for package installation

## Project Setup

### 1. Clone the Repository

```bash
# Clone using HTTPS
git clone https://github.com/your-username/jeremy-portfolio.git

# Or using SSH (if configured)
git clone git@github.com:your-username/jeremy-portfolio.git

# Navigate to project directory
cd jeremy-portfolio
```

### 2. Install Dependencies

```bash
# Using npm (recommended)
npm install

# Or using yarn
yarn install
```

### 3. Environment Configuration

Create environment variables file:

```bash
# Copy the example environment file
cp .env.example .env.local

# Edit the environment file with your values
# See Environment Configuration section below
```

### 4. Start Development Server

```bash
# Start the development server
npm run dev

# Or with specific port
npm run dev -- --port 3003
```

The application will be available at `http://localhost:3000` (or your specified port).

### 5. Verify Installation

Open your browser and navigate to the application URL. You should see:
- The portfolio homepage loading successfully
- No console errors
- Theme toggle working correctly
- Mobile menu responsive on different screen sizes

## Development Workflow

### Daily Development Workflow

#### 1. Start Development

```bash
# Pull latest changes
git pull origin main

# Install any new dependencies
npm install

# Start development server
npm run dev
```

#### 2. Create New Features

```bash
# Create a new feature branch
git checkout -b feature/new-feature-name

# Make your changes
# ... develop your feature

# Commit changes
git add .
git commit -m "feat: add new feature description"

# Push to remote
git push origin feature/new-feature-name
```

#### 3. Testing and Quality Assurance

```bash
# Run linting
npm run lint

# Run type checking
npm run type-check

# Build the project to check for errors
npm run build

# Start production server for testing
npm start
```

### Git Workflow

#### Branch Naming Conventions

```bash
# Feature branches
feature/user-authentication
feature/mobile-menu-enhancement

# Bugfix branches
fix/hydration-error-mobile-menu
fix/theme-toggle-broken-animation

# Hotfix branches (for production fixes)
hotfix/critical-security-patch
hotfix/production-deployment-fix

# Release branches
release/v1.2.0
release/portfolio-update-2024
```

#### Commit Message Conventions

Follow [Conventional Commits](https://www.conventionalcommits.org/) specification:

```bash
# Features
feat: add mobile menu component
feat: implement theme switching functionality

# Bug fixes
fix: resolve hydration error in mobile menu
fix: correct button styling issues

# Documentation
docs: update component documentation
docs: add development setup guide

# Style changes
style: improve button hover effects
style: adjust responsive breakpoints

# Refactoring
refactor: optimize animation performance
refactor: improve component structure

# Performance improvements
perf: optimize bundle size
perf: improve initial load time

# Breaking changes
BREAKING CHANGE: update component prop interfaces

# Build changes
build: update dependencies
build: improve build configuration
```

#### Example Git Workflow

```bash
# 1. Start with updated main branch
git checkout main
git pull origin main

# 2. Create feature branch
git checkout -b feature/responsive-mobile-menu

# 3. Make changes and commit
git add .
git commit -m "feat: enhance mobile menu responsiveness"

# 4. Push and create pull request
git push origin feature/responsive-mobile-menu
# Create PR on GitHub with detailed description

# 5. After review and merge
git checkout main
git pull origin main
git branch -d feature/responsive-mobile-menu
```

## Environment Configuration

### Environment Variables

Create `.env.local` file in the project root:

```bash
# Application Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME="Jeremy Wijaya Portfolio"

# Theme Configuration
NEXT_PUBLIC_DEFAULT_THEME=light

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_GTM_ID=

# API Keys (For external integrations)
# NEXT_PUBLIC_API_KEY=

# Development Settings
NODE_ENV=development
```

### Environment Variable Types

Create `types/env.d.ts` for TypeScript support:

```typescript
// types/env.d.ts
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_APP_URL: string;
      NEXT_PUBLIC_APP_NAME: string;
      NEXT_PUBLIC_DEFAULT_THEME: 'light' | 'dark';
      NEXT_PUBLIC_GA_ID?: string;
      NEXT_PUBLIC_GTM_ID?: string;
      NODE_ENV: 'development' | 'production' | 'test';
    }
  }
}

export {};
```

### Development vs Production Configuration

#### Development Environment
```bash
# .env.development
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
NEXT_PUBLIC_DEFAULT_THEME=light
```

#### Production Environment
```bash
# .env.production
NEXT_PUBLIC_APP_URL=https://your-domain.com
NODE_ENV=production
NEXT_PUBLIC_DEFAULT_THEME=light
```

## Code Structure & Conventions

### Project Structure

```
jeremy-portfolio/
├── app/                          # Next.js app directory
│   ├── components/              # App-specific components
│   │   ├── ui/                 # Reusable UI components
│   │   ├── mobile-menu.tsx     # Mobile navigation
│   │   ├── theme-toggle.tsx    # Theme switching
│   │   └── ...                 # Other components
│   ├── types/                  # TypeScript type definitions
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Home page
├── components/                 # Shared components
│   └── ui/                    # Base UI components
├── lib/                       # Utility functions
├── public/                    # Static assets
├── docs/                      # Documentation
├── .gitignore                 # Git ignore file
├── package.json              # Dependencies and scripts
├── tailwind.config.js        # Tailwind configuration
├── tsconfig.json             # TypeScript configuration
└── README.md                 # Project documentation
```

### Component Naming Conventions

#### File Naming
```bash
# Component files (PascalCase)
MobileMenu.tsx
ThemeToggle.tsx
HeroSection.tsx

# Utility files (camelCase)
useTheme.ts
apiClient.ts
constants.ts

# Type definition files (camelCase with .types extension)
mobile-menu.types.ts
theme.types.ts
```

#### Component Structure

```typescript
// Component template
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ComponentProps {
  // Define component props here
  className?: string;
  children?: React.ReactNode;
}

export function Component({ className, children }: ComponentProps) {
  // State management
  const [state, setState] = useState();

  // Effects
  useEffect(() => {
    // Component logic
  }, []);

  // Event handlers
  const handleClick = () => {
    // Handle click event
  };

  return (
    <motion.div
      className={className}
      onClick={handleClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {children}
    </motion.div>
  );
}

// Add display name for debugging
Component.displayName = 'Component';
```

### CSS and Styling Conventions

#### Tailwind CSS Usage

```typescript
// Good: Logical grouping and responsive design
<div className="
  flex flex-col items-center justify-center
  p-4 md:p-6 lg:p-8
  bg-background text-foreground
  border border-border rounded-lg
  transition-all duration-200
  hover:shadow-lg
">

// Bad: Inconsistent or non-responsive classes
<div className="flex p-4 bg-white text-black border rounded transition hover:shadow">
```

#### Custom CSS Variables

```css
/* globals.css - Custom properties organized by purpose */
:root {
  /* Base colors */
  --background: 47 18% 96%;
  --foreground: 30 16% 18%;

  /* Component-specific colors */
  --mobile-menu-backdrop: hsl(47 18% 96% / 1);
  --mobile-menu-sidebar: hsl(47 18% 95%);

  /* Animation variables */
  --reveal-duration: 650ms;
  --reveal-ease: cubic-bezier(0.22, 1, 0.36, 1);
}
```

### TypeScript Conventions

#### Interface and Type Definitions

```typescript
// Interfaces for component props
interface ComponentProps {
  requiredProp: string;
  optionalProp?: number;
  callbackProp?: () => void;
  children?: React.ReactNode;
}

// Union types for constants
type Theme = 'light' | 'dark';
type AnimationDirection = 'up' | 'down' | 'left' | 'right';

// Complex type definitions
interface NavigationItem {
  id: string;
  label: string;
  href?: string;
  isActive?: boolean;
}

// Generic utility types
type AsyncState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};
```

## Testing Setup

### Unit Testing with Jest

#### Configuration

```json
// jest.config.js
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapping: {
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/app/(.*)$': '<rootDir>/app/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
};

module.exports = createJestConfig(customJestConfig);
```

#### Test Examples

```typescript
// __tests__/components/theme-toggle.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeToggle } from '@/components/theme-toggle';

// Mock the useTheme hook
jest.mock('@/components/theme-provider', () => ({
  useTheme: () => ({
    theme: 'light',
    toggleTheme: jest.fn(),
  }),
}));

describe('ThemeToggle', () => {
  it('renders correctly', () => {
    render(<ThemeToggle />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('toggles theme when clicked', () => {
    const mockToggle = jest.fn();
    jest.mock('@/components/theme-provider', () => ({
      useTheme: () => ({
        theme: 'light',
        toggleTheme: mockToggle,
      }),
    }));

    render(<ThemeToggle />);
    fireEvent.click(screen.getByRole('button'));
    expect(mockToggle).toHaveBeenCalled();
  });
});
```

### Integration Testing

```typescript
// __tests__/integration/mobile-menu.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { MobileMenu } from '@/components/mobile-menu';

describe('Mobile Menu Integration', () => {
  it('opens and closes correctly', () => {
    const navigationItems = ['Home', 'About', 'Projects'];

    render(<MobileMenu navigationItems={navigationItems} />);

    // Initially closed
    expect(screen.queryByText('Navigation')).not.toBeInTheDocument();

    // Open menu
    fireEvent.click(screen.getByLabelText('Open navigation menu'));
    expect(screen.getByText('Navigation')).toBeInTheDocument();

    // Close menu
    fireEvent.click(screen.getByLabelText('Close navigation menu'));
    expect(screen.queryByText('Navigation')).not.toBeInTheDocument();
  });
});
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- mobile-menu.test.tsx
```

## Deployment

### Build Process

#### Development Build
```bash
# Build for development
npm run build

# Start development server
npm start
```

#### Production Build
```bash
# Build for production
npm run build

# Export static files (if using static export)
npm run export

# Start production server
npm start
```

### Deployment Platforms

#### Vercel (Recommended)

1. **Connect Repository**
   - Connect your GitHub repository to Vercel
   - Vercel will automatically detect Next.js configuration

2. **Environment Variables**
   - Add environment variables in Vercel dashboard
   - Include all variables from `.env.local`

3. **Deploy**
   ```bash
   # Install Vercel CLI
   npm i -g vercel

   # Deploy to Vercel
   vercel --prod
   ```

#### Netlify

1. **Build Settings**
   ```
   Build command: npm run build
   Publish directory: out
   ```

2. **Environment Variables**
   - Configure in Netlify dashboard
   - Set `NODE_ENV=production`

#### Docker Deployment

```dockerfile
# Dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --only=production

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

```bash
# Build and run Docker container
docker build -t jeremy-portfolio .
docker run -p 3000:3000 jeremy-portfolio
```

### Performance Optimization

#### Bundle Analysis

```bash
# Analyze bundle size
npm run build
npm run analyze

# Or use webpack-bundle-analyzer
npx webpack-bundle-analyzer .next/static/chunks/*.js
```

#### Image Optimization

```typescript
// Next.js Image component usage
import Image from 'next/image';

export function ProjectImage({ src, alt }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={500}
      height={300}
      priority={false}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,..."
    />
  );
}
```

## Troubleshooting

### Common Issues

#### 1. Hydration Errors

**Problem**: React hydration mismatch errors in development
**Solution**:
```typescript
// Use mounted state for client-side only features
const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);

if (!mounted) {
  return null; // Prevents hydration errors
}
```

#### 2. Import/Export Issues

**Problem**: Module resolution errors
**Solution**:
```typescript
// Use absolute imports with path mapping
import { ThemeProvider } from '@/components/theme-provider';
import { MobileMenu } from '@/components/mobile-menu';

// Configure in tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"],
      "@/components/*": ["./components/*"],
      "@/app/*": ["./app/*"]
    }
  }
}
```

#### 3. CSS/Tailwind Issues

**Problem**: Tailwind classes not working
**Solution**:
```bash
# Rebuild Tailwind CSS
npm run build

# Check Tailwind configuration
npx tailwindcss --help

# Ensure proper content configuration in tailwind.config.js
content: [
  './pages/**/*.{js,ts,jsx,tsx,mdx}',
  './components/**/*.{js,ts,jsx,tsx,mdx}',
  './app/**/*.{js,ts,jsx,tsx,mdx}',
],
```

#### 4. Performance Issues

**Problem**: Slow development server
**Solution**:
```bash
# Clear Next.js cache
rm -rf .next

# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Use development-specific optimizations
npm run dev -- --turbopack
```

#### 5. TypeScript Errors

**Problem**: Type errors in development
**Solution**:
```bash
# Check TypeScript configuration
npx tsc --noEmit

# Update TypeScript types
npm install --save-dev @types/react@latest @types/react-dom@latest

# Restart TypeScript server in VS Code
# Ctrl+Shift+P -> "TypeScript: Restart TS Server"
```

### Debugging Tools

#### Browser DevTools

```javascript
// Debug React components
// Install React Developer Tools extension

// Debug performance
// Use Performance tab in Chrome DevTools

// Debug network requests
// Use Network tab to analyze API calls
```

#### VS Code Debugging

```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js: debug server-side",
      "type": "node-terminal",
      "request": "launch",
      "command": "npm run dev"
    },
    {
      "name": "Next.js: debug client-side",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:3000"
    }
  ]
}
```

### Getting Help

#### Community Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/next.js)

#### Project-Specific Help
- Check `docs/` directory for detailed documentation
- Review `README.md` for project-specific instructions
- Check GitHub Issues for known problems and solutions

This comprehensive development setup guide provides everything needed to get started with developing, testing, and deploying the portfolio application.