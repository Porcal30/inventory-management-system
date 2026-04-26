/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#0F172A",
        surface: "#111827",
        glass: "rgba(255,255,255,0.08)",
        primary: "#6366F1",
        accent: "#22D3EE",
        success: "#22C55E",
        danger: "#EF4444",
        warning: "#F59E0B",
      },
      boxShadow: {
        glow: "0 0 30px rgba(99, 102, 241, 0.35)",
        cyanGlow: "0 0 30px rgba(34, 211, 238, 0.25)",
      },
      borderRadius: {
        premium: "1.5rem",
      },
    },
  },
  plugins: [],
};