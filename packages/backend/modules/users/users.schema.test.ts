import { assert, expect, test } from 'vitest';
import { AnyZodObject } from 'zod';
import { createUserSchema } from '#/backend/modules/users/users.schema.js';

const validInput = {
  name: 'Anna Júlia',
  cpf: '99867390040',
  email: 'anna@email.com',
  corFavorita: 'VERMELHO',
  obs: 'Gosta de chocolate',
};

test('parses user successfully', async () => {
  const result = await (createUserSchema.body as AnyZodObject).safeParseAsync(validInput);

  expect(result.success).toBeTruthy();
});

test('parse fails when name is missing from body', async () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { name, ...invalidInput } = validInput;

  const result = await (createUserSchema.body as AnyZodObject).safeParseAsync(invalidInput);

  expect(result.success).toBeFalsy();
  assert(!result.success);
  expect(result.error.issues[0].message).toBe('"nome" é campo obrigatório');
});

test('parse fails when name is empty', async () => {
  const invalidInput = { ...validInput, name: '' };

  const result = await (createUserSchema.body as AnyZodObject).safeParseAsync(invalidInput);

  expect(result.success).toBeFalsy();
  assert(!result.success);
  expect(result.error.issues[0].message).toBe('"nome" é campo obrigatório');
});

test('parse fails when name is too short', async () => {
  const invalidInput = { ...validInput, name: 'a' };

  const result = await (createUserSchema.body as AnyZodObject).safeParseAsync(invalidInput);

  expect(result.success).toBeFalsy();
  assert(!result.success);
  expect(result.error.issues[0].message).toBe('"nome" deve ter no mínimo 3 caracteres');
});

test('parse fails when name is too long', async () => {
  const invalidInput = { ...validInput, name: ''.padEnd(256, 'a') };

  const result = await (createUserSchema.body as AnyZodObject).safeParseAsync(invalidInput);

  expect(result.success).toBeFalsy();
  assert(!result.success);
  expect(result.error.issues[0].message).toBe('"nome" deve ter no máximo 255 caracteres');
});

test('parse fails when cpf is missing from body', async () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { cpf, ...invalidInput } = validInput;

  const result = await (createUserSchema.body as AnyZodObject).safeParseAsync(invalidInput);

  expect(result.success).toBeFalsy();
  assert(!result.success);
  expect(result.error.issues[0].message).toBe('"cpf" é campo obrigatório');
});

test('parse fails when cpf is empty', async () => {
  const invalidInput = { ...validInput, cpf: '' };

  const result = await (createUserSchema.body as AnyZodObject).safeParseAsync(invalidInput);

  expect(result.success).toBeFalsy();
  assert(!result.success);
  expect(result.error.issues[0].message).toBe('"cpf" é campo obrigatório');
});

test('parse fails when cpf is not an 11 digit string', async () => {
  const invalidInput = { ...validInput, cpf: '1234567890' };

  const result = await (createUserSchema.body as AnyZodObject).safeParseAsync(invalidInput);

  expect(result.success).toBeFalsy();
  assert(!result.success);
  expect(result.error.issues[0].message).toBe('"cpf" deve ter 11 dígitos');
});

test('parse fails when cpf is not a valid cpf', async () => {
  const invalidInput = { ...validInput, cpf: '12345678901' };

  const result = await (createUserSchema.body as AnyZodObject).safeParseAsync(invalidInput);

  expect(result.success).toBeFalsy();
  assert(!result.success);
  expect(result.error.issues[0].message).toBe('"cpf" inválido');
});

test('parse fails when email is missing from body', async () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { email, ...invalidInput } = validInput;

  const result = await (createUserSchema.body as AnyZodObject).safeParseAsync(invalidInput);

  expect(result.success).toBeFalsy();
  assert(!result.success);
  expect(result.error.issues[0].message).toBe('"email" é campo obrigatório');
});

test('parse fails when email is empty', async () => {
  const invalidInput = { ...validInput, email: '' };

  const result = await (createUserSchema.body as AnyZodObject).safeParseAsync(invalidInput);

  expect(result.success).toBeFalsy();
  assert(!result.success);
  expect(result.error.issues[0].message).toBe('"email" é campo obrigatório');
});

test('parse fails when email is not a valid email', async () => {
  const invalidInput = { ...validInput, email: 'not an email' };

  const result = await (createUserSchema.body as AnyZodObject).safeParseAsync(invalidInput);

  expect(result.success).toBeFalsy();
  assert(!result.success);
  expect(result.error.issues[0].message).toBe('"email" inválido');
});

test('parse fails when corFavorita is not a valid color, is empty, or missing', async () => {
  const invalidInput = { ...validInput, corFavorita: 'not a color' };

  const result = await (createUserSchema.body as AnyZodObject).safeParseAsync(invalidInput);

  expect(result.success).toBeFalsy();
});

test('parse fails when obs is too long', async () => {
  const invalidInput = { ...validInput, obs: ''.padEnd(256, 'a') };

  const result = await (createUserSchema.body as AnyZodObject).safeParseAsync(invalidInput);

  expect(result.success).toBeFalsy();
  assert(!result.success);
  expect(result.error.issues[0].message).toBe('"obs" deve ter no máximo 255 caracteres');
});
