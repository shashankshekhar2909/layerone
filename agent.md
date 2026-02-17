# Agent Instructions (Codex + Contributors)

These rules are strict. If anything conflicts, follow this file first.

## Primary Objective
Implement a cross-framework design system (Angular + React) that is:
- token-first and themeable via CSS variables
- mobile-first and PWA-friendly
- analytics-friendly with standard event hooks
- accessible by default
- customizable like a utility-first system

## Golden Rules
1. Never hardcode brand values
   - No literal hex colors for UI surfaces or interactive states
   - No hardcoded spacing/radius/typography for component visuals
   - Always reference tokens or CSS variables

2. Accessibility is mandatory
   - Keyboard navigation for all interactive elements
   - Focus visible states using tokens
   - ARIA roles and attributes where required
   - No removing native semantics without replacing them correctly

3. One component, two frameworks
   - Every component added must have both:
     - React implementation in `packages/ui-react`
     - Angular implementation in `packages/ui-angular`
   - APIs must be aligned across frameworks as closely as possible

4. Analytics hooks are standardized
   - Every interactive component supports analytics inputs/props
   - Events use consistent naming and payload shape

5. Mobile-first defaults
   - Components must behave well under narrow viewports
   - Touch target sizes must be sane by default (aim 44px for primary actions)

6. Small, reviewable changes
   - Keep PRs and commits small
   - Avoid broad refactors unless explicitly requested in PLANS.md phase tasks

---

## Repo Conventions

### Tokens
- Source of truth: `packages/tokens/src/tokens.json` (or equivalent)
- Output:
  - CSS variables in `packages/theme/dist/*.css`
  - TypeScript types in `packages/tokens/dist/*`
- Tokens must include:
  - colors: primary, secondary, surface, text, border, focus, danger, success, warning
  - typography: font families, sizes, weights, line heights
  - spacing scale
  - radius scale
  - shadow/elevation
  - motion: durations and easing

### Theme Application
- Theme is applied by attributes on a root element:
  - `data-theme="light|dark"`
  - `data-brand="default|..."`
  - `data-density="comfortable|compact"`
- Components must read from CSS variables and not assume a fixed theme.

### Utility Layer
- Utilities live in `packages/theme` or `packages/utils` (as defined)
- Utilities must map to tokens, not fixed values
- Naming convention example: `u-p-2`, `u-text-sm`, `u-radius-md`, `u-shadow-1`

---

## Component API Standards

### Shared Concepts (must be consistent)
- `size`: `sm | md | lg`
- `intent`: `primary | neutral | danger` (extendable)
- `variant`: `solid | outline | ghost` (where applicable)
- `disabled`: boolean
- `loading`: boolean (buttons, async triggers)
- `fullWidth`: boolean (where applicable)

### Analytics Inputs/Props
All interactive components support:
- `analyticsId`: string (stable identifier)
- `analyticsContext`: object (optional, small)
- `onAnalytics`: callback (optional)
Event emission:
- Event name format: `ui.<component>.<action>`
- Payload fields:
  - `component`: string
  - `action`: string
  - `analyticsId`: string (if provided)
  - `label`: string (optional)
  - `value`: string|number|boolean (optional)
  - `context`: object (optional)
Privacy:
- Do not send raw free-text values by default
- If capturing input is required, implement one of:
  - masked value
  - length only
  - hashed value
  - user-provided transformer function

---

## Implementation Guidance

### Prefer Native Semantics
- Use `<button>`, `<input>`, `<label>` where possible
- Only build custom roles when native elements cannot meet requirements

### Styling Rules
- Use CSS variables for colors and spacing
- Keep CSS scoped to component namespace
- Avoid global styles except utilities and theme variables
- Provide focus ring styling via tokens:
  - `--focus-ring-color`, `--focus-ring-width`, `--focus-ring-offset`

### Responsive Rules
- Components must not break at 320px width
- Avoid fixed widths unless explicitly required
- Provide responsive props only when necessary; prefer CSS-driven behavior

### Angular Specific Rules
- Use standalone components if repo standard allows
- Integrate with Angular forms (ControlValueAccessor) for form inputs
- Avoid direct DOM manipulation; use Renderer2 where required
- Ensure SSR-safety where possible

### React Specific Rules
- Support controlled and uncontrolled usage when relevant
- Forward refs for inputs and buttons
- Avoid unnecessary re-renders; memoize where appropriate

---

## Storybook Requirements (Mandatory)
For every component added:
- Add stories for:
  - default
  - sizes
  - intents/variants
  - disabled/loading
  - responsive viewport example
  - accessibility notes (keyboard behavior summary)
- Controls should expose component props/inputs in a friendly way

---

## Testing Requirements (Minimum)
For every component:
- Unit test for key behavior (click, toggle, change)
- Keyboard behavior test where applicable
- Add at least one a11y-oriented assertion (role, aria attribute, focus management)
- Avoid snapshot-only tests for behavior components

---

## What to Build First
Follow PLANS.md Phase 1 component list exactly:
1. Button
2. IconButton
3. Input
4. Textarea
5. Checkbox
6. Radio
7. Switch
8. Badge
9. Spinner
10. Toast

Do not implement new components outside this list unless explicitly requested.

---

## Output Expectations for the Agent
When implementing:
- Update tokens only if necessary and documented in commit message
- Keep component APIs aligned across Angular and React
- Ensure both Storybooks build successfully
- Ensure packages build and typecheck

If any rule is unclear:
- Make the smallest safe assumption aligned with tokens, a11y, and cross-framework parity.
