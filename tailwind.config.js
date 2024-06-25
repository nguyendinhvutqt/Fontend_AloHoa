import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      maxHeight: {
        wrapper: "min((100vh - 300px) - 60px, 734px)",
      },
      boxShadow: {
        wrapper: "rgb(0 0 0 / 12%) 0 2px 12px",
      },
    },
  },
  plugins: [daisyui],
};
