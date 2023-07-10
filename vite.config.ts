import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    outDir: "build",
    emptyOutDir: false,
    lib: {
      name: "obsidian-js",
      formats: ["es"],
      entry: resolve(__dirname, "src/main.ts"),
      fileName: "main",
    },
    rollupOptions: {
      external: ["obsidian"],
      output: {
        globals: {
          obsidian: "obsidian",
        },
      },
    },
  },
});
