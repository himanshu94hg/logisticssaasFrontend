import React from 'react';
import { FaShippingFast } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import API from '../../../../../assets/image/integration/Manual.png';
import Custom from '../../../../../assets/image/integration/Manual.png';
import Amazon from '../../../../../assets/image/integration/AmazonLogo.png';
import WooCommerce from '../../../../../assets/image/integration/WCLogo.png';
import Shopify from '../../../../../assets/image/integration/ShopifyLogo.png'
import { capatlize, percentage } from '../../../../../customFunction/functionLogic';

const ChannelByOrder = () => {
  const dummyShipmentData = [
    { name: 'Amazon', total_count: 500, total_percentage: 25, logo: Amazon },
    { name: 'Shopify', total_count: 300, total_percentage: 15, logo: Shopify },
    { name: 'WooCommerce', total_count: 200, total_percentage: 10, logo: WooCommerce },
    { name: 'Custom', total_count: 700, total_percentage: 35, logo: Custom },
    { name: 'API', total_count: 200, total_percentage: 10, logo: API },
  ];

  const getColorScale = data => {
    const colorScale = {
      amazon: 'rgb(255, 0, 0)',
      api: 'rgb(255, 165, 0)',
      custom: 'rgb(255, 255, 0)',
      shopify: 'rgb(0, 255, 0)',
      woocommerce: 'rgb(0, 0, 255)'
    };

    return colorScale;
  };

  const colorScale = getColorScale(dummyShipmentData || []);
  const {storeBasedData}=useSelector(state=>state?.dashboardOrderReducer)
  const totalCount=storeBasedData?.reduce((acc,data)=>acc+data?.count,0)

  return (
    <div className="box-shadow shadow-sm p10">
      <h4 className="title">Store Based Orders</h4>
      {storeBasedData && storeBasedData.length > 0 && (
        <div className="">
          <div className="row">
            <div className="col">
              <div className="progress-widget">
                {storeBasedData.map((item, index) => (
                  <div key={index} className="mb-4">
                    <div className='d-flex justify-content-between mb-1'>
                      <div className='d-flex align-items-center'>
                        <img src={item.channel_logo} alt={item?.channel} width={24} />
                        <p className="font12 bold-600 mb-1 ms-2">{capatlize(item?.channel) || 'Unknown'}</p>
                      </div>
                      <p className="font12 text-gray mb-0">
                        {item.count} {percentage(item?.count,totalCount)}
                      </p>
                    </div>
                    <div className="progress mb-2">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{
                          width:`${(item?.count/totalCount)*100}%` ,
                          backgroundColor: colorScale[item.channel],
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
      ) }
    </div>
  );
}

export default ChannelByOrder;
