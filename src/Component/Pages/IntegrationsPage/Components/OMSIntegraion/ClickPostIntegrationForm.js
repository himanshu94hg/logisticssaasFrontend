import React, { useState } from 'react';
import Logo from '../../../../../assets/image/integration/MagentoLogo.png';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ClickPostIntegrationForm = () => {

    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <>
            <div className='clickpost'>
                <section className='int-header'>
                    <div className='int-header-left'>
                        <img src='https://www.shipease.in/public/assets/images/oms/clickpost2.png' alt="Logo" />
                        <h2 className='mb-0'>ClickPost</h2>
                    </div>
                    <div className='int-header-right'>
                        <p className='mb-0'>Need Help?</p>
                    </div>
                </section>
                <div className='int-body'>
                    <section className='box-shadow shadow-sm int-instructions'>
                        <h4>Instruction to integrate ClickPost to ShipEase</h4>

                        <ul className='timeline mb-3'>
                            {[
                                "Login to ClickPost Admin Panel.",
                                "Go to Clickpost/OMS",
                                "Copy credentials from shipease and paste in respective OMS.",
                                "Before this mention like choose Shipease as shipping partner.",
                                "And provide the credential.",
                                "Then integrate.",
                            ].map(
                                instruction => <li className='timeline-list' key={instruction}>{instruction}</li>)
                            }
                        </ul>
                    </section>
                    <section className='box-shadow shadow-sm int-form'>
                        <form action="">
                            <div className='d-flex w-100 gap-5 mt-4'>
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
                                    "Fulfill orders (Enabling this will auto fulfill order in EasyShip when an order is shipped with ShipEase)",
                                    "Cancel orders (Enabling this will auto cancel order in EasyShip when order is cancelled in ShipEase)",
                                    "Mark as paid (Mark COD orders as paid in EasyShip when orders are delivered to customer)",
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

export default ClickPostIntegrationForm;
