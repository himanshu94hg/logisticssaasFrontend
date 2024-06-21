import React, { useEffect, useState } from 'react'
import VerificationStep from './Components/VerificationStep'
import OTPStep from './Components/OTPStep'
import SuccessStep from './Components/SuccessStep'
import EnterPasswordStep from './Components/EnterPasswordStep'

const ChangePassword = ({ setChangePasswordPop, ChangePasswordPop }) => {

    const [VerificationTabs, setVerificationTabs] = useState('first-step')

    useEffect(() => {
        if (ChangePassword) {
            setTimeout(() => {
                setVerificationTabs('first-step')
            }, 1500);
        }
    }, [ChangePasswordPop])



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
                                    <EnterPasswordStep
                                        ChangePasswordPop={ChangePasswordPop}
                                        setChangePasswordPop={setChangePasswordPop}
                                        setVerificationTabs={setVerificationTabs}
                                    />
                                </> :
                                <>
                                    <SuccessStep setChangePasswordPop={setChangePasswordPop} />
                                </>
                }
            </div>
        </>
    )
}

export default ChangePassword