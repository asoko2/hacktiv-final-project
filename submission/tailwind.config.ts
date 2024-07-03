import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      colors: {
        primary: {
          100: "#C9DCFC",
          200: "#95B7F9",
          300: "#5F8CEF",
          400: "#3867E0",
          500: "#0034CC",
          600: "#0028AF",
          700: "#001D92",
          800: "#001476",
          900: "#000E61",
        },
        success: {
          100: "#EEFBD0",
          200: "#DAF7A4",
          300: "#B8E772",
          400: "#94CF4C",
          500: "#66AF1C",
          600: "#4F9614",
          700: "#3B7D0E",
          800: "#296508",
          900: "#1D5305",
        },
        info: {
          100: "#C9FCF7",
          200: "#95F9F7",
          300: "#5FE8EF",
          400: "#38CBE0",
          500: "#00A3CC",
          600: "#007FAF",
          700: "#005F92",
          800: "#004476",
          900: "#003161",
        },
        warning: {
          100: "#FEF3CC",
          200: "#FDE399",
          300: "#FBCD66",
          400: "#F7B840",
          500: "#F29704",
          600: "#D07902",
          700: "#AE5E02",
          800: "#8C4601",
          900: "#743600",
        },
        danger: {
          100: "#FDE1D0",
          200: "#FBBBA1",
          300: "#F58C72",
          400: "#EC614E",
          500: "#E01F18",
          600: "#C0111A",
          700: "#A10C20",
          800: "#810722",
          900: "#6B0423",
        },
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    function ({ addUtilities }: any) {
      addUtilities({
        ".hide-scrollbar": {
          /* Firefox */
          "scrollbar-width": "none",
          /* Safari and Chrome */
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
      });
    },
  ],
} satisfies Config;

export default config;
