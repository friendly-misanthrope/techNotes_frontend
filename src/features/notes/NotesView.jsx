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
      <table className="table table--notes">
        <thead className="table__thead">
          <tr>
            <th scope="col" className="table__th note__status">
              Username
            </th>
            <th scope="col" className="table__th note__created">
              Created
            </th>
            <th scope="col" className="table__th note__updated">
              Updated
            </th>
            <th scope="col" className="table__th note__title">
              Title
            </th>
            <th scope="col" className="table__th note__username">
              Assigned to
            </th>
            <th scope="col" className="table__th note__edit">
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