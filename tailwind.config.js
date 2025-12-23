/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: { 
    extend: {
      colors: {
        lmBg: 'var(--lm-bg)',
        lmBg2: 'var(--lm-bg-2)',
        lmInk: 'var(--lm-ink)',
        lmMuted: 'var(--lm-muted)',
        lmAccent: 'var(--lm-accent)',
        lmBorder: 'var(--lm-border)',
      }
    } 
  },
  plugins: [],
};