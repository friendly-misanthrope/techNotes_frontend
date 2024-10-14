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
    assignedUser: '',
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

  const saveChanges = async (e) => {
    e.preventDefault(); 
    try {
      await updateNote(editedNote).unwrap();
      setEditedNote({
        assignedUser: '',
        title: '',
        content: '',
        isCompleted: ''
      })
      navigate(`/dashboard/notes/${noteId}`)
    } catch(e) {
      console.error(`Unable to update Note\n`, e)
    }    
  }

  const cancelChanges = (e) => {
    e.preventDefault();
    if (window.confirm(`Are you sure you want to discard changes to ${noteToEdit?.title}?`)) {
      navigate(`/dashboard/notes/${noteId}`)
    }
  }

  return (
    <div className="data-container">
      <h2 className="data-title">Edit Ticket</h2>
      <section className="full-card">
        <article className="full-data__card">
          <form>
          <div className="form-group full-card__section">
            <label htmlFor="title"
              className="card-section__header">Title: </label>
            <input type="text"
            className="form-control"
            name="title"
            value={title}
            onChange={noteChangeHandler} />
          </div>
            <div className="form-group full-card__section">
              <label htmlFor="assignedUser"
              className="card-section__header">User:</label>
              <select
                type="text"
                className="form-control"
                name="assignedUser"
                value={assignedUser._id}
                onChange={noteChangeHandler}
              >
                {employeeOptions}
              </select>
            </div>

            <div className="form-group full-card__section">
              <label htmlFor="status"
              className="card-section__header">Status: </label>
              {
                <select className="form-control"
                name="isCompleted"
                onChange={noteChangeHandler}
                value={isCompleted}>
                  <option value="true" className="note__status--completed">Completed</option>
                  <option value="false" className="note__status--open">Open</option>
                </select>
              }
            </div>

            <div className="form-group full-card__section">
              <label htmlFor="content"
              className="card-section__header">Notes:</label>
              <textarea rows="4"
              name="content"
              className="form-control ticket-notes"
              value={content}
              onChange={noteChangeHandler} />
            </div>

            <div className="form-group full-data__buttons">
              <button className="btn btn-primary"
              onClick={saveChanges}>
                Save
              </button>
              <button className="btn btn-secondary"
              onClick={cancelChanges}>
                Cancel
              </button>
            </div>
            
          </form>
        </article>
      </section>
    </div>
  );
};
export default EditNoteView;
