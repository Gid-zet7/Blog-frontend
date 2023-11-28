import { useParams } from "react-router-dom";
import { useGetPostsQuery } from "./postsApiSlice";
import { useGetUsersQuery } from "../users/usersApiSlice";
import { PulseLoader } from "react-spinners";
import EditPostForm from "./EditPostForm";
import useAuth from "../../../hooks/useAuth";

const EditPost = () => {
  const { id } = useParams();

  const { Username, roles } = useAuth();

  const isAdmin = roles.includes("Admin");

  const { post } = useGetPostsQuery("postsList", {
    selectFromResult: ({ data }) => ({
      post: data?.entities[id],
    }),
  });

  const { users } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map((id) => data?.entities[id]),
    }),
  });

  if (!post || !users?.length)
    return <PulseLoader color={"#000"} className="pulse-loader" />;

  if (!isAdmin) {
    console.log(post);
    if (post.username !== Username) {
      return <p>No access</p>;
    }
  }

  const content =
    post && users ? (
      <EditPostForm post={post} users={users} />
    ) : (
      <PulseLoader color={"#000"} className="pulse-loader" />
    );

  return content;
};

export default EditPost;
