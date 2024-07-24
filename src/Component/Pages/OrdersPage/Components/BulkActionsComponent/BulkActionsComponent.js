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
import moment from 'moment';
import LoaderScreen from '../../../../LoaderScreen/LoaderScreen';

const BulkActionsComponent = ({ activeTab, bulkAwb, LoaderRing, setLoaderRing, setSelectAll, selectedRows, setaddTagShow, setUpdateWeight, setUpdateWarehouse, setSelectedRows, setBulkActionShow, setFilterData, queryParamTemp }) => {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [shipShow, setShipShow] = useState(false);
    const [actionType, setActionType] = useState("");
    const [genaratelabel, setGenaratelabel] = useState(false);
    const [generateinvoice, setGenerateinvoice] = useState(false);
    const [shipButtonClicked, setShipButtonClicked] = useState(false);
    const [exportButtonClick, setExportButtonClick] = useState(false);
    const { exportCard, exportAllCard } = useSelector(state => state?.exportSectionReducer);
    const { bulkShipData, labelData, invoiceData } = useSelector(state => state?.orderSectionReducer);

    const handleClose = () => setShow(false);
    const handleShipClose = () => setShipShow(false);

    const addTag = () => {
        setaddTagShow(true)
    }

    const markedVerified = () => {
        dispatch({
            type: "BULK_MARK_ORDER_VERIFY_ACTION", payload: {
                order_ids: selectedRows,
            }
        })
        setSelectAll(false)
    }

    const rtoUpdate = () => {
        setUpdateWarehouse(true)
        setSelectAll(false)
    }

    const bulkDeleted = (args) => {
        setShow(true)
        setSelectAll(false)
        setActionType(args)
    }

    const bulkCancelled = (args) => {
        setActionType(args)
        setShow(true)
        setSelectAll(false)
    }

    const makeApiCall = () => {
        setShow(false);
        setSelectAll(false)
        if (actionType === "bulkDelete") {
            dispatch({ type: "BULK_DELETE_ORDER_ACTION", payload: { order_ids: selectedRows } });
            setLoaderRing(true)
            setTimeout(() => {
                setLoaderRing(false)
            }, 2000);
        } else {
            if (activeTab === "Processing" || activeTab === "Pickups") {
                dispatch({ type: "BULK_PROCESSING_ORDER_CANCEL_ACTION", payload: { order_ids: selectedRows } });
                setLoaderRing(true)
                setTimeout(() => {
                    setLoaderRing(false)
                }, 2000);
            } else {
                dispatch({ type: "BULK_CANCEL_ORDER_ACTION", payload: { ids: selectedRows } });
                setLoaderRing(true)
                setTimeout(() => {
                    setLoaderRing(false)
                }, 2000);
            }
        }
    };

    const generateManifest = () => {
        dispatch({ type: "BULK_GENERATE_MENIFEST_ACTION", payload: { order_ids: selectedRows.join(','), orderLength: selectedRows } });
        setSelectAll(false)
    };

    const generatePickup = () => {
        setSelectAll(false)
        dispatch({ type: "BULK_ORDER_GENERATE_PICKUP_ACTION", payload: { orders: selectedRows } })
    };

    const generateLabel = () => {
        const valuesToCheck = ["pending", "cancelled"];
        const atLeastOneExists = valuesToCheck.some(value => bulkAwb.includes(value));
        if (atLeastOneExists) {
            toast.error(" Oops... You can not select Pending or Cancelled Orders!")
        } else {
            setGenaratelabel(true);
            setLoaderRing(true)
            setTimeout(() => {
                setLoaderRing(false)
            }, 2000);
            setSelectAll(false)
            setSelectedRows([])
            dispatch({ type: "BULK_ORDER_GENERATE_LABEL_ACTION", payload: { order_ids: selectedRows.join(',') } });
        }
    };

    const generateInvoice = () => {
        const valuesToCheck = ["pending", "cancelled"];
        const atLeastOneExists = valuesToCheck.some(value => bulkAwb.includes(value));
        if (atLeastOneExists) {
            toast.error(" Oops... You can not select Pending or Cancelled Orders!")
        } else {
            setGenerateinvoice(true);
            setLoaderRing(true)
            setSelectAll(false)
            setSelectedRows([])
            setTimeout(() => {
                setLoaderRing(false)
            }, 2000);
            dispatch({ type: "BULK_ORDER_GENERATE_INVOICE_ACTION", payload: { order_ids: selectedRows.join(',') } });
        }
    };

    const bulkDimesionDetailUpdate = () => {
        setUpdateWeight(true)
        setSelectAll(false)
    }

    const handleExport = () => {
        setExportButtonClick(true);
        setSelectAll(false)
        setLoaderRing(true)
        setTimeout(() => {
            setLoaderRing(false)
        }, 2000);
        const requestData = {
            "order_tab": {
                "type": activeTab === "All" ? "" : activeTab,
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
                    "courier": queryParamTemp?.courier_partner || "",
                    "awb_number": queryParamTemp?.awb_number || "",
                    "min_awb_assign_date": "",
                    "max_awb_assign_date": "",
                    "status": queryParamTemp?.status || "",
                    "order_type": queryParamTemp?.order_type || "",
                    "customer_order_number": queryParamTemp?.order_id || "",
                    "channel": queryParamTemp?.order_source || "",
                    "min_invoice_amount": queryParamTemp?.min_invoice_amount || "",
                    "max_invoice_amount": queryParamTemp?.max_invoice_amount || "",
                    "warehouse_id": queryParamTemp?.pickup_address_id || "",
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
                    ...(queryParamTemp?.start_date && { "start_date": moment(queryParamTemp?.start_date).format("YYYY-MM-DD") }),
                    ...(queryParamTemp?.end_date && { "end_date": moment(queryParamTemp?.end_date).format("YYYY-MM-DD") })
                };
                dispatch({ type: "EXPORT_ALL_DATA_ACTION", payload: requestData });
                setBulkActionShow(false);
                setSelectedRows([])
                setFilterData({});
            } else {
                toast.info("Report canceled.");
            }
        });
    };

    const handelBulkShip = () => {
        setShipShow(true)
        // setShipButtonClicked(true);
    };


    const bulkShipApiCall = () => {
        setShipShow(false)
        setSelectedRows([])
        setSelectAll(false)
        setLoaderRing(true)
        setTimeout(() => {
            setLoaderRing(false)
        }, 2000);
        const data = { "order_ids": selectedRows.map(id => id.toString()) };
        dispatch({ type: "BULK_SHIP_ORDERS_ACTION", payload: data });
    }

    useEffect(() => {
        if (labelData && genaratelabel) {
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
    }, [labelData]);

    useEffect(() => {
        if (invoiceData && generateinvoice) {
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
    }, [invoiceData])

    useEffect(() => {
        if (exportButtonClick) {
            const FileSaver = require('file-saver');
            const blob = new Blob([exportCard], { type: 'application/ms-excel' });
            FileSaver.saveAs(blob, `${activeTab}.xlsx`);
            setExportButtonClick(false);
        }
    }, [exportCard]);
    

    useEffect(() => {
        if (shipButtonClicked) {
            if (bulkShipData && Object.keys(bulkShipData).length > 0) {
                setShipButtonClicked(false);
                setBulkActionShow(false);
                setSelectedRows([]);
            }
        }
    }, [shipButtonClicked, bulkShipData, selectedRows, setBulkActionShow, setSelectedRows]);

    useEffect(() => {
        if (exportAllCard?.message === "Go to MIS->Downloads to download your report") {
            setFilterData({});
        }
    }, [exportAllCard]);

    const returnsBulkActions = {
        width: '210px',
    }




    return (
        <>
            {selectedRows.length > 0 && (
                <section style={activeTab === 'Returns' ? returnsBulkActions : {}} className='bulk-action-container box-shadow'>
                    <div className='ba-inner-container'>
                        <div className='ba-rows-selected'>
                            <span className='fw-bold font20'>{selectedRows.length}</span>
                            <span>Rows Selected</span>
                        </div>
                        <ul className={`ba-actions ${activeTab}`}>
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
                                    <li onClick={bulkDimesionDetailUpdate}><WeightDimensionIcon /><span>Weight / Dimension update</span></li>
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
                                    <li onClick={bulkDimesionDetailUpdate}><WeightDimensionIcon /><span>Weight / Dimension update</span></li>
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
                                    <li onClick={handleExport}><ExportIcon /><span>Export</span></li>
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

            <LoaderScreen loading={LoaderRing} />

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

            <Modal
                show={shipShow}
                onHide={handleShipClose}
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>Are you sure you want to ship the bulk order ?</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="secondary" className="px-5" onClick={handleShipClose}>
                        No
                    </Button>
                    <Button variant="primary" className="px-5" onClick={bulkShipApiCall}>Yes</Button>
                </Modal.Footer>
            </Modal>

        </>
    );
};

export default BulkActionsComponent;
