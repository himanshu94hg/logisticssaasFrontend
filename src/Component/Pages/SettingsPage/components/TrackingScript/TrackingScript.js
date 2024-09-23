import React from 'react'
import './TrackingScript.css'

const TrackingScript = () => {
    return (
        <>
            <div className='box-shadow shadow-sm p10 tracking-script-page'>
                <div className='d-flex justify-content-between'>
                    <h4>Tracking Script</h4>
                    <button className='btn main-button'>Generate Script</button>
                </div>

                <div className='mt-4'>
                    <h6 className='fw-bold'>Add this code in the Footer of the web page</h6>
                    <textarea placeholder='Click on Generate Script to get this script...' disabled className='input-field tracking-code-textarea' name="" id=""></textarea>
                    <div className='d-flex justify-content-end w-100 mt-4'>
                        <button className='btn main-button'>Copy Tracking Code</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TrackingScript