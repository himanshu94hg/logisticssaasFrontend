import React from 'react'
import '../IntegrationsPage.css'

const OtherIntegration = () => {
    const data = [
        { title: 'Shopify', imageUrl: 'https://www.shipease.in/public/assets/images/channel/shopify.jpg' },
        { title: 'WooCommerce', imageUrl: 'https://www.shipease.in/public/assets/images/channel/woocommerce.png' },
        { title: 'Magento', imageUrl: 'https://www.shipease.in/public/assets/images/channel/magento.png' },
        { title: 'StoreHippo', imageUrl: 'https://www.shipease.in/public/assets/images/channel/storehippo.png' },
        { title: 'Amazon', imageUrl: 'https://www.shipease.in/public/assets/images/channel/amazon.jpg' },
        { title: 'Amazon Direct', imageUrl: 'https://www.shipease.in/public/assets/images/channel/amazon.jpg' },
        { title: 'Opencart', imageUrl: 'https://www.shipease.in/public/assets/images/channel/opencart.png' },
        { title: 'Manual', imageUrl: 'https://www.shipease.in/public/assets/images/channel/manual.jpg' }
        // Add more data as needed
    ];

    return (
        <>
                <h4>OTHER</h4>

            <div className="card-grid-container">
                {data.map((item, index) => (
                    <div key={index} className="card">
                        <div className={`card-img-container ${item.title}`}>
                            <img src={item.imageUrl} alt={item.title} width={30} />
                        </div>
                        <div className="card-content">
                            <h3 className="card-title">{item.title}</h3>
                            <button className='btn main-button'>Integrate</button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default OtherIntegration