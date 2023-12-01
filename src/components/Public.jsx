import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignIn } from "@fortawesome/free-solid-svg-icons";
import PublicPostsList from "./features/posts/PublicPostsList";
import AfricaPubPostsList from "./features/posts/Africa/AfricaPubPostList";
import EntertainmentPubList from "./features/posts/Entertainment/EntertainmentPubList";
import RealLifePubList from "./features/posts/RealLifeStories/RealLifePubList";
import LawPubPostList from "./features/posts/Law/LawPubPostList";

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
    justifyContent: "space-between",
    alignItems: "center",
    // gap: "2rem",
    width: "clamp(20rem, 45vw, 60rem)",
    padding: "0 1rem",
    fontSize: ".8rem",
    listStyle: "none",
  };

  const authContainerStyles = {
    display: "flex",
    // gap: "1rem",
  };

  const buttonStyles = {
    padding: ".5em 1em",
    display: "flex",
    // gap: ".5rem",
    backgroundColor: "#000",
    border: "none",
    marginLeft: "3rem",
    borderRadius: 8,
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
            {/* <div>
              <p style={{ textDecoration: "underline" }}>Topics</p>
            </div> */}
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
                <button className="signup-link">
                  <Link to={"/signup"} style={linkStyles}>
                    Sign up
                  </Link>
                </button>
              </li>
            </div>
          </ul>
        </header>
        <section className="section-gradient" style={sectionGradient}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              // gap: "1rem",
              maxWidth: "60rem",
            }}
          >
            <h1>Embark on a learning adventure.</h1>
            <p style={{ lineHeight: 1.5, fontSize: ".6rem" }}>
              Just like any adventure, the path of learning is filled with
              challenges and surprises. It involves overcoming obstacles, facing
              the unknown, and adapting to new landscapes of understanding. Each
              lesson, whether big or small, becomes a stepping stone, propelling
              you further into the realm of expertise and wisdom.
            </p>
          </div>
        </section>
        <div className="sections-container">
          <section>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "1rem",
              }}
            >
              <h1>Top Stories</h1>
            </div>
            <div id="public-posts__container" className="section-wrap">
              <PublicPostsList />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                fontSize: "2rem",
              }}
            >
              <button
                style={{
                  padding: "1rem 2rem",
                  color: "#fff",
                  backgroundColor: "#000",
                  border: "none",
                }}
              >
                See All Posts
              </button>
            </div>
          </section>
          <section>
            <div className="section-wrap">
              <div style={{ lineHeight: 1.5, padding: "2rem" }}>
                <h2>Want to be an author of this Blog?</h2>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed,
                  odit culpa. Laboriosam fugiat, voluptates animi distinctio
                  officiis sapiente dolores quis ex dolorum debitis. Corporis
                  veniam, impedit amet voluptatibus alias repellat consequuntur
                  ratione molestiae adipisci iste nobis numquam iure dolorum ex
                  libero aspernatur cupiditate tempore id magnam. Fugiat minus
                  repellat suscipit explicabo atque labore tenetur, dignissimos
                  a? Sed iusto tempore quae officia necessitatibus nobis velit
                  minima enim neque adipisci dolorem optio nulla tempora quis
                  inventore doloribus amet itaque culpa, dolor numquam
                  reprehenderit incidunt accusantium. Non amet eaque praesentium
                  sequi quibusdam vel ea quidem repellendus asperiores quis ut
                  labore obcaecati, repudiandae suscipit fuga, repellat
                  veritatis dolor eligendi
                </p>
              </div>
            </div>
          </section>
        </div>
        <section className="Africa-section">
          <div>
            <div style={{ lineHeight: 1.5, padding: "2rem" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  color: "#df4439",
                  fontSize: "3rem",
                }}
              >
                <h2>Beautiful Africa</h2>
              </div>
              <div className="Africa__section-wrap">
                <AfricaPubPostsList />

                {/* <AfricaPubPostsList /> */}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  fontSize: "2rem",
                }}
              >
                <button
                  style={{
                    padding: "1rem 2rem",
                    backgroundColor: "#fff",
                    border: "none",
                    fontSize: "1rem",
                    fontWeight: "200",
                    letterSpacing: 7,
                  }}
                >
                  See All Posts
                </button>
              </div>
            </div>
          </div>
        </section>
        <section className="Entertainment-section">
          <div>
            <div style={{ lineHeight: 1.5, padding: "2rem" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  color: "#a5ff69",
                  fontSize: "2rem",
                }}
              >
                <h2>Entertainment news</h2>
              </div>
              <div className="Entertainment__section-wrap">
                <EntertainmentPubList />
                {/* <AfricaPubPostsList /> */}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  fontSize: "2rem",
                }}
              >
                <button
                  style={{
                    padding: "1rem 2rem",
                    backgroundColor: "#fff",
                    border: "none",
                    fontSize: "1rem",
                    fontWeight: "200",
                    letterSpacing: 7,
                  }}
                >
                  See All Posts
                </button>
              </div>
            </div>
          </div>
        </section>
        <div className="sections-container">
          <section>
            <div className="section-wrap">
              <div style={{ lineHeight: 1.5, padding: "2rem" }}>
                <h2>#Real life Stories</h2>
                <div>
                  <RealLifePubList />
                </div>
              </div>
            </div>
          </section>
        </div>

        <section className="Law-section">
          <div
            className="law__background-image"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                color: "#fff",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "2rem",
              }}
            >
              <h1>Do the laws of Ghana even work?</h1>
            </div>
          </div>
        </section>
        <div className="sections-container">
          <section>
            <div className="section-wrap">
              <div style={{ lineHeight: 1.5, padding: "2rem" }}>
                <div>
                  <LawPubPostList />
                </div>
              </div>
            </div>
          </section>
        </div>
        <section className="section-gradient" style={sectionGradient}>
          <div
            className="featured-categories"
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: "60rem",
            }}
          >
            <h1>Featured categories</h1>
            <div
              style={{
                display: "flex",
                // gap: "1rem",
                width: "80%",
              }}
            >
              <p style={{ lineHeight: 1.5, fontSize: ".7rem" }}>#Travel</p>
              <p style={{ lineHeight: 1.5, fontSize: ".7rem" }}>
                #Entertainment news
              </p>
              <p style={{ lineHeight: 1.5, fontSize: ".7rem" }}>
                #Real life Stories
              </p>
              <p style={{ lineHeight: 1.5, fontSize: ".7rem" }}>#Law</p>
            </div>
          </div>
        </section>

        <footer>
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
      </div>
    </>
  );

  return content;
};

export default Public;
