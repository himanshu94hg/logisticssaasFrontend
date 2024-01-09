import React from 'react'
import './ChannelsPage.css'

const ChannelsPage = () => {

    const data = [
        { title: 'Shopify', imageUrl: '	https://www.shipease.in/public/assets/images/channel/shopify.jpg' },
        { title: 'WooCommerce', imageUrl: 'https://www.shipease.in/public/assets/images/channel/woocommerce.png' },
        { title: 'Magento 2', imageUrl: 'https://www.shipease.in/public/assets/images/channel/magento.png' },
        { title: 'StoreHippo', imageUrl: 'https://www.shipease.in/public/assets/images/channel/storehippo.png' },
        { title: 'Amazon', imageUrl: 'https://www.shipease.in/public/assets/images/channel/amazon.jpg' },
        { title: 'Amazon Direct', imageUrl: 'https://www.shipease.in/public/assets/images/channel/amazon.jpg' },
        { title: 'Opencart', imageUrl: 'https://www.shipease.in/public/assets/images/channel/opencart.png' },
        { title: 'Manual', imageUrl: 'https://www.shipease.in/public/assets/images/channel/manual.jpg' }
        // Add more data as needed
      ];

    return (
        <>
            {/* <div className="card-grid-container">
                {data.map((item, index) => (
                    <div key={index} className="card">
                        <img src={item.imageUrl} alt={item.title} className="card-image" />
                        <div className="card-content">
                            <h3 className="card-title">{item.title}</h3>
                            <p className="card-description">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div> */}
            <div className='box-shadow shadow-sm p7'>
                <h1 className='mb-3'>Channels</h1>

                <div className='box-shadow shadow-sm p7'></div>

            </div>
        </>
    )
}

export default ChannelsPage