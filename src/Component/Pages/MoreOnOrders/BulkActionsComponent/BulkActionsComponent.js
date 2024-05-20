import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from "axios";
import Cookies from "js-cookie";
import DeleteIcon from '../../OrdersPage/Components/BulkActionsComponent/Components/BulkIcons/DeleteIcon'
import MergeIcon from '../../OrdersPage/Components/BulkActionsComponent/Components/BulkIcons/MergeIcon';

const BulkActionsComponent = ({ activeTab, selectedRows, setaddTagShow, setUpdateWarehouse }) => {
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
        // dispatch({
        //     type: "BULK_PICKUP_ADDRESS_UPDATE_ACTION", payload: {
        //         order_ids: selectedRows,
        //         warehouse_id: 22
        //     }
        // })
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
        dispatch({
            type: "BULK_DIMESION_DETAILS_UPDATE_ACTION", payload: [
                {
                    order: 40,
                    weight: 3,
                    length: 2,
                    breadth: 15.2,
                    height: 23
                }
            ]
        })
    }
    const handelBulkShip = () => {
        let data = {
            "order_ids": selectedRows.map(id => id.toString())
        };
        dispatch({ type: "BULK_SHIP_ORDERS_ACTION", payload: data });
        setShipButtonClicked(true);
    };

    const handleExport = () => {
        setExportButtonClick(true);
        const requestData = {
            "order_tab": {
                "type": activeTab,
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

    const handleMergeOrders = async () => {
        try {
            const authToken = Cookies.get("access_token");
            if (!authToken) {
                throw new Error("Authentication token not found.");
            }
    
            if (selectedRows.length === 0) {
                throw new Error('Please select at least one order to merge.');
            }
    
            const data = JSON.stringify({
                "order_ids": selectedRows.join(',')
            });
    
            const config = {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    'Content-Type': 'application/json'
                }
            };
    
            const response = await axios.post(`${process.env.REACT_APP_CORE_API_URL}/orders-api/orders/merge-order/`, data, config);
    
            if (response.status === 200) {
                toast.success("Order merged successfully.");
            } else {
                toast.error("Order cannot be merged.");
            }
        } catch (error) {
            toast.error("Order cannot be merged.");
        }
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
                            {activeTab === "Merge Order" && <>
                                {/* <li onClick={() => addTag()}><span>Add Tag</span></li>
                                <li onClick={() => markedVerified()}><span>Mark as verified</span></li>
                                <li onClick={() => bulkCancelled()}><span>Cancel</span></li> */}
                                <li onClick={() => bulkDeleted()}><DeleteIcon /><span>Delete</span></li>
                                <li onClick={() => handleMergeOrders()}><MergeIcon /><span>Merge</span></li>
                                {/* <li onClick={() => rtoUpdate()}><span>Warehouse update</span></li>
                                <li onClick={() => bulkDimesionDetailUpdate()}><span>Weight/Dimension update</span></li>
                                <li onClick={handelBulkShip}><span>Ship</span></li>
                                <li onClick={handleExport}><span>Export</span></li> */}
                            </>}
                            {activeTab === "Reassign Order" &&
                                <>
                                    <li ><span>Reassign</span></li>
                                    {/* <li onClick={handleExport}><span>Export</span></li> */}
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