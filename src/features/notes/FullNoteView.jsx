import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectNoteById } from "./notesSlice";
import { useState, useEffect } from "react";
import oops from '../../public/img/oops.jpg';

const FullNoteView = () => {
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

  if (!note) return (
    <div className="data-error">
      <h2><span>Oh no!</span> We can't find that ticket.</h2>
      <img src={oops} alt="A dog apologizing for eating the page" />
      <Link to={'/dashboard/notes'}>
        <button className="btn btn-primary">Go Back</button>
      </Link>
    </div>
  )

  return (
    <div className="data-container">
      
      <h2 className="data-title">{title}</h2>
      
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
            updatedAt !== createdAt ?
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
          
          <div className="full-note__buttons">
            <Link to={`/dashboard/notes/${noteId}/edit`}>
              <button className="btn btn-primary">Edit</button>
            </Link>
            <Link to={`/dashboard/notes`}>
              <button className="btn btn-secondary">Back</button>
            </Link>
          </div>

        </article>
      </section>
    </div>
  );
};
export default FullNoteView;
