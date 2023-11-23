import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { memo, useState } from "react";

import { useGetPostsQuery } from "./postsApiSlice";
import NewCommentForm from "../comments/NewCommentForm";
import useAuth from "../../../hooks/useAuth";
import CommentsList from "../comments/CommentsList";

const Post = ({ postId, commentId }) => {
  const { Username } = useAuth();
  const { post } = useGetPostsQuery("postsList", {
    selectFromResult: ({ data }) => ({
      post: data?.entities[postId],
    }),
  });

  const navigate = useNavigate();
  const [viewComment, setViewComment] = useState(false);

  if (post) {
    const created = new Date(post.createdAt).toLocaleString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const handleEdit = () => navigate(`/dash/posts/${postId}`);
    const handleCommentView = () => {
      setViewComment((prevState) => !prevState);
    };

    return (
      <>
        <div>
          <h1>Title: {post.title} </h1>
          <p>Author: {post.username}</p>
          <img src={post.image.url} alt="something" />
          <p>{post.body} </p>
          <p>#{post.category} </p>
          <p>Date: {created} </p>
          <button onClick={handleEdit}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </div>
        <button onClick={handleCommentView}>View Comments</button>
        {viewComment && (
          <>
            <h1>Comments</h1>
            <NewCommentForm postId={postId} username={Username} />
            <CommentsList postId={post.id} />
          </>
        )}
      </>
    );
  } else return null;
};

const memoizedPost = memo(Post);

export default memoizedPost;
