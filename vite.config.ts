import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  // @ts-expect-error, because of esm
  plugins: [react()],
  base: '',
  resolve: { alias: { '#/frontend': resolve('.', '../../packages/frontend') } },
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: '../../build/frontend',
    emptyOutDir: true,
  },
  test: {
    alias: {
      '#/backend': resolve('.', './packages/backend'),
      '#/frontend': resolve('.', './packages/frontend'),
    },
    coverage: {
      reportsDirectory: 'coverage',
      reporter: ['lcov', 'html', 'text'],
      all: true,
      include: ['packages/**/*'],
      exclude: ['packages/*/index.ts', 'packages/*/index.tsx', 'packages/**/*.d.ts'],
    },
    env: {
      NODE_ENV: 'test',
    },
    environment: 'jsdom',
    passWithNoTests: true,
    setupFiles: ['vitest.setup.ts'],
  },
});
