import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { ResourceNotFound } from '#/backend/api/custom-errors.js';
import { healtcheckHandler } from '#/backend/modules/healthcheck/healthcheck.controller.js';
import { healthcheckSchema } from '#/backend/modules/healthcheck/healthcheck.schema.js';
import { createUserHandler } from '#/backend/modules/users/users.controller.js';
import { createUserSchema } from '#/backend/modules/users/users.schema.js';

export async function catchAllRoute(request: FastifyRequest, _reply: FastifyReply) {
  const { url } = request;

  throw new ResourceNotFound(`path ${url} not found`);
}

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

  // catch-all route
  fastify.route({
    method: 'GET',
    url: '*',
    handler: catchAllRoute,
  });
}
