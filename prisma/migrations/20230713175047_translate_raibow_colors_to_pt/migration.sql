/*
  Warnings:

  - The values [RED,ORANGE,YELLOW,GREEN,BLUE,INDIGO,VIOLET] on the enum `RainboColor` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "RainboColor_new" AS ENUM ('VERMELHO', 'LARANJA', 'AMARELO', 'VERDE', 'AZUL', 'ANIL', 'VIOLETA');
ALTER TABLE "User" ALTER COLUMN "favoriteColor" TYPE "RainboColor_new" USING ("favoriteColor"::text::"RainboColor_new");
ALTER TYPE "RainboColor" RENAME TO "RainboColor_old";
ALTER TYPE "RainboColor_new" RENAME TO "RainboColor";
DROP TYPE "RainboColor_old";
COMMIT;
