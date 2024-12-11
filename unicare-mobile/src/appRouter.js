import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './Sign.js';
import Dashboard from './components/dashboard.js';
import Login from './login.js';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
