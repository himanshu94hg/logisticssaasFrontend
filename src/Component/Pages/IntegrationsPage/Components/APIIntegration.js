import React, { useEffect, useState } from 'react'
import '../IntegrationsPage.css'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import LoaderScreen from '../../../LoaderScreen/LoaderScreen';
import CustomTooltip from '../../../common/CustomTooltip/CustomTooltip';
import { FaRegCopy } from 'react-icons/fa';

const APIIntegration = () => {
    const dispatch = useDispatch()
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        setLoader(true)
        setTimeout(() => {
            setLoader(false)
        }, 230);
    }, [])
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

    const { apiKey } = useSelector(state => state?.integrationReducer)
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch({ type: "GENERATE_API_KEY_ACTION" })
    }

    useEffect(() => {
        dispatch({ type: "GET_API_KEY_ACTION" })
    }, [])
    const [copyText, setcopyText] = useState("Api Key")

    const handleCopy = (apiKey) => {
        navigator.clipboard.writeText(apiKey)
            .then(() => {
                setcopyText("Copied")
                setTimeout(() => {
                    setcopyText('Api Key');
                }, 1500);
            })
            .catch(err => {
            });
    };

    return (
        <>
            <div className="box-shadow shadow-sm p10">
                <h4 className="h4 mb-4">Shipease API</h4>
                <div className="row mt-3">
                    <div className="col-sm-12">
                        <p><b>Expand and automate your online business with Shipease API Key.</b></p>
                        <div className="d-flex">
                            <h6 className="mb-3">Your API Key: <span className="text-muted">{apiKey}</span></h6>
                            <div className='ms-2'>
                                <CustomTooltip
                                    triggerComponent={<button className='btn copy-button p-0 ps-1' onClick={() => handleCopy(apiKey)}><FaRegCopy /></button>}
                                    tooltipComponent={copyText}
                                    addClassName='copytext-tooltip'
                                />
                            </div>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <input type="hidden" name="_token" value="X8xK2HQGv8RIJl0FI2ZlgGAb7uRyAdinLAh33awl" />
                            <button type="submit" name="generate" value="generate" className="btn main-button" >Generate API Key</button>
                        </form>
                    </div>
                    <div className="col-sm-12 mt-3">
                        API Documentation: <a href="https://documenter.getpostman.com/view/14597142/2sA3e2eUo1" target="_blank&quot;" className="text-info">Click Here</a>
                    </div>
                </div>
            </div>
            <LoaderScreen loading={loader} />
        </>
    )
}

export default APIIntegration