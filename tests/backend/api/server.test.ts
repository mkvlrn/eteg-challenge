import { expect, test } from 'vitest';
import { getServer } from '#/backend/api/server.js';

test('server is created', async () => {
  const server = await getServer();

  expect(server).toBeDefined();
});
