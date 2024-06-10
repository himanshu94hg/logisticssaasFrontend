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
import MoreFiltersPanel from './Components/MoreFiltersPanel/MoreFiltersPanel';

const BillingPage = () => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("Shipping Charges");
    const [selectedOption, setSelectedOption] = useState("Domestic");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState("");
    const [itemsPerPage, setItemsPerPage] = useState(20);
    const [BulkActionShow, setBulkActionShow] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [selectedOrderRows, setSelectedOrderRows] = useState([]);
    const [MoreFilters, setMoreFilters] = useState(false);
    const [remitanceOrderRows, setRemitanceOrderRows] = useState([]);

    const billingSectionReducer = useSelector(state => state?.billingSectionReducer);
    const { billingCard, billingShipingCard, billingShipingRemitanceCard, billingShipingRechargeCard, billingShipingInvoiceCard, billingShipingReceiptCard,billingPassbookCounterCard,billingRechargeCounterCard,billingShippingCounterCard,billingRemitanceExportCard } = billingSectionReducer;

    console.log("billingPassbookCounterCardbillingPassbookCounterCard", billingShippingCounterCard);

    useEffect(() => {
        switch (activeTab) {
            case "Shipping Charges":
                dispatch({ type: "BILLING_SHIPPING_COUNTER_DATA_ACTION"});
                dispatch({ type: "BILLING_SHIPING_DATA_ACTION", payload: { itemsPerPage, currentPage } });
                break;
            case "Remittance Logs":
                dispatch({ type: "BILLING_SHIPING_REMITANCE_DATA_ACTION", payload: { page_size: itemsPerPage, page: currentPage } });
                break;
            case "Recharge Logs":
                dispatch({ type: "BILLING_RECHARGE_COUNTER_DATA_ACTION"});
                dispatch({ type: "BILLING_SHIPING_RECHARGE_DATA_ACTION", payload: { itemsPerPage, currentPage } });
                break;
            case "Invoices":
                dispatch({ type: "BILLING_SHIPING_INVOICE_DATA_ACTION", payload: { itemsPerPage, currentPage } });
                break;
            case "Passbook":
                dispatch({ type: "BILLING_PASSBOOK_COUNTER_DATA_ACTION"});
                dispatch({ type: "BILLING_DATA_ACTION", payload: { itemsPerPage, currentPage } });
                break;
            case "Credit Receipt":
                dispatch({ type: "BILLING_SHIPING_RECEIPT_DATA_ACTION", payload: { itemsPerPage, currentPage } });
                break;
            default:
                break;
        }
    }, [activeTab, dispatch, itemsPerPage, currentPage]);

    useEffect(() => {
        if (billingShipingCard?.count !== undefined) {
            setTotalItems(billingShipingCard.count);
        }
    }, [billingShipingCard]);

    useEffect(() => {
        if (billingCard?.count !== undefined) {
            setTotalItems(billingCard.count);
        }
    }, [billingCard]);

    useEffect(() => {
        if (billingShipingRemitanceCard?.count !== undefined) {
            setRemitanceOrderRows(billingShipingRemitanceCard.results);
            setTotalItems(billingShipingRemitanceCard.count);
        }
    }, [billingShipingRemitanceCard]);

    useEffect(() => {
        if (billingShipingRechargeCard?.count !== undefined) {
            setTotalItems(billingShipingRechargeCard.count);
        }
    }, [billingShipingRechargeCard]);

    useEffect(() => {
        if (billingShipingInvoiceCard?.count !== undefined) {
            setTotalItems(billingShipingInvoiceCard.count);
        }
    }, [billingShipingInvoiceCard]);

    useEffect(() => {
        if (billingShipingReceiptCard?.count !== undefined) {
            setTotalItems(billingShipingReceiptCard.count);
        }
    }, [billingShipingReceiptCard]);

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    const toggleOptions = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        if (BulkActionShow) {
            setBulkActionShow(false);
            setSelectedRows([]);
        }
    }, [activeTab]);

    const handleMoreFilter = (filterParams) => {
        const { start_date, end_date, utr_number } = filterParams;
        const formatDate = (dateString) => {
            if (!dateString) return null;
            const dateObject = new Date(dateString);
            return dateObject.toISOString().split('T')[0];
        };
    
        const startDate = formatDate(start_date);
        const endDate = formatDate(end_date);
    
        dispatch({
            type: "BILLING_SHIPING_REMITANCE_DATA_ACTION",
            payload: {
                page_size: 20,
                page: 1,
                start_date: startDate,
                end_date: endDate,
                utr_number: utr_number || null,
            },
        });
    
        setMoreFilters(false);
    };
    

    return (
        <>
            <NavTabs activeTab={activeTab} setActiveTab={setActiveTab} MoreFilters={MoreFilters} setMoreFilters={setMoreFilters} />
            <div className='billing-page-container'>
                {/* Shipping Charges */}
                {activeTab === "Shipping Charges" && <ShippingCharges billingCard={billingShipingCard.results}
                    selectedRows={selectedRows}
                    setSelectedRows={setSelectedRows}
                    setBulkActionShow={setBulkActionShow}
                    setSelectedOrderRows={setSelectedOrderRows} 
                    billingShippingCounterCard={billingShippingCounterCard}/>}

                {/* Remittance Logs */}
                {activeTab === "Remittance Logs" && <RemittanceLogs billingCard={remitanceOrderRows}
                    selectedRows={selectedRows}
                    setSelectedRows={setSelectedRows}
                    setBulkActionShow={setBulkActionShow} />}

                {/* Recharge Logs */}
                {activeTab === "Recharge Logs" && <RechargeLogs billingCard={billingShipingRechargeCard.results}
                    selectedRows={selectedRows}
                    setSelectedRows={setSelectedRows}
                    setBulkActionShow={setBulkActionShow} 
                    billingRechargeCounterCard={billingRechargeCounterCard}/>}

                {/* Invoices */}
                {activeTab === "Invoices" && <InvoicesTab billingCard={billingShipingInvoiceCard.results}
                    selectedRows={selectedRows}
                    setSelectedRows={setSelectedRows}
                    setBulkActionShow={setBulkActionShow} />}

                {/* Passbook */}
                {activeTab === "Passbook" && <PassbookTab billingCard={billingCard.results}
                    selectedRows={selectedRows}
                    setSelectedRows={setSelectedRows}
                    setBulkActionShow={setBulkActionShow} 
                    billingPassbookCounterCard={billingPassbookCounterCard}/>}

                {/* Credit Receipt */}
                {activeTab === "Credit Receipt" && <CreditReceipt billingCard={billingShipingReceiptCard.results}
                    selectedRows={selectedRows}
                    setSelectedRows={setSelectedRows}
                    setBulkActionShow={setBulkActionShow} />}

                <Pagination
                    totalItems={totalItems}
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    setItemsPerPage={setItemsPerPage}
                    setCurrentPage={setCurrentPage}
                />
                {BulkActionShow && (
                    <BulkActionsComponent
                        activeTab={activeTab}
                        selectedRows={selectedRows}
                        setSelectedRows={setSelectedRows}
                        selectedOrderRows={selectedOrderRows}
                        setSelectedOrderRows={setSelectedOrderRows}
                    />
                )}
            </div>
            <MoreFiltersPanel
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                MoreFilters={MoreFilters}
                setMoreFilters={setMoreFilters}
                handleMoreFilter={handleMoreFilter}
                selectedRows={selectedRows}
                billingRemitanceExportCard={billingRemitanceExportCard}
            />
            <div onClick={() => setMoreFilters(false)} className={`backdrop ${!MoreFilters && 'd-none'}`}></div>
        </>
    );
};

export default BillingPage;
