// import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import PostsList from "../posts/PostsList";
// import PublicPostsList from "../posts/PublicPostsList";

const Welcome = () => {
  const { Username } = useAuth();

  const date = new Date();
  const today = new Intl.DateTimeFormat("en-Us", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(date);

  const container = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "1rem",
    alignItems: "center",
  };

  const content = (
    <>
      <div className="sections-container">
        <section className="welcome" style={container}>
          <div className="section-wrap">
            <p style={{ fontSize: ".8rem" }}>{today}</p>
            <h4>Welcome {Username}, Let's get Creative</h4>
          </div>
        </section>
        <section>
          <div className="section-wrap">
            <PostsList />
          </div>
        </section>
      </div>
    </>
  );
  return content;
};

export default Welcome;
