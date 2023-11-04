import { getPostData } from "@/actions/postActions";
import { verifyToken } from "@/actions/userActions";
import PostEditorProvider from "@/components/postEditor/PostEditorProvider";
import prisma from "@/db";

const PostEdit = async ({ params }: { params: { id: string } }) => {
  const id = parseInt(params.id);
  const uuid = await verifyToken();
  const { post, carDetails, estateDetails } = await getPostData(id);
  const details =
    post && post.type === "car"
      ? carDetails
      : post && post.type === "estate"
      ? estateDetails
      : undefined;
  const thumbnails = (
    await prisma.thumbnail.findMany({
      where: {
        postId: id,
      },
    })
  ).map((thumbnail) => {
    return thumbnail.thumbnail;
  });
  const { ...postData } = post!;
  return (
    post &&
    post.posterId === uuid && (
      <PostEditorProvider
        postId={id}
        postData={{ thumbnails, details, ...postData }}
      />
    )
  );
};

export default PostEdit;
