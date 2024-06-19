import React, { useEffect, useState } from 'react'

const ChangePassword = ({ setChangePasswordPop, ChangePasswordPop }) => {

    const [VerificationTabs, setVerificationTabs] = useState('first-step')

    useEffect(() => {
        if (ChangePassword) {
            setVerificationTabs('first-step')
        }
    }, [ChangePasswordPop])


    const handlePasswordSubmit = () => {
        setChangePasswordPop(!ChangePasswordPop)
        setVerificationTabs('first-step')
    }
    return (
        <>
            <div className='cp-header'>
                <h5>Change Your Password Here!</h5>
            </div>
            <div className='cp-body'>
                {
                    VerificationTabs === 'first-step' ?
                        <>
                            first tab
                            <button onClick={() => setVerificationTabs('second-step')} className='btn main-button'>Next</button>
                        </>
                        : VerificationTabs === 'second-step' ?
                            <>
                                second tab
                                <button onClick={() => setVerificationTabs('third-step')} className='btn main-button'>Next</button>
                            </> :
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
                                </div>
                            </>
                }
            </div>
        </>
    )
}

export default ChangePassword