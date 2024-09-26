import axios from 'axios';
import Cookies from 'js-cookie';
import OTPIcon from './Icons/OTPIcon'
import { toast } from 'react-toastify';
import React, { useState } from 'react'
import { BASE_URL_CORE } from '../../../../../../axios/config'
import { customErrorFunction } from '../../../../../../customFunction/errorHandling';

const OTPStep = ({email, setStep }) => {
    const [value, setValue] = useState('')
    const [error, setError] = useState('')
    let authToken = Cookies.get("access_token")

    const handleClick = async () => {
        setStep(3)

        // const data={
        //     username: email,
        //     otp: value, 
        //     feature: "sign-in"
        // }

        // try {
        //     const response = await axios.post(`${BASE_URL_CORE}/core-api/accounts/verifying-otp/`,data, {
        //         headers: {
        //             Authorization: `Bearer ${authToken}`
        //         }
        //     });
        //     if (response?.status === 200) {
        //         setValue('')
        //         toast.success(response?.data?.message)
        //     }
        // } catch (error) {
        //     customErrorFunction(error)
        // }
    }

    return (
        <>
            <>
                <div className='verfication-step d-flex flex-column align-items-center w-100'>
                    <div className='cp-img-container'>
                        <OTPIcon />
                    </div>
                    <p className='fw-bold mt-4 px-5 text-center'>We have sent you OTP for Verification</p>
                    <label className='px-4 mt-3'>
                    <input
                            type="text"
                            onChange={(e) => {
                                setError('');
                                setValue(e.target.value);
                            }}
                            placeholder='Email OTP'
                            className={`input-field ${error && 'input-field-error'}`}
                        />
                        {error && <div className="text-danger" style={{ fontSize: 12 }}>{error}</div>}

                    </label>
                    <button className='btn font12 text-sh-primary mt-2'>Resend</button>
                </div>
                <button onClick={() => handleClick()} className='btn main-button'>Continue</button>
            </>
        </>
    )
}

export default OTPStep