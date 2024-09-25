import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { selectNoteById, useUpdateNoteMutation } from "./notesSlice";

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

  return (
    <div>EditNoteView</div>
  )
}
export default EditNoteView;