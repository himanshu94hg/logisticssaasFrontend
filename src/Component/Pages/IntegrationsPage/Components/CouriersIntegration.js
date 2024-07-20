import React, { useEffect, useState } from 'react'
import '../IntegrationsPage.css'
import { useNavigate } from 'react-router-dom';
import LoaderScreen from '../../../LoaderScreen/LoaderScreen';

const CouriersIntegration = () => {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        setLoader(true)
            setTimeout(() => {
                setLoader(false)
            }, 230);
    }, [])

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
            <div className='integration-container mb-3'>
                <div className='d-flex justify-content-between align-items-center w-100 mb-3'>
                    <h4 className='mb-0'>Couriers</h4>
                    <button onClick={() => navigate('/integrations', { state: { tabState: 'Courier' } })} className='btn main-button'>View Integrations</button>
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
            <LoaderScreen loading={loader} />
        </>
    )
}

export default CouriersIntegration