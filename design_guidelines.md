# Destinova Design Guidelines

## Design Approach

**System**: Hybrid Material Design + LinkedIn-inspired  
**Principles**:
1. Clarity Over Cleverness - instant comprehension for life decisions
2. Progressive Disclosure - complex data in digestible layers
3. Actionable Confidence - empower next steps
4. Data-Driven Hierarchy - critical metrics prominent

---

## Typography

**Fonts**:
- **Primary**: Inter (400, 500, 600, 700, 800)
- **Monospace**: JetBrains Mono (500) - for numbers, stats, currency

**Scale**: Hero (3xl-5xl) → Page Titles (2xl-3xl semibold) → Sections (xl-2xl semibold) → Cards (lg-xl medium) → Body (base-lg) → Labels (sm-base) → Micro (xs-sm)

**Rules**:
- Semibold (600) for all interactive elements
- `leading-tight` for headings, `leading-relaxed` for long-form
- `tracking-tight` for metrics
- Max width `max-w-prose` (65ch) for readability

---

## Layout & Spacing

**Core Units**: 2, 4, 6, 8, 12, 16, 20, 24
- `p-2, gap-2`: Inline elements, icon-text
- `p-4, p-6`: Card interiors, buttons
- `gap-4, gap-6`: Form fields, lists
- `p-8, py-12`: Content sections
- `px-6 md:px-12 lg:px-16`: Page margins
- `space-y-6, space-y-8`: Vertical rhythm
- `py-16, py-20, py-24`: Major sections

**Grids**:
- **Dashboard**: 12-column (sidebar 3-col, main 9-col)
- **Cards**: Mobile 1-col → Tablet 2-col → Desktop 3-col (features) or 2-col (comparisons)
- **Containers**: `max-w-7xl` (dashboards), `max-w-6xl` (workflows), `max-w-prose` (content)

---

## Components

### Navigation
**Top Bar**: Fixed `h-16`-`h-20`, backdrop blur, logo left + nav center + user/CTA right  
**Sidebar**: `w-64` (collapsible to `w-16`), icons + labels, section dividers  
**Mobile**: Bottom tab bar (4-5 actions) + hamburger drawer

### Cards
**Scenario**: `p-6`, `rounded-lg`-`rounded-xl`, `shadow-sm`-`shadow-md`, header (title + metadata) + content + footer (actions + metrics)  
**Metric**: `p-4`-`p-6`, large mono numbers (`text-3xl`-`text-4xl`), trend indicators, optional sparklines  
**Comparison**: Side-by-side `grid-cols-2`, aligned metrics, visual indicators, sticky headers

### Forms
**Inputs**: `h-12`, `rounded-lg`, labels above (`text-sm font-medium mb-2`), helper text below (`text-sm mt-1`), focus rings  
**Multi-Step**: Progress stepper, `max-w-2xl` centered, `space-y-6`, back/continue buttons  
**Selection**: Radio cards/checkboxes, `min-h-16` touch areas, visual selection feedback

### Buttons
**Primary/Secondary**: `h-12 px-6 rounded-lg font-semibold text-base`, full-width mobile → auto desktop  
**Tertiary**: Text-only, hover underline  
**Groups**: Stack vertical mobile (`flex-col gap-3`) → horizontal desktop (`flex-row gap-4`)

### Data Visualization
**Career Tree**: Horizontal flow, node cards with icons, connecting lines, current highlighted, interactive  
**Charts**: Bars (salary), lines (progression), radar (fit), pie (time) - responsive with clear labels  
**Fit Scores**: Circular gauge 0-100, `text-4xl font-mono` center, interpretation label, color zones  
**Metrics Grid**: 3-4 col desktop (`grid-cols-3 lg:grid-cols-4`), `p-6` cards, icon + number + label, 2-col mobile

### Modals & Overlays
**Modals**: `max-w-4xl`, sticky header/footer, scrollable body with `space-y-8`  
**Mobile Sheets**: Slide-up, `rounded-t-2xl`, drag handle  
**Tooltips**: `max-w-xs rounded-md`, 1-2 sentences

### Lists & Tables
**Lists**: `p-4` items, `border-b`, icon + title/date/metric + status/actions, hover state  
**Tables**: Sticky headers, alternating rows, `p-4 text-sm` cells, horizontal scroll mobile with shadow  
**Accordion**: Expandable sections, summary header (title + key metrics), expanded details

---

## Landing Page

**Hero** (100vh): Large headline + subheadline + dual CTA + hero image (right desktop, background mobile with gradient)  
**How It Works**: 3-col grid, icon + title + description, flow arrows, screenshots  
**Features**: 2-3 col grid, 6-9 cards (icon + title + 2-3 sentences + link), hover shadow  
**Social Proof**: 3-col testimonials + stats bar  
**Use Cases**: 3-4 scenarios, alternating image/text layout  
**CTA**: Centered, email capture, trust indicators  
**Footer**: 4-col (company + product + resources + legal/social)

---

## Dashboard & App Structure

**Main Dashboard**: Sidebar left + top bar (breadcrumbs/search/notifications) + welcome banner + 3-col metrics + recent simulations + quick actions  

**Simulation Flow** (4-5 steps):
1. Profile (education, current situation)
2. Goals (career interests, lifestyle)
3. Personality (8-10 question quiz)
4. Decision inputs (training, financial)
5. Review/generate
Progress bar always visible

**Results**: Overview card + tabs (AI Scenario, Action Plan, Career Path, Training Fit, Financial) + sidebar (related simulations) + floating save/share  

**Career Visualizer**: Full-screen canvas, zoom controls, filters (industry/education/timeline), detail panel (slides right), export button  

**Comparison**: 50/50 split, synchronized scroll, side-by-side metrics, summary bar  

**Profile/Settings**: Tab nav (Profile/Preferences/Billing/Privacy), sectioned forms, save/cancel bottom

---

## Images

**Hero**: Confident professional reviewing data on laptop in bright modern setting (co-working/home office), natural light, optimistic tone. Desktop: right half. Mobile: full-width background + gradient overlay.  

**How It Works**: 3 screenshots - personality quiz, AI generating, career tree  

**Use Cases**: 4 photos - young graduate, mid-career professional, online learner, entrepreneur. Authentic, bright, natural lighting.

---

## Responsive

**Breakpoints**: Mobile <768px, Tablet 768-1024px, Desktop >1024px  

**Mobile**: Single column, bottom nav, stacked cards, full-screen modals, simplified charts, swipeable cards  

**Touch Targets**: Min `h-12` (48px), `gap-4` between items, `p-3` for icon expansion

---

## Accessibility

**Focus**: `ring-2` with offset, logical tab order, skip-to-content link  

**Screen Readers**: Semantic HTML (`nav`, `main`, `aside`, `article`), ARIA labels for icon buttons, ARIA live regions for dynamic updates, chart descriptions via `aria-describedby`  

**Forms**: Associated labels (`for`/`id`), required indicators (visual + programmatic), error messages via `aria-describedby`, clear instructions

---

**Color Strategy**: Use Material Design color system with LinkedIn's professional palette (blues/grays). Primary actions in confident blue, success states in green, warnings in amber, errors in red. Maintain WCAG AA contrast ratios minimum.