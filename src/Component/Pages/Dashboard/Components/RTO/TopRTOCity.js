import React, { useState } from 'react';

const TopRTOCity = () => {
  const [data] = useState([
    {
      city: 'Mumbai',
      rto_count: 500,
      rto_count_percentage: 10,
    },
    {
      city: 'Delhi',
      rto_count: 600,
      rto_count_percentage: 12,
    },
    {
      city: 'Bangalore',
      rto_count: 450,
      rto_count_percentage: 9,
    },
    {
      city: 'Kolkata',
      rto_count: 300,
      rto_count_percentage: 6,
    },
    {
      city: 'Chennai',
      rto_count: 350,
      rto_count_percentage: 7,
    },
    {
      city: 'Hyderabad',
      rto_count: 400,
      rto_count_percentage: 8,
    },
    {
      city: 'Ahmedabad',
      rto_count: 250,
      rto_count_percentage: 5,
    }
  ]);

  const [loading] = useState(false); // Since it's dummy data, no loading
  const [error] = useState(null); // No error handling for dummy data

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
                          backgroundColor: index % 2 === 0 ? '#1975C9' : '#1975C9',
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
