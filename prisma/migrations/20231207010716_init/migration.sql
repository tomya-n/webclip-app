-- CreateTable
CREATE TABLE "ClipData" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "url" TEXT NOT NULL,
    "bookmarked" BOOLEAN NOT NULL,
    "tag" TEXT[],
    "archived" BOOLEAN NOT NULL,
    "user" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClipData_pkey" PRIMARY KEY ("id")
);
