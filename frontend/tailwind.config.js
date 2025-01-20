/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  ttheme: {
    extend: {
      colors: {
        'blue-green': '#4CAF50',
        'light-blue': '#ADD8E6',
        'positive-green': '#2ECC71',
        'negative-red': '#E74C3C',
        'warning-yellow': '#F7DC6F',
        'light-gray': '#F2F2F2',
        'dark-gray': '#333333',
      },
    },
  },
  variants: {},
  plugins: [],
}