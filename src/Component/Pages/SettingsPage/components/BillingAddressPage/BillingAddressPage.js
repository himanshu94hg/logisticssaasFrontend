import React, { useState, useEffect } from 'react';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';
import './BillingAddressPage.css';
import { useNavigate } from 'react-router-dom';

const BillingAddressPage = () => {
    const Navigate = useNavigate();
    const handleSaveDetails = () => {

    }


    return (
        <div className='billing-address-page'>
            <div className='d-flex justify-content-between align-items-center mb-3'>
                <h4>Billing Address</h4>
                <button onClick={() => Navigate(-1)} className='btn main-button-outline'>
                    <FontAwesomeIcon icon={faArrowLeftLong} /> Back
                </button>
            </div>
            <section className='box-shadow shadow-sm p10 mb-4'>
                <div className='mt-3 d-flex gap-3 flex-wrap'>
                    <label>
                        Address Line 1
                        <input
                            className='input-field'
                            type='text'
                        />
                    </label>
                    <label>
                        Address Line 2
                        <input
                            className='input-field'
                            type='text'
                        />
                    </label>
                    <label>
                        Pincode
                        <input
                            className='input-field'
                            type='text'
                        />
                    </label>
                    <label>
                        City
                        <input
                            className='input-field'
                            type='text'
                        />
                    </label>
                    <label>
                        State
                        <input
                            className='input-field'
                            type='text'
                        />
                    </label>
                    <label>
                        Phone
                        <input
                            className='input-field'
                            type='text'
                        />
                    </label>
                </div>
                <div className='d-flex justify-content-end mt-4'>
                    <button className='btn main-button' onClick={handleSaveDetails}>Save Details</button>
                </div>
            </section>
        </div>
    );
};

export default BillingAddressPage;
