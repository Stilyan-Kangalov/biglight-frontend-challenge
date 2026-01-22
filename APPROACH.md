# Technical Approach Documentation

This document outlines the technical decisions, architecture, and workflow used to build this multi-brand component library.

## Table of Contents

1. [AI-Assisted Development](#ai-assisted-development)
2. [Design-to-Code Workflow](#design-to-code-workflow)
3. [Token Management](#token-management)
4. [Theme Switching](#theme-switching)
5. [Token Update Process](#token-update-process)
6. [Testing](#testing)
7. [What I Would Do Differently](#what-we-would-do-differently)
8. [Trade-offs and Limitations](#trade-offs-and-limitations)

---

## AI-Assisted Development

This project was built using **Cursor** (AI-integrated IDE) and **Gemini 2.0 Flash** as architectural thought partners. AI was leveraged throughout the development process to accelerate implementation while maintaining code quality and architectural consistency.

<details>
<summary><strong>How AI was Utilized</strong></summary>

#### 1. **Boilerplate Acceleration**
AI assisted in generating the initial component structures:
- `forwardRef` patterns for proper ref forwarding
- TypeScript interfaces and type definitions
- Component file structure (Card, Button, Input, Dropdown, LoginMagicLink, LoginDrawer)

**Example**: Rapid generation of consistent component skeletons with proper TypeScript typing and Preact patterns.

#### 2. **Style Mapping**
AI helped translate design specifications into code:
- Converting Figma hex codes to Tailwind arbitrary properties (`bg-[var(--btn-primary-bg)]`)
- Creating CVA (Class Variance Authority) variant structures
- Mapping design tokens to component-level CSS variables in `brands.css`

**Example**: Translating design token names like `mappedBrandASurfaceColourActionPrimary` into semantic component variables like `--btn-primary-bg`.

#### 3. **Documentation**
AI assisted in drafting technical documentation:
- This APPROACH.md file was drafted based on architectural decisions
- README.md structure and content
- Code comments and inline documentation

**Example**: Converting architectural decisions and implementation details into comprehensive, structured documentation.

</details>

<details>
<summary><strong>Benefits & Limitations</strong></summary>

### Benefits
- **Faster Iteration**: Reduced time on repetitive boilerplate code
- **Consistency**: AI helped maintain consistent patterns across components
- **Learning**: AI served as a coding partner, suggesting best practices and patterns
- **Documentation**: Comprehensive documentation that might otherwise be skipped

### Limitations
- **Architectural Decisions**: All architectural decisions were made by the developer
- **Code Review**: All AI-generated code was reviewed and validated
- **Custom Logic**: Complex business logic and token reference resolution required manual implementation

</details>

---

## Design-to-Code Workflow

Our workflow bridges the gap between design (Figma) and code through a structured token-based pipeline that ensures design consistency and developer efficiency.

<details>
<summary><strong>Step-by-Step Process</strong></summary>

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
The `build-tokens.js` script processes the exported JSON using **Style Dictionary** and **@tokens-studio/sd-transforms**.

**Process:**
1. Read `figma-tokens.json`
2. Fix References: Custom logic to resolve cross-token references
3. Filter by Brand: Separates tokens into brand-specific files
4. Transform to CSS: Converts JSON tokens to CSS custom properties
5. Generate Files: Creates `brand-booker-tokens.css` and `brand-venus-tokens.css`

<details>
<summary><strong>Key Code Example</strong></summary>

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

</details>

#### 4. **Component Variable Mapping**
The `src/styles/brands.css` file creates an abstraction layer that maps generic component variables to brand-specific design tokens.

**Why This Layer?**
- Components don't need to know about brand-specific token names
- Easy to swap token mappings without changing component code
- Enables brand-agnostic component development

<details>
<summary><strong>Example Mapping</strong></summary>

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

</details>

#### 5. **Component Implementation**
Components consume the mapped variables through CSS custom properties.

<details>
<summary><strong>Button Component Example</strong></summary>

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

</details>

#### 6. **Documentation & Testing**
**Storybook** provides visual documentation, interactive playground, accessibility testing, and component API documentation.

</details>

---

## Token Management

Our token architecture follows a three-tier hierarchy: **Primitives → Alias → Mapped**.

<details>
<summary><strong>Token Structure Details</strong></summary>

#### Tier 1: Primitives
**Location**: `Primitives/Default/` in JSON

Base, reusable values that are brand-agnostic:
- Colors: `Grey.100`, `Grey.500`, `Grey.900`
- Typography: Font families, weights, sizes
- Spacing: Base unit scales
- Borders: Radius values

<details>
<summary><strong>Example</strong></summary>

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

</details>

#### Tier 2: Alias Tokens
**Location**: `Alias colours/BrandA` or `Alias colours/BrandB`

Semantic naming that references primitives:
- `PrimaryDefault` → Points to brand-specific color
- `NeutralDark` → Points to grey scale
- `ErrorDefault` → Points to error color

<details>
<summary><strong>Example</strong></summary>

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

</details>

#### Tier 3: Mapped Tokens
**Location**: `Mapped/BrandA` or `Mapped/BrandB`

Component-specific semantic tokens:
- `SurfaceColourActionPrimary` → Button primary background
- `TextColourActionOnPrimary` → Button primary text
- `BorderColourPassive` → Input border

<details>
<summary><strong>Example</strong></summary>

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

</details>

</details>

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

- **Design Tokens** (from Figma): PascalCase, descriptive (e.g., `mappedBrandASurfaceColourActionPrimary`)
- **Component Variables** (in brands.css): Kebab-case, semantic (e.g., `--btn-primary-bg`)

**Rationale**: Component variables are easier to read and remember for developers, while design tokens maintain their original naming from the design system.

---

## Theme Switching

Theme switching is achieved through **CSS class-based context switching**:

```jsx
<div className="brand-booker">
  <Button variant="primary">Booker Style</Button>
</div>

<div className="brand-venus">
  <Button variant="primary">Venus Style</Button>
</div>
```

<details>
<summary><strong>How It Works</strong></summary>

1. **CSS Variable Scoping**: Each brand's tokens are scoped to a class selector
2. **Component Variables Inherit**: Component variables reference brand tokens
3. **Components Consume**: Components use component variables

<details>
<summary><strong>CSS Example</strong></summary>

```css
.brand-booker {
  --mappedBrandASurfaceColourActionPrimary: #4dc2a7;
  --btn-primary-bg: var(--mappedBrandASurfaceColourActionPrimary);
}

.brand-venus {
  --mappedBrandBSurfaceColourActionPrimary: #901438;
  --btn-primary-bg: var(--mappedBrandBSurfaceColourActionPrimary);
}
```

</details>

</details>

### Advantages
- ✅ No JavaScript required - Pure CSS solution
- ✅ Instant switching - No re-renders needed
- ✅ CSS cascade - Natural inheritance
- ✅ Performance - No bundle size impact

### Limitations
- ❌ Static switching - Requires page reload/remount
- ❌ No runtime switching - Can't dynamically switch without re-rendering
- ❌ Class dependency - Components must be wrapped in brand class

<details>
<summary><strong>Alternative Approaches Considered</strong></summary>

1. **CSS-in-JS with Theme Provider**: Rejected due to bundle size and runtime overhead
2. **CSS Custom Properties with Data Attributes**: Similar approach but less semantic
3. **Separate CSS Files per Brand**: Rejected due to code duplication

</details>

---

## Token Update Process

### Scenario: Designer Updates Primary Color in Figma

<details>
<summary><strong>Complete Workflow</strong></summary>

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

</details>

<details>
<summary><strong>Example: Primary Color Change</strong></summary>

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

</details>

<details>
<summary><strong>Automation Opportunities</strong></summary>

**Current State**: Manual process
- Developer runs `node build-tokens.js`
- Commits updated CSS files

**Production Improvements**:
1. **CI/CD Integration**: Auto-run on token file changes
2. **Git Hooks**: Pre-commit hook to regenerate tokens
3. **Watch Mode**: Auto-regenerate on file save during development
4. **Designer Workflow**: Direct integration with Figma API (future)

</details>

---

## Testing

Testing in this project focuses on **interaction testing** using Storybook's play functions, ensuring components behave correctly from a user's perspective.

<details>
<summary><strong>Interaction Testing with Storybook</strong></summary>

### Approach

We use **Storybook's play functions** combined with **@testing-library/preact** and **@testing-library/user-event** to write interaction tests that run directly in Storybook's browser environment.

**Why This Approach?**
- Tests run in a real browser environment (not JSDOM)
- Visual feedback in Storybook's Interactions panel
- Tests are co-located with component stories
- No separate test runner setup needed

### Implementation Example

The `LoginMagicLink` component includes interaction tests that verify:

1. **Initial State**: Continue button is disabled on initial render
2. **Form Validation**: Continue button enables after selecting customer type and entering valid email
3. **Clear Functionality**: Continue button disables again after clearing email input

<details>
<summary><strong>Code Example</strong></summary>

```typescript
// LoginMagicLink.stories.tsx
export const Booker: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // Test Case 1: Continue button disabled initially
    const continueButton = canvas.getByRole('button', { name: /continue/i });
    if (!continueButton.disabled) {
      throw new Error('Continue button should be disabled on initial render');
    }

    // Test Case 2: Enable button after form completion
    const dropdownButton = canvas.getAllByRole('button')
      .find(btn => btn.getAttribute('aria-haspopup') === 'listbox');
    await user.click(dropdownButton);
    const option = await canvas.findByText('Retail Store Owner');
    await user.click(option);
    
    const emailInput = canvas.getByRole('textbox');
    await user.type(emailInput, 'test@example.com');
    
    if (continueButton.disabled) {
      throw new Error('Continue button should be enabled');
    }

    // Test Case 3: Disable after clearing
    const clearButton = canvas.getByRole('button', { name: /clear input/i });
    await user.click(clearButton);
    
    if (!continueButton.disabled) {
      throw new Error('Continue button should be disabled after clearing');
    }
  },
};
```

</details>

### Running Tests

Tests run automatically when viewing a story in Storybook:
1. Navigate to the component story (e.g., `LoginMagicLink > Booker`)
2. Open the **Interactions** tab at the bottom
3. Tests execute automatically and show pass/fail status
4. Click on each step to see what happened during the test

</details>

<details>
<summary><strong>Accessibility Testing</strong></summary>

### Input Component Fix

During interaction test implementation, I identified and fixed an accessibility issue in the `Input` component:

**Problem**: Labels were not properly associated with input elements, causing:
- A11y violations: "Every form field needs an associated label"
- Testing library errors: `getByLabelText` couldn't find associated inputs
- Screen reader issues: Labels not announced when inputs are focused

**Solution**: Properly associate labels with inputs using:
- `useId()` hook to generate unique IDs
- `htmlFor` attribute on label elements
- `id` attribute on input elements

<details>
<summary><strong>Code Example</strong></summary>

```typescript
// Input.tsx
export const Input = forwardRef<HTMLInputElement, InputProps>(({ label, ...props }, ref) => {
  const inputId = useId(); // Generate unique ID
  
  return (
    <div>
      <label htmlFor={inputId}>
        {label}
      </label>
      <input
        id={inputId}
        {...props}
      />
    </div>
  );
});
```

</details>

**Result**:
- ✅ A11y errors resolved
- ✅ `getByLabelText` works correctly in tests
- ✅ Screen readers properly announce labels
- ✅ Better keyboard navigation support

</details>

<details>
<summary><strong>Testing Dependencies</strong></summary>

**Packages Used**:
- `@testing-library/preact@^3.2.4`: DOM query utilities for Preact
- `@testing-library/user-event@^14.6.1`: User interaction simulation

**Why Not @storybook/test?**
- `@storybook/test` version 10.x doesn't exist (latest is 8.6.14)
- Using testing-library directly provides better compatibility
- More control over test implementation

</details>

<details>
<summary><strong>Future Testing Improvements</strong></summary>

**Current State**: Basic interaction tests for one component

**Production Improvements Needed**:
1. **Unit Tests**: Component logic, utilities, token transformations
2. **Visual Regression**: Screenshot comparison for all components
3. **Accessibility Tests**: Automated a11y checks for all components
4. **Cross-Browser Testing**: Test in multiple browsers
5. **Performance Tests**: Component render times, bundle sizes
6. **E2E Tests**: Full user flows (if applicable)

</details>

---

## What I Would Do Differently

<details>
<summary><strong>With More Time</strong></summary>

1. **Automated Token Sync**: Figma API integration for automatic token sync
2. **Token Validation**: Schema validation, type checking, reference validation
3. **Component Token Mapping Documentation**: Auto-generated mapping documentation
4. **Runtime Theme Switching**: React Context + dynamic CSS variable injection
5. **Token Versioning**: Semantic versioning for token changes

</details>

<details>
<summary><strong>With Different Tools</strong></summary>

1. **CSS-in-JS Solution** (Styled Components / Emotion)
   - Better TypeScript integration, theme provider pattern
   - Trade-off: Larger bundle size, runtime overhead

2. **Sass/SCSS Variables**
   - Better tooling, mixins, functions
   - Trade-off: Build-time only, no runtime flexibility

3. **Design Tokens Package (npm)**
   - Versioned, shareable across projects
   - Trade-off: Additional dependency management

4. **Style Dictionary CLI**
   - More configuration options, better error handling
   - Trade-off: Additional setup complexity

</details>

<details>
<summary><strong>In a Production Environment</strong></summary>

1. **Type Safety for Tokens**: Generate TypeScript types from tokens
2. **Token Testing**: Unit tests, visual regression, accessibility tests
3. **Performance Optimization**: Critical CSS extraction, lazy-loading, tree-shaking
4. **Documentation Site**: ✅ Storybook is deployed to GitHub Pages (auto-generated from Storybook). Could add token explorer for enhanced documentation
5. **Designer-Developer Collaboration**: Automated design review, token change notifications
6. **Error Handling**: Graceful fallbacks, validation, error boundaries
7. **Accessibility First**: Automatic contrast checking, WCAG compliance validation

</details>

---

## Trade-offs and Limitations

<details>
<summary><strong>Current Limitations</strong></summary>

#### 1. **Manual Token Sync**
- **Issue**: Tokens must be manually exported from Figma
- **Impact**: Risk of design-code drift, requires developer intervention
- **Mitigation**: Clear documentation, regular sync schedule

#### 2. **No Runtime Theme Switching**
- **Issue**: Brand switching requires component remount or page reload
- **Impact**: Can't build theme switcher UI
- **Mitigation**: Acceptable for most use cases (single brand per page)

#### 3. **Reference Resolution Complexity**
- **Issue**: Custom logic to fix broken references
- **Impact**: Fragile dependency on token export format
- **Mitigation**: Well-documented logic, monitor Tokens Studio updates

#### 4. **Limited Type Safety**
- **Issue**: CSS variables are strings, no TypeScript validation
- **Impact**: Typos only caught at runtime, no autocomplete
- **Mitigation**: Consistent naming, linting rules

#### 5. **Brand-Specific Token Filtering**
- **Issue**: Some duplication in generated files
- **Impact**: Larger CSS bundle than necessary
- **Mitigation**: Primitives are shared, CSS minification helps

#### 6. **No Token Validation**
- **Issue**: Invalid tokens may not be caught until runtime
- **Impact**: Broken styles in production
- **Mitigation**: Manual review, visual testing in Storybook

#### 7. **Component Variable Mapping is Manual**
- **Issue**: `brands.css` requires manual updates when new tokens are added
- **Impact**: Easy to miss new tokens, inconsistency risk
- **Mitigation**: Clear documentation, code review process

</details>

<details>
<summary><strong>Architectural Trade-offs</strong></summary>

#### CSS Variables vs. CSS-in-JS
**Chosen**: CSS Variables
- ✅ Zero runtime overhead, works with any framework, easy to debug
- ❌ No TypeScript integration, no compile-time validation

#### Class-Based vs. Context-Based Theming
**Chosen**: Class-Based
- ✅ Simple, no JavaScript needed, works with SSR, better performance
- ❌ No runtime switching, requires wrapper elements

#### Single File vs. Modular Token Files
**Chosen**: Single file per brand
- ✅ Simple import structure, all tokens in one place
- ❌ Larger files, harder to tree-shake

</details>

<details>
<summary><strong>What's Not Production-Ready</strong></summary>

1. **Error Handling**: No fallbacks for missing tokens, no validation, silent failures possible
2. **Performance**: All brand tokens loaded even if only one brand is used, no code splitting
3. **Testing**: No automated tests for token transformations, no visual regression tests
4. **Documentation**: Storybook is deployed to GitHub Pages as the documentation site ✅, but token mapping not auto-documented, no migration guides
5. **Developer Experience**: No TypeScript types for tokens, no autocomplete, manual mapping

**Production Fixes Needed:**
- Add validation layer, error boundaries, fallback values
- Dynamic imports, critical CSS extraction, brand-specific bundles
- Unit tests, visual regression, automated accessibility tests
- Auto-generated token mapping docs, token explorer, change logs
- Type generation, IDE plugins, auto-mapping

</details>

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

**Key Strengths:**
- **Simplicity**: Easy to understand and maintain
- **Flexibility**: Supports multiple brands with minimal code duplication
- **Designer-Friendly**: Direct integration with Figma/Tokens Studio
- **Developer-Friendly**: Clear separation of concerns

The main areas for future enhancement focus on automation, type safety, and production-grade reliability.
