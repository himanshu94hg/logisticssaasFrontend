import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import './BulkActionsComponent.css'; 
import ExportIcon from '../../OrdersPage/Components/BulkActionsComponent/Components/BulkIcons/ExportIcon'; 
import FileSaver from 'file-saver'; 
import Swal from 'sweetalert2'; 

const BulkActionsComponent = ({
    activeTab,
    selectedRows,
    setBulkActionShow,
    type,
    subtype,
    startDate,
    endDate
}) => {
    const dispatch = useDispatch();
    const [exportButtonClick, setExportButtonClick] = useState(false);
    const exportCard = useSelector(state => state?.exportSectionReducer?.exportCard);

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
                    // dispatch({ type: "EXPORT_DATA_ACTION", payload: requestData });
                    toast.success("Go to MIS -> Download and download the report.");
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
