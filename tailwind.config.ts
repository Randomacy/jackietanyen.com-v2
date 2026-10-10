import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'terminal-bg':      '#0d0d0d',
        'terminal-surface': '#141414',
        'terminal-border':  '#2a2a2a',
        'terminal-text':    '#d4d4d4',
        'terminal-body':    '#bdbdbd', // long-form reading text
        'terminal-dim':     '#999999', // ≥ 6.5:1 on the surface colour
        'terminal-accent':  '#e53e3e',
        'terminal-green':   '#22c55e',
        'terminal-yellow':  '#eab308',
        'terminal-gray':    '#8b919c', // ≥ 5.5:1 on the surface colour
        'terminal-blue':    '#6699cc',
      },
      fontFamily: {
        mono: ['var(--font-mono)', 'JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      animation: {
        blink: 'blink 1s step-end infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config
