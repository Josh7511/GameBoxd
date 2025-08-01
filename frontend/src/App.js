import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import SearchResults from './pages/SearchResults';
import GameDetails from './pages/GameDetails';
import AboutMe from './pages/AboutMe';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import OtherProfile from './pages/OtherProfile';

function App() {
  return (
    <div className="bg-background text-text min-h-screen">
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/gamepage/:id" element={<GameDetails />}/>
        <Route path="/about" element={<AboutMe />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/profile/:username" element={<OtherProfile />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
