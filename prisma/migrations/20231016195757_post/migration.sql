/*
  Warnings:

  - You are about to drop the column `engine` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Estate` table. All the data in the column will be lost.
  - You are about to alter the column `renovation` on the `Estate` table. The data in that column could be lost. The data in that column will be cast from `String` to `Boolean`.
  - You are about to drop the column `isRented` on the `Post` table. All the data in the column will be lost.
  - Added the required column `horsepower` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trade` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Made the column `balcony` on table `Estate` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `Post` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Car" (
    "postId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "kilometrage" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "horsepower" INTEGER NOT NULL,
    "transmission" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "damaged" BOOLEAN NOT NULL,
    "trade" BOOLEAN NOT NULL
);
INSERT INTO "new_Car" ("brand", "color", "damaged", "kilometrage", "model", "postId", "transmission", "year") SELECT "brand", "color", "damaged", "kilometrage", "model", "postId", "transmission", "year" FROM "Car";
DROP TABLE "Car";
ALTER TABLE "new_Car" RENAME TO "Car";
CREATE TABLE "new_Estate" (
    "postId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "space" INTEGER NOT NULL,
    "rooms" INTEGER NOT NULL,
    "floor" INTEGER NOT NULL,
    "furniture" BOOLEAN NOT NULL,
    "renovation" BOOLEAN NOT NULL,
    "balcony" TEXT NOT NULL
);
INSERT INTO "new_Estate" ("balcony", "floor", "furniture", "postId", "renovation", "rooms", "space") SELECT "balcony", "floor", "furniture", "postId", "renovation", "rooms", "space" FROM "Estate";
DROP TABLE "Estate";
ALTER TABLE "new_Estate" RENAME TO "Estate";
CREATE TABLE "new_Post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "posterId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Post" ("createdAt", "description", "id", "posterId", "price", "title", "type", "updatedAt") SELECT "createdAt", "description", "id", "posterId", "price", "title", "type", "updatedAt" FROM "Post";
DROP TABLE "Post";
ALTER TABLE "new_Post" RENAME TO "Post";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
