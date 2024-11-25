/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'login-form-bg': "url('../public/SHOPPINGMAN_DARKER.png')",  // Correct path for the public folder
      },
    },
  },
  plugins: [],
}

