import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    minify: false,
    outDir: "build",
    emptyOutDir: false,
    lib: {
      name: "obsidian-js",
      formats: ["cjs"],
      entry: resolve(__dirname, "src/main.ts"),
      fileName: "main",
    },
    rollupOptions: {
      external: ["obsidian"],
      output: {
        entryFileNames: "main.js",
        globals: {
          obsidian: "obsidian",
        },
      },
    },
  },
});
