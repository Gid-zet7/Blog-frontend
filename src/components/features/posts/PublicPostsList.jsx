import { useGetPubPostsQuery } from "./PublicPostsApiSlice";
import PublicPost from "./PublicPost";
import { PulseLoader } from "react-spinners";

const PublicPostsList = () => {
  // const sectionContainer = {
  //   marginTop: "2.5rem",
  // };
  const {
    data: posts,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPubPostsQuery("publicList", {
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

    let filteredIds = ids.filter(
      (postId) => entities[postId].public === "true"
    );

    const postContent =
      ids?.length &&
      filteredIds.map((postId) => <PublicPost key={postId} postId={postId} />);

    content = <>{postContent}</>;

    return content;
  }
};

export default PublicPostsList;
