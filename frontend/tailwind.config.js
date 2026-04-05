/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: '#0b0c10',
        terminal: '#1f2937',
        neonRed: '#ff2a2a',
        neonGreen: '#39ff14',
      }
    },
  },
  plugins: [],
}
