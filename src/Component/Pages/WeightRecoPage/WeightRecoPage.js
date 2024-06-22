import React, { useCallback, useEffect, useState } from 'react';
import NavTabs from './Components/navTabs/NavTabs';
import './WeightRecoPage.css';
import moment from 'moment';
import WeightRecoTab from './Components/WeightRecoTab/WeightRecoTab';
import SettledReco from './Components/SettledReco/SettledReco';
import OnHoldReco from './Components/OnHoldReco/OnHoldReco';
import { useDispatch, useSelector } from 'react-redux';
import MoreFiltersPanel from './Components/MoreFiltersPanel/MoreFiltersPanel';
import Pagination from '../../common/Pagination/Pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';
import { HiOutlineFilter } from "react-icons/hi";
import { RxReset } from "react-icons/rx";
import BulkActionsComponent from './Components/BulkActionsComponent/BulkActionsComponent';
import globalDebouncedClick from '../../../debounce';
import AWBTrackingPage from '../AWBTrackingPage/AWBTrackingPage';
import { debounce } from 'lodash';

const SearchOptions = [
    { value: 'awb', label: 'AWB' },
    { value: 'order_id', label: 'Order ID' },
    { value: 'mobile', label: 'Mobile' },
    { value: 'email', label: 'Email' },
    { value: 'name', label: 'Name' },
    { value: 'sku', label: 'SKU' },
    { value: 'picup_address', label: 'Pickup Address' },
];

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
    const [SearchOption, setSearchOption] = useState(SearchOptions[0]);
    const [searchValue, setSearchValue] = useState("")
    const [BulkActionShow, setBulkActionShow] = useState(false)
    const [handleResetFrom, setHandleResetFrom] = useState(false);
    const [queryName, setQueryName] = useState([])
    const [orderTracking, setOrderTracking] = useState(false)
    const [awbNo, setAwbNo] = useState(null)

    const orderStatus = {
        "pending": "Pending",
        "shipped": "Shipped",
        "pickup_requested": "Pickup Requested",
        "pickup_scheduled": "Pickup Scheduled",
        "picked_up": "Picked Up",
        "cancelled": "Cancelled",
        "manifested": "Manifested",
        "in_transit": "In Transit",
        "out_for_delivery": "Out for Delivery",
        "rto_initiated": "RTO Initiated",
        "rto_delivered": "RTO Delivered",
        "rto_in_transit": "RTO Transit",
        "delivered": "Delivered",
        "ndr": "NDR",
        "lost": "Lost",
        "damaged": "Damaged",
        "hold": "Hold"
    };

    const exportCard = useSelector(state => state?.exportSectionReducer?.exportCard)
    const { favListData } = useSelector(state => state?.orderSectionReducer)

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

    const handleSearch = () => {
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
        const fetchData = () => {
            switch (activeTab) {
                case "Weight Reconciliation":
                    dispatch({ type: "WEIGHT_ACTION", payload: { "itemsPerPage": itemsPerPage, "currentPage": currentPage } });
                    break;
                case "Settled Reconciliation":
                    dispatch({ type: "SETTELED_ACTION", payload: { "itemsPerPage": itemsPerPage, "currentPage": currentPage } });
                    break;
                case "On Hold Reconciliation":
                    dispatch({ type: "HOLD_ACTION", payload: { "itemsPerPage": itemsPerPage, "currentPage": currentPage } });
                    break;
                default:
                    break;
            }
        };
        fetchData();
    }, [dispatch, activeTab, itemsPerPage, currentPage]);

    useEffect(() => {
        if (weightData && weightData?.count !== undefined) {
            setTotalItems(weightData?.count);
        }
    }, [weightData]);

    useEffect(() => {
        if (holdData && holdData?.count !== undefined) {
            setTotalItems(holdData?.count);
        }
    }, [holdData]);

    useEffect(() => {
        if (setteledData && setteledData?.count !== undefined) {
            setTotalItems(setteledData?.count);
        }
    }, [setteledData]);

    const handleChange = (SearchOption) => {
        setSearchOption(SearchOption);
    };

    useEffect(() => {
        if (BulkActionShow) {
            setBulkActionShow(false)
            setSelectedRows([])

        }
    }, [activeTab])

    const handleClick = () => {
        setSearchValue("")
        setHandleResetFrom(true)
        if (activeTab === "Weight Reconciliation") {
            dispatch({ type: "WEIGHT_ACTION", payload: { "itemsPerPage": itemsPerPage, "currentPage": currentPage } });
        } else if (activeTab === "Settled Reconciliation") {
            dispatch({ type: "SETTELED_ACTION", payload: { "itemsPerPage": itemsPerPage, "currentPage": currentPage } });
        } else if (activeTab === "On Hold Reconciliation") {
            dispatch({ type: "HOLD_ACTION", payload: { "itemsPerPage": itemsPerPage, "currentPage": currentPage } });
        }
    }

    const debouncedHandleClick = useCallback(
        debounce((param) => handleClick(param), 1000),
        []
      );
      const handleReset = () => {
        debouncedHandleClick();
    }

    const handleQueryfilter = (value) => {
        // setSearchValue("")
        // setHandleResetFrom(true)
        setQueryParamTemp({})
    }

    useEffect(() => {
        if (favListData) {
            let temp = [];
            favListData.map((item) => {
                temp.push(item)
            })
            setQueryName(temp)
        }
    }, [favListData])

    useEffect(() => {
        if (activeTab) {
            setSearchOption(SearchOptions[0])
        }
    }, [activeTab])

    return (
        <>
            <NavTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            {activeTab != "Manifest" && <div className="box-shadow shadow-sm p7 filter-container">
                <div className="search-container ot-filters">
                    <div className='d-flex'>
                        <label>
                            <Select
                                value={SearchOption}
                                onChange={handleChange}
                                options={SearchOptions}
                            />
                            <input className='input-field' type="search" value={searchValue} placeholder="Search for AWB | Order ID | Mobile Number | Email | SKU" onChange={(e) => setSearchValue(e.target.value)} />
                            <button onClick={() => globalDebouncedClick(() => handleSearch())}>
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </button>
                        </label>
                        <div className="btn-group">
                            <button
                                onClick={handleSidePanel}
                                type="button"
                                className="btn main-button-outline ms-2"
                            >
                                <HiOutlineFilter className='align-text-bottom' /> More Filters
                            </button>
                            <button type="button" className="btn main-button dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                                <span className="visually-hidden">Toggle Dropdown</span>
                            </button>
                            <ul
                                className="dropdown-menu"
                                style={{
                                    paddingInline: '12px',
                                    minWidth: '190px'
                                }}
                            >
                                {queryName?.map((item) => <li onClick={() => handleQueryfilter(item?.filter_query)}>{item?.filter_name}</li>)}
                            </ul>
                        </div>
                        <button className='btn main-button-outline ms-2' onClick={() => handleReset()}><RxReset className='align-text-bottom' /> Reset</button>
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
            </div>}
            <div className='wt-page-container'>
                {/* Weight Reconciliation */}
                <div className={`${activeTab === "Weight Reconciliation" ? "d-block" : "d-none"}`}>
                    <WeightRecoTab weightRecoData={weightData?.results}
                        selectedRows={selectedRows}
                        setSelectedRows={setSelectedRows}
                        setBulkActionShow={setBulkActionShow}
                        setAwbNo={setAwbNo}
                        setOrderTracking={setOrderTracking}
                        orderStatus={orderStatus}
                    />
                </div>

                {/* Settled Reco */}
                <div className={`${activeTab === "Settled Reconciliation" ? "d-block" : "d-none"}`}>
                    <SettledReco weightRecoData={setteledData?.results}
                        selectedRows={selectedRows}
                        setSelectedRows={setSelectedRows}
                        setBulkActionShow={setBulkActionShow}
                        setAwbNo={setAwbNo}
                        setOrderTracking={setOrderTracking}
                        orderStatus={orderStatus}
                    />
                </div>

                {/* On-Hold Reco */}
                <div className={`${activeTab === "On Hold Reconciliation" ? "d-block" : "d-none"}`}>
                    <OnHoldReco weightRecoData={holdData?.results}
                        selectedRows={selectedRows}
                        setSelectedRows={setSelectedRows}
                        setBulkActionShow={setBulkActionShow}
                        setAwbNo={setAwbNo}
                        setOrderTracking={setOrderTracking}
                        orderStatus={orderStatus}
                    />
                </div>

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
                    />
                )
                }
            </div>
            <MoreFiltersPanel
                MoreFilters={MoreFilters}
                activeTab={activeTab}
                CloseSidePanel={CloseSidePanel}
                handleMoreFilter={handleMoreFilter}
                handleResetFrom={handleResetFrom}
                setHandleResetFrom={setHandleResetFrom}
            />
            <div onClick={CloseSidePanel} className={`backdrop ${backDrop ? 'd-flex' : 'd-none'}`}></div>

            <section className={`awb-tracking-slider ${orderTracking && 'open'}`}>
                <AWBTrackingPage setOrderTracking={setOrderTracking} orderTracking={orderTracking} awbNo={awbNo} />
            </section>
            <div onClick={() => setOrderTracking(false)} className={`backdrop ${!orderTracking && 'd-none'}`}></div>
        </>
    );
};

export default WeightRecoPage;