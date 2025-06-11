import { useNavigate } from 'react-router-dom';
import SearchGames from '../components/SearchGames';
import NavBar from '../components/NavBar';
import PopularGames from '../components/PopularGames';


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
    <PopularGames />

  </>
  );
}

export default Dashboard;
