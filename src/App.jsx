// import CSS and components here
import { Routes, Route } from 'react-router-dom';
import Public from './components/Public';
import Login from './features/auth/Login';
import Layout from './components/Layout'
import DashboardLayout from './components/DashboardLayout';
import Welcome from './features/auth/Welcome';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={ <Public /> } />
        <Route path="/login" element={ <Login /> } />
        {/* Protected routes */}
        <Route path="/dashboard" element={ <DashboardLayout /> }>
          <Route index element={<Welcome />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
