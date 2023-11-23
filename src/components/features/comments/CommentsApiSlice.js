import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../../app/api/apiSlice";

const commentsAdapter = createEntityAdapter({
  // sort date
});

const initialSate = commentsAdapter.getInitialState();

export const commentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getComments: builder.query({
      query: () => ({
        url: "/comments/list",
        method: "GET",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        const loadedComments = responseData.map((comment) => {
          comment.id = comment._id;
          return comment;
        });
        return commentsAdapter.setAll(initialSate, loadedComments);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Comments", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Comment", id })),
          ];
        } else return [{ type: "Comment", id: "LIST" }];
      },
    }),
    addNewComment: builder.mutation({
      query: (initialCommentData) => ({
        url: "/comments",
        method: "POST",
        body: {
          ...initialCommentData,
        },
      }),
      invalidatesTags: [{ type: "Comment", id: "LIST" }],
    }),
    updateComment: builder.mutation({
      query: (initialCommentData) => ({
        url: "/comments",
        method: "PATCH",
        body: {
          ...initialCommentData,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Comment", id: arg.id },
      ],
    }),
    deleteComment: builder.mutation({
      query: ({ id }) => ({
        url: "/comments",
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Comment", id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useAddNewCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} = commentsApiSlice;

export const selectCommentsResult =
  commentsApiSlice.endpoints.getComments.select();

// creates memoized selector
const selectCommentsData = createSelector(
  selectCommentsResult,
  (commentsResult) => commentsResult.data //   normalized state object with ids & entities
);

// getSelectors creates these selectors and rename them with aliases using destructuring
export const {
  selectAll: selectAllComments,
  selectById: selectCommentsById,
  selectIds: selectCommentIds,
  //   Pass in a selector that returrns the users slice of state
} = commentsAdapter.getSelectors(
  (state) => selectCommentsData(state) ?? initialSate
);
