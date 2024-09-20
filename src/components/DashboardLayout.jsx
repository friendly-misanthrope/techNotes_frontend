import { Outlet } from "react-router-dom";
import DashboardHeaderView from "./DashboardHeaderView";
import DashboardFooterView from "./DashboardFooterView";
import { notesSlice } from "../features/notes/notesSlice";
import { usersSlice } from "../features/users/usersSlice";
import { store } from "../app/store";

store.dispatch(notesSlice.endpoints.getNotes.initiate());
store.dispatch(usersSlice.endpoints.getUsers.initiate());

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