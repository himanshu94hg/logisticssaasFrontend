import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TopRTOPincodes = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // useEffect(() => {
  //   axios
  //     .get('http://65.2.38.87:8088/api/v1/top-rto-pincode/')
  //     .then((response) => {
  //       setData(response.data || []); // Ensure data is an array
  //       setFilteredData(response.data || []);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching data:', error);
  //       setError('Error fetching data. Please try again.');
  //       setLoading(false);
  //     });
  // }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = data.filter(
      (item) =>
        item.pincode.toLowerCase().includes(term) ||
        item.city_name.toLowerCase().includes(term) ||
        String(item.rto_count).includes(term)
    );
    setFilteredData(filtered);
  };

  return (
    <>
      <div className="box-shadow shadow-sm p10">
        <div className="row">
          <div className="col">
            <div className="mb-3 d-flex align-items-center justify-content-between">
              <h4 className="title mb-0">Top RTO - Pincodes</h4>
              <label htmlFor="search">
                <input
                  type="text"
                  id="search"
                  value={searchTerm}
                  onChange={handleSearch}
                  placeholder="Search Pincode || City || State"
                  className='input-field'
                  style={{width:'auto'}}
                /></label>
            </div>
            {loading ? (
              <p>Loading data...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>Pin Code</th>
                    <th>City</th>
                    <th>State</th>
                    <th>RTO Count</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item, index) => (
                    <tr key={index} className={`bg-${index % 2 === 0 ? 'red' : 'green'}-light text-${index % 2 === 0 ? 'red' : 'green'}`}>
                      <td>{item.pincode}</td>
                      <td className='text-capitalize'>{item.city_name}</td>
                      <td>Maharashtra</td>
                      <td>{item.rto_count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TopRTOPincodes;
