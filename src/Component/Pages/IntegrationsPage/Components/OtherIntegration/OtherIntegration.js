import React, { useEffect, useState } from 'react'
import '../../IntegrationsPage.css'
import { useNavigate } from 'react-router-dom';
import LoaderScreen from '../../../../LoaderScreen/LoaderScreen';
import whatsappIcon from '../../../../../assets/image/integration/whatsappIcon.png'
import IVRIcon from '../../../../../assets/image/integration/IVRIcon.png'
import pragma from '../../../../../assets/image/integration/pragma.png'

const OtherIntegration = () => {
    const navigate = useNavigate()
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        setLoader(true)
        setTimeout(() => {
            setLoader(false)
        }, 230);
    }, [])

    const data = [
        { child: 'WhatsApp', title: 'WhatsApp', imageUrl: whatsappIcon },
        { child: 'IVR', title: 'IVR (Cloud Connect)', imageUrl: IVRIcon },
        { child: 'Pragma', title: 'Pragma', imageUrl: pragma },
        // Add more data as needed

    ];

    const handleNavigate = (link) => {
        if (link === "WhatsApp") {
            navigate(`/${link}-integration`)
        }
        else (
            // alert("")
            console.log("No Link Found")
        )
    }

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
                            <div className={`card-img-container ${item.child}`}>
                                <img src={item.imageUrl} alt={item.title} width={40} />
                            </div>
                            <div className="card-content">
                                <h3 className="card-title">{item.title}</h3>
                                <button onClick={() => handleNavigate(item.child)} className='btn main-button'>Integrate</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <LoaderScreen loading={loader} />
        </>
    )
}

export default OtherIntegration