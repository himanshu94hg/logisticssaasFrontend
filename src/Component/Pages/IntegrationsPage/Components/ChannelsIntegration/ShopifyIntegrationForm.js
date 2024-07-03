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
                        <h4>Instruction to integrate Shopify to ShipEase</h4>
                        <ul className='timeline'>
                            {[
                                "Login to Shopify Admin Panel.",
                                "Go to Apps.",
                                "Click Develop Apps for your store.",
                                "Click on Create an App.",
                                "Enter Name of the app and Select Account associated with your store.",
                                "Click on Create App Button",
                                "Now Click on Configure Admin API Scopes and Select All Permission that is needed for Order,Fulfillment,Shipping,Payments and Customer Data and click on Save Button",
                                "Now Click on Install App Button",
                                "Here You will find Admin API access token,API key and API Secret Key",
                                "Copy the identifiers and integrate the channel.",
                                "Please do not enter https:// or trailing / in Store URL just enter store.myshopify.com"
                            ].map(
                                instruction => <li className='timeline-list' key={instruction}>{instruction}</li>)
                            }
                        </ul>
                    </section>
                    <section className='box-shadow shadow-sm int-form'>
                        <form onSubmit={handleSubmit}>
                            <div className='int-checkbox mt-3'>
                                <h3>Integrate shopify to ShipEase</h3>
                            </div>
                            <div className='mt-3 d-flex justify-content-end'>
                                <button type='submit' className='btn main-button'>CONNECT SHOPIFY WITH SHIPEASE</button>
                            </div>
                        </form>
                    </section>
                </div>
            </div>
        </>
    );
};

export default ShopifyIntegrationForm;
