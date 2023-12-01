import { memo } from "react";
import { useGetPubPostsQuery } from "./PublicPostsApiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const PublicPost = ({ postId }) => {
  const container = {
    // marginTop: "2.5rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "1rem",
    alignItems: "center",
    fontSize: ".9rem",
  };
  const { post } = useGetPubPostsQuery("publicList", {
    selectFromResult: ({ data }) => ({
      post: data?.entities[postId],
    }),
  });

  const navigate = useNavigate();

  const viewPost = () => navigate(`/posts/${postId}`);

  if (post) {
    const created = new Date(post.createdAt).toLocaleString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    let content;
    if (post) {
      // para.substr(0, 200) + "...";
      const truncBody = post.body.substr(0, 300) + "...";
      content = (
        <div style={container} onClick={viewPost}>
          <div style={{ padding: "1rem 0" }}>
            <h1>{post.title} </h1>
          </div>
          <div className="image-container">
            <img
              src={post.image.url}
              alt="something"
              style={{ width: "100%", height: "100%" }}
            />
            <p>
              <p style={{ fontSize: ".6rem" }}>
                Photo by
                <span style={{ color: "steelblue" }}> {post.image.owner} </span>
                from
                <span style={{ color: "steelblue" }}> {post.image.source}</span>
              </p>
            </p>
          </div>

          <div style={{ padding: "1rem 0" }}>
            <p>{truncBody} </p>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <p>
              <FontAwesomeIcon icon={faUser} /> {post.username}
            </p>
            <p>#{post.category} </p>
            <p>
              <FontAwesomeIcon icon={faCalendar} /> {created}
            </p>
          </div>
        </div>
      );
    }

    return content;
  } else return null;
};

const memoizedPublicPost = memo(PublicPost);

export default memoizedPublicPost;
