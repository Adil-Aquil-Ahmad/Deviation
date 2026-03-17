/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-base": "#0b0f0f",
        "moss-deep": "#2e4d3b",
        "moss-mid": "#4a7c59",
        "moss-light": "#a0c2ae",
        "teal-accent": "#0f9e99",
        "lush-glow": "rgba(15, 158, 153, 0.15)",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
      borderWidth: {
        3: "3px",
      },
    },
  },
  plugins: [],
}

