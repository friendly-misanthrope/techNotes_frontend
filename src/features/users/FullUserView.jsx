import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserById } from './usersSlice';
import { selectAllNotes } from '../notes/notesSlice';
import { useState, useEffect } from 'react';
import oops from '../../public/img/oops.jpg';

const FullUserView = () => {
  const { userId } = useParams();
  const user = useSelector((state) => selectUserById(state, userId));
  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (user) {
      setUserData(user);
    }
  },[user]);

  const {
    username,
    roles,
    isActive,
    notes,
    createdAt,
    updatedAt
  } = userData;

  const allNotes = useSelector((state) => selectAllNotes(state))
  const userNotes = allNotes.filter((note) => notes?.includes(note._id))

  const created = new Date(createdAt).toLocaleString('en-US', {day: "numeric", month: "long", year: "numeric"});
  const updated = new Date(updatedAt).toLocaleString('en-US', {day: "numeric", month: "long", year: "numeric"});

  const rolesContent = roles?.includes("admin") ?
  (
    <li>{"Administrator"}</li>
  )
    : roles?.includes("manager") ?
    (
      <li>{"Manager"}</li>
    )
      : <li>{"Employee"}</li>
  
  const notesContent = userNotes.map((note) => (
    <li key={note._id}>
      {
        note.title.length < 22 ?
        <Link to={`/dashboard/notes/${note._id}`}>{note.title}</Link>
          : <Link to={`/dashboard/notes/${note._id}`}>{note.title.substring(21)}</Link>
      }
      
        {
          note.isCompleted?
            <span className="note__status--completed">Complete</span>
            : <span className="note__status--open">Open</span>
        }
    </li>
  ))

  if (!user) return (
    <div className="data-error">
      <h2><span>Oh no!</span> We can't find that employee.</h2>
      <img src={oops} alt="A dog apologizing for eating the page" />
      <Link to={'/dashboard/users'}>
        <button className="btn btn-primary">Go Back</button>
      </Link>
    </div>
  );

  return (
    <div className='data-container'>
      <h2 className="data-title">Employee: {username}</h2>
      <section className="full-card">
        <article className="full-data__card">

          <div className="full-card__section">
            <h3 className="card-section__header">User Status:</h3>
            {
              isActive ?
              <span className="note__status--completed">Active</span>
              : <span className="note__status--open">Inactive</span>
            }
          </div>

          <div className="full-card__section">
            <h3 className="card-section__header">Role:</h3>
            <div className="user-list">
              <ul>
                { rolesContent }
              </ul>
            </div>
          </div>

          <div className="full-card__section">
            <h3 className="card-section__header">Tickets:</h3>
            <div className="user-list user-notes">
              <ul>
                { notesContent }
              </ul>
            </div>

            
            
          </div>
        </article>
        
        <div className="user-card__footer">
          <p>Created { created }</p>
          <p>Last updated { updated }</p>
        </div>
        
      </section>
    </div>
  );
}
export default FullUserView;