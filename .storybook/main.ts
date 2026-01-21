import type { StorybookConfig } from '@storybook/preact-vite';
import { mergeConfig } from 'vite';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-themes"
  ],
  "framework": "@storybook/preact-vite",
  async viteFinal(config) {
    return mergeConfig(config, {
      css: {
        postcss: {
          plugins: [
            tailwindcss,
            autoprefixer,
          ],
        },
      },
    });
  },
};
export default config;