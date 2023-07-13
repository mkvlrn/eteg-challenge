import { expect, test, vi } from 'vitest';
import { getServer } from '#/backend/api/server.js';

test('server is created when NODE_ENV is development', async () => {
  vi.stubEnv('NODE_ENV', 'development');
  const server = await getServer();

  expect(server).toBeDefined();
});

test('server is created when NODE_ENV is production', async () => {
  vi.stubEnv('NODE_ENV', 'production');

  const server = await getServer();

  expect(server).toBeDefined();
});
