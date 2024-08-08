import { orange, zinc } from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./src/**/*.tsx", "./index.html"],
  theme: {
    extend: {
      colors: {
        primary: zinc,
        secondary: orange,
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
