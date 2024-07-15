import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../../../../assets/image/integration/ShopifyLogo.png';
import 'react-datepicker/dist/react-datepicker.css';
import Cookies from 'js-cookie';
import { BASE_URL_CORE } from '../../../../../axios/config';

const ShopifyIntegrationForm = () => {
    const navigation = useNavigate();
    const hardcodedToken = Cookies.get("access_token");

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`${BASE_URL_CORE}/core-api/features/channel/get-shopify-redirect-url/`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${hardcodedToken}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                const data = await response.json();
                const { redirect_url, nonce } = data;

                Cookies.set('redirect_url', redirect_url, { expires: 1 });
                Cookies.set('nonce', nonce, { expires: 1 });

                console.log("Redirect URL", redirect_url);
                console.log("Nonce", nonce);

                const finalRedirectUrl = `${redirect_url}&redirect_uri=${encodeURIComponent(window.location.href)}`;

                setTimeout(() => {
                    window.location.href = finalRedirectUrl;
                }, 2000);
            } else {
                console.error('Failed to fetch redirect URL:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error occurred:', error);
        }
    };

    return (
        <>
            <div className='p10'>
                <section className='int-header'>
                    <div className='int-header-left'>
                        <img src={Logo} alt="Logo" />
                        <h2 className='mb-0'>Shopify</h2>
                    </div>
                    <div className='int-header-right'>
                        <p className='mb-0'>Need Help?</p>
                    </div>
                </section>
                <div className='int-body'>
                    <section className='box-shadow shadow-sm int-instructions'>
                        <h4>Instruction to integrate Shopify to Shipease</h4>
                        <ul className='timeline'>
                            {[
                                "To proceed, please click on the 'One Click Integration' button on your screen.",
                                "You'll be diverted to the Shopify seller login page. Log in to your Shopify account by entering your email address/username and password.",
                                "Once logged in, the app authorization page will open where you can verify your account integration with Shipease by clicking 'Install app'.",
                                "Now, you will be redirected to the Shipease channel page. Here you can edit your Shopify channel to modify it as per your preferences.",
                            ].map(
                                instruction => <li className='timeline-list' key={instruction}>{instruction}</li>)
                            }
                        </ul>
                    </section>
                    <section className='box-shadow shadow-sm int-form'>
                        <form onSubmit={handleSubmit}>
                            <div className='int-checkbox mt-3'>
                                <h3>Integrate Shopify to Shipease</h3>
                            </div>
                            <div className='mt-3 d-flex justify-content-end'>
                                <button type='submit' className='btn main-button'>One Click Integration</button>
                            </div>
                        </form>
                    </section>
                </div>
            </div>
        </>
    );
};

export default ShopifyIntegrationForm;
