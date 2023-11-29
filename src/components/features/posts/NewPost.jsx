import { PulseLoader } from "react-spinners";
import { useGetUsersQuery } from "../users/usersApiSlice";
import NewPostForm from "./NewPostForm";

const NewPost = () => {
  const { users } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map((id) => data?.entities[id]),
    }),
  });

  if (!users?.length)
    return (
      <div className="loader-container">
        <PulseLoader color={"#000"} className="pulse-loader" />
      </div>
    );
  const content = <NewPostForm users={users} />;

  return content;
};
export default NewPost;
