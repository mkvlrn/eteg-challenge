import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '#/backend': resolve('.', './packages/backend'),
      '#/frontend': resolve('.', './packages/frontend'),
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
    environment: 'node',
    passWithNoTests: true,
    setupFiles: ['vitest.setup.ts'],
  },
});
