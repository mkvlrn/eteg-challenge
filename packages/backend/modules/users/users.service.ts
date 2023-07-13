import { RainboColor } from '@prisma/client';
import {
  CpfAlreadyRegistered,
  EmailAlreadyRegistered,
  InternalServerError,
} from '#/backend/api/custom-errors.js';
import { prisma } from '#/backend/util/prisma.js';

export async function createUserService(
  nome: string,
  email: string,
  cpf: string,
  corFavorita: RainboColor,
  obs?: string,
) {
  try {
    const emailExists = await prisma.user.findUnique({ where: { email } });
    if (emailExists) throw new EmailAlreadyRegistered(email);

    const cpfExists = await prisma.user.findUnique({ where: { cpf } });
    if (cpfExists) throw new CpfAlreadyRegistered(cpf);

    const user = await prisma.user.create({ data: { nome, email, cpf, corFavorita, obs } });

    return { id: user.id };
  } catch (error) {
    if ((error as Error).name === 'FastifyError') throw error;

    throw new InternalServerError((error as Error).message);
  }
}
