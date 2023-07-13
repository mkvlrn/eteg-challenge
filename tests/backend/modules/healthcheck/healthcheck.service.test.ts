import { expect, test, vi } from 'vitest';
import { healthcheckSvc } from '#/backend/modules/healthcheck/healthcheck.service.js';
import { prisma } from '#/backend/util/prisma.js';

test('healthcheckSvc returns healthy', async () => {
  vi.spyOn(prisma, '$queryRaw').mockResolvedValue([{ healthy: true }]);

  const result = await healthcheckSvc();

  expect(result).toEqual({ healthy: true });
});

test('healthcheckSvc returns unhealthy with database error', async () => {
  vi.spyOn(prisma, '$queryRaw').mockRejectedValue(new Error('prisma.'));

  const result = await healthcheckSvc();

  expect(result).toEqual({ healthy: false, message: 'database error' });
});

test('healthcheckSvc returns unhealthy with other error', async () => {
  vi.spyOn(prisma, '$queryRaw').mockRejectedValue(new Error('other'));

  const result = await healthcheckSvc();

  expect(result).toEqual({ healthy: false, message: 'other' });
});
