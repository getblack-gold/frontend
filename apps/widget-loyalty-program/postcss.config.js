module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    '@skipper-hospitality/postcss-rem-to-em-plugin': {},
  },
}
