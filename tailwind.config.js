/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#6c47ff",
        background: "#f5f3ff",
        text: "#1a1333",
        icon: "#7c3aed",
        border: "#e0e7ff",
        card: "#ede9fe",
      },
    },
  },
  plugins: [],
};
