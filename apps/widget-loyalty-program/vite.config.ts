import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
// import devtools from 'solid-devtools/vite';

export default defineConfig({
  plugins: [
    /* 
    Uncomment the following line to enable solid-devtools.
    For more info see https://github.com/thetarnav/solid-devtools/tree/main/packages/extension#readme
    */
    // devtools(),
    solidPlugin(),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        dir: '../shopify-app/extensions/widget-loyalty-ui/assets',
        entryFileNames: '[name]-[hash].js',
        assetFileNames: '[name]-[hash][extname]',
        chunkFileNames: '[name]-[hash].js',
      },
    },
  },
})
