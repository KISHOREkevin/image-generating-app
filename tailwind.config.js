/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:"#EEEEEE",
        secondary:"#508C9B",
        tertiary:"#134B70",
        final:"#201E43"
      }
    },
  },
  plugins: [],
}

