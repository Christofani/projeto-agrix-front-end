/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        quicksand: ['Quicksand', 'sans-serif'],
        lora: ['Lora', 'serif'],
        pacifico: ['Pacifico', 'cursive'],
      },
      width: {
        '65': '65%',
        '35': '35%',
      },
    },
  },
  plugins: [],
}

