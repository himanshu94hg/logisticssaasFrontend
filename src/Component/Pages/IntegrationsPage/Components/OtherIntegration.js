import React from 'react'
import '../IntegrationsPage.css'
import { useNavigate } from 'react-router-dom';

const OtherIntegration = () => {
    const navigate = useNavigate()
    const data = [
        { title: 'WhatsApp', imageUrl: 'https://www.shipease.in/public/assets/images/channel/shopify.jpg' },
        { title: 'IVR (Cloud Connect)', imageUrl: 'https://www.shipease.in/public/assets/images/channel/shopify.jpg' },
        { title: 'Pragma', imageUrl: 'https://www.shipease.in/public/assets/images/channel/shopify.jpg' },
        // Add more data as needed

    ];

    return (
        <>
            <div className=' integration-container mb-3'>
                <div className='d-flex justify-content-between align-items-center w-100 mb-3'>
                    <h4 className='mb-0'>Other Integration</h4>
                    <button onClick={() => navigate('/integrations', { state: { tabState: 'Other' } })} className='btn main-button'>View Integrations</button>
                </div>
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