import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const TopRTOPincodes = () => {
  const { rtoTop } = useSelector(state => state?.dashboardRtoReducer)
  const sortedPincodes = rtoTop?.sort((a, b) => b.rto_count - a.rto_count);
  const top15Pincodes = sortedPincodes.slice(0, 15);
  const [data] = useState(top15Pincodes);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(top15Pincodes);


  useEffect(() => {
    if(rtoTop){
      const filtered = rtoTop?.filter(
        (item) =>
          item.shipping_detail__pincode?.includes(searchTerm) ||
          item.shipping_detail__city?.toLowerCase()?.includes(searchTerm) ||
          item.shipping_detail__state?.toLowerCase()?.includes(searchTerm) ||
          String(item.rto_count)?.includes(searchTerm)
      );
      setFilteredData(filtered);
    }
  }, [rtoTop, searchTerm]);

  const handleSearch = (e) => {
    const term = e?.target?.value?.toLowerCase();
    setSearchTerm(term);
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
                {filteredData?.map((item, index) => (
                  <tr key={index} className={`bg-${index % 2 === 0 ? 'red' : 'green'}-light text-${index % 2 === 0 ? 'red' : 'green'}`}>
                    <td>{item.shipping_detail__pincode}</td>
                    <td className='text-capitalize'>{item.shipping_detail__city}</td>
                    <td className='text-capitalize'>{item.shipping_detail__state}</td>
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
