// import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import PostsList from "../posts/PostsList";

const Welcome = () => {
  const { Username } = useAuth();

  const date = new Date();
  const today = new Intl.DateTimeFormat("en-Us", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(date);

  const container = {
    marginTop: "8rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "1rem",
    alignItems: "center",
  };

  const content = (
    <>
      <section className="welcome" style={container}>
        <p style={{ fontSize: ".8rem" }}>{today}</p>
        <h4>Welcome {Username}, Let's get Creative</h4>
      </section>
      <section>
        <PostsList />
      </section>
    </>
  );
  return content;
};

export default Welcome;
