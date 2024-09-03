import { Outlet } from "react-router-dom";
import DashboardHeaderView from "./DashboardHeaderView";
import DashboardFooterView from "./DashboardFooterView";

const DashboardLayout = () => {
  return (
    <>
      <DashboardHeaderView />
      <div className="dash-container">
        <Outlet />
      </div>
      <DashboardFooterView />
    </>
  );
}

export default DashboardLayout;