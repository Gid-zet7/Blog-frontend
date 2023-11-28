import { useSelector } from "react-redux";
import { selectCurrentToken } from "../components/features/auth/authSlice";
import { jwtDecode } from "jwt-decode";

const useAuth = () => {
  const token = useSelector(selectCurrentToken);
  let isAdmin = false;
  let isAuthor = false;
  let status = "User";

  if (token) {
    const decoded = jwtDecode(token);
    const { Username, roles } = decoded.UserInfo;

    isAdmin = roles.includes("Admin");
    isAuthor = roles.includes("Author");

    if (isAdmin) status = "Admin";
    if (isAuthor) status = "Author";

    return { Username, status, roles, isAdmin, isAuthor };
  }

  return { Username: "", roles: [], status };
};

export default useAuth;
