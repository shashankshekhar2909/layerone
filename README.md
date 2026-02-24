# LayerOne Design System

LayerOne is a multi-framework design system with shared tokens, theming, and component libraries for React and Angular, plus Storybook and Docs apps.

## Packages
- `@layerone-theme/tokens` – design tokens & token builders
- `@layerone-theme/theme` – theme generator & CSS output
- `@layerone-theme/utils` – utilities (classnames, focus helpers, analytics)
- `@layerone-theme/primitives` – shared primitives
- `@layerone-theme/ui-react` – React components
- `@layerone-theme/ui-angular` – Angular components
- `@layerone-theme/charts` – cross-framework chart helpers

## Apps
- `@layerone-theme/storybook-react` – React Storybook
- `@layerone-theme/storybook-angular` – Angular Storybook
- `@layerone-theme/docs` – Docs site (Next.js)

## Quick Start
```bash
npm install
```

### Docs (local)
```bash
npm run dev -w @layerone-theme/docs
```

### Storybook (local)
```bash
npm run storybook -w @layerone-theme/storybook-react
npm run storybook -w @layerone-theme/storybook-angular
```

## Build
```bash
npm run build
```

## Publishing
This repo uses Changesets.

```bash
npm run changeset
npm run changeset:version
npm run changeset:publish
```
