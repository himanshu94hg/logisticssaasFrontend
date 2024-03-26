import React from 'react'
import './BulkActionsComponent.css'

const BulkActionsComponent = () => {
    return (
        <>
            <section className='bulk-action-container box-shadow'>
                <div className='ba-rows-selected'>
                    <span className='fw-bold font20'>20</span>
                    <span>Rows Selected</span>
                </div>
                <div className='ba-actions'>
                    <button className='btn'>Bulk Ship</button>
                    <button className='btn'>Add Bulk Tag</button>
                    <button className='btn'>Mark As Verified</button>
                    <button className='btn'>Bulk Delete</button>
                </div>
            </section>
        </>
    )
}

export default BulkActionsComponent