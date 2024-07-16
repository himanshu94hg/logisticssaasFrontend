import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ExportIcon from '../../../OrdersPage/Components/BulkActionsComponent/Components/BulkIcons/ExportIcon';
import RtoIcon from '../../../OrdersPage/Components/BulkActionsComponent/Components/BulkIcons/RTOAddressIcon';
import IvrIcon from '../../../OrdersPage/Components/BulkActionsComponent/Components/BulkIcons/IvrIcon';
import ReAttemptIcon from '../../../OrdersPage/Components/BulkActionsComponent/Components/BulkIcons/ReAttemptIcon';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import moment from 'moment';
// import './BulkActionsComponent.css'

const BulkActionsComponent = ({ activeTab, selectedRows, setSelectedRows, filterData, setFilterData, queryParamTemp, setSelectAll, setBulkActionShow }) => {
    const dispatch = useDispatch()
    const reattemptOrderIds = selectedRows.join(',');
    const [exportButtonClick, setExportButtonClick] = useState(false)
    const { exportCard, exportAllCard, exportShipmentCard, exportShipmentAllCard } = useSelector(state => state?.exportSectionReducer)
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
        dispatch({ type: "EXPORT_SHIPMENT_DATA_ACTION", payload: requestData });
    };

    useEffect(() => {
        if (exportButtonClick) {
            var FileSaver = require('file-saver');
            var blob = new Blob([exportShipmentCard], { type: 'application/ms-excel' });
            FileSaver.saveAs(blob, `${activeTab === "Action Required" ? "action_required" : activeTab === "Action Requested" ? "action_requested" : activeTab === "Delivered" ? "delivered" : activeTab === "RTO" ? "rto" : ""}.xlsx`);
            setExportButtonClick(false);
            setBulkActionShow(false)
            setSelectedRows([])
            setSelectAll(false)
        }
    }, [exportShipmentCard]);

    const handleReattemptOrder = (() => {
        dispatch({ type: "SHIPMENT_REATTEMPT_DATA_ACTION", payload: { "order_ids": reattemptOrderIds } });
    });

    const handleRtoOrder = (() => {
        dispatch({ type: "SHIPMENT_RTO_DATA_ACTION", payload: { "order_ids": reattemptOrderIds } });
    });

    const handleExportAll = () => {
        Swal.fire({
            title: 'Confirmation Required!',
            text: 'Are you sure to export all report?',
            showCancelButton: true,
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
            reverseButtons: true,
            customClass: {
                title: 'custom-title',
                confirmButton: 'btn main-button',
                cancelButton: 'btn cancel-button'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const requestData = {
                    "order_tab": {
                        "type": "Shipment",
                        "subtype": activeTab === "Action Required" ? "action_required" : activeTab === "Action Requested" ? "action_requested" : activeTab === "Delivered" ? "delivered" : activeTab === "RTO" ? "rto" : ""
                    },
                    "order_id": "",
                    "courier": queryParamTemp?.courier_partner || "",
                    "awb_number": queryParamTemp?.awb_number || "",
                    "min_awb_assign_date": queryParamTemp?.start_date ? moment(queryParamTemp.start_date).format("YYYY-MM-DD") : "",
                    "max_awb_assign_date": queryParamTemp?.end_date ? moment(queryParamTemp.end_date).format("YYYY-MM-DD") : "",
                    "status": queryParamTemp?.status || "",
                    "order_type": queryParamTemp?.order_type || "",
                    "customer_order_number": queryParamTemp?.order_id || "",
                    "channel": queryParamTemp?.order_source || "",
                    "min_invoice_amount": queryParamTemp?.min_invoice_amount || "",
                    "max_invoice_amount": queryParamTemp?.max_invoice_amount || "",
                    "warehouse_id": filterData?.pickup_address_id || "",
                    "product_name": "",
                    "delivery_address": queryParamTemp?.delivery_address || "",
                    "min_weight": queryParamTemp?.min_weight || "",
                    "max_weight": queryParamTemp?.max_weight || "",
                    "min_product_qty": queryParamTemp?.min_product_qty || "",
                    "max_product_qty": queryParamTemp?.max_product_qty || "",
                    "rto_status": queryParamTemp?.rto_status || "",
                    "global_type": queryParamTemp?.global_type || "",
                    "payment_type": queryParamTemp?.payment_type || "",
                    "sku": queryParamTemp?.sku || "",
                    "match_type": queryParamTemp?.sku_match_type || "",
                    "order_tag": queryParamTemp?.order_tag || "",
                };
                dispatch({ type: "EXPORT_SHIPMENT_ALL_DATA_ACTION", payload: requestData });
                setSelectedRows([])
                setFilterData({});
            } else {
                toast.info("Report canceled.");
            }
        });
    };

    useEffect(() => {
        if (exportShipmentAllCard?.message === "Go to MIS->Downloads to download your report") {
            setFilterData({});
        }
    }, [exportShipmentAllCard]);

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
                            <li><IvrIcon /><span>IVR</span></li>
                            {(activeTab !== "Delivered" || activeTab !== "RTO") && (
                                <>
                                    {activeTab === "Action Required" && (
                                        <>
                                            <li onClick={handleReattemptOrder}><ReAttemptIcon /><span>Re-Attempt</span></li>
                                            <li onClick={handleRtoOrder}><RtoIcon /><span>RTO</span></li>
                                        </>
                                    )}
                                    {activeTab === "Action Requested" && (
                                        <>
                                            <li onClick={handleRtoOrder}><RtoIcon /><span>RTO</span></li>
                                        </>
                                    )}
                                </>
                            )}
                            <li onClick={handleExport}><ExportIcon /><span>Export</span></li>
                            <li onClick={handleExportAll}>
                                <ExportIcon /><span>Export All</span>
                            </li>
                        </ul>

                        <div className='ba-close'></div>
                    </div>
                </section>
            )}
        </>
    )
}

export default BulkActionsComponent;