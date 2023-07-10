import { defineConfig } from "vite";
import { resolve } from "path";

const name = "obsidian-js";
export default defineConfig({
  build: {
    outDir: "build",
    lib: {
      name,
      entry: resolve(__dirname, "src/main.ts"),
      fileName: (format) => `${name}.${format}.js`,
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
