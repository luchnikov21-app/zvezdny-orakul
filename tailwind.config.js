/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cosmic: '#0a0a1f',
        gold: '#f5c242',
        purple: '#6b21a8',
      }
    }
  }
}