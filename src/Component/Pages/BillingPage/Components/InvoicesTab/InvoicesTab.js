import React, { useState } from 'react';
import FreightInvoice from './FreightInvoice';
import AllOtherInvoices from './AllOtherInvoices';

const InvoicesTab = ({ billingCard, selectedRows, setSelectedRows, setBulkActionShow }) => {
    const [InvoiceData, setInvoiceData] = useState(true);

    return (
        <section className='position-relative invoiceTab'>
            <div className="position-relative">
                <div className="mb-3 billing-count-container">
                    <div
                        className={`box-shadow shadow-sm count-card ${InvoiceData ? 'selected' : ''}`}
                        onClick={() => setInvoiceData(true)}
                    >
                        <p>Freight Invoice</p>
                    </div>
                    <div
                        className={`box-shadow shadow-sm count-card ${!InvoiceData ? 'selected' : ''}`}
                        onClick={() => setInvoiceData(false)}
                    >
                        <p>All Other Invoices</p>
                    </div>
                </div>
                {
                    InvoiceData ? <FreightInvoice billingCard={billingCard} selectedRows={selectedRows} setSelectedRows={setSelectedRows} setBulkActionShow={setBulkActionShow} /> : <AllOtherInvoices />
                }
            </div>
        </section>
    );
};

export default InvoicesTab;
