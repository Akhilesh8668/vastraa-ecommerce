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
        },
        // Mapping for shadcn if needed
        primary: {
          DEFAULT: '#C65D3B', // clay
          foreground: '#FAF9F6',
        },
        secondary: {
          DEFAULT: '#1C1C1C', // ink
          foreground: '#FAF9F6',
        },
        background: '#FAF9F6',
        foreground: '#1C1C1C',
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
        hindi: ['var(--font-yatra)', 'cursive'],
      },
      borderRadius: {
        none: '0',
      },
    },
  },
  plugins: [],
};
export default config;
