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
    const [BulkActionShow, setBulkActionShow] = useState(false)
    const [selectedRows, setSelectedRows] = useState([]);
    const [selectedOrderRows, setSelectedOrderRows] = useState([]);
    const [MoreFilters, setMoreFilters] = useState(false);


    const billingSectionReducer = useSelector(state => state?.billingSectionReducer);
    const { billingCard, billingShipingCard, billingShipingRemitanceCard, billingShipingRechargeCard, billingShipingInvoiceCard, billingShipingReceiptCard } = billingSectionReducer;

    console.log("All Item Logs", billingShipingCard.count)

    useEffect(() => {
        switch (activeTab) {
            case "Shipping Charges":
                dispatch({ type: "BILLING_SHIPING_DATA_ACTION", payload: { "itemsPerPage": itemsPerPage, "currentPage": currentPage } });
                break;
            case "Remittance Logs":
                dispatch({ type: "BILLING_SHIPING_REMITANCE_DATA_ACTION", payload: { "itemsPerPage": itemsPerPage, "currentPage": currentPage } });
                break;
            case "Recharge Logs":
                dispatch({ type: "BILLING_SHIPING_RECHARGE_DATA_ACTION", payload: { "itemsPerPage": itemsPerPage, "currentPage": currentPage } });
                break;
            case "Invoices":
                dispatch({ type: "BILLING_SHIPING_INVOICE_DATA_ACTION", payload: { "itemsPerPage": itemsPerPage, "currentPage": currentPage } });
                break;
            case "Passbook":
                dispatch({ type: "BILLING_DATA_ACTION", payload: { "itemsPerPage": itemsPerPage, "currentPage": currentPage } });
                break;
            case "Credit Receipt":
                dispatch({ type: "BILLING_SHIPING_RECEIPT_DATA_ACTION", payload: { "itemsPerPage": itemsPerPage, "currentPage": currentPage } });
                break;
            default:
                break;
        }
    }, [activeTab, dispatch, itemsPerPage, currentPage]);

    useEffect(() => {
        if (billingShipingCard && billingShipingCard?.count !== undefined) {
            setTotalItems(billingShipingCard?.count);
        }
    }, [billingShipingCard]);

    useEffect(() => {
        if (billingCard && billingCard?.count !== undefined) {
            setTotalItems(billingCard?.count);
        }
    }, [billingCard]);

    useEffect(() => {
        if (billingShipingRemitanceCard && billingShipingRemitanceCard?.count !== undefined) {
            setTotalItems(billingShipingRemitanceCard?.count);
        }
    }, [billingShipingRemitanceCard]);

    useEffect(() => {
        if (billingShipingRemitanceCard && billingShipingRemitanceCard?.count !== undefined) {
            setTotalItems(billingShipingRemitanceCard?.count);
        }
    }, [billingShipingRemitanceCard]);

    useEffect(() => {
        if (billingShipingRechargeCard && billingShipingRechargeCard?.count !== undefined) {
            setTotalItems(billingShipingRechargeCard?.count);
        }
    }, [billingShipingRechargeCard]);

    useEffect(() => {
        if (billingShipingInvoiceCard && billingShipingInvoiceCard?.count !== undefined) {
            setTotalItems(billingShipingInvoiceCard?.count);
        }
    }, [billingShipingInvoiceCard]);

    useEffect(() => {
        if (billingShipingReceiptCard && billingShipingReceiptCard?.count !== undefined) {
            setTotalItems(billingShipingReceiptCard?.count);
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
            setBulkActionShow(false)
            setSelectedRows([])
        }
    }, [activeTab]);

    return (
        <>
            <NavTabs activeTab={activeTab} setActiveTab={setActiveTab} MoreFilters={MoreFilters} setMoreFilters={setMoreFilters} />
            <div className='billing-page-container'>
                {/* Shipping Charges */}
                {activeTab === "Shipping Charges" && <ShippingCharges billingCard={billingShipingCard.results}
                    selectedRows={selectedRows}
                    setSelectedRows={setSelectedRows}
                    setBulkActionShow={setBulkActionShow}
                    setSelectedOrderRows={setSelectedOrderRows} />}

                {/* Remittance Logs */}
                {activeTab === "Remittance Logs" && <RemittanceLogs billingCard={billingShipingRemitanceCard.results}
                    selectedRows={selectedRows}
                    setSelectedRows={setSelectedRows}
                    setBulkActionShow={setBulkActionShow} />}

                {/* RechargeLogs */}
                {activeTab === "Recharge Logs" && <RechargeLogs billingCard={billingShipingRechargeCard.results}
                    selectedRows={selectedRows}
                    setSelectedRows={setSelectedRows}
                    setBulkActionShow={setBulkActionShow} />}

                {/* Invoices */}
                {activeTab === "Invoices" && <InvoicesTab billingCard={billingShipingInvoiceCard.results}
                    selectedRows={selectedRows}
                    setSelectedRows={setSelectedRows}
                    setBulkActionShow={setBulkActionShow} />}

                {/* Passbook */}
                {activeTab === "Passbook" && <PassbookTab billingCard={billingCard.results}
                    selectedRows={selectedRows}
                    setSelectedRows={setSelectedRows}
                    setBulkActionShow={setBulkActionShow} />}

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
                )
                }
            </div>
            <MoreFiltersPanel
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                MoreFilters={MoreFilters}
                setMoreFilters={setMoreFilters}
                selectedRows={selectedRows}
            />
            <div onClick={() => setMoreFilters(false)} className={`backdrop ${!MoreFilters && 'd-none'}`}></div>
        </>
    );
}

export default BillingPage;
