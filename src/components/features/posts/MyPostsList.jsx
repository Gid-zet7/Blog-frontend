import { useGetPostsQuery } from "./postsApiSlice";
import Post from "./Post";
import { PulseLoader } from "react-spinners";
import useAuth from "../../../hooks/useAuth";

const MyPostsList = () => {
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

  if (isLoading)
    content = (
      <div className="loader-container">
        <PulseLoader color={"#000"} className="pulse-loader" />
      </div>
    );

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

export default MyPostsList;
