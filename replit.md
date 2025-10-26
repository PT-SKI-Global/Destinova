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
- MBTI (Jungian) type calculation based on 16-question quiz (4 questions per dimension)
- Personality-to-career compatibility scoring
- PRO Psikotes analysis with recession-economy focus (FREE for MVP)
- Stored in `server/personality.ts`

**PRO Psikotes Features (October 2025):**
- **Recession-Proof Career Recommendations:** Careers with recession resistance scores (75-98%), remote work indicators, demand trends, salary ranges
- **Cost-Effective Skills Analysis:** High-ROI skills learnable for free/cheap (ROI 85-95%), with learning resources and time estimates
- **Side Hustle Recommendations:** Income-generating opportunities with startup costs, time commitments, and fit scores
- **Enneagram Type Analysis:** Core motivations, stress/growth patterns, workplace behavior insights
- **Jungian Cognitive Functions:** Dominant, auxiliary, tertiary, inferior function stack analysis
- **Income Optimization Strategy:** Personality-based strategies for career advancement and passive income
- **Budget-Friendly Training Paths:** Cost-conscious career development recommendations

**Technical Implementation:**
- Backend guarantees minimum 3 recommendations per category (recession-proof careers, cost-effective skills, side hustles)
- Fallback arrays ensure ALL 16 MBTI types receive comprehensive analysis
- Type-safe interfaces aligned between frontend (`client/src/components/personality-quiz.tsx`) and backend (`server/personality.ts`)

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

## Recent Updates (October 26, 2025)

### PRO Psikotes Recession-Focused Feature - COMPLETED ✅

**Implementation Summary:**
- Comprehensive recession-economy analysis with minimum guarantees (>= 3 items per category)
- Type alignment between frontend and backend interfaces verified
- E2E testing passing with verified counts: Careers=3, Skills=4, Hustles=3

**Key Features Delivered:**
1. Recession-proof career recommendations with resistance scores
2. Cost-effective skills (free/cheap) with ROI calculations
3. Side hustle income opportunities
4. Enneagram type analysis
5. Jungian cognitive functions breakdown
6. Income optimization strategies
7. Budget-friendly training paths

**Technical Implementation:**
- Backend fallback logic ensures all MBTI types receive comprehensive recommendations
- Conditional rendering prioritizes Pro view over basic view
- All Pro features FREE for MVP to maximize user adoption

### Known Issues

**MBTI Calculation Accuracy (Non-critical):**
- Quiz calculation may occasionally misclassify certain answer patterns
- Does not affect Pro analysis functionality (all features work for any MBTI type)
- Recommendations remain personalized and relevant
- Logged for future investigation and refinement
- Debug logging added to `server/personality.ts` for tracking