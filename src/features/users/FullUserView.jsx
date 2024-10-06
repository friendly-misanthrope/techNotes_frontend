import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserById } from './usersSlice';
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
    //todo: map over roles and display each string value
    roles,
    isActive,
    //todo: map over notes & display each note title as a link
    notes,
    createdAt,
    updatedAt
  } = userData;

  const created = new Date(createdAt).toLocaleString('en-US', {day: "numeric", month: "long", year: "numeric"});
  const updated = new Date(updatedAt).toLocaleString('en-US', {day: "numeric", month: "long", year: "numeric"});

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
    </div>
  );
}
export default FullUserView;