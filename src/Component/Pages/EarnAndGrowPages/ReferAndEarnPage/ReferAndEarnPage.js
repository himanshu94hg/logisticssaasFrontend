import React from 'react'
import './ReferAndEarnPage.css'
import SendInvitaionIcon from './Icons/SendInvitaionIcon'
import RegistrationIcon from './Icons/RegistrationIcon'
import RechargeIcon from './Icons/RechargeIcon'
import FreeCashIcon from './Icons/FreeCashIcon'

const ReferAndEarnPage = () => {
    return (
        <>
            <section className='box-shadow shadow-sm p10 rae-page'>
                <h2>Refer And Earn</h2>
                <p>Invite you friends. If they Ship their first order, you and your friend will get coins to redeem!</p>

                <div className='referal-steps'>
                    <div className='step-content'>
                        <div className='step-image-sec'>
                            <SendInvitaionIcon />
                        </div>
                        <h5>Send Invitation</h5>
                        <p>Send your referral link to friends and tell them how cool Shipease is!</p>
                    </div>
                    <div className='step-content'>
                        <div className='step-image-sec'>
                            <RegistrationIcon />
                        </div>
                        <h5>Register</h5>
                        <p>They register on Shipease</p>
                    </div>
                    <div className='step-content'>
                        <div className='step-image-sec'>
                            <RechargeIcon />
                        </div>
                        <h5>Recharge</h5>
                        <p></p>
                    </div>
                    <div className='step-content'>
                        <div className='step-image-sec'>
                            <FreeCashIcon />
                        </div>
                        <h5>Enjoy Free Cash!</h5>
                        <p></p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ReferAndEarnPage