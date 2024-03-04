import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TopRTOCity = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   axios
  //     .get('http://dev.shipease.in:8088/api/v1/top-rto-city/')
  //     .then((response) => {
  //       setData(response.data || []); // Ensure data is an array
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching data:', error);
  //       setError('Error fetching data. Please try again.');
  //       setLoading(false);
  //     });
  // }, []);
  
  return (
    <>
      <div className="box-shadow shadow-sm p10">
        <h4 className="title">Top RTO - City</h4>
        <div className="row">
          <div className="col">
            <div className="progress-widget">
              {loading ? (
                <p>Loading data...</p>
              ) : error ? (
                <p>{error}</p>
              ) : Array.isArray(data) && data.length !== undefined && data.length !== null ? (
                data.map((cityData, index) => (
                  <div key={index}>
                    <div className="d-flex justify-content-between">
                      <p className="font12 bold-600 mb-10">{cityData.city}</p>
                      <p className="font12 bold-600 mb-10">
                        {cityData.rto_count}{" "}
                        <span className="text-gray-light ">({cityData.rto_count_percentage}%)</span>
                      </p>
                    </div>
                    <div className="progress mb-15">
                      <div
                        style={{
                          backgroundColor: index % 2 === 0 ? 'blue' : 'red',
                          width: `${cityData.rto_count_percentage}%`,
                        }}
                        role="progressbar"
                        aria-valuenow={cityData.rto_count_percentage}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No data available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopRTOCity;
