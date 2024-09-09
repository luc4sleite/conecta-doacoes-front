/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      flexGrow: {
        3: '0.3'
      },
      height: {
        0.1: '1px'
      },
    },
  },
  plugins: [],
}
