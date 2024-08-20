import React from 'react';
import { useSelector } from 'react-redux';
import CustomIcon from '../../../../common/Icons/CustomIcon';
import shopifyImg from "../../../../../assets/image/integration/shopify.png";
import woocomImg from "../../../../../assets/image/integration/WCLogo.png";
import openCartImg from "../../../../../assets/image/integration/OpenCart.png";
import storeHipImg from "../../../../../assets/image/integration/StoreHippoLogo.png";
import magentoImg from "../../../../../assets/image/integration/magento.png";
import amazonImg from "../../../../../assets/image/logo/AmazonLogo.png";
import amazonDirImg from "../../../../../assets/image/integration/AmazonLogo.png";
import apiChannelIcon from "../../../../../assets/image/integration/APIChannelIcon.png";
import easycomIcon from "../../../../../assets/image/integration/easyecom.png";
import unicommerceIcon from "../../../../../assets/image/integration/UnicommerceIcon.png";
import { capatlize, percentage } from '../../../../../customFunction/functionLogic';

const ChannelByOrder = () => {
  const { storeBasedData } = useSelector(state => state?.dashboardOrderReducer)
  const totalCount = storeBasedData?.reduce((acc, data) => acc + data?.count, 0)

  const dummyShipmentData = [
    { name: 'Shopify', total_count: 300, total_percentage: 15, logo: shopifyImg },
    { name: 'WooCommerce', total_count: 200, total_percentage: 10, logo: woocomImg },
    { name: 'opencart', total_count: 200, total_percentage: 10, logo: openCartImg },
    { name: 'magento', total_count: 200, total_percentage: 10, logo: magentoImg },
    { name: 'Amazon', total_count: 500, total_percentage: 25, logo: amazonImg },
    { name: 'api', total_count: 200, total_percentage: 10, logo: apiChannelIcon },
    { name: 'storehippo', total_count: 200, total_percentage: 10, logo: storeHipImg },
    { name: 'easyecom', total_count: 200, total_percentage: 10, logo: easycomIcon },
    { name: 'custom', total_count: 700, total_percentage: 35, logo: CustomIcon },
    { name: 'amazon_direct', total_count: 700, total_percentage: 35, logo: amazonDirImg },
    { name: 'unicommerce', total_count: 200, total_percentage: 10, logo: unicommerceIcon },
  ];

  const getColorScale = data => {
    const colorScale = {
      shopify: '#0D9F1A',
      woocommerce: 'rgb(0, 0, 255)',
      opencart: '#420d9f',
      magento: 'orange',
      amazon: '#ffc281',
      api: 'red',
      storehippo: '#ffc281',
      easyecom: 'blue',
      amazon_direct: '#ffc281',
      unicommerce: '#9b59b6',
      custom: '#5dade2',
    };

    return colorScale;
  };

  const colorScale = getColorScale(dummyShipmentData || []);


  const getChannelIcon = (channel) => {
    switch (channel) {
      case "shopify":
        return shopifyImg;
      case "woocommerce":
        return woocomImg;
      case "opencart":
        return openCartImg;
      case "magento":
        return magentoImg;
      case "amazon":
        return amazonImg;
      case "api":
        return apiChannelIcon;
      case "storehippo":
        return storeHipImg;
      case "easyecom":
        return easycomIcon;
      case "amazon_direct":
        return amazonDirImg;
      case "unicommerce":
        return unicommerceIcon;
      case "custom":
        return null;
      default:
        return null;
    }
  };

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
                        {item?.channel === "custom" ? (
                          <CustomIcon style={{ borderRadius: 20, width: 34, height: 34 }} />
                        ) : (
                          <img
                            src={getChannelIcon(item?.channel)}
                            alt={item?.channel}
                            width={34}
                            style={{ borderRadius: 20 }}
                          />
                        )}
                        <p className="font12 bold-600 mb-1 ms-2">{capatlize(item?.channel) || 'Unknown'}</p>
                      </div>
                      <p className="font12 text-gray mb-0">
                        {item?.count} {percentage(item?.count, totalCount)}
                      </p>
                    </div>
                    <div className="progress mb-2">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{
                          width: `${(item?.count / totalCount) * 100}%`,
                          backgroundColor: colorScale[item?.channel],
                        }}
                        aria-valuenow={item?.total_percentage}
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
      )}
    </div>
  );
}

export default ChannelByOrder;
