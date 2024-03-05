import React from 'react';
import { FaShippingFast } from 'react-icons/fa';
import Amazon from '../../../../../assets/image/integration/AmazonLogo.png';
import WooCommerce from '../../../../../assets/image/integration/WCLogo.png';
import Custom from '../../../../../assets/image/integration/Manual.png';
import API from '../../../../../assets/image/integration/Manual.png';
import Shopify from '../../../../../assets/image/integration/ShopifyLogo.png'

const ChannelByOrder = () => {
  // Dummy shipment data
  const dummyShipmentData = [
    { name: 'Amazon', total_count: 500, total_percentage: 25, logo: Amazon },
    { name: 'Shopify', total_count: 300, total_percentage: 15, logo: Shopify },
    { name: 'WooCommerce', total_count: 200, total_percentage: 10, logo: WooCommerce },
    { name: 'Custom', total_count: 700, total_percentage: 35, logo: Custom },
    { name: 'API', total_count: 200, total_percentage: 10, logo: API },
  ];

  const getColorScale = data => {
    const colorScale = {
      Amazon: 'rgb(255, 0, 0)',
      API: 'rgb(255, 165, 0)',
      Custom: 'rgb(255, 255, 0)',
      Shopify: 'rgb(0, 255, 0)',
      WooCommerce: 'rgb(0, 0, 255)'
      // Add more colors as needed
    };

    return colorScale;
  };

  const colorScale = getColorScale(dummyShipmentData || []);

  return (
    <div className="box-shadow shadow-sm p10">
      <h4 className="title">Store Based Orders</h4>
      {dummyShipmentData && dummyShipmentData.length > 0 ? (
        <div className="">
          <div className="row">
            <div className="col">
              <div className="progress-widget">
                {dummyShipmentData.map((item, index) => (
                  <div key={index} className="mb-4">
                    <div className='d-flex justify-content-between mb-1'>
                      <div className='d-flex align-items-center'>
                        <img src={item.logo} alt="Store Logo" width={24} />
                        <p className="font12 bold-600 mb-1 ms-2">{item.name || 'Unknown'}</p>
                      </div>
                      <p className="font12 text-gray mb-0">
                        {item.total_count} ({item.total_percentage}%)
                      </p>
                    </div>
                    <div className="progress mb-2">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{
                          width: `${item.total_percentage}%`,
                          backgroundColor: colorScale[item.name],
                        }}
                        aria-valuenow={item.total_percentage}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ChannelByOrder;
