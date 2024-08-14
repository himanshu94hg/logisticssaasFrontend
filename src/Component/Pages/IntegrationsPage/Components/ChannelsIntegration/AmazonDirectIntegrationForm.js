import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { BASE_URL_CORE } from '../../../../../axios/config';
import Logo from '../../../../../assets/image/integration/AmazonLogo.png';
import { customErrorFunction } from '../../../../../customFunction/errorHandling';


const AmazonDirectIntegrationForm = () => {
    const [value, setValue] = useState("")
    const authToken = Cookies.get("access_token")


    useEffect(() => {
        setValue("")
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.get(`${BASE_URL_CORE}/core-api/channel/amazon/get-redirect-url/?channel_name=${value}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            if (response.status === 200) {
                window.location.href = response?.data?.url
            }
        } catch (error) {
            customErrorFunction(error)
        }
    }

    return (
        <>
            <div className='amazon'>
                <section className='int-header'>
                    <div className='int-header-left'>
                        <img src={Logo} alt="Logo" />
                        <h2 className='mb-0'>Amazon</h2>
                    </div>
                    <div className='int-header-right'>
                        <p className='mb-0'>Need Help?</p>
                    </div>
                </section>
                <div className='int-body'>
                    <section className='box-shadow shadow-sm int-instructions'>
                        <h4>Instruction to integrate Amazon to Shipease</h4>

                        <ul className='timeline mb-3'>
                            {[
                                "Enter the asked details in the form",
                                "You will be redirected to consent screen",
                                "Login to your amazon seller central with your credentials",
                                "Select All the Permission required to fetch details from your account",
                                "You will be redirected to Shipease again",
                                "If successful the channel is integrated to Shipease",
                            ].map(
                                instruction => <li className='timeline-list' key={instruction}>{instruction}</li>)
                            }
                        </ul>
                    </section>
                    <section className='box-shadow shadow-sm int-form'>
                        <form onSubmit={handleSubmit}>
                            <div className='d-flex w-100 gap-5 mt-4'>
                                <h3>Integrate Amazon to Shipease</h3>
                            </div>
                            <div className='mt-3 d-flex justify-content-between'>
                                <div>
                                    <input type="text" className={`input-field`} onChange={(e) => setValue(e.target.value)} maxLength={50} />
                                </div>
                                <button type='submit' className='btn main-button'>One Click Integration</button>
                            </div>
                        </form>
                    </section>
                </div>

            </div>
        </>
    );
};

export default AmazonDirectIntegrationForm;
