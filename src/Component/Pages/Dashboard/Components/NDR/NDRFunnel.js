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
        {funnelKeys?.map((tabId, index) => (
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
        {funnelKeys?.map((tabId, index) => (
          <div className={`tab-pane fade ${activeTab === tabId || (index === 0 && activeTab === null) ? 'show active' : ''}`} key={tabId}>
            <div className="funnel-chart">
              {ndrFunnel[tabId] && (
                <>
                  <div
                    className="stage"
                    data-tip={`Total Shipment: ${ndrFunnel[tabId].total}`}
                    style={{ width: '100%', backgroundColor: '#3b95e7' }}
                  >
                    Total Shipment: {ndrFunnel[tabId].total}
                  </div>
                  <div
                    className="stage"
                    data-tip={`Pending Shipments: ${ndrFunnel[tabId].pending}`}
                    style={{ width: '85%', backgroundColor: '#64abec' }}
                  >
                    Pending Shipments: {ndrFunnel[tabId].pending}
                  </div>
                  <div
                    className="stage"
                    data-tip={`Delivered Shipments: ${ndrFunnel[tabId].delivered}`}
                    style={{ width: '65%', backgroundColor: '#8ec2f1' }}
                  >
                    Delivered Shipments: {ndrFunnel[tabId].delivered}
                  </div>
                  <div
                    className="stage"
                    data-tip={`RTO: ${ndrFunnel[tabId].rto}`}
                    style={{ width: '45%', backgroundColor: '#b7d8f6' }}
                  >
                    RTO: {ndrFunnel[tabId].rto}
                  </div>
                  <div
                    className="stage"
                    data-tip={`Lost/Damaged: ${ndrFunnel[tabId].lost_damaged}`}
                    style={{ width: '25%', backgroundColor: '#e0eefb' }}
                  >
                    Lost/Damaged: {ndrFunnel[tabId].lost_damaged}
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NDRFunnel;
