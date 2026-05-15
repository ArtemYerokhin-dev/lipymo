/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper:     '#F7F2E9',
        cream:     '#EDE2CC',
        oat:       '#D5C5A8',
        snow:      '#FFFFFF',
        brick:     '#8C3D22',
        'brick-d': '#6B2D16',
        brown: {
          DEFAULT: '#1E1108',
          m:       '#4A2C18',
          l:       '#8A6A52',
        },
        ink: '#100A04',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans:  ['"Inter"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '10': '10px',
        '11': '11px',
      },
      letterSpacing: {
        widest2: '0.2em',
        widest3: '0.3em',
      },
      boxShadow: {
        card:  '0 2px 16px rgba(30,17,8,0.07)',
        'card-hover': '0 8px 32px rgba(30,17,8,0.13)',
        drawer: '−20px 0 60px rgba(30,17,8,0.18)',
      },
      animation: {
        'badge-spin': 'rotateBadge 20s linear infinite',
        'badge-text': 'rotateBadge 20s linear infinite reverse',
        fadeUp:   'fadeUp .65s ease both',
        slideUp:  'slideUp .25s ease both',
      },
      keyframes: {
        rotateBadge: { to: { transform: 'rotate(360deg)' } },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backdropBlur: { sm: '8px', md: '14px' },
      borderRadius: {
        card: '12px',
      },
    },
  },
  plugins: [],
}
