import { defineConfig } from 'vite';
import { resolve } from 'path';
import handlebars from 'vite-plugin-handlebars';

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
  },
  plugins: [
    handlebars({
      compileOptions: {
        preventIndent: true,
      },
      partialDirectory: resolve(__dirname, 'src/partials'),
    }),
  ],
});
