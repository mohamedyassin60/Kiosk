/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        axiforma: ['Axiforma', 'Sans-serif']
      },
      colors: {
        newGreen: '#1ed761'
      }
    }
  },
  plugins: []
}
