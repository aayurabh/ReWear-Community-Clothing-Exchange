import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (error) {
        console.error('Invalid token');
        localStorage.removeItem('token');
        navigate('/login');
      }
    }
  }, [navigate]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome, {user.username}!</h1>
      <p>Email: {user.email}</p>
      <p>Points: {user.points || 0}</p>

      <h2>Your Listings</h2>
      <p>(Will display user-uploaded clothing items here)</p>

      <h2>Your Swaps</h2>
      <p>(Will display ongoing and completed swaps here)</p>
    </div>
  );
};

export default Dashboard;
