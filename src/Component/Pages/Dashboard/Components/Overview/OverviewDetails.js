import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';

const OverviewDetails = () => {
  const [activeTab, setActiveTab] = useState('ndr');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const tabDetails = {
    ndr: [
      { label: 'NDR', value: 0 },
      { label: 'Action Required', value: 0 },
      { label: 'Action Requested', value: 0 },
      { label: 'Delivered', value: 0 },
      { label: 'RTO', value: 0 }
    ],
    cod: [
      { label: 'COD', value: 0 },
      { label: 'COD Remitted', value: 0 },
      { label: 'COD Pending', value: 0 },
      { label: 'Next Remit Date', value: 0 },
      { label: 'Next Remit Amount', value: 0 }
    ],
    rto: [
      { label: 'RTO', value: 0 },
      { label: 'RTO Initiated', value: 0 },
      { label: 'RTO in Transit', value: 0 },
      { label: 'RTO Delivered', value: 0 }
    ]
  };

  const { codDetails, ndrDetails, rtoDetails } = useSelector(state => state?.dashboardOverviewReducer)
  const capitalize = (str) => {
    return str.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <>
      <div className="box-shadow shadow-sm p10 overview-details-counters">
        <div className="tab-buttons">
          {Object.keys(tabDetails).map(tab => (
            <div
              key={tab}
              className={`counter-tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => handleTabChange(tab)}
            >
              {tab === 'ndr' ? 'NDR Details' : tab.toUpperCase() + ' Status'}
            </div>
          ))}
        </div>

        <div className="tab-content">
          {ndrDetails && activeTab === "ndr" && <>
            {Object.entries(ndrDetails).map(([key, value]) => (
              <div className='d-flex justify-content-between align-items-center w-100' key={key}>
                <div className='counter-sets'>
                  <p>{value ? value : 0}</p>
                  <hr />
                  <p>{capitalize(key)}</p>
                </div>
              </div>
            ))}
          </>}
          {codDetails && activeTab === "cod" && <>
            {Object.entries(codDetails).map(([key, value]) => (
              <div className='d-flex justify-content-between align-items-center' key={key}>
                <div className='counter-sets'>
                  <p>{value ? value : 0}</p>
                  <hr />
                  <p>{capitalize(key)}</p>
                </div>
              </div>
            ))}
          </>}
          {rtoDetails && activeTab === "rto" && <>
            {Object.entries(rtoDetails).map(([key, value]) => (
              <div className='d-flex justify-content-between align-items-center' key={key}>
                <div className='counter-sets'>
                  <p>{value ? value : 0}</p>
                  <hr />
                  <p>{capitalize(key)}</p>
                </div>
              </div>
            ))}
          </>}
        </div>
      </div>
    </>
  );
};

export default OverviewDetails;
