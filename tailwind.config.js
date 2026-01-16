/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#e53935", // Hot Red
          gold: "#f7b500", // Golden Glaze
          black: "#111111", // Charred Black
          paper: "#fff1b8", // Light Base
        }
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        heading: ["Teko", "sans-serif"],
      }
    },
  },
  plugins: [],
}
