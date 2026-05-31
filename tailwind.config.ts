import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        farm: {
          green: '#2E7D32',
          'green-light': '#81C784',
          yellow: '#FDD835',
          orange: '#FF8F00',
          bg: '#FAFFF6',
          text: '#1A1A1A',
        },
      },
      fontFamily: {
        sans: ['var(--font-noto-hebrew)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-noto-hebrew)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        hero: ['3.5rem', { lineHeight: '1.1', fontWeight: '800' }],
      },
      borderRadius: {
        card: '1.25rem',
        pill: '999px',
      },
      boxShadow: {
        soft: '0 4px 20px rgba(0,0,0,0.08)',
        'soft-lg': '0 10px 40px rgba(0,0,0,0.12)',
      },
      keyframes: {
        'scroll-x': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
