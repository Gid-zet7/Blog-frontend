import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../../app/api/apiSlice";

const pubPostsAdapter = createEntityAdapter({
  // sort date
});

const initialSate = pubPostsAdapter.getInitialState();

export const pubPostsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPubPosts: builder.query({
      query: () => ({
        url: "/public",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        const loadedPosts = responseData.map((post) => {
          post.id = post._id;
          return post;
        });
        return pubPostsAdapter.setAll(initialSate, loadedPosts);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Public", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Public", id })),
          ];
        } else return [{ type: "Public", id: "LIST" }];
      },
    }),
  }),
});

export const { useGetPubPostsQuery } = pubPostsApiSlice;

export const selectPubPostsResult =
  pubPostsApiSlice.endpoints.getPubPosts.select();

// creates memoized selector
const selectPubPostsData = createSelector(
  selectPubPostsResult,
  (postsResult) => postsResult.data //   normalized state object with ids & entities
);

// getSelectors creates these selectors and rename them with aliases using destructuring
export const {
  selectAll: selectAllPubPosts,
  selectById: selectPubPostsById,
  selectIds: selectPubPostIds,
  //   Pass in a selector that returrns the users slice of state
} = pubPostsAdapter.getSelectors(
  (state) => selectPubPostsData(state) ?? initialSate
);
