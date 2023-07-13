import { FastifySchema } from 'fastify';
import { z } from 'zod';

export const getHealthcheckSchema: FastifySchema = {
  response: { 200: z.object({ healthy: z.boolean(), message: z.string().optional() }) },
};
