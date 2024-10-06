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
    roles,
    isActive,
    notes,
    createdAt,
    updatedAt
  } = userData;

  const created = new Date(createdAt).toLocaleString('en-US', {day: "numeric", month: "long", year: "numeric"});
  const updated = new Date(updatedAt).toLocaleString('en-US', {day: "numeric", month: "long", year: "numeric"});



  return (
    <div>
      Full User View
    </div>
  );
}
export default FullUserView;