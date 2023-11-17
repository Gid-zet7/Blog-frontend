import { Link } from "react-router-dom";

const Welcome = () => {
  const date = new Date();
  const today = new Intl.DateTimeFormat("en-Us", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(date);

  const content = (
    <section className="welcome">
      <p>{today}</p>

      <h1>Welcome user!, I hope you are having a good time?</h1>

      <p>
        <Link to="/dash/posts">View posts</Link>
      </p>
      <p>
        <Link to="/dash/posts">Add new Post</Link>
      </p>
      <p>
        <Link to="/dash/users">user settings</Link>
      </p>
    </section>
  );
  return content;
};

export default Welcome;
