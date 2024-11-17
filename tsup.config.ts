import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/script.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  minify: true,
  splitting: false,
  sourcemap: true,
  shims: true,
});
