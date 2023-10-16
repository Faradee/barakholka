-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Car" (
    "postId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "kilometrage" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "horsepower" TEXT NOT NULL,
    "transmission" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "damaged" BOOLEAN NOT NULL,
    "trade" BOOLEAN NOT NULL
);
INSERT INTO "new_Car" ("brand", "color", "damaged", "horsepower", "kilometrage", "model", "postId", "trade", "transmission", "year") SELECT "brand", "color", "damaged", "horsepower", "kilometrage", "model", "postId", "trade", "transmission", "year" FROM "Car";
DROP TABLE "Car";
ALTER TABLE "new_Car" RENAME TO "Car";
CREATE TABLE "new_Estate" (
    "postId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "space" TEXT NOT NULL,
    "rooms" TEXT NOT NULL,
    "floor" TEXT NOT NULL,
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
    "price" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Post" ("createdAt", "description", "id", "posterId", "price", "title", "type", "updatedAt") SELECT "createdAt", "description", "id", "posterId", "price", "title", "type", "updatedAt" FROM "Post";
DROP TABLE "Post";
ALTER TABLE "new_Post" RENAME TO "Post";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
