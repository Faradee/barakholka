/*
  Warnings:

  - You are about to drop the column `thumbnail` on the `Post` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Thumbnail" (
    "postId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "thumbnail" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "posterId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT,
    "price" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Post" ("createdAt", "description", "id", "posterId", "price", "title", "type", "updatedAt") SELECT "createdAt", "description", "id", "posterId", "price", "title", "type", "updatedAt" FROM "Post";
DROP TABLE "Post";
ALTER TABLE "new_Post" RENAME TO "Post";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
