import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const dummyListings = [
  { id: 1, title: 'Denim Jacket', size: 'M', condition: 'Good' },
  { id: 2, title: 'Summer Dress', size: 'S', condition: 'Like New' },
  { id: 3, title: 'Hoodie', size: 'L', condition: 'Used' },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [listings, setListings] = useState(dummyListings); // Replace with fetched listings later

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
      <Link to="/add-item">
        <button>Add New Item</button>
      </Link>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
        {listings.length === 0 ? (
          <p>You have no listings yet. Start adding items to swap!</p>
        ) : (
          listings.map((item) => (
            <div
              key={item.id}
              style={{
                border: '1px solid #ccc',
                padding: '1rem',
                borderRadius: '8px',
                width: '200px',
              }}
            >
              <h3>{item.title}</h3>
              <p>Size: {item.size}</p>
              <p>Condition: {item.condition}</p>
              <button>View</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
