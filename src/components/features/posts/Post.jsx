import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import { useGetPostsQuery } from "./postsApiSlice";
import { useEffect } from "react";

const Post = ({ postId }) => {
  const { post } = useGetPostsQuery("postsList", {
    selectFromResult: ({ data }) => ({
      post: data?.entities[postId],
    }),
  });

  const navigate = useNavigate();

  useEffect(() => {
    console.log("mounted");
    console.log(post);
  });

  if (post) {
    const created = new Date(post.createdAt).toLocaleString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    // const updated = new Date(bill.updatedAt).toLocaleString("en-US", {day: "numeric", month: "long"})

    const handleEdit = () => navigate(`/home/posts/${postId}`);

    return (
      <div>
        <h1>Title: {post.title} </h1>
        <p>{post.content} </p>
        <p>{post.category} </p>
        <p>Date: {created} </p>
        {/* <p>{updated} </p> */}
      </div>
    );
  } else return null;
};

export default Post;
