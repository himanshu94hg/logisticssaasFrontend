import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import './BulkActionsComponent.css';
import DeleteIcon from './Components/BulkIcons/DeleteIcon';
import ExportIcon from './Components/BulkIcons/ExportIcon';
import CancelIcon from './Components/BulkIcons/CancelIcon';
import ShippingIcon from './Components/BulkIcons/ShippingIcon';
import WarehouseIcon from './Components/BulkIcons/WarehouseIcon';
import WeightDimensionIcon from './Components/BulkIcons/WeightDimensionIcon';
import VerifiedIcon from './Components/BulkIcons/VerifiedIcon';
import AddTagIcon from './Components/BulkIcons/AddTagIcon';
import LabelIcon from './Components/BulkIcons/LabelIcon';
import InvoiceIcon from './Components/BulkIcons/InvoiceIcon';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2'; 

const BulkActionsComponent = ({ activeTab, bulkAwb, setbulkAwb, selectedRows, setaddTagShow, setUpdateWeight, setUpdateWarehouse, setSelectedRows, setBulkActionShow }) => {
    const dispatch = useDispatch();
    const [shipButtonClicked, setShipButtonClicked] = useState(false);
    const [exportButtonClick, setExportButtonClick] = useState(false);
    const exportCard = useSelector(state => state?.exportSectionReducer?.exportCard);
    const { bulkShipData, labelData, invoiceData } = useSelector(state => state?.orderSectionReducer);
    const [genaratelabel, setGenaratelabel] = useState(false);
    const [generateinvoice, setGenerateinvoice] = useState(false);
    const [actionType, setActionType] = useState("");
    const [show, setShow] = useState(false);
    
    const handleClose = () => setShow(false);
    
    useEffect(() => {
        if (labelData) {
            if (labelData?.message === "Go to MIS -> Download and download the labels.") {
                console.log("MIS instruction received for labels.");
            } else if (genaratelabel) {
                const blob = new Blob([labelData], { type: 'application/pdf' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'label.pdf';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                setGenaratelabel(false);
            }
        }
    }, [labelData, genaratelabel]);

    useEffect(() => {
        if (labelData?.message === "Go to MIS -> Download and download the labels.") {
        }
        else {
            if (labelData) {
                if (genaratelabel === true) {
                    const blob = new Blob([labelData], { type: 'application/pdf' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'label.pdf';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                    setGenaratelabel(false)
                }
            }
        }
    }, [invoiceData, generateinvoice]);

    useEffect(() => {
        if (invoiceData?.message === "Go to MIS -> Download and download the invoices.") {
        }
        else {
            if (invoiceData) {
                if (generateinvoice === true) {
                    const blob = new Blob([invoiceData], { type: 'application/pdf' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'Invoice.pdf';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                    setGenerateinvoice(false)
                }
            }
        }
    }, [invoiceData])

    /* useEffect(()=>{
         if(invoiceData){
             const blob = new Blob([invoiceData], { type: 'application/pdf' });
             const url = URL.createObjectURL(blob);
             const a = document.createElement('a');
             a.href = url;
             a.download = 'Invoice.pdf';
             document.body.appendChild(a);
             a.click();
             document.body.removeChild(a);
             URL.revokeObjectURL(url);
            }
     },[invoiceData])*/


    const addTag = () => {
        setaddTagShow(true)
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
    const bulkDeleted = (args) => {
        setShow(true)
        setActionType(args)
    }
    const bulkCancelled = (args) => {
        setActionType(args)
        // if (activeTab === "Processing" || activeTab === "Pickups") {
        //     dispatch({
        //         type: "BULK_PROCESSING_ORDER_CANCEL_ACTION", payload: {
        //             order_ids: selectedRows,
        //         }
        //     })
        // } else {
        //     dispatch({
        //         type: "BULK_CANCEL_ORDER_ACTION", payload: {
        //             awb_numbers: bulkAwb,
        //         }
        //     })
        // }
        setShow(true)

    }

    const makeApiCall = () => {
        setShow(false);
        if (actionType === "bulkDelete") {
            dispatch({ type: "BULK_DELETE_ORDER_ACTION", payload: { order_ids: selectedRows } });
        } else {
            if (activeTab === "Processing" || activeTab === "Pickups") {
                dispatch({ type: "BULK_PROCESSING_ORDER_CANCEL_ACTION", payload: { order_ids: selectedRows } });
            } else {
                dispatch({ type: "BULK_CANCEL_ORDER_ACTION", payload: { awb_numbers: bulkAwb } });
            }
        }
    };

    const generateManifest = () => {
        dispatch({ type: "BULK_GENERATE_MENIFEST_ACTION", payload: { order_ids: selectedRows.join(','), orderLength: selectedRows } });
    };
    const generatePickup = () => dispatch({ type: "BULK_ORDER_GENERATE_PICKUP_ACTION", payload: { orders: selectedRows } });
    const generateLabel = () => {
        dispatch({ type: "BULK_ORDER_GENERATE_LABEL_ACTION", payload: { order_ids: selectedRows.join(',') } });
        setGenaratelabel(true);
    };
    const generateInvoice = () => {
        dispatch({ type: "BULK_ORDER_GENERATE_INVOICE_ACTION", payload: { order_ids: selectedRows.join(',') } });
        setGenerateinvoice(true);
    };
    const bulkDimesionDetailUpdate = () => setUpdateWeight(true);

    const handleExport = () => {
        setExportButtonClick(true);
        const requestData = {
            order_tab: {
                type: activeTab === "All" ? "" : activeTab,
                subtype: ""
            },
            order_id: `${selectedRows.join(',')}`,
            courier: "",
            awb_number: "",
            min_awb_assign_date: "",
            max_awb_assign_date: "",
            status: "",
            order_type: "",
            customer_order_number: "",
            channel: "",
            min_invoice_amount: "",
            max_invoice_amount: "",
            warehouse_id: "",
            product_name: "",
            delivery_address: "",
            min_weight: "",
            max_weight: "",
            min_product_qty: "",
            max_product_qty: "",
            rto_status: false,
            global_type: "",
            payment_type: ""
        };
        dispatch({ type: "EXPORT_DATA_ACTION", payload: requestData });
    };

    useEffect(() => {
        if (exportButtonClick) {
            const FileSaver = require('file-saver');
            const blob = new Blob([exportCard], { type: 'application/ms-excel' });
            FileSaver.saveAs(blob, `${activeTab}.xlsx`);
            setExportButtonClick(false);
        }
    }, [exportCard, exportButtonClick, activeTab]);

    const handelBulkShip = () => {
        setShipButtonClicked(true);
        const data = { "order_ids": selectedRows.map(id => id.toString()) };
        dispatch({ type: "BULK_SHIP_ORDERS_ACTION", payload: data });
    };

    useEffect(() => {
        if (shipButtonClicked) {
            if (bulkShipData && Object.keys(bulkShipData).length > 0) {
                setShipButtonClicked(false);
                setBulkActionShow(false);
                setSelectedRows([]);
            }
        }
    }, [shipButtonClicked, bulkShipData, selectedRows, setBulkActionShow, setSelectedRows]);


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
                            "type": "Orders",
                            "subtype": activeTab === "All" ? "all_orders" : activeTab === "Unprocessable" ? "unprocessable" : activeTab === "Processing" ? "processing_orders" : activeTab === "Ready to Ship" ? "ready_to_ship" : activeTab === "Pickup" ? "pickups" : activeTab === "Returns" ? "returns" : ""
                        },
                        "order_id": "",
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
                        "rto_status": "",
                        "global_type": "",
                        "payment_type": ""
                    };
                    dispatch({ type: "EXPORT_ALL_DATA_ACTION", payload: requestData });
                    setBulkActionShow(false);
                    setSelectedRows([])
                } else {
                    toast.info("Report canceled.");
                }
            });
    };

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
                            {activeTab === "All" && (
                                <>
                                    <li onClick={addTag}><AddTagIcon /><span>Add Tag</span></li>
                                    <li onClick={markedVerified}><VerifiedIcon /><span>Mark as verified</span></li>
                                    <li onClick={() => bulkCancelled("bulkCancel")}><CancelIcon /><span>Cancel</span></li>
                                    <li onClick={() => bulkDeleted("bulkDelete")}><DeleteIcon /><span>Delete</span></li>
                                    <li onClick={generateLabel}><LabelIcon /><span>Label</span></li>
                                    <li onClick={generateInvoice}><InvoiceIcon /><span>Invoice</span></li>
                                    <li onClick={handleExport}><ExportIcon /><span>Export</span></li>
                                    <li onClick={handleExportAll}>
                                        <ExportIcon /><span>Export All</span>
                                    </li>
                                </>
                            )}
                            {activeTab === "Unprocessable" && (
                                <>
                                    <li onClick={addTag}><AddTagIcon /><span>Add Tag</span></li>
                                    <li onClick={markedVerified}><VerifiedIcon /><span>Mark as verified</span></li>
                                    <li onClick={() => bulkCancelled("bulkCancel")}><CancelIcon /><span>Cancel</span></li>
                                    <li onClick={() => bulkDeleted("bulkDelete")}><DeleteIcon /><span>Delete</span></li>
                                    <li onClick={rtoUpdate}><WarehouseIcon /><span>Warehouse update</span></li>
                                    <li onClick={bulkDimesionDetailUpdate}><WeightDimensionIcon /><span>Weight/Dimension update</span></li>
                                    <li onClick={handleExport}><ExportIcon /><span>Export</span></li>
                                    <li onClick={handleExportAll}>
                                        <ExportIcon /><span>Export All</span>
                                    </li>
                                </>
                            )}
                            {activeTab === "Processing" && (
                                <>
                                    <li onClick={addTag}><AddTagIcon /><span>Add Tag</span></li>
                                    <li onClick={markedVerified}><VerifiedIcon /><span>Mark as verified</span></li>
                                    <li onClick={() => bulkCancelled("bulkCancel")}><CancelIcon /><span>Cancel</span></li>
                                    <li onClick={() => bulkDeleted("bulkDelete")}><DeleteIcon /><span>Delete</span></li>
                                    <li onClick={rtoUpdate}><WarehouseIcon /><span>Warehouse update</span></li>
                                    <li onClick={bulkDimesionDetailUpdate}><WeightDimensionIcon /><span>Weight/Dimension update</span></li>
                                    <li onClick={handelBulkShip}><ShippingIcon /><span>Ship</span></li>
                                    <li onClick={handleExport}><ExportIcon /><span>Export</span></li>
                                    <li onClick={handleExportAll}>
                                        <ExportIcon /><span>Export All</span>
                                    </li>
                                </>
                            )}
                            {activeTab === "Ready to Ship" && (
                                <>
                                    <li onClick={generatePickup}><ShippingIcon /><span>Generate Pickup</span></li>
                                    <li onClick={generateLabel}><LabelIcon /><span>Label</span></li>
                                    <li onClick={generateInvoice}><InvoiceIcon /><span>Invoice</span></li>
                                    <li onClick={() => bulkCancelled("bulkCancel")}><CancelIcon /><span>Cancel</span></li>
                                    <li onClick={handleExport}><ExportIcon /><span>Export</span></li>
                                    <li onClick={handleExportAll}>
                                        <ExportIcon /><span>Export All</span>
                                    </li>
                                </>
                            )}
                            {activeTab === "Pickup" && (
                                <>
                                    <li onClick={generateManifest}><ExportIcon /><span>Generate Manifest</span></li>
                                    <li onClick={generateLabel}><LabelIcon /><span>Label</span></li>
                                    <li onClick={generateInvoice}><InvoiceIcon /><span>Invoice</span></li>
                                    <li onClick={() => bulkCancelled("bulkCancel")}><CancelIcon /><span>Cancel</span></li>
                                    <li onClick={handleExportAll}>
                                        <ExportIcon /><span>Export All</span>
                                    </li>
                                </>
                            )}
                            {activeTab === "Returns" && (
                                <>
                                    <li onClick={handleExport}><ExportIcon /><span>Export</span></li>
                                    <li onClick={handleExportAll}>
                                        <ExportIcon /><span>Export All</span>
                                    </li>
                                </>
                            )}
                        </ul>
                        <div className='ba-close'></div>
                    </div>
                </section>
            )}

            <Modal
                show={show}
                onHide={handleClose}
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>Are you sure you want to {actionType === "bulkDelete" ? "delete" : "cancel"} the order ?</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="secondary" className="px-5" onClick={handleClose}>
                        No
                    </Button>
                    <Button variant="primary" className="px-5" onClick={makeApiCall}>Yes</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default BulkActionsComponent;
