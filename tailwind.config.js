/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // PMF Brand Colors from the Manual de Marca
        pmf: {
          cyan: '#00B1EB',       // Cyan 80%
          'cyan-dark': '#0090c0',
          'cyan-light': '#4dd4ff',
          navy: '#003063',       // PANTONE 2756
          'navy-dark': '#001f42',
          'navy-light': '#004a8f',
          // Light theme additions
          'light-bg': '#f0f6ff',
          'light-surface': '#e6f0fb',
          'light-card': '#dceaf8',
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 3s infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(0, 177, 235, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(0, 177, 235, 0.6)' },
        }
      }
    },
  },
  plugins: [],
}
