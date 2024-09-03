import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from 'react-router-dom';

const DashboardFooter = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const onGoHomeClicked = () => {
    navigate('/dashboard');
  }

  let goHomeButton = null;

  if (pathname !== '/dashboard') {
    goHomeButton = (
      <button 
        className="dash-footer__button icon_button" 
        title="Home"
        onClick={ onGoHomeClicked } 
        >
        <FontAwesomeIcon icon={ faHouse } />
      </button>
    );
  }
  return (
    <footer className="dash-footer">
      { goHomeButton }
      <p>Current User:</p>
      <p>Status:</p>
    </footer>
  );
}

export default DashboardFooter;