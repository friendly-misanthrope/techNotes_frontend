import { Link } from "react-router-dom";

const DashboardHeader = () => {
  const content = (
    <header className="dash-header">
      <div className="dash-header__container">
        <Link to="/dashboard/notes">
          <h1 className="dash-header__title">techNotes</h1>
        </Link>
        <nav className="dash-header__nav">
          {/* Nav links go here */}
        </nav>
      </div>
    </header>
  );
  return content;
}

export default DashboardHeader;