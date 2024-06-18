import React, { useState, useEffect } from 'react';
import 'react-toggle/style.css';
import './BillingAddressPage.css';
import { useNavigate } from 'react-router-dom';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';

const BillingAddressPage = () => {
    const Navigate = useNavigate();
    const handleSaveDetails = () => {

    }


    return (
        <div className='billing-address-page'>
            <div className='d-flex justify-content-between align-items-center mb-3'>
                <h4>Billing Address</h4>
                <button className='btn main-button-outline' onClick={() => Navigate(-1)}><MdOutlineKeyboardBackspace className='align-text-bottom' /> Go back</button>
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
