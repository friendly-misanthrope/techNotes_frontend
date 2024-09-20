import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectNoteById } from "./notesSlice";

const NoteRowView = ({noteId}) => {

  const note = useSelector((state) => selectNoteById(state, noteId));
  const navigate = useNavigate();

  console.log(note)

  if (note) {
    const createdAt = new Date(note.createdAt).toLocaleString('en-US', {day: "numeric", month: "long"});
    const updatedAt = new Date(note.updatedAt).toLocaleString('en-US', {day: "numeric", month: "long"});
    const handleEdit = () => navigate(`/dashboard/notes/${note._id}`);

    return (
      <tr className="table__row">
        <td className="table__cell note__status">
          {
            note.isCompleted ?
              <span className="note__status--completed">Closed</span>
              : <span className="note__status--open">Open</span>
          }
        </td>
        <td className="table__cell note__created">{createdAt}</td>
        <td className="table__cell note__updated">{updatedAt}</td>
        <td className="table__cell note__title">{note.title}</td>
        <td className="table__cell note__username">{note.assignedUser.username}</td>

        <td className="table__cell">
          <button className="icon-button table__button"
          onClick={handleEdit}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </td>
      </tr>
    )
  } else return null;
}
export default NoteRowView;