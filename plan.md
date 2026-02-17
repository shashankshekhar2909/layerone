# Design System Plan (Angular + React, Token-First, Utility-Friendly)

## Vision
Build an enterprise-ready design system that works across Angular and React with:
- Token-first theming (light/dark, brand variants, density modes)
- Mobile-first responsive behavior and touch-friendly ergonomics
- Tailwind-like customization (utilities powered by tokens)
- Analytics-friendly instrumentation (standard, privacy-safe event hooks)
- Strong accessibility baseline (keyboard, focus, ARIA patterns)
- Dashboard readiness: forms, overlays, tables, and basic charts

## Non-Goals (for now)
- Rebuilding full PrimeNG/Material/Ant-size catalog
- Building a full Figma plugin ecosystem
- Advanced data grid, rich text editor, complex charting studio in v0/v1
- Heavy animation frameworks; we’ll provide a small motion system

## Product Principles
1. Tokens are the single source of truth
2. Components never hardcode brand colors, spacing, radius, or typography
3. Every component ships with documentation and interaction examples
4. Accessibility is not optional
5. Mobile and PWA constraints are first-class
6. Analytics hooks must be consistent and privacy-safe
7. Charts should be composable and themeable with tokens

---

## Target Outcomes
### v0 (MVP)
- Solid foundations and 10–14 core components
- Works in Angular + React
- Storybook documentation per framework
- Published packages on npm under a single scope
- Theming via tokens and CSS variables
- Utility layer similar to Tailwind (small but useful)
- Motion tokens + basic transitions
- Basic chart components for dashboards (limited set)

### v1 (Enterprise Baseline)
- ~30–45 components plus patterns (including autocomplete + overlays)
- Visual regression checks
- A11y checks in CI
- Governance and contribution process
- Consistent analytics event schema across components
- Dashboard kit: charts + table baseline + filters patterns

---

## Architecture Overview

### Monorepo Layout (recommended)
- `packages/tokens/`  
  Source tokens (JSON). Builds CSS variables, TypeScript types, optional Tailwind preset.
- `packages/theme/`  
  Generated theme outputs (CSS vars for light/dark, brand sets, density) + utilities.
- `packages/utils/`  
  Shared utilities (classnames, focus helpers, analytics helpers, motion helpers).
- `packages/primitives/`  
  Headless, framework-agnostic behavior primitives where possible (keyboard/focus logic, positioning adapters).
- `packages/ui-react/`  
  React components consuming tokens and primitives.
- `packages/ui-angular/`  
  Angular components consuming tokens and primitives.
- `packages/charts/`  
  Cross-framework chart tokens + shared formatting helpers (wrappers live in each UI package or separate `charts-react/charts-angular`).
- `apps/storybook-react/`  
  React Storybook.
- `apps/storybook-angular/`  
  Angular Storybook.
- `apps/docs/`  
  Next.js docs site aggregating guidelines, tokens, patterns, changelog.

### Theming Model
- Design tokens compiled to CSS variables
- Theme switching by `data-theme="light|dark"` and `data-brand="default|brandA|brandB"` on `<html>` or a root container
- Density switching by `data-density="comfortable|compact"`
- Components only reference CSS variables, never literal hex values

### Utility Layer (Tailwind-like)
Provide a minimal set of utilities mapped to tokens:
- spacing, typography, radius, shadows, borders
- flex/grid helpers
- color utilities backed by CSS variables
- motion utilities backed by motion tokens (durations/easing)

Optionally export a Tailwind preset later, but utilities must work without Tailwind.

---

## Analytics Instrumentation (Built-in)
### Goals
- Consistent event names and payload shape
- Works without any vendor lock-in (GA/PostHog/Segment)
- Privacy-safe defaults (no raw PII, no raw free-text by default)

### Approach
- Provide optional analytics props/inputs across components:
  - `analyticsId` (string)
  - `analyticsContext` (object)
  - `onAnalytics` callback (function)
- Emit standardized events like:
  - `ui.button.click`
  - `ui.input.change`
  - `ui.autocomplete.select`
  - `ui.modal.open` / `ui.modal.close`
  - `ui.toast.show`
  - `ui.chart.interact` (hover/click/legend toggle)
- Payload fields:
  - `component`, `action`, `label`, `value` (optional), `context` (optional)
- Do not capture raw input values by default. Provide opt-in masking/hashing strategy.

---

## Mobile and PWA Requirements
- Touch targets: aim for at least 44px height for primary interactions
- Keyboard + screen reader support still required on mobile
- Avoid heavy layout thrash; prefer CSS transforms for animations
- Support reduced motion (`prefers-reduced-motion`)
- Offline-friendly docs build, no runtime dependency on external fonts/scripts unless optional

---

## Motion & Animation System
### Goals
- Make the UI feel responsive and modern without “animation bloat”
- Standardize transitions across overlays, menus, toasts, accordions, etc.

### Motion Tokens (must-have)
- durations: `fast`, `base`, `slow`
- easing: `standard`, `emphasized`, `decelerated`
- distances: small translate values for enter/exit (optional token)

### Rules
- Animations must respect `prefers-reduced-motion`
- Use CSS transitions/animations by default
- Only use JS-driven animation when necessary for layout measurements

---

## Charts & Graphs (Dashboard Kit)
### Goal
Provide a small, enterprise-friendly chart set that:
- is themeable via tokens
- supports responsive containers
- is accessible enough for dashboards (aria labels, table fallback in docs)
- has standardized formatting helpers (numbers, currency, percent)

### Initial Chart Set (v0/v1)
1. LineChart (time series)
2. BarChart (horizontal/vertical)
3. AreaChart (optional if not too heavy)
4. Donut/Pie (use sparingly, but dashboards ask for it)
5. Sparkline (tiny trend)
6. KPI StatCard (value + delta + sparkline)

### Guidelines
- Provide a consistent legend + tooltip behavior
- Provide empty/loading states (skeleton)
- Ensure charts work at 320px width (stack legends, simplify labels)
- Keep the API stable and simple; advanced features can come later

---

## Phased Roadmap

## Phase 0: Repo, Tooling, and Standards (Week 1)
### Deliverables
- Monorepo setup with packages + apps structure
- Linting, formatting, type checks
- CI pipeline: build, test, storybook build, package build
- Release workflow (changesets recommended)
- Documentation skeleton in `apps/docs`
- Token schema defined and committed
- Motion token skeleton added
- Charts package skeleton added (helpers only)

### Exit Criteria
- `packages/tokens` can generate CSS variables
- `packages/theme` outputs at least one theme (light) and one brand variant
- Storybook apps run for Angular and React
- Motion utilities exist (even minimal), and `prefers-reduced-motion` is wired

---

## Phase 1: Foundations + First Components (Weeks 2–4)
### Tokens (must-have)
- color: primary, secondary, surface, text, border, focus
- typography: font family, sizes, weights, line heights
- spacing scale
- radius scale
- elevation/shadows
- motion durations/easing

### Utilities (small but useful)
- spacing utilities: `u-p-*, u-m-*`
- typography utilities: `u-text-*`, `u-font-*`
- layout utilities: `u-flex`, `u-grid`, `u-gap-*`
- radius/shadow utilities mapped to tokens
- motion utilities: `u-transition-*`, `u-ease-*`, `u-duration-*`

### Core Components (initial set)
1. Button
2. IconButton
3. Input (text)
4. Textarea
5. Checkbox
6. Radio
7. Switch
8. Badge
9. Spinner (Loader)
10. Toast (simple)
11. Card (dashboard container)
12. Stat / KPI Tile (value + label + optional delta)

Each component must ship for both React and Angular with:
- a11y behavior and keyboard support
- size variants (sm, md, lg)
- intent variants (primary, neutral, danger) using tokens
- disabled and loading states (where applicable)
- analytics hook support
- mobile-friendly touch sizing defaults
- motion rules for enter/exit where relevant (toast)

### Exit Criteria
- Components documented in Storybook (React + Angular)
- Basic visual regression baseline snapshots (even minimal)
- `npm pack` works locally for each published package

---

## Phase 1.5: Charts MVP (Weeks 4–5)
### Deliverables
- Chart tokens usage guidance (colors, gridlines, typography)
- Formatting helpers (currency/percent/compact numbers)
- React: `LineChart`, `BarChart`, `Sparkline`, `StatCard`
- Angular: same set and API parity
- Stories for responsive + empty/loading states
- Analytics hooks for chart interactions (optional but supported)

### Exit Criteria
- Charts render with theme variables
- Work on mobile widths
- Docs show usage patterns for dashboards

---

## Phase 2: Overlays + Autocomplete + Navigation (Weeks 5–8)
Add headless-like primitives where needed.

### Components
- Modal/Dialog
- Tooltip
- Dropdown/Menu
- Tabs
- Select
- FormField (label, helper text, validation state)
- Autocomplete (must-have)

### Autocomplete Requirements (enterprise)
- Keyboard navigation (arrow keys, enter, escape)
- Typeahead filtering
- Async mode (loading state)
- Virtualization optional (add later if needed)
- Clear button optional
- Analytics event:
  - `ui.autocomplete.open`
  - `ui.autocomplete.search` (do NOT log raw text by default)
  - `ui.autocomplete.select`

### Exit Criteria
- Overlays handle focus trap, escape key, outside click
- Autocomplete works in mobile viewport and desktop
- A11y checks pass for core interactions
- Motion applied consistently (open/close transitions)

---

## Phase 3: Enterprise Dashboard Patterns (v1 timeframe)
### Components/Patterns
- Table (basic)
- Pagination
- Breadcrumbs
- FilterBar pattern (chips + search + sort)
- Empty state patterns
- Form layouts and validation patterns
- Additional charts:
  - Donut/Pie (carefully)
  - AreaChart (optional)
  - Legend/Tooltip primitives (shared)

---

## Definition of Done (per component)
- Uses tokens only (no hardcoded colors/spacing)
- API matches system standards (size, intent, disabled, etc.)
- Storybook stories:
  - default, variants, states, responsive, accessibility notes
- Tests:
  - unit tests for logic
  - keyboard behavior tests where applicable
  - minimal a11y checks
- Analytics:
  - emits standard events
  - docs show example integration
- Mobile:
  - touch targets and responsive story verified
- Motion:
  - respects reduced motion
  - uses motion tokens

---

## Governance (v1)
- Semantic versioning
- Deprecation policy (warn for one minor, remove in next major)
- Contribution guide and PR checklist
- Component proposal template (problem, API, a11y, analytics, tokens)
