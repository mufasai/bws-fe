<<<<<<< HEAD
/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
      "node_modules/flowbite/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-solid/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [
    require('flowbite/plugin')
  ],
} 

=======
/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
      "node_modules/flowbite/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-solid/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [
    require('flowbite/plugin')
  ],
} 

>>>>>>> 6f6949f4938d86ba0e2c06119519abfba8adc3d1
