/*
  Warnings:

  - You are about to drop the column `tag` on the `ClipData` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ClipData" DROP COLUMN "tag",
ALTER COLUMN "bookmarked" SET DEFAULT false;

-- CreateTable
CREATE TABLE "Tags" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ClipDataToTags" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Tags_name_key" ON "Tags"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_ClipDataToTags_AB_unique" ON "_ClipDataToTags"("A", "B");

-- CreateIndex
CREATE INDEX "_ClipDataToTags_B_index" ON "_ClipDataToTags"("B");

-- AddForeignKey
ALTER TABLE "_ClipDataToTags" ADD CONSTRAINT "_ClipDataToTags_A_fkey" FOREIGN KEY ("A") REFERENCES "ClipData"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClipDataToTags" ADD CONSTRAINT "_ClipDataToTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
