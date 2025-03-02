/*
  Warnings:

  - You are about to drop the column `createdAt` on the `DayPartsOnProducts` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `DayPartsOnProducts` table. All the data in the column will be lost.
  - Changed the type of `alias` on the `DayPart` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "DayPart" ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "alias",
ADD COLUMN     "alias" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "DayPartsOnProducts" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- DropEnum
DROP TYPE "DayPartAlias";

-- CreateIndex
CREATE UNIQUE INDEX "DayPart_alias_key" ON "DayPart"("alias");
