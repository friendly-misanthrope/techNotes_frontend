import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectNoteById } from "./notesSlice";
import { useState, useEffect } from "react";

const FullNoteView = () => {
  const navigate = useNavigate();
  const { noteId } = useParams();
  const note = useSelector((state) => selectNoteById(state, noteId));

  const [noteData, setNoteData] = useState({});

  useEffect(() => {
    if (note) {
      setNoteData(note);
    }
  }, [note]);

  const {
    title,
    isCompleted,
    assignedUser,
    createdAt,
    updatedAt,
    content
  } = noteData;

  const created = new Date(createdAt).toLocaleString('en-US', {day: "numeric", month: "long"});
  const updated = new Date(updatedAt).toLocaleString('en-US', {day: "numeric", month: "long"});

  return (
    <div className="note-container">
      <div className="note-title">
        <h2>{title}</h2>
      </div>
      <table className="table">
        <thead>
          <tr> 
            <th scope="col">Status</th>
            <th scope="col">Employee</th>
            <th scope="col">Created</th>
            <th scope="col">Updated</th>
            <th scope="col">Content</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {
                isCompleted ?
                  <span className="note__status--completed">Complete</span>
                    : <span className="note__status--open">Open</span>
              }
            </td>
            <td>{assignedUser?.username}</td>
            <td>{created}</td>
            <td>{updated}</td>
            <td>{content}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default FullNoteView;
