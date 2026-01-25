/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      keyframes: {
        "slide-up-fade": {
          "0%": { transform: "translateY(200px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "slide-down-fade": {
          "0%": { transform: "translateY(-100px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        'wave': {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '15%': { transform: 'rotate(20deg)' },
          '30%': { transform: 'rotate(-10deg)' },
          '45%': { transform: 'rotate(15deg)' },
          '60%': { transform: 'rotate(-5deg)' },
          '75%': { transform: 'rotate(0deg)' },
        },
        'fade-in-nav': {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out",
        "slide-up-fade":
          "slide-up-fade 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        "slide-down-fade-delayed":
          "slide-down-fade 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.3s both",
        'wave': 'wave 1s ease-in-out infinite',
        'fade-in-nav': 'fade-in-nav 0.3s ease-out both',
      },
    },
  },
  plugins: [],
};
