import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import './BulkActionsComponent.css'; 
import ExportIcon from '../../OrdersPage/Components/BulkActionsComponent/Components/BulkIcons/ExportIcon'; 
import FileSaver from 'file-saver'; 
import Swal from 'sweetalert2'; 


const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const BulkActionsComponent = ({
    activeTab,
    selectedRows,
    setSelectedRows,
    setBulkActionShow,
    type,
    subtype,
    startDate,
    endDate
}) => {
    const dispatch = useDispatch();
    const [exportButtonClick, setExportButtonClick] = useState(false);
    const [exportAllButtonClick, setExportAllButtonClick] = useState(false);
    const exportCard = useSelector(state => state?.exportSectionReducer?.exportCard);
    const exportAllCard = useSelector(state => state?.exportSectionReducer?.exportAllCard);

    const exportFile = () => {
        setExportButtonClick(true);
        const requestData = {
            "order_tab": {
                "type": "",
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
        if (exportButtonClick && exportCard) {
            const blob = new Blob([exportCard], { type: 'application/ms-excel' });
            FileSaver.saveAs(blob, `${activeTab}.xlsx`);
            setExportButtonClick(false);
        }
    }, [exportCard, exportButtonClick, activeTab]);

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
                const formattedStartDate = startDate ? formatDate(startDate) : '';
                const formattedEndDate = endDate ? formatDate(endDate) : '';
                    const requestData = {
                        "order_tab": {
                            "type": type,
                            "subtype": subtype
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
                        "payment_type": "",
                        "start_date": formattedStartDate,
                        "end_date": formattedEndDate
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
                            <li onClick={exportFile}>
                                <ExportIcon /><span>Export</span>
                            </li>
                            <li onClick={handleExportAll}>
                                <ExportIcon /><span>Export All</span>
                            </li>
                        </ul>
                        <div className='ba-close' onClick={() => setBulkActionShow(false)}></div>
                    </div>
                </section>
            )}
        </>
    );
};

export default BulkActionsComponent;
