/*
  Warnings:

  - You are about to drop the column `csv` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `portion` on the `Recipe` table. All the data in the column will be lost.
  - Added the required column `ingredients` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "csv",
DROP COLUMN "portion",
ADD COLUMN     "ingredients" TEXT NOT NULL,
ADD COLUMN     "lastCooked" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "quantity" TEXT NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL;
