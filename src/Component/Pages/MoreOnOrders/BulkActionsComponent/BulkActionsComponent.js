import React from 'react'
// import './BulkActionsComponent.css'

const BulkActionsComponent = () => {
    return (
        <>
            <section className='bulk-action-container box-shadow'>
                <div className='ba-inner-container'>
                    <div className='ba-rows-selected'>
                        <span className='fw-bold font20'>20</span>
                        <span>Rows Selected</span>
                    </div>
                    <ul className='ba-actions'>
                        <li><span>Add Tag</span></li>
                        <li><span>Mark as verified</span></li>
                        <li><span>Warehouse update</span></li>
                        <li><span>RTO update</span></li>
                        <li><span>Weight/Dimension update</span></li>
                        <li><span>Ship</span></li>
                        <li><span>Export</span></li>
                        <li><span>Cancel</span></li>
                        <li><span>Delete</span></li>
                    </ul>
                    <div className='ba-close'></div>
                </div>
            </section>
        </>
    )
}

export default BulkActionsComponent