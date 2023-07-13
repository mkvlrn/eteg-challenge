/*
  Warnings:

  - You are about to drop the column `favoriteColor` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `observations` on the `User` table. All the data in the column will be lost.
  - Added the required column `corFavorita` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "favoriteColor",
DROP COLUMN "name",
DROP COLUMN "observations",
ADD COLUMN     "corFavorita" "RainboColor" NOT NULL,
ADD COLUMN     "nome" TEXT NOT NULL,
ADD COLUMN     "obs" TEXT;
