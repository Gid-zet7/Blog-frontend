import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectUsersById } from "./usersApiSlice";
import { Link } from "react-router-dom";

const User = ({ userId }) => {
  const user = useSelector((state) => selectUsersById(state, userId));

  const navigate = useNavigate();

  if (user) {
    const handleEdit = () => navigate(`/dash/users/${userId}`);

    const userRolesString = user.roles.toString().replaceAll(",", ", ");

    const cellStatus = user.active ? "" : "table__cell--inactive";

    return (
      <tr>
        <td className={`table__cell`}>
          <Link to={`/home/users/${user.id}`}>{user.username} </Link>
        </td>
        <td className={`table__cell`}>{userRolesString}</td>
        <td className={`table__cell`}>
          <button className="btn" onClick={handleEdit}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </td>
      </tr>
    );
  } else return null;
};

export default User;
