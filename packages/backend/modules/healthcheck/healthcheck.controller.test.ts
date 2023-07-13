import { FastifyReply, FastifyRequest } from 'fastify';
import { expect, test, vi } from 'vitest';
import { healtcheckHandler } from '#/backend/modules/healthcheck/healthcheck.controller.js';
import * as services from '#/backend/modules/healthcheck/healthcheck.service.js';

test('healthcheckHandler', async () => {
  vi.spyOn(services, 'healthcheckSvc').mockResolvedValue({ healthy: true });
  const request = {} as FastifyRequest;
  const reply = { send: vi.fn() } as unknown as FastifyReply;

  await healtcheckHandler(request, reply);

  expect(reply.send).toHaveBeenCalledWith({ healthy: true });
});
