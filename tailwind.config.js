/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: { sans: ["Inter", "system-ui", "sans-serif"] },
      colors: {
        brand: {
          navy: "#183057",
          ink: "#15172c",
          deep: "#114e84",
          blue: "#3271d7",
          royal: "#2022b0",
          indigo: "#4339c0",
          sky: "#90c2ee",
          mist: "#e6e6f7",
          pale: "#d9e6fb",
          side: "#2d62bb",
        },
      },
      boxShadow: {
        card: "0px 7px 16px rgba(87,74,148,0.16)",
        soft: "0px 4px 12px rgba(51,51,89,0.13)",
      },
    },
  },
  plugins: [],
};
