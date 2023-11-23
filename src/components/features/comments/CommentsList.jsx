import { useGetCommentsQuery } from "./CommentsApiSlice";
import Comment from "./Comment";
import { PulseLoader } from "react-spinners";
import { useEffect } from "react";
// import useAuth from "../../../hooks/useAuth";

const CommentsList = ({ postId }) => {
  // const { Username, isAdmin } = useAuth();

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

  if (isLoading) content = <PulseLoader color={"#BADA55"} />;

  if (isError) {
    content = <p className="errmsg">{error?.data?.message} </p>;
  }

  if (isSuccess) {
    const { ids, entities } = comments;

    // let filteredIds;
    // // if (isAdmin) {
    // //   filteredIds = [...ids];
    // //   // console.log(filteredIds)
    // // } else {
    //   filteredIds = ids.filter(
    //     (commentId) => entities[commentId].username === Username
    //   );
    // // }

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
