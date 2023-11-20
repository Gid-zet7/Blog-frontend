import { useParams } from "react-router-dom";
import { useGetPostsQuery } from "./postsApiSlice";
import { useGetUsersQuery } from "../users/usersApiSlice";
import { PulseLoader } from "react-spinners";
import EditPostForm from "./EditPostForm";

const EditPost = () => {
  const { id } = useParams();

  const { post } = useGetPostsQuery("postssList", {
    selectFromResult: ({ data }) => ({
      post: data?.entities[id],
    }),
  });

  const { users } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map((id) => data?.entities[id]),
    }),
  });

  if (!post || !users?.length) return <PulseLoader color={"#BADA55"} />;

  const content =
    post && users ? (
      <EditPostForm post={post} users={users} />
    ) : (
      <PulseLoader color={"#BADA55"} />
    );

  return content;
};

export default EditPost;
