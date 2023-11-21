import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useSendLogoutMutation } from "./features/auth/authApiSlice";
import { PulseLoader } from "react-spinners";

const DASH_REGEX = /^dash(\/)?$/;
const POSTS_REGEX = /^dash\/posts(\/)?$/;
const USERS_REGEX = /^dash\/users(\/)?$/;

const DashHeader = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();

  useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess, navigate]);

  const onLogoutClicked = () => sendLogout();

  if (isLoading) return <PulseLoader color="#BADA55" />;

  if (isError) return <p>Error: {error.data?.message}</p>;

  let dashClass = null;
  if (
    !DASH_REGEX.test(pathname) &&
    !POSTS_REGEX.test(pathname) &&
    !USERS_REGEX.test(pathname)
  ) {
    dashClass = "home-header__container--small";
  }

  const logoutButton = (
    <button className="logout" title="Logout" onClick={onLogoutClicked}>
      <FontAwesomeIcon icon={faRightFromBracket} />
    </button>
  );

  const content = (
    <>
      {/* <p className={errClass}>{error?.data?.message} </p> */}

      <header className="dash_header">
        <div className={`dash-header__container ${dashClass}`}>
          <Link to="/dash/posts">
            <h1 className="dash-header__title">Blog Posts</h1>
          </Link>
          <nav className="dash-header__nav">{logoutButton}</nav>
        </div>
      </header>
    </>
  );

  return content;
};

export default DashHeader;
