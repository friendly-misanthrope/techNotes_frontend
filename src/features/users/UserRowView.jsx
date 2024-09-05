import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserById } from './usersSlice';

const UserRowView = ({ userId }) => {
  // Hooks
  const user = useSelector((state) => selectUserById(state, userId));
  const navigate = useNavigate();

  if (user) {
    const handleUserEdit = () => navigate(`/dashboard/users/${userId}`);
    const userRoles = user.roles.toString().replaceAll(',', ', ');
    const isActive = user.isActive ? '' : 'table__cell--inactive';

  return (
    <tr className="table__row user">
      <td className={`table__cell ${isActive}`}>{user.username}</td>
      <td className={`table__cell ${isActive}`}>{userRoles}</td>
      <td className={`table_cell ${isActive}`}>
        <button 
        className="icon-button table__button"
        onClick={handleUserEdit}
        >
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>
      </td>
    </tr>
    );
  }
  else return null;
}
export default UserRowView;