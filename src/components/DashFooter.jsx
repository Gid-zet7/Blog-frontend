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

  const footerStyles = {
    display: "flex",
    gap: "1rem",
    position: "absolute",
    bottom: 0,
    color: "#fff",
    width: "100vw",
    padding: "2rem 2.5rem",
    backgroundColor: "#000",
  };

  const content = (
    <footer style={footerStyles}>
      <div>
        <h6>{Username} </h6>
        <h6>{status} </h6>
        {redirectBtn}
      </div>
      <div className="about-footer">
        <h4>About Bincika</h4>
        <h6>About us</h6>
        <h6>Our mission</h6>
      </div>
      <div className="contact-footer">
        <h4>Contact us</h4>
        <h6>Advertise</h6>
        <h6>Whatsapp</h6>
        <h6>Email</h6>
      </div>
    </footer>
  );
  return content;
};

export default DashFooter;
