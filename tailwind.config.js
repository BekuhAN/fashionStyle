const { heroui } = require("@heroui/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    heroui({
      defaultTheme: "light",
      themes: {
        light: {
          colors: {
            primary: {
              50: "#a8741a",
              100: "#a8741a",
              200: "#a8741a",
              300: "#a8741a",
              400: "#a8741a",
              500: "#a8741a",
              600: "#a8741a",
              700: "#a8741a",
              800: "#a8741a",
              900: "#a8741a",
              DEFAULT: "#a8741a",
            },
          },
        },
        dark: {
          colors: {
            primary: {
              50: "#a8741a",
              100: "#a8741a",
              200: "#a8741a",
              300: "#a8741a",
              400: "#a8741a",
              500: "#a8741a",
              600: "#a8741a",
              700: "#a8741a",
              800: "#a8741a",
              900: "#a8741a",
              DEFAULT: "#a8741a",
            },
          },
        },
      },
    }),
  ],
};
