import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import { useGetPostsQuery } from "./postsApiSlice";

const Post = ({ postId }) => {
  const { post } = useGetPostsQuery("postsList", {
    selectFromResult: ({ data }) => ({
      post: data?.entities[postId],
    }),
  });

  const navigate = useNavigate();

  if (post) {
    const created = new Date(post.createdAt).toLocaleString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const handleEdit = () => navigate(`/dash/posts/${postId}`);

    return (
      <div>
        <h1>Title: {post.title} </h1>
        <img src={post.image.url} alt="something" />
        <p>{post.body} </p>
        <p>#{post.category} </p>
        <p>Date: {created} </p>
        {/* <p>{updated} </p> */}
      </div>
    );
  } else return null;
};

export default Post;
