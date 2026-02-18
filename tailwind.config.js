/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cosmic: '#0a0a1f',
        deep: '#1a0033',
        neonGold: '#f5c242',
        neonPurple: '#c026d3',
      },
      boxShadow: {
        'gold': '0 0 25px #f5c242',
        'purple': '0 0 25px #c026d3',
      }
    }
  }
}