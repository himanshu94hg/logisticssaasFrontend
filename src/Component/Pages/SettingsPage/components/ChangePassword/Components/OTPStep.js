import React from 'react'
import VerificationIcon from './Icons/VerificationIcon'
import SuccessChangeIcon from './Icons/SuccessChangeIcon'
import OTPIcon from './Icons/OTPIcon'

const OTPStep = ({ setVerificationTabs }) => {
    return (
        <>
            <>
                <div className='verfication-step d-flex flex-column align-items-center w-100'>
                    <div className='cp-img-container'>
                        <OTPIcon />
                    </div>
                    <p className='fw-bold mt-4 px-5 text-center'>We have sent you OTP for Verification</p>
                    <label className='px-4 mt-3'>
                        <input placeholder='Please enter your OTP code here' className='input-field' type="text" />
                    </label>
                    <button className='btn font12 text-sh-primary mt-2'>Resend</button>
                </div>
                <button onClick={() => setVerificationTabs('third-step')} className='btn main-button'>Continue</button>
            </>
        </>
    )
}

export default OTPStep