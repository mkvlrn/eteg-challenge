import { sqltag } from '@prisma/client/runtime/library.js';
import { prisma } from '#/backend/util/prisma.js';

export async function healthcheckSvc() {
  try {
    const result = (await prisma.$queryRaw(sqltag`select true as healthy`)) as [
      { healthy: boolean },
    ];
    return { healthy: result[0].healthy };
  } catch (error) {
    return {
      healthy: false,
      message: (error as Error).message.includes('prisma.')
        ? 'database error'
        : (error as Error).message,
    };
  }
}
