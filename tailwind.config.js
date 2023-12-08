/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      height: {
        18: "60px",
        fit: "calc(100vh - 60px)",
      },
      width: {
        max_mobile_width: "calc(100dvw - 50px)",
        max_tablet_width: "calc(100dvw - 70px)",
      },
      maxWidth: {
        max_mobile_p_width: "calc(100dvw - 50px - 2rem)",
        max_tablet_p_width: "calc(100dvw - 70px - 2rem)",
      },
      colors: {
        purple_light: "rgb(231 219 255)",
        purple_semibold: "rgb(216 193 251)",
        purple_bold: "rgb(210 180 247)",
        purple_bolder: "rgb(188 113 251)",
      },
    },
  },
  plugins: [import("flowbite/plugin")],
};
