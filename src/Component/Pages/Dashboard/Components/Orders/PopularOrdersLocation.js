import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PopularOrdersLocation = () => {
  const [popularLocations, setPopularLocations] = useState([]);

  useEffect(() => {
    axios.get('http://35.154.133.143/api/v1/state-wise-order/')
      .then(response => {
        setPopularLocations(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
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
