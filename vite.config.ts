import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  // @ts-expect-error, because of esm
  plugins: [react()],
  resolve: {
    alias: {
      '#/backend': resolve('.', './packages/backend'),
      '#/frontend': resolve('.', '../../packages/frontend'),
    },
  },
  server: {
    port: 4001,
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
    coverage: {
      reportsDirectory: 'coverage',
      reporter: ['lcov', 'html', 'text'],
      all: true,
      include: ['packages/**/*'],
      exclude: ['packages/*/index.ts', 'packages/**/*.d.ts'],
    },
    env: {
      NODE_ENV: 'test',
    },
    environment: 'jsdom',
    passWithNoTests: true,
    setupFiles: ['vitest.setup.ts'],
  },
});
