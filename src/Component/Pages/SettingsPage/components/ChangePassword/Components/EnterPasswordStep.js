import React from 'react'
import VerificationIcon from './Icons/VerificationIcon';

const EnterPasswordStep = ({ ChangePasswordPop, setChangePasswordPop, setVerificationTabs }) => {

    const handlePasswordSubmit = () => {
        setTimeout(() => {
            setChangePasswordPop(false)
        }, 2500);
        setVerificationTabs('fourth-step')
    }
    console.log(ChangePasswordPop)

    return (
        <>
            <div className='verfication-step d-flex flex-column align-items-center w-100'>
                <div className='cp-img-container'>
                    <VerificationIcon />
                </div>
                <div className='fw-bold mt-4 px-5 text-center'>
                    <label>
                        New Password
                        <input placeholder='Enter your new Password' className='input-field' type="password" />
                    </label>
                    <label className='mt-3'>
                        Confirm New Password
                        <input placeholder='Re-enter your new password' className='input-field' type="password" />
                    </label>
                </div>
            </div>
            <div className='d-flex justify-content-end'>
                <button onClick={handlePasswordSubmit} className='btn main-button'>Reset Password</button>
            </div>
        </>
    )
}

export default EnterPasswordStep