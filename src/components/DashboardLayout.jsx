import { Outlet } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";

const DashboardLayout = () => {
  return (
    <>
      <DashboardHeader />
      <div className="dash-container">
        <Outlet />
      </div>
    </>
  );
}

export default DashboardLayout;