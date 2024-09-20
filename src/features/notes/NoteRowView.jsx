import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectNoteById } from "./notesSlice";

const NoteRowView = ({noteId}) => {

  const note = useSelector((state) => selectNoteById(state, noteId));
  const navigate = useNavigate();

  const onNoteClick = () => {
    navigate(`/dashboard/notes/${noteId}`)
  }

  if (note) {
    const createdAt = new Date(note.createdAt).toLocaleString('en-US', {day: "numeric", month: "long"});
    const updatedAt = new Date(note.updatedAt).toLocaleString('en-US', {day: "numeric", month: "long"});
    const handleNoteEdit = () => navigate(`/dashboard/notes/${note._id}`);

    return (
      <tr className="note-click" onClick={onNoteClick}>
        <td>
          {
            note.isCompleted ?
              <span className="note__status--completed">Complete</span>
              : <span className="note__status--open">Open</span>
          }
        </td>
        <td>{createdAt}</td>
        <td>{updatedAt}</td>
        <td>{note.title}</td>
        <td>{note.assignedUser.username}</td>

        <td>
          <button className="icon-button table__button"
          onClick={handleNoteEdit}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </td>
      </tr>
    )
  } else return null;
}
export default NoteRowView;