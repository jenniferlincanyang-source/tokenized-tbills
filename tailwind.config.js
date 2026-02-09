/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'system-ui', 'sans-serif'],
      },
      colors: {
        bg: 'var(--bg)',
        'bg-card': 'var(--bg-card)',
        'bg-elevated': 'var(--bg-elevated)',
        border: 'var(--border)',
        accent: 'var(--accent)',
        'accent-dim': 'var(--accent-dim)',
        'accent-glow': 'var(--accent-glow)',
        success: 'var(--success)',
        'success-bg': 'var(--success-bg)',
        'text-muted': 'var(--text-muted)',
      },
    },
  },
  plugins: [],
}
