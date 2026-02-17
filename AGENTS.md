# LayerOne Design System – Instructions for AI Coding Agents

This project uses Codex (and similar agents) to help generate, modify, and test code.
Use this file to guide the agent through our monorepo structure, build tools,
standards, and conventions.

## Repo Layout

Packages (shared code)
- `packages/tokens/`         – design tokens & token builders
- `packages/theme/`          – theme generator & utilities
- `packages/ui-react/`       – React components
- `packages/ui-angular/`     – Angular components
- `packages/charts/`         – cross-framework chart helpers
- `packages/utils/`          – utilities (classnames, focus helpers, analytics)

Apps (experiments & documentation)
- `apps/storybook-react/`    – Storybook for React
- `apps/storybook-angular/`  – Storybook for Angular
- `apps/docs/`               – Docs site

## Build & Dev Commands

### Setup workspace

```
npm install
```

### Build everything

```
npm run build
```

### Storybook

React:

```
npm run storybook -w @layerone/storybook-react
```

Angular:

```
npm run storybook -w @layerone/storybook-angular
```

### Docs

```
npm run dev -w @layerone/docs
```

## Component Standards

All components must:
- Use CSS variables from tokens (no hardcoded values)
- Support analytics hooks
- Be mobile-friendly by default
- Respect accessibility (ARIA roles, keyboard nav)
- Provide stories in Storybook

## Testing & CI

### Run tests across packages

```
npm run test
```

### Lint

```
npm run lint
```

### Types & Build Checks

```
npm run build --if-present
```

## Naming conventions

- Components: PascalCase
- Tokens: kebab-case with prefix (`color-primary`, `spacing-md`)
- Packages: `@layerone/<name>`

## Pull Request Requirements

When AI generates a PR:
- Include a clear description of changes
- Ensure all tests pass
- Add or update Storybook stories
- Do not break existing packages without justification
