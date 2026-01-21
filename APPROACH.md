# Technical Approach Documentation

This document outlines the technical decisions, architecture, and workflow used to build this multi-brand component library.

## Table of Contents

1. [Design-to-Code Workflow](#design-to-code-workflow)
2. [Token Management](#token-management)
3. [Theme Switching](#theme-switching)
4. [Token Update Process](#token-update-process)
5. [What We Would Do Differently](#what-we-would-do-differently)
6. [Trade-offs and Limitations](#trade-offs-and-limitations)

---

## Design-to-Code Workflow

### Overview

Our workflow bridges the gap between design (Figma) and code through a structured token-based pipeline that ensures design consistency and developer efficiency.

### Step-by-Step Process

#### 1. **Design Token Definition (Figma)**

Designers use the **Tokens Studio for Figma** plugin to define design tokens directly in Figma:

- **Primitives**: Base color values, typography scales, spacing units
- **Alias Tokens**: Semantic naming (e.g., `primary`, `error`, `neutral-dark`)
- **Mapped Tokens**: Brand-specific mappings (e.g., `BrandA` uses teal, `BrandB` uses cherry)

**Example Structure in Figma:**
```
Primitives/
  └── Default/
      └── Colour/
          └── Grey/
              ├── 100: #f5f5f5
              ├── 500: #767676
              └── 900: #1a1a1a

Alias colours/
  └── BrandA/
      └── PrimaryDefault: {Primitives.Default.Colour.BrandA.Orange.Default}
  └── BrandB/
      └── PrimaryDefault: {Primitives.Default.Colour.BrandB.Cherry.Default}

Mapped/
  └── BrandA/
      └── SurfaceColourActionPrimary: {Alias colours/BrandA.PrimaryDefault}
```

#### 2. **Token Export**

Designers export tokens from Tokens Studio as a JSON file:
- Export format: Tokens Studio JSON
- File location: `src/tokens/figma-tokens.json`
- Contains all token definitions with references and metadata

#### 3. **Token Transformation**

The `build-tokens.js` script processes the exported JSON:

**Technologies Used:**
- **Style Dictionary**: Core transformation engine
- **@tokens-studio/sd-transforms**: Handles Tokens Studio-specific formats

**Process:**
1. **Read** `figma-tokens.json`
2. **Fix References**: The script includes custom logic to resolve cross-token references that may be broken during export
3. **Filter by Brand**: Separates tokens into brand-specific files
4. **Transform to CSS**: Converts JSON tokens to CSS custom properties
5. **Generate Files**: Creates `brand-booker-tokens.css` and `brand-venus-tokens.css`

**Key Code:**
```javascript
// Register Tokens Studio transforms
register(StyleDictionary);

const sd = new StyleDictionary({
  source: [tokensPath],
  preprocessors: ['tokens-studio'],
  platforms: {
    css: {
      transformGroup: 'tokens-studio',
      filter: (token) => {
        // Filter tokens for specific brand
        return token.path.includes(brand.tokenKey);
      },
      options: {
        selector: `.${brand.name}` // Wraps in .brand-booker or .brand-venus
      }
    }
  }
});
```

#### 4. **Component Variable Mapping**

The `src/styles/brands.css` file creates an abstraction layer:

**Purpose**: Maps generic component variables to brand-specific design tokens

**Example:**
```css
.brand-booker {
  --btn-primary-bg: var(--mappedBrandASurfaceColourActionPrimary);
  --btn-primary-text: var(--mappedBrandATextColourActionOnPrimary);
}

.brand-venus {
  --btn-primary-bg: var(--mappedBrandBSurfaceColourActionPrimary);
  --btn-primary-text: var(--mappedBrandBTextColourActionOnPrimary);
}
```

**Why This Layer?**
- Components don't need to know about brand-specific token names
- Easy to swap token mappings without changing component code
- Enables brand-agnostic component development

#### 5. **Component Implementation**

Components consume the mapped variables:

**Example - Button Component:**
```typescript
// Button.styles.ts
export const buttonVariants = cva(
  'rounded-[var(--btn-radius)] ...',
  {
    variants: {
      variant: {
        primary: 'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)]',
        // ...
      }
    }
  }
);
```

**Benefits:**
- Components are brand-agnostic
- Styling is centralized through CSS variables
- Easy to test different brands by changing parent class

#### 6. **Documentation & Testing**

**Storybook** provides:
- Visual documentation of all component states
- Interactive playground for both brands
- Accessibility testing integration
- Component API documentation

---

## Token Management

### Token Structure

Our token architecture follows a three-tier hierarchy:

#### Tier 1: Primitives
**Location**: `Primitives/Default/` in JSON

Base, reusable values that are brand-agnostic:
- Colors: `Grey.100`, `Grey.500`, `Grey.900`
- Typography: Font families, weights, sizes
- Spacing: Base unit scales
- Borders: Radius values

**Example:**
```json
{
  "Primitives": {
    "Default": {
      "Colour": {
        "Grey": {
          "500": {
            "value": "#767676"
          }
        }
      }
    }
  }
}
```

#### Tier 2: Alias Tokens
**Location**: `Alias colours/BrandA` or `Alias colours/BrandB`

Semantic naming that references primitives:
- `PrimaryDefault` → Points to brand-specific color
- `NeutralDark` → Points to grey scale
- `ErrorDefault` → Points to error color

**Example:**
```json
{
  "Alias colours": {
    "BrandA": {
      "PrimaryDefault": {
        "value": "{Primitives.Default.Colour.BrandA.Orange.Default}"
      }
    }
  }
}
```

#### Tier 3: Mapped Tokens
**Location**: `Mapped/BrandA` or `Mapped/BrandB`

Component-specific semantic tokens:
- `SurfaceColourActionPrimary` → Button primary background
- `TextColourActionOnPrimary` → Button primary text
- `BorderColourPassive` → Input border

**Example:**
```json
{
  "Mapped": {
    "BrandA": {
      "SurfaceColourActionPrimary": {
        "value": "{Alias colours/BrandA.PrimaryDefault}"
      }
    }
  }
}
```

### Token Consumption Flow

```
Figma Tokens (JSON)
    ↓
build-tokens.js
    ↓
brand-*-tokens.css (CSS Variables)
    ↓
brands.css (Component Variables)
    ↓
Components (Tailwind/CSS)
```

### Variable Naming Convention

**Design Tokens** (from Figma):
- PascalCase: `mappedBrandASurfaceColourActionPrimary`
- Descriptive: Indicates brand, category, and purpose

**Component Variables** (in brands.css):
- Kebab-case: `--btn-primary-bg`
- Semantic: Describes component and property

**Rationale**: Component variables are easier to read and remember for developers, while design tokens maintain their original naming from the design system.

---

## Theme Switching

### Implementation

Theme switching is achieved through **CSS class-based context switching**:

```jsx
// Wrap components in brand class
<div className="brand-booker">
  <Button variant="primary">Booker Style</Button>
</div>

<div className="brand-venus">
  <Button variant="primary">Venus Style</Button>
</div>
```

### How It Works

1. **CSS Variable Scoping**: Each brand's tokens are scoped to a class selector:

```css
.brand-booker {
  --mappedBrandASurfaceColourActionPrimary: #4dc2a7;
  /* ... all Booker tokens */
}

.brand-venus {
  --mappedBrandBSurfaceColourActionPrimary: #901438;
  /* ... all Venus tokens */
}
```

2. **Component Variables Inherit**: Component variables reference brand tokens:

```css
.brand-booker {
  --btn-primary-bg: var(--mappedBrandASurfaceColourActionPrimary);
}

.brand-venus {
  --btn-primary-bg: var(--mappedBrandBSurfaceColourActionPrimary);
}
```

3. **Components Consume**: Components use component variables:

```css
.button-primary {
  background-color: var(--btn-primary-bg);
}
```

### Advantages

- **No JavaScript Required**: Pure CSS solution, no runtime overhead
- **Instant Switching**: No re-renders or state management needed
- **CSS Cascade**: Natural inheritance through the DOM tree
- **Performance**: No JavaScript bundle size impact

### Limitations

- **Static Switching**: Requires page reload or component remount to change brand
- **No Runtime Switching**: Can't dynamically switch brands without re-rendering
- **Class Dependency**: Components must be wrapped in brand class

### Alternative Approaches Considered

1. **CSS-in-JS with Theme Provider**: Rejected due to bundle size and runtime overhead
2. **CSS Custom Properties with Data Attributes**: Similar approach but less semantic
3. **Separate CSS Files per Brand**: Rejected due to code duplication

---

## Token Update Process

### Scenario: Designer Updates Primary Color in Figma

Here's the complete workflow when design tokens change:

#### Step 1: Designer Updates Figma
- Designer modifies `PrimaryDefault` color in Tokens Studio
- Change propagates through all references (buttons, cards, etc.)

#### Step 2: Export Updated Tokens
- Designer exports new `figma-tokens.json`
- File replaces `src/tokens/figma-tokens.json`

#### Step 3: Regenerate CSS Variables
```bash
node build-tokens.js
```

**What Happens:**
- Script reads updated JSON
- Processes and fixes references
- Generates new `brand-booker-tokens.css` and `brand-venus-tokens.css`
- Overwrites existing files

#### Step 4: Verify Changes
- Check generated CSS files for updated values
- Run Storybook to visually verify components
- Test both brands to ensure no regressions

#### Step 5: Component Updates (If Needed)

**Usually NOT needed** because:
- Components use abstract variables (`--btn-primary-bg`)
- `brands.css` maps these to design tokens
- Design tokens are auto-generated

**May be needed if:**
- New tokens are added (need to add mappings in `brands.css`)
- Token structure changes significantly
- Component logic needs to adapt to new token values

### Example: Primary Color Change

**Before:**
```css
/* brand-booker-tokens.css */
.brand-booker {
  --mappedBrandASurfaceColourActionPrimary: #4dc2a7; /* Teal */
}
```

**After Designer Changes to Orange:**
```css
/* brand-booker-tokens.css */
.brand-booker {
  --mappedBrandASurfaceColourActionPrimary: #fc4c02; /* Orange */
}
```

**Components Automatically Update:**
- All buttons with `variant="primary"` now show orange
- No component code changes required
- Works across all components using `--btn-primary-bg`

### Automation Opportunities

**Current State**: Manual process
- Developer runs `node build-tokens.js`
- Commits updated CSS files

**Production Improvements**:
1. **CI/CD Integration**: Auto-run on token file changes
2. **Git Hooks**: Pre-commit hook to regenerate tokens
3. **Watch Mode**: Auto-regenerate on file save during development
4. **Designer Workflow**: Direct integration with Figma API (future)

---

## What We Would Do Differently

### With More Time

#### 1. **Automated Token Sync**
- **Current**: Manual export/import from Figma
- **Improvement**: Figma API integration for automatic token sync
- **Benefit**: Real-time updates, no manual steps

#### 2. **Token Validation**
- **Current**: No validation of token structure
- **Improvement**: Schema validation, type checking, reference validation
- **Benefit**: Catch errors before they reach components

#### 3. **Component Token Mapping Documentation**
- **Current**: Manual mapping in `brands.css`
- **Improvement**: Auto-generated mapping documentation
- **Benefit**: Clear visibility of which tokens map to which components

#### 4. **Runtime Theme Switching**
- **Current**: Static class-based switching
- **Improvement**: React Context + dynamic CSS variable injection
- **Benefit**: User can switch themes without page reload

#### 5. **Token Versioning**
- **Current**: No version tracking
- **Improvement**: Semantic versioning for token changes
- **Benefit**: Track breaking changes, rollback capability

### With Different Tools

#### 1. **CSS-in-JS Solution (Styled Components / Emotion)**
- **Why**: Better TypeScript integration, theme provider pattern
- **Trade-off**: Larger bundle size, runtime overhead
- **When to Use**: If dynamic theming is critical

#### 2. **Sass/SCSS Variables**
- **Why**: Better tooling, mixins, functions
- **Trade-off**: Build-time only, no runtime flexibility
- **When to Use**: If CSS preprocessing is acceptable

#### 3. **Design Tokens Package (npm)**
- **Why**: Versioned, shareable across projects
- **Trade-off**: Additional dependency management
- **When to Use**: Multi-repo architecture

#### 4. **Style Dictionary CLI**
- **Why**: More configuration options, better error handling
- **Trade-off**: Additional setup complexity
- **When to Use**: Enterprise-scale projects

### In a Production Environment

#### 1. **Type Safety for Tokens**
```typescript
// Generate TypeScript types from tokens
type TokenKey = 'btn-primary-bg' | 'btn-secondary-bg' | ...;
type TokenValue = string;

interface DesignTokens {
  [key: TokenKey]: TokenValue;
}
```

**Benefit**: Compile-time validation, autocomplete in IDE

#### 2. **Token Testing**
- Unit tests for token transformations
- Visual regression tests for component changes
- Accessibility tests for color contrast

#### 3. **Performance Optimization**
- Critical CSS extraction per brand
- Lazy-load brand-specific CSS
- Tree-shaking unused tokens

#### 4. **Documentation Site**
- Auto-generated from Storybook
- Token explorer/visualizer
- Component usage guidelines
- Migration guides for token changes

#### 5. **Designer-Developer Collaboration**
- Design tokens as source of truth
- Automated design review process
- Token change notifications
- Design QA integration

#### 6. **Error Handling**
- Graceful fallbacks for missing tokens
- Token validation in development
- Production error boundaries

#### 7. **Accessibility First**
- Automatic contrast ratio checking
- Token-level accessibility metadata
- WCAG compliance validation

---

## Trade-offs and Limitations

### Current Limitations

#### 1. **Manual Token Sync**
**Issue**: Tokens must be manually exported from Figma and imported into codebase

**Impact**: 
- Risk of design-code drift
- Requires developer intervention
- No real-time sync

**Mitigation**: 
- Clear documentation of process
- Regular sync schedule
- Version control for token files

#### 2. **No Runtime Theme Switching**
**Issue**: Brand switching requires component remount or page reload

**Impact**:
- Can't build theme switcher UI
- Limited to static brand context

**Mitigation**:
- Acceptable for most use cases (single brand per page)
- Can be enhanced with React Context if needed

#### 3. **Reference Resolution Complexity**
**Issue**: `build-tokens.js` includes custom logic to fix broken references

**Impact**:
- Fragile dependency on token export format
- May break if Tokens Studio changes export structure
- Maintenance burden

**Mitigation**:
- Well-documented reference resolution logic
- Tests for common reference patterns
- Monitor Tokens Studio updates

#### 4. **Limited Type Safety**
**Issue**: CSS variables are strings, no TypeScript validation

**Impact**:
- Typos in variable names only caught at runtime
- No autocomplete for token names
- Refactoring is manual

**Mitigation**:
- Consistent naming conventions
- Linting rules
- Could add TypeScript generation (future)

#### 5. **Brand-Specific Token Filtering**
**Issue**: Each brand gets its own CSS file, but both include all primitives

**Impact**:
- Some duplication in generated files
- Larger CSS bundle than necessary

**Mitigation**:
- Primitives are shared, only brand tokens differ
- CSS minification reduces impact
- Could optimize with better filtering (future)

#### 6. **No Token Validation**
**Issue**: Invalid tokens (e.g., missing references) may not be caught until runtime

**Impact**:
- Broken styles in production
- Hard to debug

**Mitigation**:
- Manual review of generated CSS
- Visual testing in Storybook
- Could add validation step (future)

#### 7. **Component Variable Mapping is Manual**
**Issue**: `brands.css` requires manual updates when new tokens are added

**Impact**:
- Developer must know which tokens map to which components
- Easy to miss new tokens
- Inconsistency risk

**Mitigation**:
- Clear documentation
- Code review process
- Could auto-generate from component usage (future)

### Architectural Trade-offs

#### CSS Variables vs. CSS-in-JS

**Chosen**: CSS Variables
- ✅ Zero runtime overhead
- ✅ Works with any framework
- ✅ Easy to debug in DevTools
- ❌ No TypeScript integration
- ❌ No compile-time validation

#### Class-Based vs. Context-Based Theming

**Chosen**: Class-Based
- ✅ Simple, no JavaScript needed
- ✅ Works with server-side rendering
- ✅ Better performance
- ❌ No runtime switching
- ❌ Requires wrapper elements

#### Single File vs. Modular Token Files

**Chosen**: Single file per brand
- ✅ Simple import structure
- ✅ All tokens in one place
- ❌ Larger files
- ❌ Harder to tree-shake

### What's Not Production-Ready

#### 1. **Error Handling**
- No fallbacks for missing tokens
- No validation of token structure
- Silent failures possible

**Production Fix**: Add validation layer, error boundaries, fallback values

#### 2. **Performance**
- All brand tokens loaded even if only one brand is used
- No code splitting for brand-specific CSS
- Large CSS bundle

**Production Fix**: Dynamic imports, critical CSS extraction, brand-specific bundles

#### 3. **Testing**
- No automated tests for token transformations
- No visual regression tests
- Manual component testing only

**Production Fix**: Unit tests, visual regression, automated accessibility tests

#### 4. **Documentation**
- Token mapping not auto-documented
- Component token usage not tracked
- No migration guides

**Production Fix**: Auto-generated docs, token explorer, change logs

#### 5. **Developer Experience**
- No TypeScript types for tokens
- No autocomplete for CSS variables
- Manual token mapping

**Production Fix**: Type generation, IDE plugins, auto-mapping

### Honest Assessment

**This solution is excellent for:**
- ✅ Prototyping and MVP
- ✅ Design system exploration
- ✅ Multi-brand component libraries
- ✅ Design-to-code handoff

**This solution needs work for:**
- ⚠️ Large-scale production apps
- ⚠️ High-performance requirements
- ⚠️ Complex theming needs
- ⚠️ Enterprise-grade reliability

**Recommended Next Steps for Production:**
1. Add token validation and error handling
2. Implement TypeScript type generation
3. Add automated testing
4. Optimize CSS bundle size
5. Create comprehensive documentation
6. Set up CI/CD for token sync

---

## Conclusion

This approach successfully bridges design and code through a token-based architecture that enables multi-brand component development. While there are limitations and areas for improvement, the foundation is solid and can be enhanced incrementally as the project scales.

The key strengths are:
- **Simplicity**: Easy to understand and maintain
- **Flexibility**: Supports multiple brands with minimal code duplication
- **Designer-Friendly**: Direct integration with Figma/Tokens Studio
- **Developer-Friendly**: Clear separation of concerns

The main areas for future enhancement focus on automation, type safety, and production-grade reliability.
