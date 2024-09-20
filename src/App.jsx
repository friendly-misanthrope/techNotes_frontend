// import CSS and components here
import { Routes, Route } from 'react-router-dom';
import PublicView from './components/PublicView';
import LoginView from './features/auth/LoginView';
import Layout from './components/Layout'
import DashboardLayout from './components/DashboardLayout';
import DashboardView from './features/auth/DashboardView';
import NotesView from './features/notes/NotesView';
import UsersTableView from './features/users/UsersTableView'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={ <PublicView /> } />
        <Route path="login" element={ <LoginView /> } />
        {/* Protected routes */}
        <Route path="dashboard" element={ <DashboardLayout /> }>
          <Route index element={<DashboardView />} />
          <Route path="notes">
            <Route index element={<NotesView />} />
            {/* Todo: create page for viewing a single note in full */}
          </Route>
          <Route path="users">
            <Route index element={<UsersTableView/>} />
          </Route>
        </Route>
        {/* End protected routes */}
      </Route>
    </Routes>
  );
}

export default App;
