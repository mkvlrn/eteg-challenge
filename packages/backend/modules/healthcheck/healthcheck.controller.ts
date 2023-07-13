import { FastifyReply, FastifyRequest } from 'fastify';
import { healthcheckSvc } from '#/backend/modules/healthcheck/healthcheck.service.js';

export async function healtcheckHandler(_request: FastifyRequest, reply: FastifyReply) {
  const result = await healthcheckSvc();

  reply.send(result);
}
