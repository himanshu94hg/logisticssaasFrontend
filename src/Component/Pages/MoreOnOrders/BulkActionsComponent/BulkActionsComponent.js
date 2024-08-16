import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from "axios";
import Cookies from "js-cookie";
import DeleteIcon from '../../OrdersPage/Components/BulkActionsComponent/Components/BulkIcons/DeleteIcon'
import MergeIcon from '../../OrdersPage/Components/BulkActionsComponent/Components/BulkIcons/MergeIcon';
import ShippingIcon from '../../OrdersPage/Components/BulkActionsComponent/Components/BulkIcons/ShippingIcon';

const BulkActionsComponent = ({ activeTab, selectedRows, setBulkActionShow, setSelectedRows, setSplitStatus, setSelectAll }) => {
    const dispatch = useDispatch();
    const [shipButtonClicked, setShipButtonClicked] = useState(false);
    const [exportButtonClick, setExportButtonClick] = useState(false)
    const exportCard = useSelector(state => state?.exportSectionReducer?.exportCard)
    const { bulkShipData } = useSelector(state => state?.orderSectionReducer)
    const { screenWidthData } = useSelector(state => state?.authDataReducer)

    const bulkDeleted = () => {
        dispatch({
            type: "BULK_DELETE_ORDER_ACTION", payload: {
                order_ids: selectedRows,
            }
        })
        setBulkActionShow(false)
        setSelectedRows([])
        setSelectAll(false)
    }
    const handleReassign = () => {
        setBulkActionShow(false)
        setSelectedRows([])
        setSelectAll(false)
    }


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
                setSplitStatus(new Date())
            } else {
                toast.error("Order cannot be merged.");
            }
        } catch (error) {
            toast.error("Order cannot be merged.");
        }
        setBulkActionShow(false)
        setSelectedRows([])
        setSelectAll(false)
    };

    const shortWidth = {
        width: '190px'
    }

    return (
        <>
            {selectedRows.length > 0 && (
                <section style={screenWidthData < 992 ? shortWidth : {}} className='bulk-action-container box-shadow'>
                    <div className='ba-inner-container'>
                        <div className='ba-rows-selected'>
                            <span className='fw-bold font20'>{selectedRows.length}</span>
                            <span>Rows Selected</span>
                        </div>
                        <ul className='ba-actions d-flex'>
                            {activeTab === "Merge Order" && <>
                                <li onClick={() => bulkDeleted()}><DeleteIcon /><span>Delete</span></li>
                                <li onClick={() => handleMergeOrders()}><MergeIcon /><span>Merge</span></li>
                            </>}
                            {activeTab === "Reassign Order" &&
                                <>
                                    <li onClick={handleReassign}><ShippingIcon /><span>Reassign</span></li>
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