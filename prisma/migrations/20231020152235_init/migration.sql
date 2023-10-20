-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "posterId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Thumbnail" (
    "id" SERIAL NOT NULL,
    "postId" INTEGER NOT NULL,
    "thumbnail" TEXT NOT NULL,

    CONSTRAINT "Thumbnail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Car" (
    "postId" INTEGER NOT NULL,
    "kilometrage" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "horsepower" TEXT NOT NULL,
    "transmission" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "damaged" BOOLEAN NOT NULL,
    "trade" BOOLEAN NOT NULL,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("postId")
);

-- CreateTable
CREATE TABLE "Estate" (
    "postId" INTEGER NOT NULL,
    "space" TEXT NOT NULL,
    "rooms" TEXT NOT NULL,
    "floor" TEXT NOT NULL,
    "furniture" BOOLEAN NOT NULL,
    "renovation" BOOLEAN NOT NULL,

    CONSTRAINT "Estate_pkey" PRIMARY KEY ("postId")
);

-- CreateTable
CREATE TABLE "User" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("uuid")
);
