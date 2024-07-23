import moment from 'moment';
import './WeightRecoPage.css';
import Select from 'react-select';
import { debounce } from 'lodash';
import { RxReset } from "react-icons/rx";
import { HiOutlineFilter } from "react-icons/hi";
import NavTabs from './Components/navTabs/NavTabs';
import globalDebouncedClick from '../../../debounce';
import { useDispatch, useSelector } from 'react-redux';
import LoaderScreen from '../../LoaderScreen/LoaderScreen';
import Pagination from '../../common/Pagination/Pagination';
import OnHoldReco from './Components/OnHoldReco/OnHoldReco';
import SettledReco from './Components/SettledReco/SettledReco';
import React, { useCallback, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AWBTrackingPage from '../AWBTrackingPage/AWBTrackingPage';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import WeightRecoTab from './Components/WeightRecoTab/WeightRecoTab';
import MoreFiltersPanel from './Components/MoreFiltersPanel/MoreFiltersPanel';
import BulkActionsComponent from './Components/BulkActionsComponent/BulkActionsComponent';

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
    const [isOpen, setIsOpen] = useState(false);
    const [itemsPerPage, setItemsPerPage] = useState(20);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState("");
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
    const [loader, setLoader] = useState(false)
    const recoSectionReducer = useSelector(state => state?.weightRecoReducer);
    const { weightData, holdData, setteledData } = recoSectionReducer;
    const partnerList = JSON.parse(localStorage.getItem('partnerList'));
    const { favListData } = useSelector(state => state?.orderSectionReducer)
    const exportCard = useSelector(state => state?.exportSectionReducer?.exportCard)



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
        setSearchOption(SearchOptions[0])

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
        setLoader(true)
        if (activeTab) {
            setSearchOption(SearchOptions[0])
            setTimeout(() => {
                setLoader(false)
            }, 500);
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
                <div className={`${activeTab === "Weight Reconciliation" ? "d-block" : "d-none"}`}>
                    <WeightRecoTab weightRecoData={weightData?.results}
                        setAwbNo={setAwbNo}
                        partnerList={partnerList}
                        selectedRows={selectedRows}
                        setSelectedRows={setSelectedRows}
                        setOrderTracking={setOrderTracking}
                        setBulkActionShow={setBulkActionShow}
                    />
                </div>
                <div className={`${activeTab === "Settled Reconciliation" ? "d-block" : "d-none"}`}>
                    <SettledReco weightRecoData={setteledData?.results}
                        setAwbNo={setAwbNo}
                        partnerList={partnerList}
                        selectedRows={selectedRows}
                        setSelectedRows={setSelectedRows}
                        setBulkActionShow={setBulkActionShow}
                        setOrderTracking={setOrderTracking}
                    />
                </div>
                <div className={`${activeTab === "On Hold Reconciliation" ? "d-block" : "d-none"}`}>
                    <OnHoldReco weightRecoData={holdData?.results}
                        setAwbNo={setAwbNo}
                        partnerList={partnerList}
                        selectedRows={selectedRows}
                        setSelectedRows={setSelectedRows}
                        setOrderTracking={setOrderTracking}
                        setBulkActionShow={setBulkActionShow}
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
            <LoaderScreen loading={loader} />
        </>
    );
};

export default WeightRecoPage;