import { useParams } from "react-router-dom";
import EditUserForm from "./EditUserForm";
import { useGetUsersQuery } from "./usersApiSlice";
import { PulseLoader } from "react-spinners";
import { useEffect } from "react";

const EditUser = () => {
  const { id } = useParams();

  const { users } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      users: data?.entities[id],
    }),
  });

  useEffect(() => {
    console.log(users);
  });

  if (!users) return <PulseLoader color={"#BADA55"} />;

  const content = <EditUserForm user={users} />;

  return content;
};

export default EditUser;
