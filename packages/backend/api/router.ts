import { FastifyInstance } from 'fastify';
import { healtcheckHandler } from '#/backend/modules/healthcheck/healthcheck.controller.js';
import { healthcheckSchema } from '#/backend/modules/healthcheck/healthcheck.schema.js';

export async function router(fastify: FastifyInstance) {
  // healthcheck
  fastify.route({
    method: 'GET',
    url: '/healthcheck',
    schema: healthcheckSchema,
    handler: healtcheckHandler,
  });
}
