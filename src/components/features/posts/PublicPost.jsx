import { memo } from "react";
import { useGetPubPostsQuery } from "./PublicPostsApiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const PublicPost = ({ postId }) => {
  const container = {
    marginTop: "2.5rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "1rem",
    alignItems: "center",
    fontSize: ".8rem",
  };
  const { post } = useGetPubPostsQuery("publicList", {
    selectFromResult: ({ data }) => ({
      post: data?.entities[postId],
    }),
  });

  const navigate = useNavigate();

  const viewPost = () => navigate(`/dash/posts/view/${postId}`);

  if (post) {
    const created = new Date(post.createdAt).toLocaleString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    let content;
    if (post) {
      // para.substr(0, 200) + "...";
      const truncBody = post.body.substr(0, 200) + "...";
      content = (
        <div style={container} onClick={viewPost}>
          <div style={{ padding: "1rem" }}>
            <h1>{post.title} </h1>
          </div>
          <div
            className="image-container"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={post.image.url}
              alt="something"
              style={{ width: "90%", height: "100%" }}
            />
            <p style={{ fontSize: ".6rem" }}>
              Photo by
              <span style={{ color: "steelblue" }}> {post.image.owner} </span>
              from
              <span style={{ color: "steelblue" }}> {post.image.source}</span>
            </p>
          </div>

          <div style={{ padding: "1rem 1rem 1rem 2rem" }}>
            <p>{truncBody} </p>
          </div>
          <div style={{ display: "flex", gap: 8, padding: 7 }}>
            <p>
              <FontAwesomeIcon icon={faUser} /> {post.username}
            </p>
            <p>#{post.category} </p>
          </div>
          <p>
            <FontAwesomeIcon icon={faCalendar} /> {created}
          </p>
        </div>
      );
    }

    return content;
  } else return null;
};

const memoizedPublicPost = memo(PublicPost);

export default memoizedPublicPost;
