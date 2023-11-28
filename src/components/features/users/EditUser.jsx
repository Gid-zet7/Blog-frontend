import { useParams } from "react-router-dom";
import EditUserForm from "./EditUserForm";
import { useGetUsersQuery } from "./usersApiSlice";
import { PulseLoader } from "react-spinners";

const EditUser = () => {
  const { id } = useParams();

  const { users } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      users: data?.entities[id],
    }),
  });

  if (!users) return <PulseLoader color={"#000"} className="pulse-loader" />;

  const content = <EditUserForm user={users} />;

  return content;
};

export default EditUser;
