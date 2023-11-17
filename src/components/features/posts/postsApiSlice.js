import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../../app/api/apiSlice";

const postsAdapter = createEntityAdapter({
  // sort date
});

const initialSate = postsAdapter.getInitialState();

export const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => ({
        url: "/posts",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        const loadedPosts = responseData.map((post) => {
          post.id = post._id;
          return post;
        });
        return postsAdapter.setAll(initialSate, loadedPosts);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Post", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Post", id })),
          ];
        } else return [{ type: "Post", id: "LIST" }];
      },
    }),
  }),
});

export const { useGetPostsQuery } = postsApiSlice;

export const selectPostsResult = postsApiSlice.endpoints.getPosts.select();

// creates memoized selector
const selectUsersData = createSelector(
  selectPostsResult,
  (postsResult) => postsResult.data //   normalized state object with ids & entities
);

// getSelectors creates these selectors and rename them with aliases using destructuring
export const {
  selectAll: selectAllPosts,
  selectById: selectPostsById,
  selectIds: selectPostIds,
  //   Pass in a selector that returrns the users slice of state
} = postsAdapter.getSelectors((state) => selectUsersData(state) ?? initialSate);
