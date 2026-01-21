/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './src/**/*.stories.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Generic color variables that work with both brands
        // These are defined in tailwind.css and automatically resolve to the correct brand
        primary: {
          lightest: 'var(--color-primary-lightest)',
          lighter: 'var(--color-primary-lighter)',
          light: 'var(--color-primary-light)',
          default: 'var(--color-primary-default)',
          dark: 'var(--color-primary-dark)',
          darker: 'var(--color-primary-darkest)',
          darkest: 'var(--color-primary-darkest)',
          'aaa-text': 'var(--color-primary-aaa-text)',
          'aaa-surface': 'var(--color-primary-aaa-surface)',
        },
        // Secondary colors
        secondary: {
          default: 'var(--color-secondary-default)',
          dark: 'var(--color-secondary-dark)',
          darker: 'var(--color-secondary-darker)',
          darkest: 'var(--color-secondary-darkest)',
        },
        // Tertiary colors
        tertiary: {
          lighter: 'var(--color-tertiary-lighter)',
          light: 'var(--color-tertiary-light)',
          default: 'var(--color-tertiary-default)',
          dark: 'var(--color-tertiary-dark)',
          darker: 'var(--color-tertiary-darker)',
        },
        // Accent colors
        accent: {
          default: 'var(--color-accent-default)',
        },
        // Semantic colors
        success: {
          light: 'var(--color-success-light)',
          default: 'var(--color-success-default)',
          dark: 'var(--color-success-dark)',
        },
        error: {
          light: 'var(--color-error-light)',
          default: 'var(--color-error-default)',
          dark: 'var(--color-error-dark)',
        },
        warning: {
          light: 'var(--color-warning-light)',
          default: 'var(--color-warning-default)',
          dark: 'var(--color-warning-dark)',
        },
        info: {
          light: 'var(--color-info-light)',
          default: 'var(--color-info-default)',
          dark: 'var(--color-info-dark)',
        },
        // Neutral colors
        neutral: {
          lightest: 'var(--color-neutral-lightest)',
          lighter: 'var(--color-neutral-lighter)',
          light: 'var(--color-neutral-light)',
          default: 'var(--color-neutral-default)',
          dark: 'var(--color-neutral-dark)',
          darker: 'var(--color-neutral-darker)',
          darkest: 'var(--color-neutral-darkest)',
          black: 'var(--color-neutral-black)',
          white: 'var(--color-neutral-white)',
          'white-10': 'var(--color-neutral-white-10)',
          'white-20': 'var(--color-neutral-white-20)',
          'white-30': 'var(--color-neutral-white-30)',
          'white-50': 'var(--color-neutral-white-50)',
          'white-80': 'var(--color-neutral-white-80)',
          'black-10': 'var(--color-neutral-black-10)',
          'black-20': 'var(--color-neutral-black-20)',
          'black-30': 'var(--color-neutral-black-30)',
          'black-40': 'var(--color-neutral-black-40)',
          'black-50': 'var(--color-neutral-black-50)',
          'black-80': 'var(--color-neutral-black-80)',
        },
        // Primitives - Brand colors (Orange for BrandA, Cherry for BrandB)
        orange: {
          50: 'var(--primitivesDefaultColourBrandBrandAOrange50)',
          100: 'var(--primitivesDefaultColourBrandBrandAOrange100)',
          200: 'var(--primitivesDefaultColourBrandBrandAOrange200)',
          300: 'var(--primitivesDefaultColourBrandBrandAOrange300)',
          400: 'var(--primitivesDefaultColourBrandBrandAOrange400)',
          default: 'var(--primitivesDefaultColourBrandBrandAOrangeDefault)',
          600: 'var(--primitivesDefaultColourBrandBrandAOrange600)',
          700: 'var(--primitivesDefaultColourBrandBrandAOrange700)',
          800: 'var(--primitivesDefaultColourBrandBrandAOrange800)',
        },
        // Primitives - Green
        green: {
          50: 'var(--primitivesDefaultColourBrandBrandAGreen50)',
          100: 'var(--primitivesDefaultColourBrandBrandAGreen100)',
          200: 'var(--primitivesDefaultColourBrandBrandAGreen200)',
          300: 'var(--primitivesDefaultColourBrandBrandAGreen300)',
          400: 'var(--primitivesDefaultColourBrandBrandAGreen400)',
          default: 'var(--primitivesDefaultColourBrandBrandAGreenDefault)',
          600: 'var(--primitivesDefaultColourBrandBrandAGreen600)',
          700: 'var(--primitivesDefaultColourBrandBrandAGreen700)',
          800: 'var(--primitivesDefaultColourBrandBrandAGreen800)',
        },
        // Primitives - Grey
        grey: {
          100: 'var(--primitivesDefaultColourGrey100)',
          200: 'var(--primitivesDefaultColourGrey200)',
          300: 'var(--primitivesDefaultColourGrey300)',
          400: 'var(--primitivesDefaultColourGrey400)',
          500: 'var(--primitivesDefaultColourGrey500)',
          600: 'var(--primitivesDefaultColourGrey600)',
          700: 'var(--primitivesDefaultColourGrey700)',
          800: 'var(--primitivesDefaultColourGrey800)',
          900: 'var(--primitivesDefaultColourGrey900)',
          1000: 'var(--primitivesDefaultColourGrey1000)',
        },
        // Primitives - Red
        red: {
          100: 'var(--primitivesDefaultColourRed100)',
          200: 'var(--primitivesDefaultColourRed200)',
          300: 'var(--primitivesDefaultColourRed300)',
          400: 'var(--primitivesDefaultColourRed400)',
          500: 'var(--primitivesDefaultColourRed500)',
          600: 'var(--primitivesDefaultColourRed600)',
          700: 'var(--primitivesDefaultColourRed700)',
          800: 'var(--primitivesDefaultColourRed800)',
          900: 'var(--primitivesDefaultColourRed900)',
        },
        // Primitives - Black & White
        black: {
          100: 'var(--primitivesDefaultColourBlack100)',
          200: 'var(--primitivesDefaultColourBlack200)',
          300: 'var(--primitivesDefaultColourBlack300)',
          400: 'var(--primitivesDefaultColourBlack400)',
          500: 'var(--primitivesDefaultColourBlack500)',
          600: 'var(--primitivesDefaultColourBlack600)',
          700: 'var(--primitivesDefaultColourBlack700)',
          800: 'var(--primitivesDefaultColourBlack800)',
          900: 'var(--primitivesDefaultColourBlack900)',
          1000: 'var(--primitivesDefaultColourBlack1000)',
        },
        white: {
          100: 'var(--primitivesDefaultColourWhite100)',
          200: 'var(--primitivesDefaultColourWhite200)',
          300: 'var(--primitivesDefaultColourWhite300)',
          400: 'var(--primitivesDefaultColourWhite400)',
          500: 'var(--primitivesDefaultColourWhite500)',
          600: 'var(--primitivesDefaultColourWhite600)',
          700: 'var(--primitivesDefaultColourWhite700)',
          800: 'var(--primitivesDefaultColourWhite800)',
          900: 'var(--primitivesDefaultColourWhite900)',
          1000: 'var(--primitivesDefaultColourWhite1000)',
        },
      },
      fontFamily: {
        body: 'var(--primitivesDefaultFontBrandBrandAFontFamilyBody)',
        heading: 'var(--primitivesDefaultFontBrandBrandAFontFamilyHeading)',
        inter: ['Inter', 'sans-serif'],
      },
      fontWeight: {
        light: '300',
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
    },
  },
  plugins: [],
}

