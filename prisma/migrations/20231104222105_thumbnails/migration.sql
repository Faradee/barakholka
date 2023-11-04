-- DropForeignKey
ALTER TABLE "Thumbnail" DROP CONSTRAINT "Thumbnail_postId_fkey";

-- AddForeignKey
ALTER TABLE "Thumbnail" ADD CONSTRAINT "Thumbnail_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
