import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';

export default defineConfig({
  build: {
    minify: false,
    outDir: 'build',
    emptyOutDir: false,
    lib: {
      name: 'obsidian-js',
      formats: ['cjs'],
      entry: resolve(__dirname, 'src/main.ts'),
      fileName: 'main',
    },
    rollupOptions: {
      external: ['obsidian'],
      output: {
        entryFileNames: 'main.js',
        globals: {
          obsidian: 'obsidian',
        },
      },
    },
  },
  plugins: [react()],
});
