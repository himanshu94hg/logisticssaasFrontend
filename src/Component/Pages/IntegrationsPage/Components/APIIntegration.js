import React from 'react'
import '../IntegrationsPage.css'

const APIIntegration = () => {
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

    return (
        <>
            <div class="box-shadow shadow-sm p10">
                <h3 class="h4 mb-4">Shipease API</h3>
                <div class="row mt-3">
                    <div class="col-sm-12">
                        <p><b>Expand and automate your online business with Shipease API.</b></p>
                        <h6 class="mb-3">Your API Key: <span class="text-muted">wElKnVJcXAHTFeFVOJXK2fClHy211QpDAxOccUaz</span></h6>
                        <form method="post" action="https://www.shipease.in/generate_api_key" onsubmit="return confirm('Are you sure?');">
                            <input type="hidden" name="_token" value="X8xK2HQGv8RIJl0FI2ZlgGAb7uRyAdinLAh33awl" />                                    <button type="submit" name="generate" value="generate" class="btn main-button">Generate API Key</button>
                        </form>
                    </div>
                    <div class="col-sm-12 mt-3">
                        API Documentation: <a href="https://documenter.getpostman.com/view/14597142/2s9Y5R26CS" target="_blank&quot;" class="text-info">Click Here</a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default APIIntegration