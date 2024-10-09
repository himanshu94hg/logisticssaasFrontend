import React, { useEffect, useState } from 'react'
import '../../IntegrationsPage.css'
import { useNavigate } from 'react-router-dom';
import EasyShipLogo from '../../../../../assets/image/integration/EasyShipLogo.png'
import EasyComLogoOMSLogo from '../../../../../assets/image/integration/EasyComLogoOMSLogo.png'
import ClickPostLogo from '../../../../../assets/image/integration/ClickPostLogo.png'
import UniCommerceLogo from '../../../../../assets/image/integration/UniCommerceLogo.png'
import VineRetailLogo from '../../../../../assets/image/integration/VineRetailLogo.png'
import OMSGuruLogo from '../../../../../assets/image/integration/OMSGuruLogo.png'
import LoaderScreen from '../../../../LoaderScreen/LoaderScreen';

const OMSIntegration = () => {
    let navigate = useNavigate()
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        setLoader(true)
        setTimeout(() => {
            setLoader(false)
        }, 230);
    }, [])

    const OMSData = [
        { child: 'unicommerce', title: 'Unicommerce', imageUrl: UniCommerceLogo },
        { child: 'easyecom', title: 'EasyEcom', imageUrl: EasyComLogoOMSLogo },
        { child: 'vine-retail', title: 'Vin eRetail', imageUrl: VineRetailLogo },
        { child: 'omsguru', title: 'OMS Guru', imageUrl: OMSGuruLogo },
        { child: 'easyship', title: 'EasyShip', imageUrl: EasyShipLogo },
        // Add more data as needed
    ];

    const OtherOMS = [
        { child: 'clickpost', title: 'ClickPost', imageUrl: ClickPostLogo },
        // Add more data as needed
    ];

    return (
        <>
            <div className=' integration-container mb-3'>
                <div className='d-flex justify-content-between align-items-center w-100 mb-3'>
                    <h4 className='mb-0'>OMS</h4>
                    <button onClick={() => navigate('/integrations', { state: { tabState: 'OMS' } })} className='btn main-button'>View Integrations</button>
                </div>
                <div className="card-grid-container">
                    {OMSData.map((item, index) => (
                        <div key={index} className="card">
                            <div className={`card-img-container ${item?.title}`}>
                                <img src={item?.imageUrl} alt={item?.title} width={40} />
                            </div>
                            <div className="card-content">
                                <h3 className="card-title">{item?.title}</h3>
                                <button onClick={() => navigate(`/${item?.child}-integration`)} className='btn main-button'>Integrate</button>                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className=' integration-container mb-3'>
                <h4>Other</h4>
                <div className="card-grid-container">
                    {OtherOMS.map((item, index) => (
                        <div key={index} className="card">
                            <div className={`card-img-container ${item?.title}`}>
                                <img src={item?.imageUrl} alt={item?.title} width={40} />
                            </div>
                            <div className="card-content">
                                <h3 className="card-title">{item?.title}</h3>
                                <button onClick={() => navigate(`/${item?.child}-integration`)} className='btn main-button'>Integrate</button>                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <LoaderScreen loading={loader} />
        </>
    )
}

export default OMSIntegration