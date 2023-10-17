"use server";
const page = (params: { params: { id: string } }) => {
  const { id } = params.params;
  return <div>{id} </div>;
};

export default page;
