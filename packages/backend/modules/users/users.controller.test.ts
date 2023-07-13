import { expect, test, vi } from 'vitest';
import { createUserHandler } from '#/backend/modules/users/users.controller.js';
import * as createUserService from '#/backend/modules/users/users.service.js';

test('createUserHandler', async () => {
  const body = {
    nome: 'John Doe',
    email: 'john@email.com',
    cpf: '12345678900',
    corFavorita: 'VERDE',
    obs: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies aliquam, nunc nisl aliquet nunc, quis aliqua',
  };
  const request = { body } as any;
  const reply = { status: vi.fn().mockReturnThis(), send: vi.fn() } as any;
  vi.spyOn(createUserService, 'createUserService').mockResolvedValueOnce({ id: '1' } as any);

  await createUserHandler(request, reply);

  expect(reply.status).toHaveBeenCalledWith(201);
  expect(reply.send).toHaveBeenCalledWith({ id: '1' });
});
