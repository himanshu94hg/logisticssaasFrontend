import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import './BulkActionsComponent.css'

const BulkActionsComponent = ({ activeTab, selectedRows, setSelectedRows }) => {
    const dispatch = useDispatch();
    const [shipButtonClicked, setShipButtonClicked] = useState(false);
    const reattemptOrderIds = selectedRows.join(',');
    const [exportButtonClick, setExportButtonClick] = useState(false)
    const exportCard = useSelector(state => state?.exportSectionReducer?.exportCard)
    const { bulkShipData } = useSelector(state => state?.orderSectionReducer)

    const handleExport = () => {
        setExportButtonClick(true);
        const requestData = {
            "order_tab": {
                "type": activeTab === "All Orders" ? "" : activeTab,
                "subtype": ""
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
            "rto_status": false,
            "global_type": "",
            "payment_type": ""
        };
        console.log("All Request data", requestData);
        dispatch({ type: "EXPORT_DATA_ACTION", payload: requestData });
    };
    useEffect(() => {
        if (exportButtonClick) {
            var FileSaver = require('file-saver');
            var blob = new Blob([exportCard], { type: 'application/ms-excel' });
            FileSaver.saveAs(blob, `${activeTab}.xlsx`);
            setExportButtonClick(false);
        }
    }, [exportCard]);

    const handelBulkShip = () => {
        let data = {
            "order_ids": selectedRows.map(id => id.toString())
        };
        dispatch({ type: "BULK_SHIP_ORDERS_ACTION", payload: data });
        setShipButtonClicked(true);
    };    

    useEffect(() => {
        if (shipButtonClicked && bulkShipData !== null) {
            const shippedCount = Object.values(bulkShipData).reduce((total, order) => {
                if (order.status === true) {
                    return total + 1;
                }
                return total;
            }, 0);
            toast.success(`${shippedCount} out of ${selectedRows.length} Orders Shipped Successfully.`);
            setShipButtonClicked(false);
        }
    }, [shipButtonClicked, bulkShipData]);

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
                            <li><span>Add Tag</span></li>
                            <li><span>Mark as verified</span></li>
                            <li><span>Warehouse update</span></li>
                            <li><span>RTO update</span></li>
                            <li><span>Weight/Dimension update</span></li>
                            <li onClick={handelBulkShip}><span>Ship</span></li>
                            <li onClick={handleExport}><span>Export</span></li>
                            <li><span>Cancel</span></li>
                            <li><span>Delete</span></li>
                        </ul>
                        <div className='ba-close'></div>
                    </div>
                </section>
            )}

        </>
    )
}

export default BulkActionsComponent;
