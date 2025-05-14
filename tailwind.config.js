
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
              50: "#00358d",
              100: "#00358d",
              200: "#00358d",
              300: "#00358d",
              400: "#00358d",
              500: "#00358d",
              600: "#00358d",
              700: "#00358d",
              800: "#00358d",
              900: "#00358d",
              DEFAULT: "#00358d",
            },
          },
        },
        dark: {
          colors: {
            primary: {
              50: "#00358d",
              100: "#00358d",
              200: "#00358d",
              300: "#00358d",
              400: "#00358d",
              500: "#00358d",
              600: "#00358d",
              700: "#00358d",
              800: "#00358d",
              900: "#00358d",
              DEFAULT: "#00358d",
            },
          },
        },
      },
    }),
  ],
};
