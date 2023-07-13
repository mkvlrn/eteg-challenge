import createError from '@fastify/error';

export const InternalServerError = createError('INTERNAL_SERVER_ERROR', '%s', 500);
export const ResourceNotFound = createError('RESOURCE_NOT_FOUND', '%s', 404);
export const EmailAlreadyRegistered = createError(
  'EMAIL_ALREADY_REGISTERED',
  'email "%s" já cadastrado',
  409,
);
export const CpfAlreadyRegistered = createError(
  'CPF_ALREADY_REGISTERED',
  'cpf "%s" já cadastrado',
  409,
);
