import Cookies from 'js-cookie';
import React, { useState } from 'react'
import VerificationIcon from './Icons/VerificationIcon'
import { BASE_URL_CORE } from '../../../../../../axios/config'
import axios from 'axios';
import { customErrorFunction } from '../../../../../../customFunction/errorHandling';
import { toast } from 'react-toastify';

const VerificationStep = ({ setStep ,setEmail}) => {
    const [value, setValue] = useState('')
    const [error, setError] = useState('')
    let authToken = Cookies.get("access_token")


    const handleClick = async () => {
        
        if (!value) {
            setError('Please enter a valid email or phone number.');
            return;
        }
        try {
            const response = await axios.get(`${BASE_URL_CORE}/core-api/accounts/sending-otp/?username=${value}&feature=sign-in`, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            if (response?.status === 200) {
                setStep(2)
                setValue('')
                toast.success(response?.data?.message)
            }
        } catch (error) {
            customErrorFunction(error)
        }
    }


    return (
        <>
            <>
                <div className='verfication-step d-flex flex-column align-items-center w-100'>
                    <div className='cp-img-container'>
                        <VerificationIcon />
                    </div>
                    <p className='fw-bold mt-4 px-5 text-center'>Please Enter Your Email/Phone to Receive a Verification Code</p>
                    <label className='px-4 mt-3'>
                        <input
                            type="text"
                            onChange={(e) => {
                                setValue(e.target.value);
                                setError('');
                                setEmail(e.target.value)
                            }}
                            placeholder='Email or phone number'
                            className={`input-field ${error && 'input-field-error'}`}
                        />
                        {error && <div className="text-danger" style={{ fontSize: 12 }}>{error}</div>}
                    </label>
                </div>
                <button onClick={() => handleClick()} className='btn main-button'>Continue</button>
            </>
        </>
    )
}

export default VerificationStep