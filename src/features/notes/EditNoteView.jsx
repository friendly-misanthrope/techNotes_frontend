import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { selectNoteById, useUpdateNoteMutation } from "./notesSlice";
import { selectAllUsers } from "../users/usersSlice";

const EditNoteView = () => {
  const { noteId } = useParams();
  const navigate = useNavigate();
  const noteToEdit = useSelector((state) => selectNoteById(state, noteId));
  const [updateNote, { isLoading }] = useUpdateNoteMutation();
  const [editedNote, setEditedNote] = useState({
    assignedUser: {},
    title: '',
    content: '',
    isCompleted: ''
  });

  useEffect(() => {
    if (noteToEdit) {
      setEditedNote(noteToEdit);
    }
  }, [noteToEdit]);

  const { assignedUser, title, content, isCompleted } = editedNote;

  const allUsers = useSelector((state) => selectAllUsers(state));

  const employeeOptions = allUsers.map((user) => (
    <option key={user._id} value={user._id}>
      {user.username}
    </option>
  ));

  const noteChangeHandler = (e) => {
    setEditedNote(prevState => (
      {...prevState, [e.target.name]: e.target.value}
    ));
  }

  return (
    <div className="note-container">
      <h2 className="note-title">Edit Ticket</h2>
      <section className="full-note">
        <article className="full-note__card">
          <form>
            <div className="form-group full-card__section">
              <label htmlFor="username">Employee:</label>
              <select
                type="text"
                className="form-control"
                name="assignedUser"
                value={assignedUser}
                onChange={noteChangeHandler}
              >
                {employeeOptions}
              </select>
            </div>

            <div className="form-group full-card__section">
              <label htmlFor="status">Status: </label>
              
              {
                isCompleted ?
                  <span className="note__status--completed">Complete</span>
                  : <span className="note__status--open">Open</span>
              }
            </div>
          </form>
        </article>
      </section>
    </div>
  );
};
export default EditNoteView;
