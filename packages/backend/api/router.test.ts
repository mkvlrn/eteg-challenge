import { FastifyInstance } from 'fastify';
import { expect, test, vi } from 'vitest';
import { router } from '#/backend/api/router.js';

test('routes are registered', async () => {
  const mockFastify = { route: vi.fn() } as unknown as FastifyInstance;

  await router(mockFastify);

  expect(mockFastify.route).toHaveBeenCalledTimes(2);
});
