import { FastifySchema } from 'fastify';
import { z } from 'zod';

export const healthcheckSchema: FastifySchema = {
  response: { 200: z.object({ healthy: z.boolean(), message: z.string().optional() }) },
};
