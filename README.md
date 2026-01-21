# Biglight Component Library

A multi-brand design system built with Preact, Tailwind CSS, and Storybook. This project demonstrates a scalable approach to building UI components that support multiple brand themes while sharing the same codebase.

![Login Magic Link Component - Booker Brand](./docs/login-magic-link-booker.png)

> 📖 **Want to understand our technical approach?** Read our comprehensive [**APPROACH.md**](./APPROACH.md) documentation covering design-to-code workflow, token management, theme switching, and more.

## Overview

This component library implements a **design token-driven architecture** that allows the same components to render differently based on brand context. The system supports two brands:

- **Booker (Brand A)** - Features teal/orange color palette with Inter font
- **Venus (Brand B)** - Features cherry/burgundy color palette with Open Sans font

## Key Features

- **Multi-brand theming** - Components automatically adapt to brand context via CSS variables
- **Design token integration** - Figma tokens exported and mapped to CSS custom properties
- **Accessible components** - WCAG-compliant with keyboard navigation and ARIA attributes
- **Type-safe** - Built with TypeScript for better developer experience
- **Storybook documentation** - Interactive component playground with all states documented

## Components

| Component | Description |
|-----------|-------------|
| **Button** | Primary, secondary, and tertiary variants with hover/disabled states |
| **Card** | Promotional card with title and CTA button |
| **Dropdown** | Accessible select component with floating label |
| **Input** | Text input with validation states (error, success) |
| **LoginMagicLink** | Composite login form combining all components |
| **LoginDrawer** | Slide-over panel containing the login form |

## Architecture

```
src/
├── components/           # UI components
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.styles.ts    # CVA variants
│   │   ├── Button.types.ts
│   │   └── Button.stories.tsx
│   └── ...
├── styles/
│   ├── brands.css              # Brand-to-token mappings
│   ├── tailwind.css            # Tailwind + CSS variable definitions
│   └── generated/              # Auto-generated design tokens
│       ├── brand-booker-tokens.css
│       └── brand-venus-tokens.css
└── tokens/
    └── figma-tokens.json       # Source design tokens
```

### Theming Approach

Components use generic CSS variables (e.g., `--btn-primary-bg`) that are mapped to brand-specific design tokens in `brands.css`:

```css
.brand-booker {
  --btn-primary-bg: var(--mappedBrandASurfaceColourActionPrimary);
}

.brand-venus {
  --btn-primary-bg: var(--mappedBrandBSurfaceColourActionPrimary);
}
```

To switch brands, wrap components in a container with the brand class:

```jsx
<div className="brand-booker">
  <Button variant="primary">Booker Style</Button>
</div>

<div className="brand-venus">
  <Button variant="primary">Venus Style</Button>
</div>
```

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
# Install dependencies
npm install

# Start Storybook
npm run storybook

# Run development server
npm run dev
```

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite development server |
| `npm run build` | Build for production |
| `npm run storybook` | Start Storybook on port 6006 |
| `npm run build-storybook` | Build static Storybook |
| `npm run test` | Run tests |
| `node build-tokens.js` | Regenerate CSS tokens from Figma export |

## Tech Stack

- **Framework**: [Preact](https://preactjs.com/) - Lightweight React alternative
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [CVA](https://cva.style/) for variant management
- **Documentation**: [Storybook](https://storybook.js.org/) 8.x
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: TypeScript, CSS, JavaScript, HTML

## Design Tokens

Design tokens are exported from Figma and transformed into CSS custom properties using [Style Dictionary](https://amzn.github.io/style-dictionary/) with [Tokens Studio](https://tokens.studio/) transforms.

### Token Pipeline

1. **Source**: `src/tokens/figma-tokens.json` - Export from Figma/Tokens Studio
2. **Transform**: `build-tokens.js` - Processes and generates brand-specific CSS
3. **Generated**: `src/styles/generated/brand-*-tokens.css` - Auto-generated CSS variables
4. **Mapped**: `src/styles/brands.css` - Component-level variable mappings
5. **Consumed**: Component styles via `var(--token-name)`

### Updating Design Tokens

When you receive updated design tokens from Figma:

1. **Export tokens** from Figma using Tokens Studio plugin
2. **Replace** the file at `src/tokens/figma-tokens.json` with the new export
3. **Run the build script** to regenerate CSS variables:

```bash
node build-tokens.js
```

4. **Verify** the generated files in `src/styles/generated/`:
   - `brand-booker-tokens.css` - Brand A (Booker) variables
   - `brand-venus-tokens.css` - Brand B (Venus) variables

### How the Build Script Works

The `build-tokens.js` script:

- Reads the Figma tokens JSON file
- Fixes cross-references between token sets (Primitives, Alias, Mapped)
- Generates separate CSS files for each brand
- Wraps variables in brand-specific class selectors (`.brand-booker`, `.brand-venus`)
- Filters out tokens from other brands to keep files clean

### Adding a New Brand

To add a third brand, update `build-tokens.js`:

```javascript
const brands = [
  { name: 'brand-booker', tokenKey: 'BrandA' },
  { name: 'brand-venus', tokenKey: 'BrandB' },
  { name: 'brand-new', tokenKey: 'BrandC' }  // Add new brand
];
```

Then add the corresponding token mappings in `src/styles/brands.css`.

## Accessibility

All components are built with accessibility in mind:

- Keyboard navigation support
- Focus management (auto-focus on drawer open)
- ARIA attributes for screen readers
- Visible focus indicators
- Color contrast compliance

## License

MIT
