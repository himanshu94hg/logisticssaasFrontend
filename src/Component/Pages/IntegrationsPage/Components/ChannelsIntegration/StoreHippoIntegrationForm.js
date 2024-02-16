import React, { useState } from 'react';
import Logo from '../../../../../assets/image/integration/StoreHippoLogo.png';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const StoreHippoIntegrationForm = () => {

    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <>
            <div className='hippo'>
                <section className='int-header'>
                    <div className='int-header-left'>
                        <img src={Logo} alt="Logo" />
                        <h2 className='mb-0'>StoreHippo</h2>
                    </div>
                    <div className='int-header-right'>
                        <p className='mb-0'>Need Help?</p>
                    </div>
                </section>
                <div className='int-body'>
                    <section className='box-shadow shadow-sm int-instructions'>
                        <h4>Instruction to integrate StoreHippo to ShipEase</h4>

                        <h5>Execute On StoreHippo Panel</h5>
                        <ul className='timeline mb-3'>
                            {[
                                "Login to you StoreHippo Admin Panel",
                                "Search for 'Access Key'",
                                "Click On 'Add New'",
                                "Select User than click on 'Save'",
                            ].map(
                                instruction => <li className='timeline-list' key={instruction}>{instruction}</li>)
                            }
                        </ul>

                        <h5>Execute on Shipease Panel</h5>
                        <ul className='timeline mb-3'>
                            {[
                                "Copy Access Key that created using previous step.",
                                "Enter Channel Name.",
                                "Enter Store Url.(store url should be like this(https://youstorename.storehippo.com/)",
                                "Paste Access Token in Access Key field.",
                                "Admin Token start appearing in respective field. Click on submit button.",
                            ].map(
                                instruction => <li className='timeline-list' key={instruction}>{instruction}</li>)
                            }
                        </ul>

                    </section>
                    <section className='box-shadow shadow-sm int-form'>
                        <form action="">
                            <div className='d-flex w-100 gap-5 mt-4'>
                                <label>
                                    Channel Name
                                    <input className="input-field" type="text" />
                                </label>
                                <label>
                                    Store Name or URL
                                    <input className="input-field" type="text" />
                                    <span className='font13 text-sh-primary'>Store URL should be like http://yourstore.com</span>
                                </label>
                            </div>
                            <div className='d-flex w-100 gap-5 mt-4'>
                                <label>
                                    Access Key
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

export default StoreHippoIntegrationForm;
