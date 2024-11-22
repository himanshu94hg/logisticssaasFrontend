import axios from 'axios';
import './BillingPage.css';
import moment from 'moment';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import NavTabs from './Components/navTabs/NavTabs';
import { BASE_URL_CORE } from '../../../axios/config';
import { useDispatch, useSelector } from 'react-redux';
import LoaderScreen from '../../LoaderScreen/LoaderScreen';
import Pagination from '../../common/Pagination/Pagination';
import InvoicesTab from './Components/InvoicesTab/InvoicesTab';
import PassbookTab from './Components/PassbookTab/PassbookTab';
import AWBTrackingPage from '../AWBTrackingPage/AWBTrackingPage';
import RechargeLogs from './Components/RechargeLogs/RechargeLogs';
import CreditReceipt from './Components/CreditReceipt/CreditReceipt';
import RemittanceLogs from './Components/RemittanceLogs/RemittanceLogs';
import ShippingCharges from './Components/ShippingCharges/ShippingCharges';
import { customErrorFunction } from '../../../customFunction/errorHandling';
import MoreFiltersPanel from './Components/MoreFiltersPanel/MoreFiltersPanel';
import BulkActionsComponent from './Components/BulkActionsComponent/BulkActionsComponent';

const BillingPage = () => {
    const dispatch = useDispatch();
    const [awbNo, setAwbNo] = useState(null)
    const [reset, setReset] = useState(null)
    let authToken = Cookies.get("access_token")
    const [loader, setLoader] = useState(false)
    const [totalItems, setTotalItems] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectAll, setSelectAll] = useState(false);
    const [counterData, setCounterData] = useState(null)
    const [itemsPerPage, setItemsPerPage] = useState(20);
    const [selectedRows, setSelectedRows] = useState([]);
    const [MoreFilters, setMoreFilters] = useState(false);
    const [orderTracking, setOrderTracking] = useState(false)
    const [BulkActionShow, setBulkActionShow] = useState(false);
    const [selectedOrderRows, setSelectedOrderRows] = useState([]);
    const [activeTab, setActiveTab] = useState("Shipping Charges");
    const [remitanceOrderRows, setRemitanceOrderRows] = useState([]);
    const partnerList = JSON.parse(localStorage.getItem('partnerList'));
    const { loaderState } = useSelector(state => state?.errorLoaderReducer);
    const billingSectionReducer = useSelector(state => state?.billingSectionReducer);
    const { billingCard, billingShipingCard, billingShipingRemitanceCard, billingShipingRechargeCard, billingShipingInvoiceCard, billingShipingReceiptCard, billingPassbookCounterCard, billingRechargeCounterCard, billingShippingCounterCard, billingRemitanceExportCard } = billingSectionReducer;

    useEffect(() => {
        if (activeTab) {
            setSelectAll(false)
            setSelectedRows([]);
            setBulkActionShow(false);
        }
    }, [activeTab])


    useEffect(() => {
        if (billingCard || billingShipingReceiptCard || billingShipingCard || billingShipingRemitanceCard || billingShipingRechargeCard || billingShipingInvoiceCard || loaderState) {
            setLoader(false)
        }
    }, [billingCard, billingShipingReceiptCard, billingShipingCard, billingShipingRemitanceCard, billingShipingRechargeCard, billingShipingInvoiceCard, loaderState])

    useEffect(() => {
        setLoader(true)
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
                dispatch({ type: "BILLING_DATA_ACTION", payload: { page_size: itemsPerPage, page: currentPage } });
                break;
            case "Credit Receipt":
                dispatch({ type: "BILLING_SHIPING_RECEIPT_DATA_ACTION", payload: { itemsPerPage, currentPage } });
                break;
            default:
                break;
        }
    }, [activeTab, reset, currentPage]);

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
        // page:1,
        // page_size:20
        queryParams.page=currentPage;
        queryParams.page_size=itemsPerPage

        if (activeTab === "Remittance Logs") {
            dispatch({ type: "BILLING_SHIPING_REMITANCE_DATA_ACTION", payload: queryParams, });
        } else {
            dispatch({ type: "BILLING_DATA_ACTION", payload: queryParams });
        }
        setMoreFilters(false);
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BASE_URL_CORE}/core-api/features/get-billing-counter/`, {
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                });
                if (response?.status === 200) {
                    setCounterData(response.data);
                }
            } catch (error) {
                customErrorFunction(error)
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <NavTabs activeTab={activeTab} setActiveTab={setActiveTab} setCurrentPage={setCurrentPage}setItemsPerPage={setItemsPerPage} MoreFilters={MoreFilters} setMoreFilters={setMoreFilters} counterData={counterData} />
            <div className='billing-page-container'>
                {activeTab === "Shipping Charges" && <ShippingCharges billingCard={billingShipingCard.results}
                    setAwbNo={setAwbNo}
                    selectAll={selectAll}
                    partnerList={partnerList}
                    setSelectAll={setSelectAll}
                    selectedRows={selectedRows}
                    setSelectedRows={setSelectedRows}
                    setOrderTracking={setOrderTracking}
                    setBulkActionShow={setBulkActionShow}
                    selectedOrderRows={selectedOrderRows}
                    setSelectedOrderRows={setSelectedOrderRows}
                    billingShippingCounterCard={billingShippingCounterCard} />}

                {activeTab === "Remittance Logs" && <RemittanceLogs billingCard={remitanceOrderRows}
                    selectAll={selectAll}
                    setSelectAll={setSelectAll}
                    selectedRows={selectedRows}
                    setSelectedRows={setSelectedRows}
                    setBulkActionShow={setBulkActionShow} />}

                {activeTab === "Recharge Logs" && <RechargeLogs billingCard={billingShipingRechargeCard.results}
                    selectAll={selectAll}
                    setSelectAll={setSelectAll}
                    selectedRows={selectedRows}
                    setSelectedRows={setSelectedRows}
                    setBulkActionShow={setBulkActionShow}
                    billingRechargeCounterCard={billingRechargeCounterCard} />}

                {activeTab === "Invoices" && <InvoicesTab billingCard={billingShipingInvoiceCard.results}
                    selectAll={selectAll}
                    setSelectAll={setSelectAll}
                    selectedRows={selectedRows}
                    setSelectedRows={setSelectedRows}
                    setBulkActionShow={setBulkActionShow} />}

                {activeTab === "Passbook" && <PassbookTab billingCard={billingCard.results}
                    setAwbNo={setAwbNo}
                    selectAll={selectAll}
                    partnerList={partnerList}
                    setSelectAll={setSelectAll}
                    selectedRows={selectedRows}
                    setSelectedRows={setSelectedRows}
                    setOrderTracking={setOrderTracking}
                    setBulkActionShow={setBulkActionShow}
                    billingPassbookCounterCard={billingPassbookCounterCard} />}

                {activeTab === "Credit Receipt" && <CreditReceipt billingCard={billingShipingReceiptCard.results}
                    selectAll={selectAll}
                    setSelectAll={setSelectAll}
                    selectedRows={selectedRows}
                    setSelectedRows={setSelectedRows}
                    setBulkActionShow={setBulkActionShow} />}

                <Pagination
                    setReset={setReset}
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
            <section className={`awb-tracking-slider ${orderTracking && 'open'}`}>
                <AWBTrackingPage setOrderTracking={setOrderTracking} orderTracking={orderTracking} awbNo={awbNo} partnerList={partnerList} />
            </section>
            <div onClick={() => setOrderTracking(false)} className={`backdrop ${!orderTracking && 'd-none'}`}></div>
            <div onClick={() => setMoreFilters(false)} className={`backdrop ${!MoreFilters && 'd-none'}`}></div>
            <LoaderScreen loading={loader} />
        </>
    );
};

export default BillingPage;
