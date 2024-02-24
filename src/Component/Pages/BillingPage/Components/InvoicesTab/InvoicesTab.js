import React, { useState, useEffect } from 'react';
import SidePanel from './SidePanel/SidePanel';
import FreightInvoice from './FreightInvoice';
import AllOtherInvoices from './AllOtherInvoices';

const DateFormatter = ({ dateTimeString }) => {
    const [formattedDate, setFormattedDate] = useState('');

    useEffect(() => {
        const formattedDateTime = formatDateTime(dateTimeString);
        setFormattedDate(formattedDateTime);
    }, [dateTimeString]);

    const formatDateTime = (dateTimeString) => {
        const options = {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        };

        const dateObject = new Date(dateTimeString);
        const formattedDateTime = new Intl.DateTimeFormat('en-US', options).format(dateObject);

        return formattedDateTime;
    };

    return <p>{formattedDate}</p>;
};

const InvoicesTab = ({billingCard}) => {
    const [backDrop, setBackDrop] = useState(false);
    const [InvoiceData, setInvoiceData] = useState(true);

    const handleSidePanel = () => {
        document.getElementById("sidePanel").style.right = "0"
        setBackDrop(true)
    }

    const CloseSidePanel = () => {
        document.getElementById("sidePanel").style.right = "-50em"
        setBackDrop(false)
    }



    // useEffect(() => {
    //   first


    // }, [])


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
                    InvoiceData ? <FreightInvoice billingCard={billingCard} /> : <AllOtherInvoices billingCard={billingCard}/>
                }

                <SidePanel CloseSidePanel={CloseSidePanel} />

                {/* <div id='sidePanel' className="side-panel">
                    <div className='sidepanel-closer'>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </div>
                </div> */}

                <div className={`backdrop ${backDrop ? 'd-block' : 'd-none'}`}></div>

            </div>
        </section >
    );
};

export default InvoicesTab;
