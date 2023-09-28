/*
  Warnings:

  - The primary key for the `Thumbnail` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `id` to the `Thumbnail` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Thumbnail" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "postId" INTEGER NOT NULL,
    "thumbnail" TEXT NOT NULL
);
INSERT INTO "new_Thumbnail" ("postId", "thumbnail") SELECT "postId", "thumbnail" FROM "Thumbnail";
DROP TABLE "Thumbnail";
ALTER TABLE "new_Thumbnail" RENAME TO "Thumbnail";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
