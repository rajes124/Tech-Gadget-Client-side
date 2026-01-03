/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // এটা perfect আছে
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")], // daisyui add করো যদি না থাকে
};