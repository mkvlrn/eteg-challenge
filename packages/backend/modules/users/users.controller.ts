import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateUserRequest } from '#/backend/modules/users/users.schema.js';
import { createUserService } from '#/backend/modules/users/users.service.js';

export async function createUserHandler(
  request: FastifyRequest<CreateUserRequest>,
  reply: FastifyReply,
) {
  const { nome, email, cpf, corFavorita, obs } = request.body;
  const result = await createUserService(nome, email, cpf, corFavorita, obs);

  reply.status(201).send({ id: result.id });
}
