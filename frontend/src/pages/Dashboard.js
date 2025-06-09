import { useNavigate } from 'react-router-dom';
import SearchGames from '../components/SearchGames';
import NavBar from '../components/NavBar';


function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/login');
  };

  return (
    <>
    <NavBar /> 
  
    <div className="login-container">
      <h2>Dashboard</h2>
      <SearchGames />
      <button onClick={handleLogout}>Logout</button>
    </div>
  </>
  );
}

export default Dashboard;
