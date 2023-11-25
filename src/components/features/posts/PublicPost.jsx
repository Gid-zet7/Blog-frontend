import { memo } from "react";
import { useGetPubPostsQuery } from "./PublicPostsApiSlice";

const PublicPost = ({ postId }) => {
  const container = {
    marginTop: "2.5rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "1rem",
    alignItems: "center",
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
          <img
            src={post.image.url}
            alt="something"
            style={{ width: "90%", height: "100%" }}
          />
          <p>Author: {post.username}</p>

          <h1>{post.title} </h1>
          <p>{truncBody} </p>

          <p>#{post.category} </p>
          <p>Date: {created} </p>
        </div>
      );
    }

    return content;
  } else return null;
};

const memoizedPublicPost = memo(PublicPost);

export default memoizedPublicPost;
