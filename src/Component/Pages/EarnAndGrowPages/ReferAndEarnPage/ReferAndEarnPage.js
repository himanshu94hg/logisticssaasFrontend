import React from 'react'
import './ReferAndEarnPage.css'
import SendInvitaionIcon from './Icons/SendInvitaionIcon'
import RegistrationIcon from './Icons/RegistrationIcon'
import RechargeIcon from './Icons/RechargeIcon'
import FreeCashIcon from './Icons/FreeCashIcon'
import BookOrder from './Icons/BookOrder'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import FacebookIcon from './Icons/FacebookIcon'
import WhatsAppIcon from './Icons/WhatsAppIcon'
import TwitterIcon from './Icons/TwitterIcon'

const ReferAndEarnPage = () => {
    return (
        <>
            <section className='box-shadow shadow-sm rae-page'>
                <h3>Refer And Earn</h3>
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
                        <p>Let them register to our services using your referral link.</p>
                    </div>
                    <div className='step-content'>
                        <div className='step-image-sec'>
                            <BookOrder />
                        </div>
                        <h5>Recharge and Book Order</h5>
                        <p>They will recharge their wallet and book their first order with us.</p>
                    </div>
                    <div className='step-content'>
                        <div className='step-image-sec'>
                            <FreeCashIcon />
                        </div>
                        <h5>Enjoy Free Cash!</h5>
                        <p>You and your friend will get cash credit in your wallet!</p>
                    </div>
                </div>

                <h4 className='mt-5'>Invite your friends</h4>
                <p>Insert your friends' addresses and send them invitations to join Shipease!</p>
                <div className='rae-invite-sec'>
                    <label htmlFor="">
                        <input className='input-field' type="text" />
                        <button type='button' title='Send Invite'><FontAwesomeIcon icon={faPaperPlane} /></button>
                    </label>
                </div>

                <h4 className='mt-5'>Share The Referal Link</h4>
                <p>You can also share your referral link by copying and sending it or sharing it on your social media.</p>

                <div className='rae-social-sec'>
                    <label className='rae-link-input' htmlFor="">
                        <input type="text" value="https://www.shipease.in/referral?code=DUMMYREFERRAL123" />
                        <button className='btn rae-copy-btn'>Copy</button>
                    </label>
                    <button className='btn rae-social-btn'><FacebookIcon /></button>
                    <button className='btn rae-social-btn'><WhatsAppIcon /></button>
                    <button className='btn rae-social-btn'><TwitterIcon /></button>
                </div>
            </section>
        </>
    )
}

export default ReferAndEarnPage