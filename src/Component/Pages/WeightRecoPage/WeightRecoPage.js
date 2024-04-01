import React, { useEffect, useState } from 'react';
import NavTabs from './Components/navTabs/NavTabs';
import './WeightRecoPage.css';
import moment from 'moment';
import WeightRecoTab from './Components/WeightRecoTab/WeightRecoTab';
import SettledReco from './Components/SettledReco/SettledReco';
import OnHoldReco from './Components/OnHoldReco/OnHoldReco';
import { useDispatch, useSelector } from 'react-redux';
import SearchIcon from '../../../assets/image/icons/search-icon.png'
import MoreFiltersPanel from './Components/MoreFiltersPanel/MoreFiltersPanel';
import Pagination from '../../common/Pagination/Pagination';

const WeightRecoPage = () => {
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState("Weight Reconciliation");
    const [selectedOption, setSelectedOption] = useState("Domestic");
    const [isOpen, setIsOpen] = useState(false);
    const [itemsPerPage, setItemsPerPage] = useState(20);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState("");
    const [exportButtonClick, setExportButtonClick] = useState(false)
    const [selectedRows, setSelectedRows] = useState([]);
    const [queryParamTemp, setQueryParamTemp] = useState({})
    const [MoreFilters, setMoreFilters] = useState(false);
    const [backDrop, setBackDrop] = useState(false);


    const exportCard = useSelector(state => state?.exportSectionReducer?.exportCard)
    const { orderCancelled, orderdelete, orderClone } = useSelector(state => state?.orderSectionReducer)

    const recoSectionReducer = useSelector(state => state?.weightRecoReducer);
    const { weightData, holdData, setteledData } = recoSectionReducer;
    console.log(setteledData, "Setteled Data")

    const handleSidePanel = () => {
        setMoreFilters(true);
        setBackDrop(true)
    }
    const CloseSidePanel = () => {
        setMoreFilters(false);
        setBackDrop(false)
    }

    const handleMoreFilter = (data) => {
        const queryParams = {};
        Object.keys(data).forEach(key => {
            if (data[key] !== '' && data[key] !== null) {
                if (key === 'start_date' || key === 'end_date') {
                    queryParams[key] = moment(data[key]).format('YYYY-MM-DD');
                } else {
                    queryParams[key] = data[key];
                }
            }
        });
        setQueryParamTemp(queryParams);
    };

    useEffect(() => {
        const fetchData = async () => { 
            switch (activeTab) {
                case "Weight Reconciliation":
                    await dispatch({ type: "WEIGHT_ACTION", payload: { "itemsPerPage": itemsPerPage, "currentPage": currentPage } });
                    if (weightData && Array.isArray(weightData)) {
                        setTotalItems(weightData.length);
                    }
                    break;
                case "Settled Reconciliation":
                    await dispatch({ type: "SETTELED_ACTION", payload: { "itemsPerPage": itemsPerPage, "currentPage": currentPage } });
                    if (setteledData && Array.isArray(setteledData)) {
                        setTotalItems(setteledData.length);
                    }
                    break;
                case "On Hold Reconciliation":
                    await dispatch({ type: "HOLD_ACTION", payload: { "itemsPerPage": itemsPerPage, "currentPage": currentPage } });
                    if (holdData && Array.isArray(holdData)) {
                        setTotalItems(holdData.length);
                    }
                    break;
                default:
                    break;
            }
        };

        fetchData();
    }, [dispatch, activeTab, itemsPerPage, currentPage]);

    const handleExport = () => {
        // setExportButtonClick(true);
        // const requestData = {
        //     "order_tab": {
        //         "type": activeTab,
        //         "subtype": ""
        //     },
        //     "order_id": `${selectedRows.join(',')}`,
        //     "courier": "",
        //     "awb_number": "",
        //     "min_awb_assign_date": "",
        //     "max_awb_assign_date": "",
        //     "status": "",
        //     "order_type": "",
        //     "customer_order_number": "",
        //     "channel": "",
        //     "min_invoice_amount": "",
        //     "max_invoice_amount": "",
        //     "warehouse_id": "",
        //     "product_name": "",
        //     "delivery_address": "",
        //     "min_weight": "",
        //     "max_weight": "",
        //     "min_product_qty": "",
        //     "max_product_qty": "",
        //     "rto_status": false,
        //     "global_type": "",
        //     "payment_type": ""
        // };
        // console.log("All Request data", requestData);
        // dispatch({ type: "EXPORT_DATA_ACTION", payload: requestData });
    };

    // useEffect(() => {
    //     if (exportButtonClick) {
    //         var FileSaver = require('file-saver');
    //         var blob = new Blob([exportCard], { type: 'application/ms-excel' });
    //         FileSaver.saveAs(blob, `${activeTab}.xlsx`);
    //         setExportButtonClick(false);
    //     }
    // }, [exportCard]);

    return (
        <>
            <NavTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            {activeTab != "Manifest" && <div className="box-shadow shadow-sm p7 mb-3 filter-container">
                <div className="search-container">
                    <div className='d-flex'>
                        <label>
                            <input type="text" placeholder="Search for AWB | Order ID | Mobile Number | Email | SKU | Pickup ID" />
                            <button>
                                <img src={SearchIcon} alt="Search" />
                            </button>
                        </label>
                        <button className='btn main-button ms-2'>search</button>
                        <button className='btn main-button ms-2' onClick={handleSidePanel}>More Filters</button>
                    </div>
                    <p className='font10'>Most Popular Search by
                        <span>COD</span> |
                        <span>Prepaid</span> |
                        <span>Yesterday</span> |
                        <span>One Week</span> |
                        <span>Last Month</span> |
                        <span>Delivered</span> |
                        <span>Cancel order</span> </p>
                </div>
                <div className='button-container'>
                    <button className='btn main-button' onClick={handleExport}>Export</button>
                </div>
            </div>}

            {/* Weight Reconciliation */}
            <div className={`${activeTab === "Weight Reconciliation" ? "d-block" : "d-none"}`}>
                <WeightRecoTab weightRecoData={weightData} />
            </div>

            {/* Settled Reco */}
            <div className={`${activeTab === "Settled Reconciliation" ? "d-block" : "d-none"}`}>
                <SettledReco weightRecoData={setteledData} />
            </div>

            {/* On-Hold Reco */}
            <div className={`${activeTab === "On Hold Reconciliation" ? "d-block" : "d-none"}`}>
                <OnHoldReco weightRecoData={holdData} />
            </div>

            <Pagination
                totalItems={totalItems}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                setItemsPerPage={setItemsPerPage}
                setCurrentPage={setCurrentPage}
            />
            <MoreFiltersPanel
                MoreFilters={MoreFilters}
                activeTab={activeTab}
                CloseSidePanel={CloseSidePanel}
                handleMoreFilter={handleMoreFilter}
            />
            <div className={`backdrop ${backDrop ? 'd-block' : 'd-none'}`}></div>
        </>
    );
};

export default WeightRecoPage;