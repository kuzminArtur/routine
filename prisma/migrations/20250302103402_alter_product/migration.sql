/*
  Warnings:

  - You are about to drop the `DayPartsOnProducts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DayPartsOnProducts" DROP CONSTRAINT "DayPartsOnProducts_dayPartId_fkey";

-- DropForeignKey
ALTER TABLE "DayPartsOnProducts" DROP CONSTRAINT "DayPartsOnProducts_productId_fkey";

-- DropTable
DROP TABLE "DayPartsOnProducts";

-- CreateTable
CREATE TABLE "_DayPartToProduct" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_DayPartToProduct_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_DayPartToProduct_B_index" ON "_DayPartToProduct"("B");

-- AddForeignKey
ALTER TABLE "_DayPartToProduct" ADD CONSTRAINT "_DayPartToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "DayPart"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DayPartToProduct" ADD CONSTRAINT "_DayPartToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
