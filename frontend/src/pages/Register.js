import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './Register.css';

function Register() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [token, setToken] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault(); // prevent page reload

        try {
            const res = await fetch('http://localhost:8000/api/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password, email }),
            });

            if (!res.ok) {
                throw new Error('Registration failed');
            }

            const data = await res.json();
            setToken(data.access); // for display only (later you'll store it)
            localStorage.setItem('access_token', data.access); // store for later use
            localStorage.setItem('refresh_token', data.refresh);
            setError('');
            navigate('/dashboard'); // redirect to dashboard or another page
        }       
        catch (err) {
            setError('Registration failed');
        }
    };

    return (
        <div className="register-container">
          <h2>Register</h2>
          {token && <p> Registered!</p>}
          {error && <p>{error}</p>}
          <form onSubmit={handleSubmit}>
          <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button type="submit">Sign Up</button>
          </form>
        </div>
      );
      
    }
    
    export default Register;