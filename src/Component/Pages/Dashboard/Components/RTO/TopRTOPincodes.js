import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TopRTOPincodes = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('http://35.154.133.143/api/v1/top-rto-pincode/')
      .then((response) => {
        setData(response.data || []); // Ensure data is an array
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again.');
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className="box-shadow shadow-sm p10">
        <div className="row">
          <div className="col">
            <h4 className="title">Top RTO - Pincodes</h4>
            <ul className="list-ui mt20">
              <li className="mb-0">
                <p>PIN CODE</p>
                <p>CITY</p>
                <p>RTO COUNT</p>
              </li>
              {loading ? (
                <p>Loading data...</p>
              ) : error ? (
                <p>{error}</p>
              ) : (
                data.map((item, index) => (
                  <li key={index} className={`bg-${index % 2 === 0 ? 'red' : 'green'}-light text-${index % 2 === 0 ? 'red' : 'green'}`}>
                    <p>{item.pincode}</p>
                    <p>{item.city_name}</p>
                    <p>{item.rto_count}</p>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopRTOPincodes;
