-- CreateTable
CREATE TABLE "ClipData" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "bookmarked" BOOLEAN NOT NULL,
    "tag" TEXT[],
    "archive" BOOLEAN NOT NULL,
    "user" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClipData_pkey" PRIMARY KEY ("id")
);
