import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,css,md,mdx,html,json,scss}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        neutral: {
          1: 'hsl(0, 0%, 99.0%)',
          2: 'hsl(0, 0%, 97.3%)',
          3: 'hsl(0, 0%, 95.1%)',
          4: 'hsl(0, 0%, 93.0%)',
          5: 'hsl(0, 0%, 90.9%)',
          6: 'hsl(0, 0%, 88.7%)',
          7: 'hsl(0, 0%, 85.8%)',
          8: 'hsl(0, 0%, 78.0%)',
          9: 'hsl(0, 0%, 56.1%)',
          10: 'hsl(0, 0%, 52.3%)',
          11: 'hsl(0, 0%, 43.5%)',
          12: 'hsl(0, 0%, 9.0%)',
        },
      },
    },
  },
  plugins: [],
}

export default config
