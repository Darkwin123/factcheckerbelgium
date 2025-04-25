/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';

const config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './mdx-components.tsx',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '100%',
            color: 'var(--foreground)',
            a: {
              color: '#2563eb',
              '&:hover': {
                color: '#1e40af',
              },
            },
          },
        },
      },
    },
  },
  plugins: [
    typography,
    // Note: Your @tailwindcss/postcss string plugin needs to be imported properly for ESM
  ],
};

export default config;