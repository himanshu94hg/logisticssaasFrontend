import React from 'react'
import './BulkActionsComponent.css'
import { useDispatch } from 'react-redux'

const BulkActionsComponent = ({ selectedRows }) => {
    const dispatch = useDispatch()

    const addTag = () => {
        dispatch({
            type: "BULK_ADD_ORDER_TAG_ACTION", payload: {
                order_ids: selectedRows,
                tag_ids: [18, 19]
            }
        })
    }
    const markedVerified = () => {
        dispatch({
            type: "BULK_MARK_ORDER_VERIFY_ACTION", payload: {
                order_ids: selectedRows,
            }
        })
    }

    const rtoUpdate = () => {
        dispatch({
            type: "BULK_PICKUP_ADDRESS_UPDATE_ACTION", payload: {
                order_ids: selectedRows,
                warehouse_id:22
            }
        })
    }
    const bulkDeleted = () => {
        dispatch({
            type: "BULK_DELETE_ORDER_ACTION", payload: {
                order_ids: selectedRows,
            }
        })
    }
    const bulkCancelled = () => {
        dispatch({
            type: "BULK_CANCEL_ORDER_ACTION", payload: {
                awb_numbers: selectedRows,
            }
        })
    }

    return (
        <>
            <section className='bulk-action-container box-shadow'>
                <div className='ba-inner-container'>
                    <div className='ba-rows-selected'>
                        <span className='fw-bold font20'>{selectedRows?.length}</span>
                        <span>Rows Selected</span>
                    </div>
                    <ul className='ba-actions'>
                        <li onClick={() => addTag()}><span>Add Tag</span></li>
                        <li onClick={() => markedVerified()}><span>Mark as verified</span></li>
                        <li onClick={() => rtoUpdate()}><span>Warehouse update</span></li>
                        {/* <li ><span>RTO update</span></li> */}
                        <li><span>Weight/Dimension update</span></li>
                        <li><span>Ship</span></li>
                        <li><span>Export</span></li>
                        <li onClick={() => bulkCancelled()}><span>Cancel</span></li>
                        <li onClick={() => bulkDeleted()}><span>Delete</span></li>
                    </ul>
                    <div className='ba-close'></div>
                </div>
            </section>
        </>
    )
}

export default BulkActionsComponent