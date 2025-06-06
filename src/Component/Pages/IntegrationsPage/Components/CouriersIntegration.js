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
        { title: 'Blue Dart', link: 'bluedart-integration', imageUrl: 'https://app.shiprocket.in/app/img/couriers/Bluedart.png' },
        { title: 'Ekart', link: 'ekart-integration', imageUrl: 'https://www.ekartlogistics.com/assets/fonts/ekblueLogo.e2611ca7449dd40e420e1620f973a5e4.png' },
        { title: 'DTDC', link: 'dtdc-integration', imageUrl: 'https://app.shiprocket.in/app/img/couriers/Dtdc.png' },
        { title: 'Xpressbees', link: 'xpressbees-integration', imageUrl: 'https://app.shiprocket.in/app/img/couriers/ExpressBees-Surface.png' },
        { title: 'Delhivery', link: 'delhivery-integration', imageUrl: 'https://app.shiprocket.in/app/img/couriers/Delhivery.png' },
        // { title: 'Ecom Express', link: '', imageUrl: 'https://app.shiprocket.in/app/img/couriers/EcomEx.png' },
        { title: 'ShadowFax', link: 'shadowfax-integration', imageUrl: 'https://app.shiprocket.in/app/img/couriers/ShadowFax.png' },

        // Add more data as needed
    ];

    const handleNavigate = (link) => {
        if (link === '') {
            return null
        }
        else {
            navigate(link)
        }
    }

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
                                <button onClick={() => handleNavigate(item.link)} className='btn main-button'>Integrated</button>
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