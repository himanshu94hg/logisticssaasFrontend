import React, { useState } from 'react';
import OMSGuru from '../../../../../assets/image/integration/OMSGuru.png';
import 'react-datepicker/dist/react-datepicker.css';

const OMSGuruIntegrationForm = () => {

    return (
        <>
            <div className='omsguru'>
                <section className='int-header'>
                    <div className='int-header-left'>
                        <img src={OMSGuru} alt="Logo" />
                        <h2 className='mb-0'>OMS Guru</h2>
                    </div>
                    <div className='int-header-right'>
                        <p className='mb-0'>Need Help?</p>
                    </div>
                </section>
                <div className='int-body'>
                    <section className='box-shadow shadow-sm int-instructions'>
                        <h4>Instruction to integrate OMS Guru to ShipEase</h4>
                        <ul className='timeline mb-3'>
                            {[
                                "Login to OMS Guru Admin Panel.",
                                "Go to Apps.",
                                "Click on Private Apps Button.",
                                "Click on Create a Private App.",
                                "Enter Title name under the Description tab and click on Save.",
                                "Click on Title, as you entered earlier.",
                                "Here you will find OMS Guru API Key, password, Shared Secret.",
                                "Copy the identifiers and integrate the channel.",
                            ].map(
                                instruction => <li className='timeline-list' key={instruction}>{instruction}</li>)
                            }
                        </ul>
                    </section>
                    <section className='box-shadow shadow-sm int-form'>
                        <form action="">
                            <div className='d-flex w-100 gap-3 flex-column flex-lg-row mt-4'>
                                <label>
                                    Username
                                    <input className="input-field" type="text" />
                                </label>
                                <label>
                                    Password
                                    <input className="input-field" type="text" />
                                    <span className='font13 text-sh-primary'>Store URL should be like http://yourstore.com</span>
                                </label>
                            </div>
                            <div className='d-flex w-100 gap-5 mt-4'>
                                <label>
                                    Shipease Token
                                    <input className="input-field" type="text" />
                                </label>
                            </div>
                            <div className='int-checkbox mt-3'>
                                {[
                                    "Fulfill orders (Enabling this will auto fulfill order in OMS Guru when an order is shipped with ShipEase)",
                                    "Cancel orders (Enabling this will auto cancel order in OMS Guru when order is cancelled in ShipEase)",
                                    "Mark as paid (Mark COD orders as paid in OMS Guru when orders are delivered to customer)",
                                ].map(text => (
                                    <label key={text}>
                                        <input className="input-checkbox mt-1" type="checkbox" />
                                        {text}
                                    </label>
                                ))}
                            </div>
                            <div className='mt-3 d-flex justify-content-end'>
                                <button type='submit' className='btn main-button'>Submit</button>
                            </div>
                        </form>
                    </section>
                </div>

            </div>
        </>
    );
};

export default OMSGuruIntegrationForm;
