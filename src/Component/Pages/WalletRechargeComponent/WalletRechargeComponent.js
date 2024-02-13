import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'

const WalletRechargeComponent = (props) => {
    return (
        <>
            <section className={`wallet-container ${props.WalletRecharge ? 'show' : ''}`}>
                <div className='wallet-box'>
                    <button
                        onClick={() => props.setWalletRecharge(!props.WalletRecharge)}
                        className='btn close-button'
                    >
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                    <div className='wallet-inner-bg'>
                        <h3>Recharge Your Wallet</h3>
                        <p>Current Wallet Amount  <span>₹82.57</span></p>
                    </div>
                </div>
            </section>

        </>
    )
}

export default WalletRechargeComponent