import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignIn } from "@fortawesome/free-solid-svg-icons";
import PublicPostsList from "./features/posts/PublicPostsList";

const Public = () => {
  const headerStyles = {
    position: "fixed",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    top: 0,
    zIndex: 1,
    width: "100vw",
    backgroundColor: "#fff",
    boxShadow: "rgba(33, 35, 38, 0.1) 0px 10px 10px -10px",
    height: 100,
  };

  const ulStyles = {
    position: "fixed",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: "5rem",
    padding: "0 1rem",
    fontSize: ".8rem",
    listStyle: "none",
  };

  const authContainerStyles = {
    display: "flex",
    gap: "2rem",
  };

  const buttonStyles = {
    padding: ".5em 1em",
    display: "flex",
    gap: ".5rem",
    backgroundColor: "#000",
    border: "none",
    marginLeft: "3rem",
    borderRadius: 8,
  };

  const signupStyles = {
    padding: ".5em 1em",
    display: "none",
    gap: ".5rem",
    backgroundColor: "#000",
    border: "none",
  };

  const linkStyles = {
    textDecoration: "none",
    color: "#fff",
  };

  const sectionGradient = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "3rem",
    marginTop: "6.3rem",
    background: "linear-gradient(45deg, #a1a5a238, transparent)",
  };

  let content = (
    <>
      <div className="Public">
        <header style={headerStyles}>
          <ul style={ulStyles}>
            <div className="public__title">
              <li>
                <h1>Bincika</h1>
              </li>
            </div>
            <div className="auth__container" style={authContainerStyles}>
              <li>
                <button className="login__btn" style={buttonStyles}>
                  <Link to={"/login"} style={linkStyles}>
                    Login
                  </Link>
                  <FontAwesomeIcon icon={faSignIn} style={{ color: "#fff" }} />
                </button>
              </li>
              <li>
                <button style={signupStyles}>
                  <Link to={"/signup"} style={linkStyles}>
                    Sign up
                  </Link>
                </button>
              </li>
            </div>
          </ul>
        </header>
        <section style={sectionGradient}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <h1>Embark on a learning adventure.</h1>
            <p style={{ lineHeight: 1.5, fontSize: ".6rem" }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
              maiores natus tenetur repellat fugiat? Aliquid minima porro quis
              eligendi neque!
            </p>
          </div>
        </section>
        <section>
          <PublicPostsList />
        </section>
      </div>
    </>
  );

  return content;
};

export default Public;
