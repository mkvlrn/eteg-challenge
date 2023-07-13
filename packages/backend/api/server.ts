import fastify, { FastifyInstance } from 'fastify';
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from 'fastify-type-provider-zod';
import { router } from '#/backend/api/router.js';

export async function getServer(): Promise<FastifyInstance> {
  const { NODE_ENV } = process.env;

  const server = fastify({
    logger: NODE_ENV === 'development' ? { transport: { target: 'pino-pretty' } } : true,
    ignoreTrailingSlash: true,
  });

  server
    .setValidatorCompiler(validatorCompiler)
    .setSerializerCompiler(serializerCompiler)
    .withTypeProvider<ZodTypeProvider>()
    .register(router);

  return server;
}
