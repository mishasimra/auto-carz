/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ember: {
          500: "#ef232d",
          600: "#cc121d",
          700: "#9a0a12"
        }
      },
      boxShadow: {
        glow: "0 0 60px rgba(239, 35, 45, 0.28)",
        panel: "0 30px 70px rgba(0, 0, 0, 0.45)"
      },
      backgroundImage: {
        "hero-grid":
          "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
        noise:
          "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.06) 0, transparent 35%), radial-gradient(circle at 80% 0%, rgba(239,35,45,0.08) 0, transparent 30%)"
      },
      keyframes: {
        drift: {
          "0%, 100%": { transform: "translate3d(0, 0, 0) scale(1)" },
          "50%": { transform: "translate3d(18px, -12px, 0) scale(1.06)" }
        }
      },
      animation: {
        drift: "drift 10s ease-in-out infinite"
      }
    }
  },
  plugins: []
};
