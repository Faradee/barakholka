/*
  Warnings:

  - Added the required column `floor` to the `Estate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `furniture` to the `Estate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `renovation` to the `Estate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN "isRented" BOOLEAN;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Estate" (
    "postId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "space" INTEGER NOT NULL,
    "rooms" INTEGER NOT NULL,
    "floor" INTEGER NOT NULL,
    "furniture" BOOLEAN NOT NULL,
    "renovation" TEXT NOT NULL,
    "balcony" TEXT,
    "type" TEXT NOT NULL
);
INSERT INTO "new_Estate" ("postId", "rooms", "space", "type") SELECT "postId", "rooms", "space", "type" FROM "Estate";
DROP TABLE "Estate";
ALTER TABLE "new_Estate" RENAME TO "Estate";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
