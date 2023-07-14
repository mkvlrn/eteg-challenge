/*
  Warnings:

  - Changed the type of `corFavorita` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Color" AS ENUM ('VERMELHO', 'LARANJA', 'AMARELO', 'VERDE', 'AZUL', 'ANIL', 'VIOLETA');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "corFavorita",
ADD COLUMN     "corFavorita" "Color" NOT NULL;

-- DropEnum
DROP TYPE "RainboColor";
