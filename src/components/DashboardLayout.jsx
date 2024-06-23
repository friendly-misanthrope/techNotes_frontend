import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <>
      <div className="dash-container">
        <Outlet />
      </div>
    </>
  );
}

export default DashboardLayout;