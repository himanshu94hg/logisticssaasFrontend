import React, { useEffect, useState } from 'react';
import { FaShippingFast } from 'react-icons/fa';
import AmazonLogo from '../../../../../assets/image/logo/AmazonLogo.png'
import axios from 'axios';

const ChannelByOrder = () => {
  const [shipmentData, setShipmentData] = useState([]);

  useEffect(() => {
    axios
      .get('http://35.154.133.143/api/v1/channal-wise-order/') // Replace with your API endpoint
      .then(response => {
        console.log('Data:', response.data);
        setShipmentData(response.data.channel_percentage_data_last_30_days || []);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  const getColorScale = data => {
    const colorScale = {
      amazon_direct: 'rgb(255, 0, 0)',
      api: 'rgb(255, 165, 0)',
      custom: 'rgb(255, 255, 0)',
      easyecom: 'rgb(0, 255, 0)',
      oms_guru: 'rgb(0, 0, 255)',
      shopify: 'rgb(75, 0, 130)',
      unicommerce: 'rgb(128, 0, 128)',
      woocommerce: 'rgb(255, 140, 0)',

      // Add more colors as needed
    };

    return colorScale;
  };

  const colorScale = getColorScale(shipmentData || []);

  return (
    <div className="box-shadow shadow-sm p10">
      <h4 className="title">Store Based Orders</h4>
      {shipmentData && shipmentData.length > 0 ? (
        <div className="">
          <div className="row">
            <div className="col">
              <div className="progress-widget">
                {shipmentData.map((item, index) => (
                  <div key={index} className="mb-3">
                    <div className='d-flex justify-content-between'>
                      <div className='d-flex'>
                        <img src={AmazonLogo} alt="AmazonLogo" width={24}/>
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
