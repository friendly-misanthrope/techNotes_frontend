import { useGetNotesQuery } from "./notesSlice";
import { BallTriangle } from "react-loader-spinner";
import NoteRowView from "./NoteRowView";

const NotesView = () => {
  const {
    data: notes,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetNotesQuery();

  let content;

  if (isLoading) {
    content = (
      <>
        <p className="loader">Loading...</p>
        <div className="loader">
          <BallTriangle height={100} color="#61dbfb" />
        </div>
      </>
    );
  } else if (isError) {
    content = <p className={isError ? "errmsg" : "offscreen"}>
      {error?.data.message}
    </p>
  } else if (isSuccess) {
    const { ids } = notes;
    const notesTable = ids?.length ?
      ids.map((noteId) =>
    <NoteRowView key={noteId} noteId={noteId} />
    )
    : null

    content = (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">
              Status
            </th>
            <th scope="col">
              Created
            </th>
            <th scope="col">
              Updated
            </th>
            <th scope="col">
              Title
            </th>
            <th scope="col">
              Assigned to
            </th>
            <th scope="col">
              Edit
            </th>
          </tr>
        </thead>
        <tbody>
          {notesTable}
        </tbody>
      </table>
    )
  }
  return content;
};

export default NotesView;