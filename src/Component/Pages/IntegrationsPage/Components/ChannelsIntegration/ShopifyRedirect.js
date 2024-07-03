import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import Logo from '../../../../../assets/image/integration/ShopifyLogo.png';
import { BASE_URL_CORE } from '../../../../../axios/config';
import { customErrorFunction } from '../../../../../customFunction/errorHandling';
import { toast } from 'react-toastify';

const ShopifyRedirect = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const queryString = query.toString();
        const apiUrl = `${BASE_URL_CORE}/core-api/features/channel/validate-shopify-redirect/?${queryString}`;

        const sendRedirectData = async () => {
            try {
                const response = await axios.get(apiUrl, {
                    headers: {
                        'Authorization': `Bearer ${Cookies.get('access_token')}`,
                        'Content-Type': 'application/json',
                    }
                });

                if (response.status === 200) {
                    navigate('/integrations');
                    toast.success("Shopify Channel Integration successful");
                    console.log('Shopify integration successful', response.data);
                } else {
                    toast.error("Failed to send Shopify redirect data");
                }
            } catch (error) {
                customErrorFunction(error);
            }
        };

        sendRedirectData();
    }, [location.search, navigate]);

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
                                "To proceed, please click on the 'Connect Shopify With Shipease' button on your screen.",
                                "You'll be diverted to the Shopify seller login page. Log in to your Shopify account by entering your email address/username and password.",
                                "Once logged in, the app authorization page will open where you can verify your account integration with Shipease by clicking 'Install app'.",
                                "Now, you will be redirected to the Shipease channel page. Here you can edit your Shopify channel to modify it as per your preferences.",
                            ].map(
                                instruction => <li className='timeline-list' key={instruction}>{instruction}</li>)
                            }
                        </ul>
                    </section>
                    <section className='box-shadow shadow-sm int-form'>
                    </section>
                </div>
            </div>
        </>
    );
};

export default ShopifyRedirect;
