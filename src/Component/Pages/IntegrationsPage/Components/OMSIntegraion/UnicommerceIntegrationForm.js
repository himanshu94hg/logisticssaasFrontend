import React, { useState } from 'react';
import UnicommerceIntLogo from '../../../../../assets/image/integration/UnicommerceIntLogo.png';
import 'react-datepicker/dist/react-datepicker.css';

const UnicommerceIntegrationForm = () => {

    return (
        <>
            <div className='unicommerce'>
                <section className='int-header'>
                    <div className='int-header-left'>
                        <img src={UnicommerceIntLogo} alt="Logo" />
                        <h2 className='mb-0'>Unicommerce</h2>
                    </div>
                    <div className='int-header-right'>
                        <p className='mb-0'>Need Help?</p>
                    </div>
                </section>
                <div className='int-body'>
                    <section className='box-shadow shadow-sm int-instructions'>
                        <h4>Instruction to integrate Unicommerce to ShipEase</h4>
                        <ul className='timeline mb-3'>
                            {[
                                "Use shipease credentials.",
                                "Follow the instruction as per below link Shipease Unicommerce Integration.",
                            ].map(
                                instruction => <li className='timeline-list' key={instruction}>{instruction}</li>)
                            }
                        </ul>
                    </section>
                    <section className='box-shadow shadow-sm int-form'>
                        <form action="">
                            <div className='d-flex w-100 gap-3 mt-4 flex-column flex-lg-row'>
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
                                    Admin Access Token
                                    <input className="input-field" type="text" />
                                    <span className='font13 text-sh-primary'>Generate Admin Access Token</span>
                                </label>
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

export default UnicommerceIntegrationForm;
