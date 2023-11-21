import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const Welcome = () => {
  const { Username, isAdmin } = useAuth();

  const date = new Date();
  const today = new Intl.DateTimeFormat("en-Us", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(date);

  const content = (
    <section className="welcome">
      <p>{today}</p>

      <h1>Welcome {Username}, I hope you are having a good time?</h1>

      <p>
        <Link to="/dash/posts">View posts</Link>
      </p>
      <p>
        <Link to="/dash/posts/new">Add new Post</Link>
      </p>
      {isAdmin && (
        <p>
          <Link to="/dash/users/new">Add new user</Link>
        </p>
      )}

      {isAdmin && (
        <p>
          <Link to="/dash/users">user settings</Link>
        </p>
      )}
    </section>
  );
  return content;
};

export default Welcome;
