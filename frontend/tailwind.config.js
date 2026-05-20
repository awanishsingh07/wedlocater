/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        ivory: "#FAF7F2",
        cream: "#F5EFE4",
        maroon: "#6B0F1A",
        "maroon-dark": "#4E0A13",
        gold: "#C9A84C",
        "gold-light": "#E2C97E",
        "gold-dark": "#A8872D",
        dark: "#2B2B2B",
        muted: "#7A7065",
      },

      fontFamily: {
        heading: ["Cormorant Garamond", "serif"],
        body: ["Inter", "sans-serif"],
      },

      borderRadius: {
        luxury: "24px",
      },

      boxShadow: {
        luxury: "0 8px 25px rgba(0,0,0,0.08)",
        "luxury-md": "0 15px 40px rgba(0,0,0,0.12)",
        maroon: "0 8px 20px rgba(107,15,26,.3)",
        gold: "0 8px 20px rgba(201,168,76,.3)",
      },

      transitionTimingFunction: {
        luxury: "cubic-bezier(0.25,0.46,0.45,0.94)",
      },

      spacing: {
        section: "7rem",
        "section-sm": "4rem",
      },

      fontSize: {
        "display-xl": ["5rem", { lineHeight: "1" }],
        "display-lg": ["4rem", { lineHeight: "1.1" }],
        "display-md": ["3rem", { lineHeight: "1.2" }],
        "display-sm": ["2rem", { lineHeight: "1.3" }],
      },

      backgroundImage: {
        "gold-gradient":
          "linear-gradient(to right,#C9A84C,#E2C97E,#A8872D)",

        "hero-overlay":
          "linear-gradient(rgba(0,0,0,.35), rgba(0,0,0,.35))",
      }
    },
  },

  plugins: [],
};