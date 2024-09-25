import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../../app/api/apiSlice';

const notesAdapter = createEntityAdapter({
  sortComparer: (a, b) => {
    if (a.isCompleted === b.isCompleted) {
      return 0;
    } else if (a.isCompleted) {
      return 1;
    } else return -1
  }
});

const initialState = notesAdapter.getInitialState();

export const notesSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotes: builder.query({
      query: () => '/notes',
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError
      },
      keepUnusedDataFor: 5,
      transformResponse: (notesData) => {
        const loadedNotes = notesData.map((note) => {
          note.id = note._id;
          return note;
        });
        return notesAdapter.setAll(initialState, loadedNotes);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'Note', id: 'NOTESLIST' },
            ...result.ids.map((id) => (
              { type: 'Note', id }
            ))
          ]
        } else {
          return [{ type: 'Note', id: 'NOTESLIST' }]
        }
      }
    }),
    addNewNote: builder.mutation({
      query: newNote => ({
        url: '/notes',
        method: 'POST',
        body: {...newNote}
      }),
      invalidatesTags: [
        {type: 'Note', id: 'NOTESLIST'}
      ]
    }),
    updateNote: builder.mutation({
      query: noteToUpdate => ({
        url: `/notes/${noteToUpdate._id}`,
        method: 'PUT',
        body: { ...noteToUpdate }
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Note', id: arg.id }
      ]
    }),
    deleteNote: builder.mutation({
      query: ({ id }) => ({
        url: `/notes/${id}`,
        method: 'DELETE',
        body: { id }
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'NOTESLIST', id: arg.id }
      ]
    })
  })
});

export const {
  useGetNotesQuery,
  useAddNewNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation
} = notesSlice;

export const selectNotesResult = notesSlice.endpoints.getNotes.select();

const selectNotesData = createSelector(
  selectNotesResult,
  (notesResult) => notesResult.data
);

export const {
  selectAll: selectAllNotes,
  selectById: selectNoteById,
  selectIds: selectNoteIds
} = notesAdapter.getSelectors((state) => 
  selectNotesData(state) ?? initialState
);