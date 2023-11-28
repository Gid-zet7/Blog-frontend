import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faPenToSquare,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { memo, useState } from "react";
import { useGetPostsQuery } from "./postsApiSlice";
import NewCommentForm from "../comments/NewCommentForm";
import useAuth from "../../../hooks/useAuth";
import CommentsList from "../comments/CommentsList";

const Post = ({ postId }) => {
  const { Username } = useAuth();
  const { post } = useGetPostsQuery("postsList", {
    selectFromResult: ({ data }) => ({
      post: data?.entities[postId],
    }),
  });

  const container = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "1rem",
    alignItems: "center",
    fontSize: ".8rem",
  };

  const navigate = useNavigate();
  const [viewComment, setViewComment] = useState(false);

  const handleEdit = () => navigate(`/dash/posts/${postId}`);
  const handleCommentView = () => {
    setViewComment((prevState) => !prevState);
  };

  const viewPost = () => navigate(`/dash/posts/view/${postId}`);

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

    const truncBody = post.body.substr(0, 200) + "...";

    return (
      <>
        <div style={container} onClick={viewPost}>
          <div style={{ padding: "1rem" }}>
            <h1>Title: {post.title} </h1>
          </div>
          <div className="image-container">
            <img
              src={post.image.url}
              alt="something"
              style={{ width: "90%", height: "100%" }}
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

          <div style={{ padding: "1rem" }}>
            <p>{truncBody} </p>
          </div>
          <p>
            <FontAwesomeIcon icon={faUser} /> {post.username}
          </p>
          <p>
            <FontAwesomeIcon icon={faCalendar} /> {created}
          </p>
          <p>#{post.category} </p>
          {editButton}
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button onClick={handleCommentView}>View Comments</button>
        </div>

        {viewComment && (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <h1>Comments</h1>
              <NewCommentForm postId={postId} username={Username} />
              <CommentsList postId={post.id} />
            </div>
          </>
        )}
      </>
    );
  } else return null;
};

const memoizedPost = memo(Post);

export default memoizedPost;
