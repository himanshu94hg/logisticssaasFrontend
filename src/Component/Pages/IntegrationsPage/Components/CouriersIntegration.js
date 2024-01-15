import React from 'react'
import '../IntegrationsPage.css'

const CouriersIntegration = () => {
    const data = [
        { title: 'Blue Dart', imageUrl: 'https://app.shiprocket.in/app/img/couriers/Bluedart.png' },
        { title: 'Blue Dart Surface', imageUrl: 'https://app.shiprocket.in/app/img/couriers/Bluedart.png' },
        { title: 'Xpressbees', imageUrl: 'https://app.shiprocket.in/app/img/couriers/ExpressBees-Surface.png' },
        { title: 'Xpressbees Surface', imageUrl: 'https://app.shiprocket.in/app/img/couriers/ExpressBees-Surface.png' },
        { title: 'Ekart', imageUrl: 'https://ekartlogistics.com/assets/images/ekblueLogo.png' },
        { title: 'Delhivery', imageUrl: 'https://app.shiprocket.in/app/img/couriers/Delhivery.png' },
        { title: 'DTDC', imageUrl: 'https://app.shiprocket.in/app/img/couriers/Dtdc.png' },
        { title: 'Ecom Express', imageUrl: 'https://app.shiprocket.in/app/img/couriers/EcomEx.png' },
        { title: 'ShadowFax', imageUrl: 'https://app.shiprocket.in/app/img/couriers/ShadowFax.png' },

        // Add more data as needed
    ];

    return (
        <>
            <div className=' integration-container mb-3'>
                <h4>Couriers</h4>
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

export default CouriersIntegration