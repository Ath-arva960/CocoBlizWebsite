/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Deep tropical dark tones (primary background)
        ink: {
          50: '#f7f5f0',
          100: '#e8e4d9',
          200: '#d4ccba',
          300: '#b0a890',
          400: '#807860',
          500: '#5a5444',
          600: '#3e3a2e',
          700: '#2a2820',
          800: '#1a1814',
          900: '#0f0e0b',
          950: '#080705',
        },
        // Coconut cream / ivory tones
        cream: {
          50: '#fefdf9',
          100: '#fdf9ef',
          200: '#f9f0d8',
          300: '#f2e4ba',
          400: '#e8d09a',
          500: '#d8b874',
        },
        // Palm green — primary brand accent
        palm: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        // Coconut husk brown — secondary warm tone
        husk: {
          50: '#faf6f0',
          100: '#f0e6d6',
          200: '#e0cbb0',
          300: '#c9a878',
          400: '#b88a4f',
          500: '#a67238',
          600: '#8c5c2e',
          700: '#6f4724',
          800: '#50331b',
          900: '#3a2615',
        },
        // Sunset gold — vibrant highlight
        gold: {
          300: '#fde68a',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        serif: ['"Instrument Serif"', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        sans: ['"Inter"', 'sans-serif'],
      },
      fontSize: {
        '10xl': ['10rem', { lineHeight: '0.9' }],
        '11xl': ['14rem', { lineHeight: '0.85' }],
        '12xl': ['18rem', { lineHeight: '0.8' }],
      },
      letterSpacing: {
        'ultra-tight': '-0.05em',
        'ultra-wide': '0.3em',
      },
      transitionTimingFunction: {
        expo: 'cubic-bezier(0.16, 1, 0.3, 1)',
        power: 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
      animation: {
        'marquee-left': 'marquee-left 30s linear infinite',
        'marquee-right': 'marquee-right 30s linear infinite',
        'spin-slow': 'spin 20s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'marquee-left': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-right': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
};
