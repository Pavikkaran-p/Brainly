/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      brain_color: {
        300: "#e0e7fe",
        500: "#3e38a7",
        600: "#5046e4"
      },
      gray: {
        100: "#eeeeef",
        200: "#ebe9ed",
        600: "#95989c"
      },
      purple: {
        200: "#d9ddee",
        500: "#9492db",
        600: "#7164c0",
      }
    },
  },
  plugins: [],
}