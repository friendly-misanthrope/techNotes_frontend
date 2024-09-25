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

  const created = new Date(createdAt).toLocaleString('en-US', {day: "numeric", month: "long", year: "numeric"});
  const updated = new Date(updatedAt).toLocaleString('en-US', {day: "numeric", month: "long", year: "numeric"});

  return (
    <div className="note-container">
      <div className="note-title">
        <h2>{title}</h2>
      </div>
      <section className="full-note">
        <article className="full-note__card">
          <div className="full-card__section">
            <h3 className="card-section__header">Ticket Status:</h3>
            {
              isCompleted ?
                <span className="note__status--completed">Complete</span>
                : <span className="note__status--open">Open</span>
            }
          </div>

          <div className="full-card__section">
            <h3 className="card-section__header">Employee: </h3>
            <span>{assignedUser?.username}</span>
          </div>

          <div className="full-card__section">
            <h3 className="card-section__header">Created: </h3>
            <span>{created}</span>
          </div>
          
          {
            updated !== created ?
            <div className="full-card__section">
              <h3 className="card-section__header">Updated: </h3>
              <span>{updated}</span>
            </div>
            : null
          }

          <div className="full-card__section">
            <h3 className="card-section__header">Notes:</h3>
            <textarea name="ticket-notes" rows="4" value={content} disabled></textarea>
          </div>
          
          {
            !isCompleted ?
            <div className="full-note__buttons">
              <button className="btn btn-primary">Edit Ticket</button>
              <button className="btn btn-secondary">Close Ticket</button>
            </div>
            : null
          }
        </article>
      </section>
    </div>
  );
};
export default FullNoteView;
