import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../../../../assets/image/integration/ShopifyLogo.png';
import DatePicker from 'react-datepicker';
import axios from "axios";
import 'react-datepicker/dist/react-datepicker.css';
import Swal from "sweetalert2";
import Cookies from 'js-cookie';
import moment from 'moment';
import { BASE_URL_CORE } from '../../../../../axios/config';
import { customErrorFunction, errorHandleSecond, errorHandlefirst, errorinApi } from '../../../../../customFunction/errorHandling';

const ShopifyRedirect = () => {

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

                    </section>
                </div>
            </div>
        </>
    );
};

export default ShopifyRedirect;
