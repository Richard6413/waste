/** @type {import('tailwindcss').Config} */

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],

  theme: {
    extend: {
      colors: {
        brand: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },

        accent: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
        },

        navy: {
          950: '#07111f',
          900: '#0b1727',
          800: '#102033',
          700: '#172b42',
          600: '#243b53',
        },
      },

      fontFamily: {
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'sans-serif',
        ],
      },

      boxShadow: {
        'saas-xs':
          '0 1px 2px rgba(15,23,42,0.04)',

        'saas-sm':
          '0 2px 8px rgba(15,23,42,0.045)',

        'saas-md':
          '0 8px 24px rgba(15,23,42,0.06)',

        'saas-lg':
          '0 18px 45px rgba(15,23,42,0.08)',
      },

      borderRadius: {
        xl: '0.75rem',
        '2xl': '1rem',
        '3xl': '1.25rem',
      },
    },
  },

  plugins: [],
}