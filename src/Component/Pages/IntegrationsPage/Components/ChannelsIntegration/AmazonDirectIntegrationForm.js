import React, { useState } from 'react';
import Logo from '../../../../../assets/image/integration/AmazonLogo.png';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AmazonDirectIntegrationForm = () => {

    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <>
            <div className='amazon'>
                <section className='int-header'>
                    <div className='int-header-left'>
                        <img src={Logo} alt="Logo" />
                        <h2 className='mb-0'>Amazon Direct</h2>
                    </div>
                    <div className='int-header-right'>
                        <p className='mb-0'>Need Help?</p>
                    </div>
                </section>
                <div className='int-body'>
                    <section className='box-shadow shadow-sm int-instructions'>
                        <h4>Instruction to integrate Amazon Direct to ShipEase</h4>

                        <ul className='timeline mb-3'>
                            {[
                                "Enter the asked details in the form",
                                "You will be redirected to consent screen",
                                "Login to your amazon seller central with your credentials",
                                "Select All the Permission required to fetch details from your account",
                                "You will be redirected to shipease again",
                                "If successful the channel is integrated to Shipease",
                            ].map(
                                instruction => <li className='timeline-list' key={instruction}>{instruction}</li>)
                            }
                        </ul>
                    </section>
                    <section className='box-shadow shadow-sm int-form'>
                        <form action="">
                            <div className='d-flex w-100 gap-5 mt-4'>
                                <label>
                                    Store Name
                                    <input className="input-field" type="text" />
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

export default AmazonDirectIntegrationForm;
