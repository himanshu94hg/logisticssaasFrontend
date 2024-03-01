import React, { useState } from 'react';

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
          {tabDetails[activeTab].map((item, index) => (
            <div className='d-flex justify-content-between align-items-center' key={index}>
              <div className='counter-sets'>
                <p>{item.value}</p>
                <p>{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default OverviewDetails;
