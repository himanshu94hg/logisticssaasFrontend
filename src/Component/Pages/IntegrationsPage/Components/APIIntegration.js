import React, { useEffect } from 'react'
import '../IntegrationsPage.css'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const APIIntegration = () => {
    const dispatch = useDispatch()
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

    const {apiKey}=useSelector(state=>state?.integrationReducer)
    const handleSubmit = (e) => {
        console.log("object")
        e.preventDefault()
        dispatch({ type: "GENERATE_API_KEY_ACTION" })
    }

    useEffect(() => {
        dispatch({ type: "GET_API_KEY_ACTION" })
    }, [])

    return (
        <>
            <div className="box-shadow shadow-sm p10">
                <h4 className="h4 mb-4">Shipease API</h4>
                <div className="row mt-3">
                    <div className="col-sm-12">
                        <p><b>Expand and automate your online business with Shipease API.</b></p>
                        <h6 className="mb-3">Your API Key: <span className="text-muted">{apiKey}</span></h6>
                        {/* <form method="post" action="https://www.shipease.in/generate_api_key" onsubmit="return confirm('Are you sure?');"> */}
                        <form onSubmit={handleSubmit}>
                            <input type="hidden" name="_token" value="X8xK2HQGv8RIJl0FI2ZlgGAb7uRyAdinLAh33awl" />
                            <button type="submit" name="generate" value="generate" className="btn main-button" >Generate API Key</button>
                        </form>
                    </div>
                    <div className="col-sm-12 mt-3">
                        API Documentation: <a href="https://documenter.getpostman.com/view/14597142/2s9Y5R26CS" target="_blank&quot;" className="text-info">Click Here</a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default APIIntegration