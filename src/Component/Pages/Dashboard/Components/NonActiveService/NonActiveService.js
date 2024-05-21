import React from 'react'

const NonActiveService = () => {
    return (
        <>
            <div className='non-active-service'>
                <div className='nas-message'>
                    <h3>Unlock Premium Features!</h3>
                    <p>Enhance your experience by accessing our exclusive premium features. Upgrade now to enjoy:</p>
                    <ul>
                        <li><strong>Advanced Functionality:</strong> Gain access to powerful tools and capabilities.</li>
                        <li><strong>Priority Support:</strong> Get faster response times and personalized assistance.</li>
                        <li><strong>Exclusive Content:</strong> Access special content available only to premium users.</li>
                        <li><strong>Customization Options:</strong> Personalize your experience with advanced settings and themes.</li>
                        <li><strong>Premium Integrations:</strong> Connect with other premium services and tools for seamless workflow.</li>
                        <li><strong>Exclusive Discounts:</strong> Enjoy special offers and discounts on related products and services.</li>
                    </ul>
                    <p>Upgrade today and take full advantage of all that we have to offer!</p>
                    <div className='d-flex justify-content-end'>
                        <button className='btn main-button ms-2'>Enable</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NonActiveService