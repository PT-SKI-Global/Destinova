# Destinova - AI Career & Education Decision Simulation Platform

## Overview

Destinova is a cross-platform web application that helps Indonesian users make informed life decisions through AI-powered simulations. The platform focuses on career planning, education pathways, and skill development by providing realistic scenario generation, personality-based recommendations, and comparative analysis tools.

**Core Value Proposition:**
- Reduce risk in major life decisions
- Provide realistic outcome projections
- Empower users with actionable insights for career and education choices

**Target Audience:** Indonesian young adults navigating career transitions, education decisions, and skill development opportunities.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework:** React 18+ with TypeScript and Vite build system

**Routing:** Wouter for client-side routing with four main pages:
- Home (landing page with hero, features, how-it-works sections)
- Simulation (create new simulations and take personality quiz)
- Results (view detailed scenario analysis)
- Comparison (side-by-side scenario comparison)

**UI Framework:** Radix UI primitives with shadcn/ui component library
- Design system: Hybrid Material Design + LinkedIn-inspired approach
- Typography: Inter (primary), JetBrains Mono (monospace for numbers/stats)
- Theme: Light/dark mode support with CSS variables
- Styling: Tailwind CSS with custom design tokens

**State Management:**
- TanStack Query (React Query) for server state management
- React Context for theme management
- Local component state with React hooks

**Key Design Principles:**
1. Clarity Over Cleverness - instant comprehension
2. Progressive Disclosure - complex data in digestible layers
3. Actionable Confidence - empower next steps
4. Data-Driven Hierarchy - critical metrics prominent

### Backend Architecture

**Runtime:** Node.js with Express.js server

**API Structure:** RESTful API with the following endpoints:
- `POST /api/personality/calculate` - MBTI personality type calculation
- `POST /api/simulations/generate` - AI scenario generation
- `POST /api/simulations` - Create/save simulations
- `GET /api/simulations/:userId` - Retrieve user simulations
- Training/certification recommendation endpoints

**AI Integration:** OpenAI API (via Replit AI Integrations service)
- Model: gpt-5-mini (latest as of August 2025)
- Purpose: Generate career scenarios, analyze personality fit, create personalized action plans
- Indonesian language support for all AI responses

**Personality System:**
- MBTI (Jungian) type calculation based on quiz answers
- Personality-to-career compatibility scoring
- Stored in `server/personality.ts`

### Data Storage

**Database:** PostgreSQL via Neon serverless
- ORM: Drizzle ORM with type-safe queries
- Schema location: `shared/schema.ts`

**Data Models:**

1. **Users Table**
   - Authentication credentials (username/password)
   - UUID primary keys

2. **Profiles Table**
   - User personality data (MBTI type)
   - Education level and career goals
   - Interests and preferences (JSONB)
   - Supports guest users (nullable userId)

3. **Simulations Table**
   - Decision scenarios created by users
   - Type: education, training, career, financial
   - AI-generated scenario content
   - Action plans (JSONB)
   - Metrics: salary estimates, fit scores, time investment

4. **Trainings Table**
   - Pre-seeded training/certification programs
   - Categories: tech, creative, business
   - Personality compatibility mappings
   - Salary impact percentages
   - Time commitment and difficulty levels

**Database Strategy:**
- Connection pooling via @neondatabase/serverless
- Migration system with drizzle-kit
- Schema-first approach with drizzle-zod validation

### Authentication & Sessions

**Current State:** Basic user structure in place, authentication implementation pending
- User model supports username/password
- Session management prepared (connect-pg-simple package installed)

### Asset Management

**Static Assets:**
- Images stored in `attached_assets/` directory
- Hero image: Career planning visualization
- Vite alias: `@assets` for easy imports

## External Dependencies

### AI Services
- **OpenAI API** (via Replit AI Integrations)
  - Base URL: Replit-provided endpoint
  - No API key management required
  - Used for scenario generation and personalized recommendations

### Database Services
- **Neon Serverless PostgreSQL**
  - Managed PostgreSQL with WebSocket support
  - Connection string via `DATABASE_URL` environment variable
  - Database must be provisioned before deployment

### UI Component Libraries
- **Radix UI**: Unstyled accessible component primitives (20+ components)
- **shadcn/ui**: Pre-styled Radix components with Tailwind
- **Lucide React**: Icon library
- **cmdk**: Command palette component
- **Recharts**: Chart/data visualization library

### Development Tools
- **Vite**: Build tool and dev server
- **Replit Vite Plugins**:
  - Runtime error modal overlay
  - Cartographer (development mode)
  - Dev banner (development mode)

### Form & Validation
- **React Hook Form**: Form state management
- **Zod**: Schema validation
- **@hookform/resolvers**: Integration between the two

### Styling
- **Tailwind CSS**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **tailwind-merge** & **clsx**: Conditional className handling

### Date Handling
- **date-fns**: Date manipulation and formatting

### State Management
- **TanStack Query (React Query)**: Server state and caching
- Configured for long stale times and manual refetching

### Type Safety
- Full TypeScript implementation
- Shared types between client/server via `@shared/*` path alias
- Drizzle-zod for database schema validation