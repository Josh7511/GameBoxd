import { useNavigate } from 'react-router-dom';
import GameLogForm from '../components/GameLogForm';


function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/login');
  };

  return (
    <div className="login-container">
      <h2>Dashboard</h2>
      <GameLogForm />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;
