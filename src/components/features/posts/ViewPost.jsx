import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { memo, useState } from "react";
import { useParams } from "react-router-dom";

import { useGetPostsQuery } from "./postsApiSlice";
import NewCommentForm from "../comments/NewCommentForm";
import useAuth from "../../../hooks/useAuth";
import CommentsList from "../comments/CommentsList";

const ViewPost = () => {
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
    marginTop: "5rem",
  };

  const navigate = useNavigate();
  const [viewComment, setViewComment] = useState(false);

  const handleEdit = () => navigate(`/dash/posts/${id}`);
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
            {editButton}
            <button onClick={handleCommentView}>View Comments</button>
            {viewComment && (
              <>
                <h1>Comments</h1>
                <NewCommentForm postId={id} username={Username} />
                <CommentsList postId={post.id} />
              </>
            )}
          </div>
        </div>
      </>
    );
  } else return null;
};

const memoizedViewPost = memo(ViewPost);

export default memoizedViewPost;
