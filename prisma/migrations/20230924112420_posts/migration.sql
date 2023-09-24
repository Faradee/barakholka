-- CreateTable
CREATE TABLE "Post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "posterId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "thumbnail" TEXT,
    "description" TEXT,
    "price" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Car" (
    "postId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "kilometrage" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "transmission" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "engine" TEXT NOT NULL,
    "damaged" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "Estate" (
    "postId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "space" INTEGER NOT NULL,
    "rooms" INTEGER NOT NULL,
    "type" TEXT NOT NULL
);
