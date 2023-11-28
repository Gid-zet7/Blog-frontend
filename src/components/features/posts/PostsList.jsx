import { useGetPostsQuery } from "./postsApiSlice";
import Post from "./Post";
import { PulseLoader } from "react-spinners";

const PostsList = () => {
  const {
    data: posts,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPostsQuery("postsList", {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;

  if (isLoading) content = <PulseLoader color={"#BADA55"} />;

  if (isError) {
    content = <p className="errmsg">{error?.data?.message} </p>;
  }

  if (isSuccess) {
    const { ids } = posts;

    const postContent =
      ids?.length && ids.map((postId) => <Post key={postId} postId={postId} />);

    content = <>{postContent}</>;

    return content;
  }
};

export default PostsList;
