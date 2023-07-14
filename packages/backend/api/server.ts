import fastifyStatic from '@fastify/static';
import fastify, { FastifyInstance } from 'fastify';
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from 'fastify-type-provider-zod';
import { resolve } from 'node:path';
import { errorHandler } from '#/backend/api/error-handler.js';
import { router } from '#/backend/api/router.js';

export async function getServer(): Promise<FastifyInstance> {
  const { NODE_ENV } = process.env;
  const isProduction = NODE_ENV === 'production';

  const server = fastify({
    logger: isProduction ? true : { transport: { target: 'pino-pretty' } },
    ignoreTrailingSlash: true,
  });

  server
    .setValidatorCompiler(validatorCompiler)
    .setSerializerCompiler(serializerCompiler)
    .withTypeProvider<ZodTypeProvider>()
    .setErrorHandler(errorHandler);

  if (isProduction) {
    server.register(fastifyStatic, {
      root: resolve('.', 'packages/frontend'),
    });
  }

  server.register(router, { prefix: '/api' });

  return server;
}
