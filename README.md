# LayerOne Design System

LayerOne is a multi-framework design system focused on consistent visual language, accessibility, and developer ergonomics across React and Angular. It ships design tokens, a theme package, shared primitives/utilities, and UI component libraries, with Storybook and Docs apps for exploration and documentation.

## What This Repo Contains
LayerOne is a monorepo with shared packages and app shells:

**Packages**
- `@layerone-theme/tokens` – design tokens & token builders
- `@layerone-theme/theme` – theme generator & CSS output
- `@layerone-theme/utils` – utilities (classnames, focus helpers, analytics)
- `@layerone-theme/primitives` – shared primitives
- `@layerone-theme/ui-react` – React components
- `@layerone-theme/ui-angular` – Angular components
- `@layerone-theme/charts` – cross-framework chart helpers

**Apps**
- `@layerone-theme/storybook-react` – React Storybook
- `@layerone-theme/storybook-angular` – Angular Storybook
- `@layerone-theme/docs` – Docs site (Next.js)

## Local Development
Install dependencies once:
```bash
npm install
```

Run the docs app:
```bash
npm run dev -w @layerone-theme/docs
```

Run Storybooks:
```bash
npm run storybook -w @layerone-theme/storybook-react
npm run storybook -w @layerone-theme/storybook-angular
```

Build everything:
```bash
npm run build
```

## Design System Conventions
- Tokens are the source of truth. Components should use CSS variables from tokens.
- Components are accessible by default (ARIA roles, keyboard nav).
- Mobile-friendly layouts are required.
- All components should ship with Storybook stories.

## Publishing
This repo uses Changesets for versioning.

```bash
npm run changeset
npm run changeset:version
npm run changeset:publish
```
