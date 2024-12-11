import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './Sign.js';
import Dashboard from './components/dashboard.js';
import Login from './login.js'; // Import the Login component

function App() {
  return (
    <Router>
      <div className="App">
        <div className="name-div">
          <h1>
            Uni Care Medical Help
            <p className="tagline">Medical help at your fingertips</p>
          </h1>
        </div>

        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} /> {/* Add the Login route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
