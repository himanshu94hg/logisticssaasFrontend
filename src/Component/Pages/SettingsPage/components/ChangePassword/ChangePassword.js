import React, { useEffect, useState } from 'react'
import VerificationStep from './Components/VerificationStep'
import OTPStep from './Components/OTPStep'
import SuccessStep from './Components/SuccessStep'

const ChangePassword = ({ setChangePasswordPop, ChangePasswordPop }) => {

    const [VerificationTabs, setVerificationTabs] = useState('first-step')

    useEffect(() => {
        if (ChangePassword) {
            setTimeout(() => {
                setVerificationTabs('first-step')
            }, 1500);
        }
    }, [ChangePasswordPop])


    const handlePasswordSubmit = () => {
        setVerificationTabs('fourth-step')
        setTimeout(() => {
            setChangePasswordPop(!ChangePasswordPop)
        }, 2500);
    }
    return (
        <>
            <div className='cp-header'>
                <h5>Change Your Password Here!</h5>
            </div>
            <div className='cp-body'>
                {
                    VerificationTabs === 'first-step' ?
                        <VerificationStep setVerificationTabs={setVerificationTabs} />
                        : VerificationTabs === 'second-step' ?
                            <>
                                <OTPStep setVerificationTabs={setVerificationTabs} />
                            </> :
                            VerificationTabs === 'third-step' ?
                                <>
                                    <label>
                                        New Password
                                        <input placeholder='Enter your new Password' className='input-field' type="password" />
                                    </label>
                                    <label>
                                        Confirm New Password
                                        <input placeholder='Re-enter your new password' className='input-field' type="password" />
                                    </label>
                                    <div className='d-flex justify-content-end'>
                                        <button onClick={handlePasswordSubmit} className='btn main-button'>Submit</button>
                                        {/* <button onClick={() => setVerificationTabs('fourth-step')} className='btn main-button'>Submit</button> */}
                                    </div>
                                </> :
                                <>
                                    <SuccessStep />
                                </>
                }
            </div>
        </>
    )
}

export default ChangePassword