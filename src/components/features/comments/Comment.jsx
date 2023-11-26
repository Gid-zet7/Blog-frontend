import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
// import { useNavigate } from "react-router-dom";
import { memo, useEffect } from "react";

import { useGetCommentsQuery } from "./CommentsApiSlice";
import { useDeleteCommentMutation } from "./CommentsApiSlice";

const Comment = ({ commentId, postId }) => {
  const { comment } = useGetCommentsQuery("commentsList", {
    selectFromResult: ({ data }) => ({
      comment: data?.entities[commentId],
    }),
  });

  const [
    deleteComment,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeleteCommentMutation();

  // const navigate = useNavigate();

  useEffect(() => {
    if (isDelSuccess) console.log("deleted succesfully");
  }, [isDelSuccess]);

  if (comment) {
    const created = new Date(comment.createdAt).toLocaleString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    // const handleEdit = () => navigate(`/dash/posts/${commentId}`);
    const errClass = isDelError ? "errmsg" : "offscreen";

    const errContent = delerror?.data?.message ?? "";

    let content;
    if (comment.post === postId) {
      const onDeleteCommentClicked = async () => {
        await deleteComment({ id: comment.id });
      };
      content = (
        <>
          <p className={errClass}>{errContent}</p>
          <div>
            <p>Author: {comment.username}</p>
            <p>{comment.content} </p>
            <p>Date: {created} </p>
            <button onClick={onDeleteCommentClicked}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </>
      );
    }

    return content;
  } else return null;
};

const memoizedComment = memo(Comment);

export default memoizedComment;
