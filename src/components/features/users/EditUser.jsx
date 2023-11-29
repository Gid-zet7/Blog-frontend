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

  if (!users)
    return (
      <div className="loader-container">
        <PulseLoader color={"#000"} className="pulse-loader" />
      </div>
    );

  const content = <EditUserForm user={users} />;

  return content;
};

export default EditUser;
