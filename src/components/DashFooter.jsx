import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../hooks/useAuth";

const DashFooter = () => {
  const { Username, status } = useAuth();

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const redirectToHome = () => navigate("/dash/welcome");

  let redirectBtn = null;
  if (pathname !== "/dash") {
    redirectBtn = (
      <button className="dash-footer" title="Home" onClick={redirectToHome}>
        <FontAwesomeIcon icon={faHouse} />
      </button>
    );
  }

  const content = (
    <footer>
      {redirectBtn}
      <p>Current User:{Username} </p>
      <p>Status:{status} </p>
    </footer>
  );
  return content;
};

export default DashFooter;
