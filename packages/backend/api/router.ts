import { FastifyInstance } from 'fastify';
import { healtcheckHandler } from '#/backend/modules/healthcheck/healthcheck.controller.js';
import { healthcheckSchema } from '#/backend/modules/healthcheck/healthcheck.schema.js';
import { createUserHandler } from '#/backend/modules/users/users.controller.js';
import { createUserSchema } from '#/backend/modules/users/users.schema.js';

export async function router(fastify: FastifyInstance) {
  // healthcheck
  fastify.route({
    method: 'GET',
    url: '/healthcheck',
    schema: healthcheckSchema,
    handler: healtcheckHandler,
  });

  // users
  fastify.route({
    method: 'POST',
    url: '/users',
    schema: createUserSchema,
    handler: createUserHandler,
  });
}
