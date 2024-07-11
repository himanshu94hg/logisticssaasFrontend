import './BillingPage.css';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import NavTabs from './Components/navTabs/NavTabs';
import { useDispatch, useSelector } from 'react-redux';
import LoaderScreen from '../../LoaderScreen/LoaderScreen';
import Pagination from '../../common/Pagination/Pagination';
import InvoicesTab from './Components/InvoicesTab/InvoicesTab';
import PassbookTab from './Components/PassbookTab/PassbookTab';
import RechargeLogs from './Components/RechargeLogs/RechargeLogs';
import CreditReceipt from './Components/CreditReceipt/CreditReceipt';
import RemittanceLogs from './Components/RemittanceLogs/RemittanceLogs';
import ShippingCharges from './Components/ShippingCharges/ShippingCharges';
import MoreFiltersPanel from './Components/MoreFiltersPanel/MoreFiltersPanel';
import BulkActionsComponent from './Components/BulkActionsComponent/BulkActionsComponent';

const BillingPage = () => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [loader, setLoader] = useState(false)
    const [totalItems, setTotalItems] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectAll, setSelectAll] = useState(false);
    const [itemsPerPage, setItemsPerPage] = useState(20);
    const [selectedRows, setSelectedRows] = useState([]);
    const [MoreFilters, setMoreFilters] = useState(false);
    const [BulkActionShow, setBulkActionShow] = useState(false);
    const [selectedOrderRows, setSelectedOrderRows] = useState([]);
    const [activeTab, setActiveTab] = useState("Shipping Charges");
    const [selectedOption, setSelectedOption] = useState("Domestic");
    const [remitanceOrderRows, setRemitanceOrderRows] = useState([]);

    const billingSectionReducer = useSelector(state => state?.billingSectionReducer);
    const { billingCard, billingShipingCard, billingShipingRemitanceCard, billingShipingRechargeCard, billingShipingInvoiceCard, billingShipingReceiptCard, billingPassbookCounterCard, billingRechargeCounterCard, billingShippingCounterCard, billingRemitanceExportCard } = billingSectionReducer;

    useEffect(() => {
        setLoader(true)
        if (activeTab) {
            setSelectAll(false)
            setSelectedRows([]);
            setBulkActionShow(false);
            setTimeout(() => {
                setLoader(false)
            }, 500);
        }
    }, [activeTab])

    useEffect(() => {
        switch (activeTab) {
            case "Shipping Charges":
                dispatch({ type: "BILLING_SHIPPING_COUNTER_DATA_ACTION" });
                dispatch({ type: "BILLING_SHIPING_DATA_ACTION", payload: { itemsPerPage, currentPage } });
                break;
            case "Remittance Logs":
                dispatch({ type: "BILLING_SHIPING_REMITANCE_DATA_ACTION", payload: { page_size: itemsPerPage, page: currentPage } });
                break;
            case "Recharge Logs":
                dispatch({ type: "BILLING_RECHARGE_COUNTER_DATA_ACTION" });
                dispatch({ type: "BILLING_SHIPING_RECHARGE_DATA_ACTION", payload: { itemsPerPage, currentPage } });
                break;
            case "Invoices":
                dispatch({ type: "BILLING_SHIPING_INVOICE_DATA_ACTION", payload: { itemsPerPage, currentPage } });
                break;
            case "Passbook":
                dispatch({ type: "BILLING_PASSBOOK_COUNTER_DATA_ACTION" });
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


    const handleMoreFilter = (filterParams) => {
        const queryParams = {};
        Object.keys(filterParams).forEach(key => {
            if (filterParams[key] !== '' && filterParams[key] !== null) {
                if (key === 'start_date' || key === 'end_date') {
                    queryParams[key] = moment(filterParams[key]).format('YYYY-MM-DD');
                } else {
                    queryParams[key] = filterParams[key];
                }
            }
        });
        dispatch({
            type: "BILLING_SHIPING_REMITANCE_DATA_ACTION",
            payload: queryParams,
        });
        setMoreFilters(false);
    };

    return (
        <>
            <NavTabs activeTab={activeTab} setActiveTab={setActiveTab} MoreFilters={MoreFilters} setMoreFilters={setMoreFilters} />
            <div className='billing-page-container'>
                {/* Shipping Charges */}
                {activeTab === "Shipping Charges" && <ShippingCharges billingCard={billingShipingCard.results}
                    selectAll={selectAll}
                    setSelectAll={setSelectAll}
                    selectedRows={selectedRows}
                    setSelectedRows={setSelectedRows}
                    setBulkActionShow={setBulkActionShow}
                    setSelectedOrderRows={setSelectedOrderRows}
                    billingShippingCounterCard={billingShippingCounterCard} />}

                {/* Remittance Logs */}
                {activeTab === "Remittance Logs" && <RemittanceLogs billingCard={remitanceOrderRows}
                    selectAll={selectAll}
                    setSelectAll={setSelectAll}
                    selectedRows={selectedRows}
                    setSelectedRows={setSelectedRows}
                    setBulkActionShow={setBulkActionShow} />}

                {/* Recharge Logs */}
                {activeTab === "Recharge Logs" && <RechargeLogs billingCard={billingShipingRechargeCard.results}
                    selectAll={selectAll}
                    setSelectAll={setSelectAll}
                    selectedRows={selectedRows}
                    setSelectedRows={setSelectedRows}
                    setBulkActionShow={setBulkActionShow}
                    billingRechargeCounterCard={billingRechargeCounterCard} />}

                {/* Invoices */}
                {activeTab === "Invoices" && <InvoicesTab billingCard={billingShipingInvoiceCard.results}
                    selectAll={selectAll}
                    setSelectAll={setSelectAll}
                    selectedRows={selectedRows}
                    setSelectedRows={setSelectedRows}
                    setBulkActionShow={setBulkActionShow} />}

                {/* Passbook */}
                {activeTab === "Passbook" && <PassbookTab billingCard={billingCard.results}
                    selectAll={selectAll}
                    setSelectAll={setSelectAll}
                    selectedRows={selectedRows}
                    setSelectedRows={setSelectedRows}
                    setBulkActionShow={setBulkActionShow}
                    billingPassbookCounterCard={billingPassbookCounterCard} />}

                {/* Credit Receipt */}
                {activeTab === "Credit Receipt" && <CreditReceipt billingCard={billingShipingReceiptCard.results}
                    selectAll={selectAll}
                    setSelectAll={setSelectAll}
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
                        setSelectAll={setSelectAll}
                        selectedRows={selectedRows}
                        setSelectedRows={setSelectedRows}
                        setBulkActionShow={setBulkActionShow}
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
            <LoaderScreen loading={loader} />
        </>
    );
};

export default BillingPage;
