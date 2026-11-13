/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#172033',
        muted: '#667085',
        navy: '#10233f',
        coral: '#f4785a',
        mint: '#dff6e9',
        lavender: '#ecebff',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        panel: '0 12px 40px rgba(27, 45, 80, 0.06)',
      },
    },
  },
  plugins: [],
}
