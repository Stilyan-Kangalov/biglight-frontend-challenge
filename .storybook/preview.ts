import type { Preview } from '@storybook/preact-vite';

// Import brand token CSS files (must be imported first)
import '../src/styles/generated/brand-booker-tokens.css';
import '../src/styles/generated/brand-venus-tokens.css';

// Import brand-specific component variables
import '../src/styles/brands.css';

// Import Tailwind CSS (must be imported after brand tokens)
import '../src/styles/tailwind.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    },
  },
};

export default preview;