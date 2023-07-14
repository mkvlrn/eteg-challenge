import { Color } from '@prisma/client';
import { expect, test, vi } from 'vitest';
import {
  CpfAlreadyRegistered,
  EmailAlreadyRegistered,
  InternalServerError,
} from '#/backend/api/custom-errors.js';
import { createUserService } from '#/backend/modules/users/users.service.js';
import { prisma } from '#/backend/util/prisma.js';

const validInput = {
  nome: 'Bruce Wayne',
  email: 'batman@email.com',
  cpf: '99867390040',
  corFavorita: Color.ANIL,
  obs: 'Não é fã da luz do dia',
};

test('creates user successfully', async () => {
  vi.spyOn(prisma.user, 'findUnique').mockResolvedValueOnce(null).mockResolvedValueOnce(null);
  vi.spyOn(prisma.user, 'create').mockResolvedValueOnce({ id: '1' } as any);

  const { nome, email, cpf, corFavorita, obs } = validInput;
  const result = await createUserService(nome, email, cpf, corFavorita, obs);

  expect(result).toEqual({ id: '1' });
});

test('throws error if email already exists', async () => {
  vi.spyOn(prisma.user, 'findUnique')
    .mockResolvedValueOnce({} as any)
    .mockResolvedValueOnce({} as any);

  const { nome, email, cpf, corFavorita, obs } = validInput;
  const act = () => createUserService(nome, email, cpf, corFavorita, obs);

  await expect(act).rejects.toThrow('email "batman@email.com" já cadastrado');
  await expect(act).rejects.toThrow(EmailAlreadyRegistered);
});

test('throws error if cpf already exists', async () => {
  vi.spyOn(prisma.user, 'findUnique')
    .mockResolvedValueOnce(null)
    .mockResolvedValueOnce({} as any)
    .mockResolvedValueOnce(null)
    .mockResolvedValueOnce({} as any);

  const { nome, email, cpf, corFavorita, obs } = validInput;
  const act = () => createUserService(nome, email, cpf, corFavorita, obs);

  await expect(act).rejects.toThrow('cpf "99867390040" já cadastrado');
  await expect(act).rejects.toThrow(CpfAlreadyRegistered);
});

test('throws error if prisma throws error', async () => {
  vi.spyOn(prisma.user, 'findUnique').mockRejectedValue(new Error('Test Error'));

  const { nome, email, cpf, corFavorita, obs } = validInput;
  const act = () => createUserService(nome, email, cpf, corFavorita, obs);

  await expect(act).rejects.toThrow(InternalServerError);
});
