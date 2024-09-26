import OTPStep from './Components/OTPStep'
import React, { useEffect, useState } from 'react'
import SuccessStep from './Components/SuccessStep'
import VerificationStep from './Components/VerificationStep'
import EnterPasswordStep from './Components/EnterPasswordStep'

const ChangePassword = ({ setChangePasswordPop, ChangePasswordPop }) => {
    const [step, setStep] = useState(1)
    const [email, setEmail] = useState("")

    useEffect(() => {
        if (ChangePassword) {
            setTimeout(() => {
                setStep(1)
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
                    step === 1 &&
                    <VerificationStep setStep={setStep} setEmail={setEmail} />
                }
                {step === 2 &&
                    <OTPStep setStep={setStep} email={email} />}

                {step === 3 &&
                    <EnterPasswordStep
                        email={email}
                        setStep={setStep}
                        ChangePasswordPop={ChangePasswordPop}
                        setChangePasswordPop={setChangePasswordPop}
                    />}
                {step === 4 &&
                    <SuccessStep setChangePasswordPop={setChangePasswordPop} />
                }
            </div>
        </>
    )
}

export default ChangePassword