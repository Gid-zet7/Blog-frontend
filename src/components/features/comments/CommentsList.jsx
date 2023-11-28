import { useGetCommentsQuery } from "./CommentsApiSlice";
import Comment from "./Comment";
import { PulseLoader } from "react-spinners";
import { useEffect } from "react";

const CommentsList = ({ postId }) => {
  const {
    data: comments,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCommentsQuery("commentsList", {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    console.log(postId);
  });

  let content;

  if (isLoading)
    content = <PulseLoader color={"#000"} className="pulse-loader" />;

  if (isError) {
    content = <p className="errmsg">{error?.data?.message} </p>;
  }

  if (isSuccess) {
    const { ids } = comments;

    const commentContent = ids
      ? ids.map((commentId) => (
          <Comment key={commentId} commentId={commentId} postId={postId} />
        ))
      : null;

    content = <div> {commentContent} </div>;

    return content;
  }
};

export default CommentsList;
