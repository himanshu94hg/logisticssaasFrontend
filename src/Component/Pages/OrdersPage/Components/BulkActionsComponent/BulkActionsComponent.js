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
    const { bulkShipData,labelData,invoiceData } = useSelector(state => state?.orderSectionReducer)
    const [genaratelabel, setGenaratelabel] = useState(false);
    const [generateinvoice, setGenerateinvoice] = useState(false);


    console.log(labelData,invoiceData,"labelData,invoiceData")


useEffect(()=>{
       if(labelData){
        if(genaratelabel === true){
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
    },[labelData])

    useEffect(()=>{
        if(invoiceData){
         if(generateinvoice === true){
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
     },[invoiceData])

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
    const generateManifest = () => {
        dispatch({
            type: "BULK_GENERATE_MENIFEST_ACTION", payload: {
                order_ids: selectedRows.join(','),
                orderLength: selectedRows
            }
        })
    }
    const generatePickup = () => {
        dispatch({
            type: "BULK_ORDER_GENERATE_PICKUP_ACTION", payload: {
                orders: selectedRows
            }
        })
    }
    const generateLabel = () => {
        dispatch({
            type: "BULK_ORDER_GENERATE_LABEL_ACTION", 
            payload: {
                order_ids: selectedRows.join(',')
            }
        });    
        setGenaratelabel(true)    
    }
    const generateInvoice = () => {
        dispatch({
            type: "BULK_ORDER_GENERATE_INVOICE_ACTION", payload: {
                order_ids: selectedRows.join(',')
            }
        });
        setGenerateinvoice(true)
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

    const handleExport = () => {
        setExportButtonClick(true);
        const requestData = {
            "order_tab": {
                "type": activeTab === "All Orders" ? "All Orders" : activeTab ,
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


    const handelBulkShip = () => {
        let data = {
            "order_ids": selectedRows.map(id => id.toString())
        };
        dispatch({ type: "BULK_SHIP_ORDERS_ACTION", payload: data });
        setShipButtonClicked(true);
    };    

    useEffect(() => {
        console.log("All Bulk Ship 1",shipButtonClicked);
        if (shipButtonClicked === true) {
            if (bulkShipData && Object.keys(bulkShipData).length > 0) {
                const shippedCount = Object.values(bulkShipData).reduce((total, order) => {
                    if (order?.status === true) {
                        return total + 1;
                    }
                    return total;
                }, 0);
                toast.success(`${shippedCount} out of ${selectedRows.length} Orders Shipped Successfully.`);
                setShipButtonClicked(false);
            }
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
                                    <li onClick={generateLabel}><span>Label</span></li>
                                    <li onClick={generateInvoice}><span>Invoice</span></li>
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
                                    <li onClick={generatePickup}><span>Generate Pickup</span></li>
                                    <li onClick={generateLabel}><span>Label</span></li>
                                    <li onClick={generateInvoice}><span>Invoice</span></li>
                                    <li onClick={() => bulkCancelled()}><CancelIcon /><span>Cancel</span></li>
                                    <li onClick={handleExport}><ExportIcon /><span>Export</span></li>

                                </>
                            }
                            {activeTab === "Pickup" &&
                                <>
                                    <li onClick={generateManifest}><span>Generate Manifest</span></li>
                                    <li onClick={generateLabel}><span>Label</span></li>
                                    <li onClick={generateInvoice}><span>Invoice</span></li>
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