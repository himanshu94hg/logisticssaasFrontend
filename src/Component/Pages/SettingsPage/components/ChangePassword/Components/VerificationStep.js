import React from 'react'
import VerificationIcon from './Icons/VerificationIcon'

const VerificationStep = ({ setVerificationTabs }) => {
    return (
        <>
            <>
                <div className='verfication-step d-flex flex-column align-items-center w-100'>
                    <div className='cp-img-container'>
                        <VerificationIcon />
                    </div>
                    <p className='fw-bold mt-4 px-5 text-center'>Please Enter Your Email/Phone to Receive a Verification Code</p>
                    <label className='px-4 mt-3'>
                        <input placeholder='Email or phone number' className='input-field' type="text" />
                    </label>
                </div>
                <button onClick={() => setVerificationTabs('second-step')} className='btn main-button'>Send</button>
            </>
        </>
    )
}

export default VerificationStep