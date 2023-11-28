import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDownShortWide,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useSendLogoutMutation } from "./features/auth/authApiSlice";
import useAuth from "../hooks/useAuth";
import { PulseLoader } from "react-spinners";

const DASH_REGEX = /^dash(\/)?$/;
const POSTS_REGEX = /^dash\/posts(\/)?$/;
const USERS_REGEX = /^dash\/users(\/)?$/;

const DashHeader = () => {
  const { isAdmin, isAuthor } = useAuth();

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();

  useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess, navigate]);

  const onNewPostClicked = () => navigate("/dash/posts/new");
  const onNewUserClicked = () => navigate("/dash/users/new");
  const onPostsClicked = () => navigate("/dash/posts/myposts");
  const onUsersClicked = () => navigate("/dash/users");

  const onLogoutClicked = () => sendLogout();

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
      LogOut
      <FontAwesomeIcon icon={faRightFromBracket} />
    </button>
  );

  let newPostButton = null;
  if (isAdmin || isAuthor) {
    if (!POSTS_REGEX.test(pathname)) {
      newPostButton = (
        <button title="new Post" onClick={onNewPostClicked}>
          New Post
        </button>
      );
    }
  }

  let postsButton = null;
  if (!POSTS_REGEX.test(pathname) && pathname.includes("/dash")) {
    postsButton = (
      <button title="Posts" onClick={onPostsClicked}>
        My Posts
      </button>
    );
  }

  let newUserButton = null;
  if (isAdmin) {
    if (!USERS_REGEX.test(pathname)) {
      newUserButton = (
        <button title="New User" onClick={onNewUserClicked}>
          New User
        </button>
      );
    }
  }

  let userButton = null;
  if (isAdmin) {
    if (!USERS_REGEX.test(pathname) && pathname.includes("/dash")) {
      userButton = (
        <button title="Users" onClick={onUsersClicked}>
          Users
        </button>
      );
    }
  }

  let buttonContent;
  if (isLoading) {
    buttonContent = <PulseLoader color={"#BADA55"} />;
  } else {
    buttonContent = (
      <>
        {/* {homeButton} */}
        {newPostButton}
        <hr />
        {newUserButton}
        <hr />
        {postsButton}
        <hr />
        {userButton}
        <hr />
        {logoutButton}
      </>
    );
  }

  const divStyles = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "2rem",
    width: "clamp(20rem, 45vw, 60rem)",
    padding: "0 1rem",
    fontSize: ".8rem",
    listStyle: "none",
  };

  const linkStyles = {
    textDecoration: "none",
    color: "#000",
  };

  const errClass = isError ? "errmsg" : "offscreen";

  const content = (
    <>
      <p className={errClass}>{error?.data?.message} </p>

      <header className="dash_header">
        <div
          className={`dash-header__container ${dashClass}`}
          style={divStyles}
        >
          <Link to="/dash/posts" style={linkStyles}>
            <h1 className="dash-header__title">Bincika</h1>
          </Link>
          <div className="user-icon">
            <FontAwesomeIcon icon={faUser} />
            <FontAwesomeIcon icon={faArrowDownShortWide} />
            <nav className="dash-header__nav">{buttonContent}</nav>
          </div>
        </div>
      </header>
    </>
  );

  return content;
};

export default DashHeader;
