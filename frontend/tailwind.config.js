/** @type {import('tailwindcss').Config} */



// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background:   '#1e1e1e',
        card:         '#2a2a2a',
        accent:       '#8f5ed3',
        'accent-hover':'#7d4fc4',
        text:         '#e0e0e0',
        'input-bg':   '#333',
        'input-border':'#444',
        error:        '#ff6b6b',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        serif: ['"Abril Fatface"', 'serif'],
      },
    },
  },
  plugins: [],
}
