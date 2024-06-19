import React from 'react'
import '../../IntegrationsPage.css'
import { useNavigate } from 'react-router';
import WCLogo from '../../../../../assets/image/integration/WCLogo.png'
import Magento from '../../../../../assets/image/integration/magento.png'
import OpenCart from '../../../../../assets/image/integration/OpenCart.png'
import Amazon from '../../../../../assets/image/integration/Amazon.png'
import Manual from '../../../../../assets/image/integration/Manual.png'

const ChannelsIntegration = () => {
    let navigate = useNavigate()
    const ShoppingCarts = [
        { child: 'shopify', title: 'Shopify', imageUrl: '../shopify.jpg' },
        { child: 'wooCommerce', title: 'WooCommerce', imageUrl: WCLogo },
        { child: 'opencart', title: 'Opencart', imageUrl: OpenCart },
        { child: 'storeHippo', title: 'StoreHippo', imageUrl: 'https://www.shipease.in/public/assets/images/channel/storehippo.png' },
        { child: 'magento', title: 'Magento', imageUrl: Magento },
        // Add more data as needed
    ];

    const OnlineMarketplaces = [
        { child: 'amazon', title: 'Amazon', imageUrl: Amazon },
        { child: 'amazon-direct', title: 'Amazon Direct', imageUrl: Amazon },
        // Add more data as needed
    ];

    const OtherChannels = [
        { child: 'manual-integration', title: 'Manual', imageUrl: Manual }
        // Add more data as needed
    ];

    return (
        <>
            <div className=' integration-container mb-3'>
                <div className='d-flex justify-content-between align-items-center w-100 mb-3'>
                    <h4 className='mb-0'>Shopping Carts</h4>
                    <button onClick={() => navigate('/integrations')} className='btn main-button'>View Integrations</button>
                </div>
                <div className="card-grid-container">
                    {ShoppingCarts.map((item, index) => (
                        <div key={index} className="card">
                            <div className={`card-img-container ${item.title}`}>
                                <img src={item.imageUrl} alt={item.title} width={40} />
                            </div>
                            <div className="card-content">
                                <h3 className="card-title">{item.title}</h3>
                                <button onClick={() => navigate(`/${item.child}-integration`)} className='btn main-button'>Integrate</button>
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
                                <button onClick={() => navigate(`/${item.child}-integration`)} className='btn main-button'>Integrate</button>
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
                                <button onClick={() => navigate(`/${item.child}-integration`)} className='btn main-button'>Integrate</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default ChannelsIntegration