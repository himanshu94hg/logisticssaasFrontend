import React, { useState, useEffect } from 'react';

const PopularOrdersLocation = () => {
  const [popularLocations, setPopularLocations] = useState([]);

  useEffect(() => {
    // Dummy data with Indian states
    const dummyData = [
      { p_state: 'Maharashtra', total_orders: 150 },
      { p_state: 'Tamil Nadu', total_orders: 120 },
      { p_state: 'Karnataka', total_orders: 100 },
      { p_state: 'Uttar Pradesh', total_orders: 90 },
      { p_state: 'Gujarat', total_orders: 80 },
    ];

    setPopularLocations(dummyData);
  }, []);

  return (
    <div className="box-shadow shadow-sm p10">
      <div className="row">
        <div className="col">
          <h4 className="title">Popular Orders Location</h4>
          <ul className="list-ui mt20">
            {popularLocations.map((location, index) => (
              <li key={index} className={`bg-${getColor(index)}-light text-${getColor(index)}`}>
                <p>{location.p_state}</p>
                <p>₹ {location.total_orders}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

// Helper function to get color based on index
const getColor = (index) => {
  const colors = ['red', 'green', 'blue', 'purple', 'sky'];
  return colors[index % colors.length];
};

export default PopularOrdersLocation;
