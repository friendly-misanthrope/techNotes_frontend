import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../../app/api/apiSlice';

const usersAdapter = createEntityAdapter({
  selectId: (user) => user._id
});

const initialState = usersAdapter.getInitialState();

export const usersSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => '/users',
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError
      },
      keepUnusedDataFor: 5,
      transformResponse: (usersData) => {
        return usersAdapter.setAll(initialState, usersData);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'User', id: 'USERSLIST' },
            ...result.ids.map((id) => (
              { type: 'User', id }
            ))
          ]
        } else {
          return [{ type: 'User', id: 'USERSLIST' }]
        }
      }
    }),
    addNewUser: builder.mutation({
      query: newUser => ({
        url:'/users',
        method: 'POST',
        body: {...newUser}
      }),
      invalidatesTags: [
        { type: 'User', id: 'USERSLIST' }
      ]
    }),
    updateUser: builder.mutation({
      query: updatedUser => ({
        url: '/users',
        method: 'PATCH',
        body: {...updatedUser}
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'User', id: arg.id }
      ]
    }),
    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: '/users',
        method: 'DELETE',
        body: { id }
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'User', id: arg.id }
      ]
    })
  })
});

export const {
  useGetUsersQuery,
  useAddNewUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation
} = usersSlice;

// Returns query result object
export const selectUsersResult = usersSlice.endpoints.getUsers.select();

// Creates memoized selector
const selectUsersData = createSelector(
  selectUsersResult,
  // usersResult is a normalized state object with ids & entities
  (usersResult) => usersResult.data
);

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds
  // Passes a selector into getSelectors() that returns
  // the users state slice if data exists, otherwise initialState
} = usersAdapter.getSelectors(state => selectUsersData(state) ?? initialState)