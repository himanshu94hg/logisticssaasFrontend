import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './NDRFunnel.css'; // Import CSS file for styling

const NDRFunnel = () => {
  const ndrFunnel = useSelector(state => state?.dashboardNdrReducer?.funnelStatus);

  const funnelKeys = Object.keys(ndrFunnel || {});
  console.log("Funnel Data", funnelKeys);
  const [activeTab, setActiveTab] = useState(funnelKeys.length > 0 ? funnelKeys[0] : null);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  
  return (
    <div className="box-shadow shadow-sm p10 ndr-funnel">
      <h4 className='title'>NDR Funnel</h4>
      <ul className="nav nav-tabs mb-5">
        {funnelKeys.map((tabId, index) => (
          <li className="nav-item" key={tabId}>
            <button
              className={`nav-link ${activeTab === tabId || (index === 0 && activeTab === null) ? 'active' : ''}`}
              onClick={() => handleTabClick(tabId)}
            >
              {`${tabId} NDR`}
            </button>
          </li>
        ))}
      </ul>
      <div className="tab-content">
        <div className="tab-pane fade show active">
          <div className="funnel-chart">
            {activeTab && ndrFunnel[activeTab] && (
              <>
                <div
                  className="stage"
                  data-tip={`Total Shipment: ${ndrFunnel[activeTab].total}`}
                  style={{ width: '100%', backgroundColor: '#3b95e7' }}
                >
                  Total Shipment: {ndrFunnel[activeTab].total}
                </div>
                <div
                  className="stage"
                  data-tip={`Pending Shipments: ${ndrFunnel[activeTab].pending}`}
                  style={{ width: '85%', backgroundColor: '#64abec' }}
                >
                  Pending Shipments: {ndrFunnel[activeTab].pending}
                </div>
                <div
                  className="stage"
                  data-tip={`Delivered Shipments: ${ndrFunnel[activeTab].delivered}`}
                  style={{ width: '65%', backgroundColor: '#8ec2f1' }}
                >
                  Delivered Shipments: {ndrFunnel[activeTab].delivered}
                </div>
                <div
                  className="stage"
                  data-tip={`RTO: ${ndrFunnel[activeTab].rto}`}
                  style={{ width: '45%', backgroundColor: '#b7d8f6' }}
                >
                  RTO: {ndrFunnel[activeTab].rto}
                </div>
                <div
                  className="stage"
                  data-tip={`Lost/Damaged: ${ndrFunnel[activeTab].lost_damaged}`}
                  style={{ width: '25%', backgroundColor: '#e0eefb' }}
                >
                  Lost/Damaged: {ndrFunnel[activeTab].lost_damaged}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NDRFunnel;
