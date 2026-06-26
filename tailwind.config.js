/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        forsythia: '#FFC801',
        saffron:   '#FF9932',
        expedition:'#114C5A',
        noir:      '#172B36',
        arctic:    '#F1F6F4',
        mint:      '#D9E8E2',
        base:      '#0B1B24',
      },
      animation: {
        'blob-a':    'blob-a 14s ease-in-out infinite',
        'blob-b':    'blob-b 18s ease-in-out infinite',
        'blob-c':    'blob-c 22s ease-in-out infinite',
        'float':     'float 6s ease-in-out infinite',
        'scan':      'scan 3s linear infinite',
        'pulse-ring':'pulse-ring 1.8s ease-out infinite',
        'fade-up':   'fade-up 0.7s ease forwards',
        'marquee':   'marquee 30s linear infinite',
      },
      keyframes: {
        'blob-a': {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '33%':     { transform: 'translate(40px,-30px) scale(1.08)' },
          '66%':     { transform: 'translate(-20px,20px) scale(0.95)' },
        },
        'blob-b': {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '33%':     { transform: 'translate(-50px,25px) scale(1.06)' },
          '66%':     { transform: 'translate(30px,-15px) scale(0.97)' },
        },
        'blob-c': {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '50%':     { transform: 'translate(20px,40px) scale(1.04)' },
        },
        'float': {
          '0%,100%': { transform: 'translateY(0px) rotate(1deg)' },
          '50%':     { transform: 'translateY(-14px) rotate(1deg)' },
        },
        'scan': {
          '0%':   { top: '0%' },
          '100%': { top: '100%' },
        },
        'pulse-ring': {
          '0%':   { transform: 'scale(0.8)', opacity: '0.9' },
          '100%': { transform: 'scale(1.8)', opacity: '0' },
        },
        'fade-up': {
          'from': { opacity: '0', transform: 'translateY(24px)' },
          'to':   { opacity: '1', transform: 'translateY(0)' },
        },
        'marquee': {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}