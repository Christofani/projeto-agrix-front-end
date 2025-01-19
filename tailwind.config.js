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
      screens: {
        'sm-390': '390px', // Novo breakpoint para 370px
      },
      lineClamp: { // Adiciona um valor específico para line-clamp
        10: '10', // Define a classe `line-clamp-10`
      },
    },
  },
  plugins: [],
}
