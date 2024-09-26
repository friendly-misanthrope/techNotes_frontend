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
  const [editedNote, setEditedNote] = useState({});

  useEffect(() => {
    if (noteToEdit) {
      setEditedNote(noteToEdit);
    }
  }, [noteToEdit]);

  const {
    assignedUser,
    title,
    content,
    isCompleted
  } = editedNote;

  assignedUser = assignedUser.username;

  const allUsers = useSelector((state) => selectAllUsers(state));

  const employeeOptions = allUsers.map((user) => (
    <option 
    key={user._id}
    value={user._id}>
      {user.username}
    </option>
  ));

  return (
    <section className="note-edit">
      <form>
        
        <div className="form-group">
          <label for="username">Employee:</label>
          <select
            type="text"
            className="form-control"
            name="assignedUser"
            value={assignedUser}
          >
            {employeeOptions}
          </select>
        </div>
        
      </form>
    </section>
  );
};
export default EditNoteView;
