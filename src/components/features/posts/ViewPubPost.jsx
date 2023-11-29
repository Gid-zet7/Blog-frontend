import { memo, useState } from "react";
import { useParams } from "react-router-dom";
import NewCommentForm from "../comments/NewCommentForm";
import CommentsList from "../comments/CommentsList";
import { useGetPubPostsQuery } from "./PublicPostsApiSlice";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignIn } from "@fortawesome/free-solid-svg-icons";

const ViewPubPost = () => {
  const { id } = useParams();
  const { post } = useGetPubPostsQuery("postsList", {
    selectFromResult: ({ data }) => ({
      post: data?.entities[id],
    }),
  });

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

  const container = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "1rem",
    alignItems: "center",
    marginTop: "5rem",
  };

  const [viewComment, setViewComment] = useState(false);
  const handleCommentView = () => {
    setViewComment((prevState) => !prevState);
  };

  if (post) {
    const created = new Date(post.createdAt).toLocaleString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    return (
      <section className="view-public">
        <div style={container}>
          <header style={headerStyles}>
            <ul style={ulStyles}>
              {/* <div>
              <p style={{ textDecoration: "underline" }}>Topics</p>
            </div> */}
              <div className="view-public__title">
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
                    <FontAwesomeIcon
                      icon={faSignIn}
                      style={{ color: "#fff" }}
                    />
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
          <div className="view-wrap">
            <h1 style={{ marginBottom: "1rem" }}>{post.title} </h1>
            <p style={{ marginBottom: "1rem" }}>
              by {post.username} | {created}
            </p>
            <img
              src={post.image.url}
              alt="something"
              style={{ width: "100%", height: "100%", marginBottom: "1rem" }}
            />
            <div className="post-body__container">
              <p style={{ lineHeight: 2, letterSpacing: 0.8 }}>{post.body} </p>
            </div>

            <p>#{post.category} </p>
            <button onClick={handleCommentView}>View Comments</button>
            {viewComment && (
              <>
                <h1>Comments</h1>
                <NewCommentForm postId={id} />
                <CommentsList postId={post.id} />
              </>
            )}
          </div>
        </div>
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
      </section>
    );
  } else return null;
};

const memoizedViewPubPost = memo(ViewPubPost);

export default memoizedViewPubPost;
