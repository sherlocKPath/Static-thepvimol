/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        tvmBlue: '#004a99',
        tvmYellow: '#ffcc00',
      }
    },
  },
  plugins: [],
}