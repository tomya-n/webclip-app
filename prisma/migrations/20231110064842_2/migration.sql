/*
  Warnings:

  - You are about to drop the column `archive` on the `ClipData` table. All the data in the column will be lost.
  - Added the required column `archived` to the `ClipData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ClipData" DROP COLUMN "archive",
ADD COLUMN     "archived" BOOLEAN NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;
