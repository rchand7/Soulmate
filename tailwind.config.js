/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        playfair: "'Playfair Display', serif", // Adds a new `Play Fair` class
        roboto: "'Roboto', sans-serif", // Adds a new `Roboto` class
      },
    },
  },
  plugins: [],
}