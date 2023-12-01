import { memo } from "react";
import { useGetPubPostsQuery } from "../PublicPostsApiSlice";
import { useNavigate } from "react-router-dom";

const AfricaPubPost = ({ postId }) => {
  const container = {
    // marginTop: "2.5rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "1rem",
    alignItems: "center",
    fontSize: "1rem",
    width: "350px",
    // width: "clamp(18rem, 80%, 30rem)",
    height: "500px",
  };
  const { post } = useGetPubPostsQuery("publicList", {
    selectFromResult: ({ data }) => ({
      post: data?.entities[postId],
    }),
  });

  const navigate = useNavigate();

  const viewPost = () => navigate(`/posts/${postId}`);

  if (post) {
    let content;
    if (post) {
      // para.substr(0, 200) + "...
      content = (
        <div style={container} onClick={viewPost}>
          <div
            className="image-container"
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.45)), url(${post.image.url})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              padding: "1rem",
              width: "100%",
              height: "70%",
            }}
          >
            <div
              style={{
                padding: "1rem 0",
                fontSize: "clamp(.8rem, 70%, 1.2rem)",
                display: "flex",
                flexDirection: "column",
                color: "#fff",
                justifyContent: "center",
                width: "100%",
                height: "100%",
              }}
            >
              <h1>{post.title} </h1>
              <p>by {post.username}</p>
              <p>#{post.category}</p>
            </div>
          </div>
        </div>
      );
    }

    return content;
  } else return null;
};

const memoizedAfricaPubPost = memo(AfricaPubPost);

export default memoizedAfricaPubPost;
