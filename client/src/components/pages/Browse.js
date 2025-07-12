import React from 'react';

const dummyItems = [
  { id: 1, title: 'Denim Jacket', size: 'M', condition: 'Good' },
  { id: 2, title: 'Summer Dress', size: 'S', condition: 'Like New' },
  { id: 3, title: 'Hoodie', size: 'L', condition: 'Used' },
];

const Browse = () => {
  return (
    <div>
      <h1>Browse Items</h1>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {dummyItems.map((item) => (
          <div key={item.id} style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px', width: '200px' }}>
            <h3>{item.title}</h3>
            <p>Size: {item.size}</p>
            <p>Condition: {item.condition}</p>
            <button>View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Browse;
