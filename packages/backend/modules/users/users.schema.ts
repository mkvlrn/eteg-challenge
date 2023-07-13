import { RainboColor } from '@prisma/client';
import { cpf } from 'cpf-cnpj-validator';
import { FastifySchema } from 'fastify';
import { z } from 'zod';

const createUserBody = z.object({
  nome: z
    .string({ required_error: 'nome é campo obrigatório' })
    .nonempty('nome é campo obrigatório')
    .min(3, 'nome deve ter no mínimo 3 caracteres')
    .max(255, 'nome deve ter no máximo 255 caracteres'),
  cpf: z
    .string({ required_error: 'cpf é campo obrigatório' })
    .nonempty('cpf é campo obrigatório')
    .regex(/^\d{11}$/, 'cpf deve ter 11 dígitos')
    .refine((input) => cpf.isValid(input), 'cpf inválido'),
  email: z
    .string({ required_error: 'email é campo obrigatório' })
    .nonempty('email é campo obrigatório')
    .max(255, 'email deve ter no máximo 255 caracteres')
    .email('email inválido'),
  corFavorita: z.nativeEnum(RainboColor),
  obs: z.string().max(255, 'obs deve ter no máximo 255 caracteres').optional(),
});

const createUserResponse201 = z.object({ id: z.string().uuid() });

export const createUserSchema: FastifySchema = {
  body: createUserBody,
  response: { 201: createUserResponse201 },
};

export type CreateUserRequest = { Body: z.infer<typeof createUserBody> };
