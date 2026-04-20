import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        vastraa: {
          white: '#FAF9F6',
          ink: '#1C1C1C',
          clay: '#C65D3B',
          beige: '#E8E2D8',
          green: '#4A7C59',
          black: '#0c0c0c',
          surface: '#121212',
        },
        primary: {
          DEFAULT: '#C65D3B',
          foreground: '#FAF9F6',
        },
        secondary: {
          DEFAULT: '#ffffff',
          foreground: '#0c0c0c',
        },
        background: '#0c0c0c',
        foreground: '#ffffff',
        border: 'rgba(255, 255, 255, 0.1)',
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'serif'],
        sans: ['var(--font-dmsans)', 'sans-serif'],
        hindi: ['var(--font-yatra)', 'cursive'],
      },
      borderRadius: {
        card: '16px',
        button: '8px',
        full: '999px',
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
