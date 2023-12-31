import { FastifyError } from '@fastify/error';
import { FastifyReply, FastifyRequest } from 'fastify';
import { ZodError } from 'zod';

export function errorHandler(error: Error, _request: FastifyRequest, reply: FastifyReply) {
  if (error instanceof ZodError) {
    reply.status(400).send({
      statusCode: 400,
      code: 'VALIDATION_ERROR',
      message: error.errors.map((issue) => issue.message.replaceAll('"', "'")),
    });
  } else {
    const customError = error as FastifyError;

    reply.status(customError.statusCode ?? 500).send({
      statusCode: customError.statusCode ?? 500,
      code: customError.code ?? 'INTERNAL_SERVER_ERROR',
      message: customError.message,
    });
  }
}
