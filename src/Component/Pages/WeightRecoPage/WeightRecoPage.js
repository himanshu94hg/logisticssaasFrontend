import axios from 'axios';
import moment from 'moment';
import './WeightRecoPage.css';
import Select from 'react-select';
import Cookies from 'js-cookie';
import { RxReset } from "react-icons/rx";
import { HiOutlineFilter } from "react-icons/hi";
import NavTabs from './Components/navTabs/NavTabs';
import React, { useEffect, useState } from 'react';
import globalDebouncedClick from '../../../debounce';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL_ORDER } from '../../../axios/config';
import LoaderScreen from '../../LoaderScreen/LoaderScreen';
import Pagination from '../../common/Pagination/Pagination';
import OnHoldReco from './Components/OnHoldReco/OnHoldReco';
import SettledReco from './Components/SettledReco/SettledReco';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AWBTrackingPage from '../AWBTrackingPage/AWBTrackingPage';
import ThreeDots from '../../../assets/image/icons/ThreeDots.png';
import CustomTooltip from '../../common/CustomTooltip/CustomTooltip';
import WeightRecoTab from './Components/WeightRecoTab/WeightRecoTab';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { customErrorFunction } from '../../../customFunction/errorHandling';
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
    const [awbNo, setAwbNo] = useState(null)
    const [reset, setReset] = useState(null)
    let authToken = Cookies.get("access_token")
    const [loader, setLoader] = useState(false)
    const [queryName, setQueryName] = useState([])
    const [backDrop, setBackDrop] = useState(false);
    const [totalItems, setTotalItems] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState("")
    const [counterData, setCounterData] = useState(null)
    const [itemsPerPage, setItemsPerPage] = useState(20);
    const [selectedRows, setSelectedRows] = useState([]);
    const [MoreFilters, setMoreFilters] = useState(false);
    const [queryParamTemp, setQueryParamTemp] = useState({})
    const [orderTracking, setOrderTracking] = useState(false)
    const [BulkActionShow, setBulkActionShow] = useState(false)
    const [handleResetFrom, setHandleResetFrom] = useState(false);
    const [searchType, setsearchType] = useState(SearchOptions[0].value);
    const [SearchOption, setSearchOption] = useState(SearchOptions[0]);
    const [activeTab, setActiveTab] = useState("Weight Reconciliation");
    const partnerList = JSON.parse(localStorage.getItem('partnerList'));
    const { favListData } = useSelector(state => state?.orderSectionReducer)
    const { screenWidthData } = useSelector(state => state?.authDataReducer)
    const [mostPopular, setMostPopular] = useState({ most_popular_search: "" })
    const { weightData, holdData, setteledData } = useSelector(state => state?.weightRecoReducer);

    const handleSidePanel = () => {
        setMoreFilters(true);
        setBackDrop(true)
    }
    const CloseSidePanel = () => {
        setMoreFilters(false);
        setBackDrop(false)
    }

    const handleSearch = () => {
        setReset(new Date())
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

    const handleReset = () => {
        setLoader(true)
        setSearchValue('')
        setReset(new Date())
        setQueryParamTemp({})
        setHandleResetFrom(true)
        setSearchOption(SearchOptions[0])
    }

    const handleChange = (val) => {
        setSearchOption(val);
        setsearchType(val.value)
    };

    const handleQueryfilter = (value) => {
        setQueryParamTemp({})
    }

    const handleSearchKey = (e) => {
        if (e.key === "Enter") {
            handleSearch()
        }
        const allowedCharacters = /^[a-zA-Z0-9\s!@#$%^&*(),-.?":{}|<>]*$/;
        if (
            e.key === ' ' &&
            e.target.value.endsWith(' ')
        ) {
            e.preventDefault();
        } else if (!allowedCharacters.test(e.key)) {
            e.preventDefault();
        }
    }

    useEffect(() => {
        const temp_data = {
            page: currentPage,
            q: searchValue,
            page_size: itemsPerPage,
            search_by:searchType
        }
        const additional_data = queryParamTemp
        const merged_data = { ...temp_data, ...additional_data };
        const fetchData = () => {
            switch (activeTab) {
                case "Weight Reconciliation":
                    dispatch({ type: "WEIGHT_ACTION", payload: merged_data });
                    break;
                case "Settled Reconciliation":
                    dispatch({ type: "SETTELED_ACTION", payload: merged_data });
                    break;
                case "On-Hold Reconciliation":
                    dispatch({ type: "HOLD_ACTION", payload: merged_data });
                    break;
                default:
                    break;
            }
        };
        fetchData();
    }, [activeTab, itemsPerPage, currentPage, queryParamTemp, reset]);

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

    useEffect(() => {
        if (weightData || holdData || setteledData) {
            setLoader(false)
        }
    }, [weightData, holdData, setteledData])

    useEffect(() => {
        if (BulkActionShow) {
            setBulkActionShow(false)
            setSelectedRows([])
        }
    }, [activeTab])

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BASE_URL_ORDER}/orders-api/orders/get-weight-counter/`, {
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

    const searchOptions = [
        { key: 'dispute_accepted', label: 'Dispute Accepted', tooltip: 'This will show all the orders where the dispute is accepted' },
        { key: 'dispute_raised', label: 'Dispute Raised', tooltip: 'This will show all the orders where a dispute has been raised' },
        { key: 'COD', label: 'COD', tooltip: 'This will show all the cash on delivery orders' },
        { key: 'prepaid', label: 'Prepaid', tooltip: 'This will show all the prepaid orders' }
    ];

    return (
        <>
            <NavTabs activeTab={activeTab} setActiveTab={setActiveTab} counterData={counterData} setCurrentPage={setCurrentPage} />
            {activeTab != "Manifest" && <div className="box-shadow shadow-sm p7 filter-container">
                <div className="search-container ot-filters">
                    <div className='d-flex'>
                        <label>
                            <Select
                                value={SearchOption}
                                onChange={handleChange}
                                options={SearchOptions}
                            />
                            <input
                                type="search"
                                value={searchValue}
                                className='input-field'
                                onChange={(e) => setSearchValue(e.target.value)}
                                placeholder="Search for AWB | Order ID | Mobile Number | Email | SKU"
                                onKeyPress={handleSearchKey}
                            />
                            <button onClick={() => globalDebouncedClick(() => handleSearch())}>
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </button>
                        </label>
                        {
                            screenWidthData > 591 &&
                            <>
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
                                        {
                                            queryName.length > 0 ?
                                                queryName?.map((item) => <li onClick={() => handleQueryfilter(item?.filter_query)}>{item?.filter_name || 'No Saved Filters'}</li>)
                                                : <li>No Saved Filters</li>
                                        }
                                    </ul>
                                </div>
                                <button className='btn main-button-outline ms-2' onClick={() => handleReset()}><RxReset className='align-text-bottom' /> Reset</button>
                            </>

                        }
                    </div>
                    <p className='popular-search'>
                        Looking for:
                        {searchOptions
                            .map(({ key, label, tooltip }) => (
                                <CustomTooltip
                                    key={key}
                                    triggerComponent={
                                        <span
                                            className={mostPopular.most_popular_search === key ? 'active' : ''}
                                            onClick={() => { setMostPopular({ most_popular_search: key }); setReset(new Date()) }}
                                        >
                                            {label}
                                        </span>
                                    }
                                    tooltipComponent={tooltip}
                                    addClassName='popular-search-tooltip'
                                />
                            ))
                        }
                    </p>
                </div>
                {screenWidthData < 592 &&
                    <div className="nav-actions-container">
                        <div className="nav-action-dots">
                            <img src={ThreeDots} alt="ThreeDots" width={24} />
                        </div>
                        <div className="nav-actions-list">
                            <ul>
                                <li onClick={handleSidePanel}><HiOutlineFilter className='align-text-bottom' /> More Filters</li>
                                <li onClick={() => handleReset()}><RxReset className='align-text-bottom' /> Reset</li>
                            </ul>
                        </div>
                    </div>
                }
            </div>}
            <div className='wt-page-container'>
                <div className={`${activeTab === "Weight Reconciliation" ? "d-block" : "d-none"}`}>
                    <WeightRecoTab
                        weightRecoData={weightData?.results}
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
                <div className={`${activeTab === "On-Hold Reconciliation" ? "d-block" : "d-none"}`}>
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
                <AWBTrackingPage setOrderTracking={setOrderTracking} orderTracking={orderTracking} awbNo={awbNo} setAwbNo={setAwbNo} />
            </section>
            <div onClick={() => setOrderTracking(false)} className={`backdrop ${!orderTracking && 'd-none'}`}></div>
            <LoaderScreen loading={loader} />
        </>
    );
};

export default WeightRecoPage;