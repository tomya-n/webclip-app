-- AlterTable
ALTER TABLE "_ClipDataToTags" ADD CONSTRAINT "_ClipDataToTags_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_ClipDataToTags_AB_unique";
