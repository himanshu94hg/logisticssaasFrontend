import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import './BulkActionsComponent.css'

const BulkActionsComponent = ({ activeTab, selectedRows, setSelectedRows }) => {
    const dispatch = useDispatch()
    const reattemptOrderIds = selectedRows.join(',');
    const [exportButtonClick, setExportButtonClick] = useState(false)
    const exportCard = useSelector(state => state?.exportSectionReducer?.exportCard)
    console.log(exportCard, "Export Action Bulk")

    const handleExport = () => {
        setExportButtonClick(true);
        const requestData = {
            "order_tab": {
                "type": "shipment",
                "subtype": activeTab === "Action Required" ? "action_required" : activeTab === "Action Requested" ? "action_requested" : activeTab === "Delivered" ? "delivered" : activeTab === "RTO" ? "rto" : ""
            },
            "order_id": `${selectedRows.join(',')}`,
            "courier": "",
            "awb_number": "",
            "min_awb_assign_date": "",
            "max_awb_assign_date": "",
            "status": "",
            "order_type": "",
            "customer_order_number": "",
            "channel": "",
            "min_invoice_amount": "",
            "max_invoice_amount": "",
            "warehouse_id": "",
            "product_name": "",
            "delivery_address": "",
            "min_weight": "",
            "max_weight": "",
            "min_product_qty": "",
            "max_product_qty": "",
            "rto_status": activeTab === "Action Required" ? false : activeTab === "Action Requested" ? false : activeTab === "Delivered" ? false : activeTab === "RTO" ? true : false,
            "global_type": "",
            "payment_type": ""
        };
        dispatch({ type: "EXPORT_DATA_ACTION", payload: requestData });
    };

    useEffect(() => {
        if (exportButtonClick) {
            var FileSaver = require('file-saver');
            var blob = new Blob([exportCard], { type: 'application/ms-excel' });
            FileSaver.saveAs(blob, `${activeTab === "Action Required" ? "action_required" : activeTab === "Action Requested" ? "action_requested" : activeTab === "Delivered" ? "delivered" : activeTab === "RTO" ? "rto" : ""}.xlsx`);
            setExportButtonClick(false);
        }
    }, [exportCard]);

    const handleReattemptOrder = (() => {
        dispatch({ type: "SHIPMENT_REATTEMPT_DATA_ACTION", payload: { "order_ids": reattemptOrderIds } });
    });

    const handleRtoOrder = (() => {
        dispatch({ type: "SHIPMENT_RTO_DATA_ACTION", payload: { "order_ids": reattemptOrderIds } });
    });

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
                    <li><span>IVR</span></li>
                    {(activeTab !== "Delivered" || activeTab !== "RTO") && (
                        <>
                            {activeTab === "Action Required" && (
                                <>
                                    <li onClick={handleReattemptOrder}><span>Re-Attempt</span></li>
                                    <li onClick={handleRtoOrder}><span>RTO</span></li>
                                </>
                            )}
                            {activeTab === "Action Requested" && (
                                <li onClick={handleRtoOrder}><span>RTO</span></li>
                            )}
                        </>
                    )}
                    <li onClick={handleExport}><span>Export</span></li>
                </ul>

                <div className='ba-close'></div>
            </div>
        </section>
        )}
        </>
    )
}

export default BulkActionsComponent;
