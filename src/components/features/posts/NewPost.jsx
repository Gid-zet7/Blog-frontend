import { useGetUsersQuery } from "../users/usersApiSlice";
import NewPostForm from "./NewPostForm";
import { PulseLoader } from "react-spinners";

const NewPost = () => {
  const { users } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map((id) => data?.entities[id]),
    }),
  });

  if (!users?.length) return <PulseLoader color={"#BADA55"} />;

  const content = <NewPostForm users={users} />;

  return content;
};
export default NewPost;
