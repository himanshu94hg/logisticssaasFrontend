import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ExportIcon from '../../../OrdersPage/Components/BulkActionsComponent/Components/BulkIcons/ExportIcon';
import Cookies from 'js-cookie';
import axios from 'axios';
import { BASE_URL_CORE } from '../../../../../axios/config';
import { customErrorFunction } from '../../../../../customFunction/errorHandling';
import { toast } from 'react-toastify';
import LoaderScreen from '../../../../LoaderScreen/LoaderScreen';

const BulkActionsComponent = ({ activeTab, setSelectAll, setBulkActionShow, selectedRows, selectedOrderRows, setSelectedRows, setSelectedOrderRows }) => {
    const dispatch = useDispatch()
    let authToken = Cookies.get("access_token");
    const [exportButtonClick, setExportButtonClick] = useState(false)
    const [loading, setLoading] = useState(false)
    const exportCard = useSelector(state => state?.exportSectionReducer?.exportCard)
    const { exportPassbookCard, exportShippingCard, exportRechargeCard, exportInvoiceCard, exportRemitanceCard, exportReceiptCard } = useSelector(state => state?.exportSectionReducer)
    const { billingShipingRemitanceDOWNLOADCard } = useSelector(state => state?.billingSectionReducer)


    const handleExport = async () => {
        setExportButtonClick(true);
        setLoading(true)
        const requestData = {
            "ids": `${activeTab === "Shipping Charges" ? selectedOrderRows.join(',') : selectedRows.join(',')}`
        };
        if (activeTab === "Passbook") {
            dispatch({ type: "EXPORT_PASSBOOK_DATA_ACTION", payload: requestData });
        }
        else if (activeTab === "Shipping Charges") {
            dispatch({ type: "EXPORT_SHIPPING_DATA_ACTION", payload: requestData });
        }
        else if (activeTab === "Recharge Logs") {
            dispatch({ type: "EXPORT_RECHARGE_DATA_ACTION", payload: requestData });
        }
        else if (activeTab === "Invoices") {
            dispatch({ type: "EXPORT_INVOICE_DATA_ACTION", payload: requestData });
        }
        else if (activeTab === "Remittance Logs") {
            try {
                const response = await axios.post(`${BASE_URL_CORE}/core-api/features/billing/remittance-download/`, requestData, {
                    headers: {
                        'Authorization': `Bearer ${authToken}`,
                        'Content-Type': 'application/json'
                    },
                    responseType: 'blob'
                });

                if (response.status === 200) {
                    setSelectAll(false)
                    toast.success("Data Export Successfully!");
                    const FileSaver = require('file-saver');
                    const blob = new Blob([response.data], { type: 'application/ms-excel' });
                    FileSaver.saveAs(blob, `remittance.xlsx`);
                    setBulkActionShow(false)
                }
            } catch (error) {
                customErrorFunction(error)
            }
        }
        else {
            dispatch({ type: "EXPORT_RECEIPT_DATA_ACTION", payload: requestData });
        }

        setSelectedOrderRows([])
        setSelectedRows([])
        setSelectAll(false)
    };

    const handleExportData = async () => {
        dispatch({ type: "BILLING_SHIPING_REMITANCE_DOWNLOAD_DATA_ACTION", payload: selectedRows.join(',') });
        setSelectedOrderRows([])
        setSelectedRows([])
        setSelectAll(false)
    }


    useEffect(() => {
        if (exportButtonClick) {
            var FileSaver = require('file-saver');
            var blob = new Blob([activeTab === "Passbook" ? exportPassbookCard : activeTab === "Shipping Charges" ? exportShippingCard : activeTab === "Recharge Logs" ? exportRechargeCard : activeTab === "Invoices" ? exportInvoiceCard : activeTab === "Credit Receipt" ? exportReceiptCard : ""], { type: 'application/ms-excel' });
            FileSaver.saveAs(blob, `${activeTab}.xlsx`);
            setExportButtonClick(false);
            setSelectAll(false)
            setLoading(false)
        }
    }, [exportPassbookCard, exportShippingCard, exportRechargeCard, exportInvoiceCard, exportRemitanceCard, exportReceiptCard, exportCard]);


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
                            <li onClick={handleExport}><ExportIcon /><span>Export</span></li>
                            {activeTab === "Remittance Logs" &&
                                <li onClick={handleExportData}><ExportIcon /><span>Export data</span></li>
                            }
                        </ul>
                        <div className='ba-close'></div>
                    </div>
                </section>
            )}
            <LoaderScreen loading={loading} />
        </>
    )
}

export default BulkActionsComponent