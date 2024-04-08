import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import './BulkActionsComponent.css'
import DeleteIcon from './Components/BulkIcons/DeleteIcon'
import ExportIcon from './Components/BulkIcons/ExportIcon';
import CancelIcon from './Components/BulkIcons/CancelIcon';
import ShippingIcon from './Components/BulkIcons/ShippingIcon';
import WarehouseIcon from './Components/BulkIcons/WarehouseIcon';
import WeightDimensionIcon from './Components/BulkIcons/WeightDimensionIcon';
import VerifiedIcon from './Components/BulkIcons/VerifiedIcon';
import AddTagIcon from './Components/BulkIcons/AddTagIcon';

const BulkActionsComponent = ({ activeTab, selectedRows, setaddTagShow, setUpdateWeight, setUpdateWarehouse, setSelectedRows, setBulkActionShow }) => {
    const dispatch = useDispatch();
    const [shipButtonClicked, setShipButtonClicked] = useState(false);
    const [exportButtonClick, setExportButtonClick] = useState(false)
    const exportCard = useSelector(state => state?.exportSectionReducer?.exportCard)
    const { bulkShipData } = useSelector(state => state?.orderSectionReducer)
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
        setUpdateWarehouse(true)

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
    const bulkDimesionDetailUpdate = () => {
        setUpdateWeight(true)
        // dispatch({
        //     type: "BULK_DIMESION_DETAILS_UPDATE_ACTION", payload: [
        //         {
        //             order: 40,
        //             weight: 3,
        //             length: 2,
        //             breadth: 15.2,
        //             height: 23
        //         }
        //     ]
        // })
    }
    const handelBulkShip = () => {
        let data = {
            "order_ids": selectedRows.map(id => id.toString())
        };
        dispatch({ type: "BULK_SHIP_ORDERS_ACTION", payload: data });
        setShipButtonClicked(true);
        setSelectedRows([])
        setBulkActionShow(false)
    };

    const handleExport = () => {
        setExportButtonClick(true);
        const requestData = {
            "order_tab": {
                "type":
                    activeTab === "All Orders" || activeTab === "Unprocessable" ||
                        activeTab === "Processing" || activeTab === "Ready to Ship" ||
                        activeTab === "Pickup" || activeTab === "Returns"
                        ? "" : activeTab,
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



    useEffect(() => {
        if (shipButtonClicked === true) {
            if (bulkShipData && Object.keys(bulkShipData).length > 0) {
                const shippedCount = Object.values(bulkShipData).reduce((total, order) => {
                    if (order?.status === true) {
                        return total + 1;
                    }
                    return total;
                }, 0);
                toast.success(`${shippedCount} out of ${selectedRows.length} Orders Shipped Successfully.`);
            }
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

                            {activeTab === "All Orders" &&
                                <>
                                    <li onClick={() => addTag()}><AddTagIcon /><span>Add Tag</span></li>
                                    <li onClick={() => markedVerified()}><VerifiedIcon /><span>Mark as verified</span></li>
                                    <li onClick={() => bulkCancelled()}><CancelIcon /><span>Cancel</span></li>
                                    <li onClick={() => bulkDeleted()}><DeleteIcon /><span>Delete</span></li>
                                    <li ><span>Label</span></li>
                                    <li ><span>Invoice</span></li>
                                    <li onClick={handleExport}><ExportIcon /><span>Export</span></li>
                                </>
                            }

                            {activeTab === "Unprocessable" &&
                                <>
                                    <li onClick={() => addTag()}><AddTagIcon /><span>Add Tag</span></li>
                                    <li onClick={() => markedVerified()}><VerifiedIcon /><span>Mark as verified</span></li>
                                    <li onClick={() => bulkCancelled()}><CancelIcon /><span>Cancel</span></li>
                                    <li onClick={() => bulkDeleted()}><DeleteIcon /><span>Delete</span></li>
                                    <li onClick={() => rtoUpdate()}><WarehouseIcon /><span>Warehouse update</span></li>
                                    <li onClick={() => bulkDimesionDetailUpdate()}><WeightDimensionIcon /><span>Weight/Dimension update</span></li>
                                    <li onClick={handleExport}><ExportIcon /><span>Export</span></li>
                                </>
                            }
                            {activeTab === "Processing" && <>
                                <li onClick={() => addTag()}><AddTagIcon /><span>Add Tag</span></li>
                                <li onClick={() => markedVerified()}><VerifiedIcon /><span>Mark as verified</span></li>
                                <li onClick={() => bulkCancelled()}><CancelIcon /><span>Cancel</span></li>
                                <li onClick={() => bulkDeleted()}><DeleteIcon /><span>Delete</span></li>
                                <li onClick={() => rtoUpdate()}><WarehouseIcon /><span>Warehouse update</span></li>
                                <li onClick={() => bulkDimesionDetailUpdate()}><WeightDimensionIcon /><span>Weight/Dimension update</span></li>
                                <li onClick={handelBulkShip}><ShippingIcon /><span>Ship</span></li>
                                <li onClick={handleExport}><ExportIcon /><span>Export</span></li>
                            </>}
                            {activeTab === "Ready to Ship" &&
                                <>
                                    <li ><span>Generate Pickup</span></li>
                                    <li ><span>Label</span></li>
                                    <li ><span>Invoice</span></li>
                                    <li onClick={() => bulkCancelled()}><CancelIcon /><span>Cancel</span></li>
                                    <li onClick={handleExport}><ExportIcon /><span>Export</span></li>

                                </>
                            }
                            {activeTab === "Pickup" &&
                                <>
                                    <li ><span>Generate Manifest</span></li>
                                    <li ><span>Label</span></li>
                                    <li ><span>Invoice</span></li>
                                    <li onClick={() => bulkCancelled()}><CancelIcon /><span>Cancel</span></li>
                                </>
                            }

                            {activeTab === "Returns" &&
                                <>
                                    <li onClick={handleExport}><ExportIcon /><span>Export</span></li>

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

export default BulkActionsComponent;
