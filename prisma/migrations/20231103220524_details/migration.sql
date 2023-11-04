/*
  Warnings:

  - A unique constraint covering the columns `[postId]` on the table `Car` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[postId]` on the table `Estate` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Car_postId_key" ON "Car"("postId");

-- CreateIndex
CREATE UNIQUE INDEX "Estate_postId_key" ON "Estate"("postId");

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Estate" ADD CONSTRAINT "Estate_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
