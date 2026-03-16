import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          DEFAULT: "#6C13AB",
          50: "#f5eeff",
          100: "#ead9ff",
          200: "#d4b3ff",
          300: "#b880ff",
          400: "#9c4dff",
          500: "#8020f5",
          600: "#6C13AB",
          700: "#560f88",
          800: "#420c68",
          900: "#2e0848",
          950: "#1a0428",
        },
        green: {
          DEFAULT: "#0DD621",
          50: "#e8fff0",
          100: "#c2ffd2",
          200: "#88ffaa",
          300: "#3dff72",
          400: "#0DD621",
          500: "#09b81b",
          600: "#079116",
          700: "#066e12",
          800: "#055610",
          900: "#03400c",
          950: "#012707",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Cal Sans", "Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out 2s infinite",
        "float-slow": "float 8s ease-in-out 1s infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "gradient-shift": "gradient-shift 8s ease infinite",
        "scroll-indicator": "scroll-indicator 2s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(108, 19, 171, 0.4)" },
          "50%": { boxShadow: "0 0 40px rgba(13, 214, 33, 0.6)" },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "scroll-indicator": {
          "0%, 100%": { transform: "translateY(0)", opacity: "1" },
          "50%": { transform: "translateY(8px)", opacity: "0.5" },
        },
      },
      backgroundSize: {
        "200%": "200% 200%",
      },
      boxShadow: {
        "glow-purple": "0 0 30px rgba(108, 19, 171, 0.5)",
        "glow-green": "0 0 30px rgba(13, 214, 33, 0.5)",
        "card": "0 4px 24px rgba(0,0,0,0.08)",
        "card-dark": "0 4px 24px rgba(0,0,0,0.4)",
      },
    },
  },
  plugins: [],
};

export default config;
