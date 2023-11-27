import { memo } from "react";
import { useGetPubPostsQuery } from "./PublicPostsApiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faUser } from "@fortawesome/free-solid-svg-icons";

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
        <div style={container}>
          <div style={{ padding: "1rem" }}>
            <h1>{post.title} </h1>
          </div>
          <img
            src={post.image.url}
            alt="something"
            style={{ width: "90%", height: "100%" }}
          />

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
