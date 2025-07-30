/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',   // scan all your React components
    './public/index.html',           // scan your HTML entry
  ],
  theme: {
    extend: {},                      // preserve default theme
  },
  plugins: [],                       // add if you need forms, typography, etc.
};
