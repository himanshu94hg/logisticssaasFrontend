import React, { useState } from 'react';
import './NDRFunnel.css'; // Import CSS file for styling

const tabData = [
  { id: '1', label: '1st NDR', counts: { total: 20, pending: 10, delivered: 5, rto: 3, lostDamaged: 2 } },
  { id: '2', label: '2nd NDR', counts: { total: 30, pending: 15, delivered: 10, rto: 4, lostDamaged: 1 } },
  { id: '3', label: '3rd NDR', counts: { total: 40, pending: 20, delivered: 18, rto: 2, lostDamaged: 0 } }
];

const NDRFunnel = () => {
  const [activeTab, setActiveTab] = useState(tabData[0]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="box-shadow shadow-sm p10 ndr-funnel">
      <h4 className='title'>NDR Funnel</h4>
      <ul className="nav nav-tabs mb-5">
        {tabData.map(tab => (
          <li className="nav-item" key={tab.id}>
            <button
              className={`nav-link ${activeTab === tab ? 'active' : ''}`}
              onClick={() => handleTabClick(tab)}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>
      <div className="tab-content">
        <div className="tab-pane fade show active">
          <div className="funnel-chart">
            <div
              className="stage"
              data-tip={`Total Shipment: ${activeTab.counts.total}`}
              style={{ width: '100%', backgroundColor: '#3b95e7' }}
            >
              Total Shipment: {activeTab.counts.total}
            </div>
            <div
              className="stage"
              data-tip={`Pending Shipments: ${activeTab.counts.pending}`}
              style={{ width: '85%', backgroundColor: '#64abec' }}
            >
              Pending Shipments: {activeTab.counts.pending}
            </div>
            <div
              className="stage"
              data-tip={`Delivered Shipments: ${activeTab.counts.delivered}`}
              style={{ width: '65%', backgroundColor: '#8ec2f1' }}
            >
              Delivered Shipments: {activeTab.counts.delivered}
            </div>
            <div
              className="stage"
              data-tip={`RTO: ${activeTab.counts.rto}`}
              style={{ width: '45%', backgroundColor: '#b7d8f6' }}
            >
              RTO: {activeTab.counts.rto}
            </div>
            <div
              className="stage"
              data-tip={`Lost/Damaged: ${activeTab.counts.lostDamaged}`}
              style={{ width: '25%', backgroundColor: '#e0eefb' }}
            >
              Lost/Damaged: {activeTab.counts.lostDamaged}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NDRFunnel;
