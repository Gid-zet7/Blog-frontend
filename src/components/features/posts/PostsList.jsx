import { useGetPostsQuery } from "./postsApiSlice";
import Post from "./Post";
import { PulseLoader } from "react-spinners";
import useAuth from "../../../hooks/useAuth";

const PostsList = () => {
  const { Username, isAdmin } = useAuth();

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
    const { ids, entities } = posts;

    let filteredIds;
    if (isAdmin) {
      filteredIds = [...ids];
      // console.log(filteredIds)
    } else {
      filteredIds = ids.filter(
        (postId) => entities[postId].username === Username
      );
    }

    const postContent =
      ids?.length &&
      filteredIds.map((postId) => <Post key={postId} postId={postId} />);

    content = <div> {postContent} </div>;

    return content;
  }
};

export default PostsList;
