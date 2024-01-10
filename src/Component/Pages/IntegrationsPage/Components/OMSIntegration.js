import React from 'react'
import '../IntegrationsPage.css'

const OMSIntegration = () => {
    const OMSData = [
        { title: 'EasyShip', imageUrl: 'https://www.shipease.in/public/assets/images/oms/easyship.png' },
        { title: 'EasyEcom', imageUrl: 'https://www.shipease.in/public/assets/images/oms/easyecom.png' },
        { title: 'ClickPost', imageUrl: 'https://www.shipease.in/public/assets/images/oms/clickpost2.png' },
        { title: 'VineRetail', imageUrl: 'https://www.shipease.in/public/assets/images/channel/magento.png' },
        { title: 'Unicommerce', imageUrl: 'https://www.shipease.in/public/assets/images/channel/magento.png' },
        // Add more data as needed
    ];

    const OtherOMS = [
        { title: 'OMSGuru', imageUrl: 'https://www.shipease.in/public/assets/images/channel/storehippo.png' },
        // Add more data as needed
    ];

    return (
        <>
            <div className=' integration-container mb-3'>
                <h4>OMS</h4>
                <div className="card-grid-container">
                    {OMSData.map((item, index) => (
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
                <h4>Other OMS</h4>
                <div className="card-grid-container">
                    {OtherOMS.map((item, index) => (
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

export default OMSIntegration