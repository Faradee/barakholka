/*
  Warnings:

  - You are about to drop the column `balcony` on the `Estate` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Estate" (
    "postId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "space" TEXT NOT NULL,
    "rooms" TEXT NOT NULL,
    "floor" TEXT NOT NULL,
    "furniture" BOOLEAN NOT NULL,
    "renovation" BOOLEAN NOT NULL
);
INSERT INTO "new_Estate" ("floor", "furniture", "postId", "renovation", "rooms", "space") SELECT "floor", "furniture", "postId", "renovation", "rooms", "space" FROM "Estate";
DROP TABLE "Estate";
ALTER TABLE "new_Estate" RENAME TO "Estate";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
