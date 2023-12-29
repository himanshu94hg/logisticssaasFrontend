import React, { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import axios from 'axios';

const ChannelByOrder = () => {
  const [shipmentData, setShipmentData] = useState([]);

  useEffect(() => {
    axios
      .get('http://35.154.133.143/api/v1/channal-wise-order/') // Replace with your API endpoint
      .then(response => {
        console.log('Data:', response.data);
        setShipmentData(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <>
      <div className="box-shadow shadow-sm p10">
        <h4 className="title">Channel by Order</h4>
        <div className="row">
          <div className="col">
            <div className="progress-widget">
              {shipmentData.map((channel, index) => (
                <React.Fragment key={index}>
                  <div className="d-flex justify-content-between">
                    <p className="font12 bold-600 mb-10">{channel.name}</p>
                    <p className="font12 bold-600 mb-10">
                      {channel.total_count}{' '}
                      <span className="text-gray-light ">({channel.total_percentage}%)</span>
                    </p>
                  </div>
                  <div className={`progress mb-15 ${getColorClass(channel.total_percentage)}`}>
                    <div
                      className={`progress-bar w${channel.total_percentage}`}
                      role="progressbar"
                      aria-valuenow={channel.total_percentage}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const getColorClass = percentage => {
  if (percentage >= 70) return 'bg-aqua';
  if (percentage >= 50) return 'bg-green';
  if (percentage >= 30) return 'bg-blue';
  if (percentage >= 10) return 'bg-red';
  return 'bg-purple';
};

export default ChannelByOrder;
