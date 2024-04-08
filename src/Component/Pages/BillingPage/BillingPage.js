import React, { useEffect, useState } from 'react';
import NavTabs from './Components/navTabs/NavTabs';
import ShippingCharges from './Components/ShippingCharges/ShippingCharges';
import RemittanceLogs from './Components/RemittanceLogs/RemittanceLogs';
import CreditReceipt from './Components/CreditReceipt/CreditReceipt';
import RechargeLogs from './Components/RechargeLogs/RechargeLogs';
import InvoicesTab from './Components/InvoicesTab/InvoicesTab';
import PassbookTab from './Components/PassbookTab/PassbookTab';
import { useDispatch, useSelector } from 'react-redux';
import './BillingPage.css';
import Pagination from '../../common/Pagination/Pagination';
import BulkActionsComponent from './Components/BulkActionsComponent/BulkActionsComponent';

const BillingPage = () => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("Shipping Charges");
    const [selectedOption, setSelectedOption] = useState("Domestic");
    const [itemsPerPage, setItemsPerPage] = useState(20);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState("");
    const [BulkActionShow, setBulkActionShow] = useState(false)
    const [selectedRows, setSelectedRows] = useState([]);
    
    const billingSectionReducer = useSelector(state => state?.billingSectionReducer);
    const { billingCard, billingShipingCard, billingShipingRemitanceCard, billingShipingRechargeCard, billingShipingInvoiceCard, billingShipingReceiptCard } = billingSectionReducer;

    useEffect(() => {
        const fetchData = async () => {
            switch (activeTab) {
                case "Shipping Charges":
                    await dispatch({ type: "BILLING_SHIPING_DATA_ACTION", payload: { "itemsPerPage": itemsPerPage, "currentPage": currentPage } });
                    setTotalItems(billingShipingCard.length);
                    break;
                case "Remittance Logs":
                    await dispatch({ type: "BILLING_SHIPING_REMITANCE_DATA_ACTION", payload: { "itemsPerPage": itemsPerPage, "currentPage": currentPage } });
                    setTotalItems(billingShipingRemitanceCard.length);
                    break;
                case "Recharge Logs":
                    await dispatch({ type: "BILLING_SHIPING_RECHARGE_DATA_ACTION", payload: { "itemsPerPage": itemsPerPage, "currentPage": currentPage } });
                    setTotalItems(billingShipingRechargeCard.length);
                    break;
                case "Invoices":
                    await dispatch({ type: "BILLING_SHIPING_INVOICE_DATA_ACTION", payload: { "itemsPerPage": itemsPerPage, "currentPage": currentPage } });
                    setTotalItems(billingShipingInvoiceCard.length);
                    break;
                case "Passbook":
                    await dispatch({ type: "BILLING_DATA_ACTION", payload: { "itemsPerPage": itemsPerPage, "currentPage": currentPage } });
                    setTotalItems(billingCard.length);
                    break;
                case "Credit Receipt":
                    await dispatch({ type: "BILLING_SHIPING_RECEIPT_DATA_ACTION", payload: { "itemsPerPage": itemsPerPage, "currentPage": currentPage } });
                    setTotalItems(billingShipingReceiptCard.length);
                    break;
                default:
                    break;
            }
        };

        fetchData();
    }, [dispatch, activeTab, currentPage, itemsPerPage]);

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    const toggleOptions = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        if (BulkActionShow) {
            setBulkActionShow(false)
            setSelectedRows([])

        }
    }, [activeTab])

    return (
        <>
            <NavTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className='billing-page-container'>
                {/* Shipping Charges */}
                {activeTab === "Shipping Charges" && <ShippingCharges billingCard={billingShipingCard} 
                selectedRows={selectedRows}
                setSelectedRows={setSelectedRows}
                setBulkActionShow={setBulkActionShow}/>}

                {/* Remittance Logs */}
                {activeTab === "Remittance Logs" && <RemittanceLogs billingCard={billingShipingRemitanceCard} 
                selectedRows={selectedRows}
                setSelectedRows={setSelectedRows}
                setBulkActionShow={setBulkActionShow}/>}

                {/* RechargeLogs */}
                {activeTab === "Recharge Logs" && <RechargeLogs billingCard={billingShipingRechargeCard} 
                selectedRows={selectedRows}
                setSelectedRows={setSelectedRows}
                setBulkActionShow={setBulkActionShow}/>}

                {/* Invoices */}
                {activeTab === "Invoices" && <InvoicesTab billingCard={billingShipingInvoiceCard} 
                selectedRows={selectedRows}
                setSelectedRows={setSelectedRows}
                setBulkActionShow={setBulkActionShow}/>}

                {/* Passbook */}
                {activeTab === "Passbook" && <PassbookTab billingCard={billingCard} 
                selectedRows={selectedRows}
                setSelectedRows={setSelectedRows}
                setBulkActionShow={setBulkActionShow}/>}

                {/* Credit Receipt */}
                {activeTab === "Credit Receipt" && <CreditReceipt billingCard={billingShipingReceiptCard} 
                selectedRows={selectedRows}
                setSelectedRows={setSelectedRows}
                setBulkActionShow={setBulkActionShow}/>}

                <Pagination
                    totalItems={totalItems}
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    setItemsPerPage={setItemsPerPage}
                    setCurrentPage={setCurrentPage}
                />
                {BulkActionShow && (
                    <BulkActionsComponent />
                )
                }
            </div>
        </>
    );
}

export default BillingPage;
