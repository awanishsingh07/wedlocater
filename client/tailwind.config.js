// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gold: "#d4af37",
        darkBrown: "#2c1a14",
        lightChampagne: "#f8e9c0",
        richBrown: "#3b221a",
      },
      fontFamily: {
        serif: ["Merriweather", "serif"],
        elegant: ["Playfair Display", "serif"],
      },
    },
  },
  plugins: [],
};
