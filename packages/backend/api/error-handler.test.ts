import { FastifyReply, FastifyRequest } from 'fastify';
import { expect, test, vi } from 'vitest';
import { ZodError, ZodIssueCode } from 'zod';
import { ResourceNotFound } from '#/backend/api/custom-errors.js';
import { errorHandler } from '#/backend/api/error-handler.js';

test('replies in case of ZodError', () => {
  const error = new ZodError([
    {
      code: ZodIssueCode.invalid_string,
      path: ['email'],
      message: 'invalid email',
      validation: 'email',
    },
  ]);
  const request = {} as FastifyRequest;
  const reply = { status: vi.fn(() => reply), send: vi.fn() } as unknown as FastifyReply;

  errorHandler(error, request, reply);

  expect(reply.status).toHaveBeenCalledWith(400);
  expect(reply.send).toHaveBeenCalledWith({
    statusCode: 400,
    code: 'VALIDATION_ERROR',
    message: ['invalid email'],
  });
});

test('replies in case of CustomError', () => {
  const error = new ResourceNotFound('something is missing');
  const request = {} as FastifyRequest;
  const reply = { status: vi.fn(() => reply), send: vi.fn() } as unknown as FastifyReply;

  errorHandler(error, request, reply);

  expect(reply.status).toHaveBeenCalledWith(404);
  expect(reply.send).toHaveBeenCalledWith({
    statusCode: 404,
    code: 'RESOURCE_NOT_FOUND',
    message: 'something is missing',
  });
});

test('throws in case of uncaught error', () => {
  const error = new Error('some error');
  const request = {} as FastifyRequest;
  const reply = { status: vi.fn(() => reply), send: vi.fn() } as unknown as FastifyReply;

  errorHandler(error, request, reply);

  expect(reply.status).toHaveBeenCalledWith(500);
  expect(reply.send).toHaveBeenCalledWith({
    statusCode: 500,
    code: 'INTERNAL_SERVER_ERROR',
    message: 'some error',
  });
});
