import React from 'react'
import { MdOutlineKeyboardBackspace } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

const SellerNotificationsPage = () => {
    let Navigate = useNavigate()
    return (
        <>
            <div>
                <div className='d-flex justify-content-between align-items-center'>
                    <h4 className='mb-0'>Notification Settings</h4>
                    <button className='btn main-button-outline' onClick={() => Navigate(-1)}><MdOutlineKeyboardBackspace className='align-text-bottom' /> Go back</button>
                </div>
                <section className='box-shadow shadow-sm p10 mt-3 py-4'>
                    <h6>Add Email and Mobile No to receive Business related notifications</h6>
                    <p>For example: COD Remittance etc. You can add multiple email ids and mobile nos.</p>
                    <div className='d-flex gap-3 mt-2 w-100'>
                        <label>
                            Email ID
                            <input className='input-field' type="text" />
                        </label>
                        <label>
                            Mobile No.
                            <input className='input-field' type="text" />
                        </label>
                    </div>

                    <h6 className='mt-5'>Add Email and Mobile No to receive Operations related notifications</h6>
                    <p>For example: Label, Order Invoice, Manifest, NDR etc. You can add multiple email ids and mobile nos.</p>
                    <div className='d-flex gap-3 mt-2 w-100'>
                        <label>
                            Email ID
                            <input className='input-field' type="text" />
                        </label>
                        <label>
                            Mobile No.
                            <input className='input-field' type="text" />
                        </label>
                    </div>
                </section>
                <div className='mt-4 d-flex justify-content-end'>
                    <button className='btn main-button'>Save</button>
                </div>
            </div>
        </>
    )
}

export default SellerNotificationsPage