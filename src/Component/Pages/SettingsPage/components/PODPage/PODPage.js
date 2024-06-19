import React from 'react'
import { MdOutlineKeyboardBackspace } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import Toggle from 'react-toggle'

const PODPage = () => {
    let Navigate = useNavigate()
    return (
        <>
            <div className='d-flex justify-content-between align-items-center '>
                <h4 className="mb-0">Proof of Delivery Settings</h4>
                <button className='btn main-button-outline' onClick={() => Navigate(-1)}><MdOutlineKeyboardBackspace className='align-text-bottom' /> Go back</button>
            </div>
            <section className='box-shadow shadow-sm p10 py-3'>
                <div className='d-flex gap-5 align-items-end'>
                    <p className='mb-0'>Enable New POD Template</p>
                    <Toggle />
                </div>
                <h6 className='mt-5'>How does it work?</h6>
                <p>Turn the toggle on to enable the new POD template for your account. Here's why you should give it a try:</p>
                <ol>
                    <li>Get information like order details, delivery and return address on the POD.</li>
                    <li>Receive authentic signature of your buyer.</li>
                </ol>
            </section>
        </>
    )
}

export default PODPage