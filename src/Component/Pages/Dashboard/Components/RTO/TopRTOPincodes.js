import React, { useState } from 'react';

const TopRTOPincodes = () => {
  const allPincodes = [
    { pincode: '110001', city_name: 'New Delhi', state: 'Delhi', rto_count: 95 },
    { pincode: '400001', city_name: 'Mumbai', state: 'Maharashtra', rto_count: 100 },
    { pincode: '560001', city_name: 'Bangalore', state: 'Karnataka', rto_count: 85 },
    { pincode: '700001', city_name: 'Kolkata', state: 'West Bengal', rto_count: 90 },
    { pincode: '600001', city_name: 'Chennai', state: 'Tamil Nadu', rto_count: 80 },
    { pincode: '380001', city_name: 'Ahmedabad', state: 'Gujarat', rto_count: 75 },
    { pincode: '500001', city_name: 'Hyderabad', state: 'Telangana', rto_count: 70 },
    { pincode: '201001', city_name: 'Ghaziabad', state: 'Uttar Pradesh', rto_count: 65 },
    { pincode: '302001', city_name: 'Jaipur', state: 'Rajasthan', rto_count: 60 },
    { pincode: '110002', city_name: 'New Delhi', state: 'Delhi', rto_count: 55 },
    { pincode: '400002', city_name: 'Mumbai', state: 'Maharashtra', rto_count: 50 },
    { pincode: '560002', city_name: 'Bangalore', state: 'Karnataka', rto_count: 45 },
    { pincode: '700002', city_name: 'Kolkata', state: 'West Bengal', rto_count: 40 },
    { pincode: '600002', city_name: 'Chennai', state: 'Tamil Nadu', rto_count: 35 },
    { pincode: '380002', city_name: 'Ahmedabad', state: 'Gujarat', rto_count: 30 },
    { pincode: '500002', city_name: 'Hyderabad', state: 'Telangana', rto_count: 25 },
    { pincode: '201002', city_name: 'Ghaziabad', state: 'Uttar Pradesh', rto_count: 20 },
    { pincode: '302002', city_name: 'Jaipur', state: 'Rajasthan', rto_count: 15 },
    { pincode: '110003', city_name: 'New Delhi', state: 'Delhi', rto_count: 10 },
    { pincode: '400003', city_name: 'Mumbai', state: 'Maharashtra', rto_count: 5 },
    { pincode: '560003', city_name: 'Bangalore', state: 'Karnataka', rto_count: 25 },
    { pincode: '700003', city_name: 'Kolkata', state: 'West Bengal', rto_count: 35 },
    { pincode: '600003', city_name: 'Chennai', state: 'Tamil Nadu', rto_count: 45 },
    { pincode: '380003', city_name: 'Ahmedabad', state: 'Gujarat', rto_count: 55 },
    { pincode: '500003', city_name: 'Hyderabad', state: 'Telangana', rto_count: 65 },
    { pincode: '201003', city_name: 'Ghaziabad', state: 'Uttar Pradesh', rto_count: 75 },
    { pincode: '302003', city_name: 'Jaipur', state: 'Rajasthan', rto_count: 85 },
    { pincode: '110004', city_name: 'New Delhi', state: 'Delhi', rto_count: 95 },
    { pincode: '400004', city_name: 'Mumbai', state: 'Maharashtra', rto_count: 100 },
    { pincode: '560004', city_name: 'Bangalore', state: 'Karnataka', rto_count: 90 },
    { pincode: '700004', city_name: 'Kolkata', state: 'West Bengal', rto_count: 80 },
    { pincode: '600004', city_name: 'Chennai', state: 'Tamil Nadu', rto_count: 70 },
    { pincode: '380004', city_name: 'Ahmedabad', state: 'Gujarat', rto_count: 60 },
    { pincode: '500004', city_name: 'Hyderabad', state: 'Telangana', rto_count: 50 },
    { pincode: '201004', city_name: 'Ghaziabad', state: 'Uttar Pradesh', rto_count: 40 },
    { pincode: '302004', city_name: 'Jaipur', state: 'Rajasthan', rto_count: 30 },
    { pincode: '110005', city_name: 'New Delhi', state: 'Delhi', rto_count: 20 },
    { pincode: '400005', city_name: 'Mumbai', state: 'Maharashtra', rto_count: 10 },
    { pincode: '560005', city_name: 'Bangalore', state: 'Karnataka', rto_count: 5 },
    { pincode: '700005', city_name: 'Kolkata', state: 'West Bengal', rto_count: 15 },
    { pincode: '600005', city_name: 'Chennai', state: 'Tamil Nadu', rto_count: 25 },
    { pincode: '380005', city_name: 'Ahmedabad', state: 'Gujarat', rto_count: 35 },
    { pincode: '500005', city_name: 'Hyderabad', state: 'Telangana', rto_count: 45 },
    { pincode: '201005', city_name: 'Ghaziabad', state: 'Uttar Pradesh', rto_count: 55 },
    { pincode: '302005', city_name: 'Jaipur', state: 'Rajasthan', rto_count: 65 },
    { pincode: '110006', city_name: 'New Delhi', state: 'Delhi', rto_count: 75 },
    { pincode: '400006', city_name: 'Mumbai', state: 'Maharashtra', rto_count: 85 },
    { pincode: '560006', city_name: 'Bangalore', state: 'Karnataka', rto_count: 95 },
    { pincode: '700006', city_name: 'Kolkata', state: 'West Bengal', rto_count: 100 },
    { pincode: '600006', city_name: 'Chennai', state: 'Tamil Nadu', rto_count: 90 }
  ];

  // Sort the pin codes based on RTO count in descending order
  const sortedPincodes = allPincodes.sort((a, b) => b.rto_count - a.rto_count);

  // Take only the top 15 pin codes based on RTO count
  const top15Pincodes = sortedPincodes.slice(0, 15);

  const [data] = useState(top15Pincodes);
  const [filteredData, setFilteredData] = useState(top15Pincodes);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = allPincodes.filter(
      (item) =>
        item.pincode.includes(term) ||
        item.city_name.toLowerCase().includes(term) ||
        item.state.toLowerCase().includes(term) ||
        String(item.rto_count).includes(term)
    ).slice(0, 15); // Limit search results to top 15
    setFilteredData(filtered);
  };

  return (
    <>
      <div className="box-shadow shadow-sm p10 top-rto-pincodes">
        <div className="row">
          <div className="col">
            <div className="mb-3 d-flex align-items-center justify-content-between flex-wrap gap-3">
              <h4 className="title mb-0">Top RTO - Pincodes</h4>
              <label className='pincode-search' htmlFor="search">
                <input
                  type="text"
                  id="search"
                  value={searchTerm}
                  onChange={handleSearch}
                  placeholder="Search Pincode || City || State"
                  className='input-field'
                />
              </label>
            </div>
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
                    <td className='text-capitalize'>{item.state}</td>
                    <td>{item.rto_count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopRTOPincodes;
