import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { memo, useState } from "react";
import { useParams } from "react-router-dom";

import { useGetPostsQuery } from "./postsApiSlice";
import NewCommentForm from "../comments/NewCommentForm";
import useAuth from "../../../hooks/useAuth";
import CommentsList from "../comments/CommentsList";

const ViewPost = ({ postId }) => {
  const { id } = useParams();
  const { Username } = useAuth();
  const { post } = useGetPostsQuery("postsList", {
    selectFromResult: ({ data }) => ({
      post: data?.entities[id],
    }),
  });

  const container = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "1rem",
    alignItems: "center",
  };

  const navigate = useNavigate();
  const [viewComment, setViewComment] = useState(false);

  const handleEdit = () => navigate(`/dash/posts/${postId}`);
  const handleCommentView = () => {
    setViewComment((prevState) => !prevState);
  };

  let editButton;
  if (post.username === Username) {
    editButton = (
      <button onClick={handleEdit}>
        <FontAwesomeIcon icon={faPenToSquare} />
      </button>
    );
  }

  if (post) {
    const created = new Date(post.createdAt).toLocaleString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    return (
      <>
        <div style={container}>
          <h1>Title: {post.title} </h1>
          <p>Author: {post.username}</p>
          <img
            src={post.image.url}
            alt="something"
            style={{ width: "90%", height: "100%" }}
          />
          <p>{post.body} </p>
          <p>#{post.category} </p>
          <p>Date: {created} </p>
          {editButton}
          <button onClick={handleCommentView}>View Comments</button>
          {viewComment && (
            <>
              <h1>Comments</h1>
              <NewCommentForm postId={postId} username={Username} />
              <CommentsList postId={post.id} />
            </>
          )}
        </div>
      </>
    );
  } else return null;
};

const memoizedViewPost = memo(ViewPost);

export default memoizedViewPost;
