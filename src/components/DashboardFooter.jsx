import { fontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from 'react-router-dom';

const DashboardFooter = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const onGoHomeClicked = () => {
    navigate('/dash');
  }

  let goHomeButton = null;

  if (pathname !== '/dash') {
    goHomeButton = (
      <button 
        className="dash-footer__button icon_button" 
        title="Home"
        onClick={ onGoHomeClicked } 
        >
        <fontAwesomeIcon icon={ faHouse } />
      </button>
    );
  }
  const content = (
    <footer className="dash-footer">
      { goHomeButton }
      <p>Current User:</p>
      <p>Status:</p>
    </footer>
  );
  return content;
}

export default DashboardFooter;