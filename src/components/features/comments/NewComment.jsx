import { PulseLoader } from "react-spinners";
import { useGetUsersQuery } from "../users/usersApiSlice";
import { useGetPostsQuery } from "../posts/postsApiSlice";
import NewPostForm from "./NewPostForm";

const NewPost = () => {
  const { posts } = useGetPostsQuery("postsList", {
    selectFromResult: ({ data }) => ({
      posts: data?.ids.map((id) => data?.entities[id]),
    }),
  });

  const { users } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map((id) => data?.entities[id]),
    }),
  });

  if (!users?.length || !posts?.length) return <PulseLoader color={"#BADA55"} />;

  const content = <NewPostForm users={users} posts={posts} />;

  return content;
};
export default NewPost;
