import { useGetUsersQuery } from "../users/usersApiSlice";
import NewPostForm from "./NewPostForm";

const NewPost = () => {
  const { users } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map((id) => data?.entities[id]),
    }),
  });

  if (!users?.length) return <p>Not currently available</p>;

  const content = <NewPostForm users={users} />;

  return content;
};
export default NewPost;
