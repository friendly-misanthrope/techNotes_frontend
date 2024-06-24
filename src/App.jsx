// import CSS and components here
import { Routes, Route } from 'react-router-dom';
import Public from './components/Public';
import Login from './components/Login';
import Layout from './components/Layout'
import DashboardLayout from './components/DashboardLayout';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={ <Public /> } />
        <Route path="/login" element={ <Login /> } />
        {/* Protected routes */}
        <Route path="/dashboard" element={ <DashboardLayout /> }>

        </Route>
      </Route>
    </Routes>
  );
}

export default App;
