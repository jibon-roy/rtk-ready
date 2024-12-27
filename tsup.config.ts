import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'], // Entry point
  format: ['esm', 'cjs'], // Output formats (ESM and CommonJS)
  dts: true, // Generate type declaration files
  sourcemap: true, // Enable sourcemaps
  clean: true, // Clean the output folder before building
  outDir: 'dist', // Output directory
});
