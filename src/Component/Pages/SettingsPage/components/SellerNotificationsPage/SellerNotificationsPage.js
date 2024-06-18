import React from 'react'
import { MdOutlineKeyboardBackspace } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

const SellerNotificationsPage = () => {
    let Navigate = useNavigate()
    return (
        <>
            <div>
                <div className='d-flex justify-content-between align-items-center'>
                    <h4>Notification Settings</h4>
                    <button className='btn main-button-outline' onClick={() => Navigate(-1)}><MdOutlineKeyboardBackspace className='align-text-bottom' /> Go back</button>
                </div>
                <section className='box-shadow shadow-sm p10 mt-3'>
                    <h5>Add Email and Mobile No to receive Business related notifications.</h5>
                    <p>For example: COD Remittance etc. You can add multiple email ids and mobile nos.</p>
                    <label>
                        Email ID
                        <input className='input-field' type="text" />
                    </label>
                    <label>
                        Mobile No.
                        <input className='input-field' type="text" />
                    </label>
                    <h5>Add Email and Mobile No to receive Operations related notifications.</h5>
                    <p>For example: Label, Order Invoice, Manifest, NDR etc. You can add multiple email ids and mobile nos.</p>
                    <label>
                        Email ID
                        <input className='input-field' type="text" />
                    </label>
                    <label>
                        Mobile No.
                        <input className='input-field' type="text" />
                    </label>
                    <button className='btn main-button'>Save</button>
                </section>
            </div>
        </>
    )
}

export default SellerNotificationsPage