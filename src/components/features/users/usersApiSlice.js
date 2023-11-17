import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../../app/api/apiSlice";

const usersAdapter = createEntityAdapter({});

const initialSate = usersAdapter.getInitialState();

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: "/users",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        const loadedUsers = responseData.map((user) => {
          user.id = user._id;
          return user;
        });
        return usersAdapter.setAll(initialSate, loadedUsers);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "User", id: "LIST" },
            ...result.ids.map((id) => ({ type: "User", id })),
          ];
        } else return [{ type: "User", id: "LIST" }];
      },
    }),
  }),
});

export const { useGetUsersQuery } = usersApiSlice;

export const selectUsersResult = usersApiSlice.endpoints.getUsers.select();

// creates memoized selector
const selectUsersData = createSelector(
  selectUsersResult,
  (usersResult) => usersResult.data //   normalized state object with ids & entities
);

// getSelectors creates these selectors and rename them with aliases using destructuring
export const {
  selectAll: selectAllUsers,
  selectById: selectUsersById,
  selectIds: selectUserIds,
  //   Pass in a selector that returrns the users slice of state
} = usersAdapter.getSelectors((state) => selectUsersData(state) ?? initialSate);
