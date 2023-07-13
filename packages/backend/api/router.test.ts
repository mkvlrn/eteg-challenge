import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { expect, test, vi } from 'vitest';
import { ResourceNotFound } from '#/backend/api/custom-errors.js';
import { catchAllRoute, router } from '#/backend/api/router.js';

test('routes are registered', async () => {
  const mockFastify = { route: vi.fn() } as unknown as FastifyInstance;

  await router(mockFastify);

  expect(mockFastify.route).toHaveBeenCalledTimes(2);
});

test('catch-all route throws ResourceNotFound', async () => {
  const request = { url: '/notfound' } as FastifyRequest;
  const reply = {} as FastifyReply;

  const act = () => catchAllRoute(request, reply);

  await expect(act).rejects.toThrow(ResourceNotFound);
  await expect(act).rejects.toThrow('path /notfound not found');
});
