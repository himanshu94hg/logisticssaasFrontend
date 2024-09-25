import React from 'react'
import { MdOutlineKeyboardBackspace } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import Toggle from 'react-toggle'

const PostpaidSettingsPage = () => {
    let Navigate = useNavigate()
    return (
        <>
            <div className='d-flex justify-content-between align-items-center '>
                <h4 className='mb-0'>Seller Remittance Settings</h4>
                <button className='btn main-button-outline' onClick={() => Navigate(-1)}><MdOutlineKeyboardBackspace className='align-text-bottom' /> Go back</button>
            </div>
            <section className='box-shadow shadow-sm p10 py-4'>
                <div className='d-flex gap-5 align-items-center mb-5'>
                    <p className='mb-0'>You are currently opted for Prepaid. <br />
                        Do you wish to move to Postpaid ?</p>
                    <Toggle />
                </div>
                <p className='mb-0'>Benefits of using Postpaid Plan:</p>
                <ol>
                    <li>Dynamic Shipping Limit based on your risk profile at Shipease.</li>
                    <li>Your shipping limit will change everyday at midnight to provide you with uninterrupted shipping.</li>
                    <li>Faster COD remittance every Monday, Wednesday and Friday ( will not be processed on Bank Holidays ).</li>
                </ol>

                <p className='mt-3'>To switch to a Postpaid or Prepaid account, kindly contact your key account manager</p>
            </section>
        </>
    )
}

export default PostpaidSettingsPage