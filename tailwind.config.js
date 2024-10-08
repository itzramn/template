/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f9fafa',
          100: '#edf1f9',
          200: '#d8dcf3',
          300: '#b3b8e1',
          400: '#8d8ec9',
          500: '#716ab2',
          600: '#5b4e96',
          700: '#443a73',
          800: '#2e274e',
          900: '#1a182f',
        },
        secondary: {
          100: '#f8f8f8',
          200: '#f1f1f1',
          300: '#e9e9e9',
          400: '#dcdcdc',
          500: '#d0d0d0',
          600: '#c6c6c6',
          700: '#b6b6b6',
          800: '#a6a6a6',
          900: '#8f8f8f',
        },
        success: {
          100: '#f0fdf4',
          200: '#dcfce7',
          300: '#bbf7d0',
          400: '#86efac',
          500: '#4ade80',
          600: '#22c55e',
          700: '#16a34a',
          800: '#15803d',
          900: '#166534',
        },
        danger: {
          100: '#fff5f5',
          200: '#fed7d7',
          300: '#feb2b2',
          400: '#fc8181',
          500: '#f56565',
          600: '#e53e3e',
          700: '#c53030',
          800: '#9b2c2c',
          900: '#742a2a',
        },
        warning: {
          100: '#fffaf0',
          200: '#fef3c7',
          300: '#fde68a',
          400: '#fcd34d',
          500: '#fbbf24',
          600: '#f59e0b',
          700: '#d97706',
          800: '#b45309',
          900: '#92400e',
        },
        info: {
          100: '#f0f9ff',
          200: '#e0f2fe',
          300: '#bae6fd',
          400: '#7dd3fc',
          500: '#38bdf8',
          600: '#0ea5e9',
          700: '#0284c7',
          800: '#0369a1',
          900: '#075985',
        },
        light: {
          100: '#f8f9fa',
          200: '#e9ecef',
          300: '#dee2e6',
          400: '#ced4da',
          500: '#adb5bd',
          600: '#868e96',
          700: '#495057',
          800: '#343a40',
          900: '#212529',
        },
        dark: {
          100: '#f8f9fa',
          200: '#e9ecef',
          300: '#ced4da',
          400: '#adb5bd',
          500: '#868e96',
          600: '#495057',
          700: '#343a40',
          800: '#212529',
          900: '#121519',
        },
        black: {
          500: '#0F1108',
          600: '#0A0B07',
          900: '#000000',
        },
      },
    },
  },
  plugins: [],
};
