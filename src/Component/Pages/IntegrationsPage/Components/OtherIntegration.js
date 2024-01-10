import React from 'react'
import '../IntegrationsPage.css'

const OtherIntegration = () => {
    const data = [
        { title: 'WhatsApp', imageUrl: 'https://www.shipease.in/public/assets/images/channel/shopify.jpg' },
        { title: 'IVR (Cloud Connect)', imageUrl: 'https://www.shipease.in/public/assets/images/channel/shopify.jpg' },
        { title: 'Pragma', imageUrl: 'https://www.shipease.in/public/assets/images/channel/shopify.jpg' },
        // Add more data as needed
    ];

    return (
        <>
             <div className=' integration-container mb-3'>
                <h4>Other Integration</h4>
                <div className="card-grid-container">
                    {data.map((item, index) => (
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

export default OtherIntegration