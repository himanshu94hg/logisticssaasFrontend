import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const BulkActionsComponent = ({ activeTab, selectedRows }) => {
    const dispatch = useDispatch()
    const [exportButtonClick, setExportButtonClick] = useState(false)
    const exportCard = useSelector(state => state?.exportSectionReducer?.exportCard)
    const {exportPassbookCard,exportShippingCard,exportRechargeCard,exportInvoiceCard} = useSelector(state => state?.exportSectionReducer)
    
    console.log(exportPassbookCard, "Export Action Bulk")

    const handleExport = () => {
        setExportButtonClick(true);
        const requestData = {
            "ids": `${selectedRows.join(',')}`
        };
        if(activeTab === "Passbook")
        {
            dispatch({ type: "EXPORT_PASSBOOK_DATA_ACTION", payload: requestData });
        }
        else if(activeTab === "Shipping Charges")
        {
            dispatch({ type: "EXPORT_SHIPPING_DATA_ACTION", payload: requestData });
        }
        else if(activeTab === "Recharge Logs")
        {
            dispatch({ type: "EXPORT_RECHARGE_DATA_ACTION", payload: requestData });
        }
        else if(activeTab === "Invoices")
        {
            dispatch({ type: "EXPORT_INVOICE_DATA_ACTION", payload: requestData });
        }
        else{
            dispatch({ type: "EXPORT_RECHARGE_DATA_ACTION", payload: requestData });
        }
    };

    useEffect(() => {
        if (exportButtonClick) {
            var FileSaver = require('file-saver');
            var blob = new Blob([activeTab === "Passbook" ? exportPassbookCard : activeTab === "Shipping Charges" ? exportShippingCard : activeTab === "Recharge Logs" ? exportRechargeCard : activeTab === "Invoices" ? exportInvoiceCard : exportCard], { type: 'application/ms-excel' });
            FileSaver.saveAs(blob, `${activeTab}.xlsx`);
            setExportButtonClick(false);
        }
    }, [exportPassbookCard,exportShippingCard,exportRechargeCard,exportInvoiceCard,exportCard]);
    

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
                    <li onClick={handleExport}><span>Export</span></li>
                </ul>
                <div className='ba-close'></div>
            </div>
        </section>
        )}
        </>
    )
}

export default BulkActionsComponent