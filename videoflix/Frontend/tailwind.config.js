/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./apps/**/*.{html,ts,scss}", "./libs/**/*.{html,ts,scss}"],
  theme: {
    extend: {
      colors: {
        userColor: `rgb(var(--dynamic-color))`,
      }
    },
  },
  plugins: [],
}

