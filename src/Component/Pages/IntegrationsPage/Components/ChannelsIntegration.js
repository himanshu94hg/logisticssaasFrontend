import React from 'react'
import '../IntegrationsPage.css'

const ChannelsIntegration = () => {
    const ShoppingCarts = [
        { title: 'Shopify', imageUrl: '../shopify.jpg' },
        { title: 'WooCommerce', imageUrl: 'https://www.shipease.in/public/assets/images/channel/woocommerce.png' },
        { title: 'Opencart', imageUrl: 'https://www.shipease.in/public/assets/images/channel/opencart.png' },
        { title: 'StoreHippo', imageUrl: 'https://www.shipease.in/public/assets/images/channel/storehippo.png' },
        { title: 'Magento', imageUrl: 'https://www.shipease.in/public/assets/images/channel/magento.png' },
        // Add more data as needed
    ];

    const OnlineMarketplaces = [
        { title: 'Amazon', imageUrl: 'https://www.shipease.in/public/assets/images/channel/amazon.jpg' },
        { title: 'Amazon Direct', imageUrl: 'https://www.shipease.in/public/assets/images/channel/amazon.jpg' },
        // Add more data as needed
    ];

    const OtherChannels = [
        { title: 'Manual', imageUrl: 'https://www.shipease.in/public/assets/images/channel/manual.jpg' }
        // Add more data as needed
    ];

    return (
        <>
            <div className=' integration-container mb-3'>
                <h4>Shopping Carts</h4>
                <div className="card-grid-container">
                    {ShoppingCarts.map((item, index) => (
                        <div key={index} className="card">
                            <div className={`card-img-container ${item.title}`}>
                                <img src={item.imageUrl} alt={item.title} width={40} />
                            </div>
                            <div className="card-content">
                                <h3 className="card-title">{item.title}</h3>
                                <button className='btn main-button'>Integrate</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className=' integration-container mb-3'>
                <h4>Online Marketplaces</h4>
                <div className="card-grid-container">
                    {OnlineMarketplaces.map((item, index) => (
                        <div key={index} className="card">
                            <div className={`card-img-container ${item.title}`}>
                                <img src={item.imageUrl} alt={item.title} width={40} />
                            </div>
                            <div className="card-content">
                                <h3 className="card-title">{item.title}</h3>
                                <button className='btn main-button'>Integrate</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* <div className='box-shadow shadow-sm integration-container mb-3'> */}
            <div className=' integration-container mb-3'>
                <h4>Other</h4>
                <div className="card-grid-container">
                    {OtherChannels.map((item, index) => (
                        <div key={index} className="card">
                            <div className={`card-img-container ${item.title}`}>
                                <img src={item.imageUrl} alt={item.title} width={40} />
                            </div>
                            <div className="card-content">
                                <h3 className="card-title">{item.title}</h3>
                                <button className='btn main-button'>Integrate</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default ChannelsIntegration