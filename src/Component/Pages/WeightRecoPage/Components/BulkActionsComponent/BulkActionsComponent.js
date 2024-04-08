import React from 'react'

const BulkActionsComponent = ({ activeTab, selectedRows }) => {
    return (
        <>
        {selectedRows.length > 0 && (
            <section className='bulk-action-container box-shadow'>
            <div className='ba-inner-container'>
                <div className='ba-rows-selected'>
                    <span className='fw-bold font20'>{selectedRows.length}</span>
                    <span>Rows Selected</span>
                </div>
                <ul className='ba-actions'>
                    {activeTab === "Weight Reconciliation" && 
                        <>
                            <li><span>Accept</span></li>
                            <li><span>Dispute</span></li>
                            <li><span>Export</span></li>
                        </>
                    }
                    {activeTab === "Settled Reconciliation" && 
                        <>
                            <li><span>Export</span></li>
                        </>
                    }
                    {activeTab === "On Hold Reconciliation" && 
                        <>
                            <li><span>Export</span></li>
                        </>
                    }
                </ul>
                <div className='ba-close'></div>
            </div>
        </section>
        )}
        </>
    )
}

export default BulkActionsComponent