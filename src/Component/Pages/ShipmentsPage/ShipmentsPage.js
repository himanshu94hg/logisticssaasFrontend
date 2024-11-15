import axios from 'axios';
import moment from 'moment';
import Cookies from 'js-cookie';
import Select from 'react-select';
import { RxReset } from "react-icons/rx";
import { HiOutlineFilter } from "react-icons/hi";
import NavTabs from './Components/navTabs/NavTabs';
import globalDebouncedClick from '../../../debounce';
import { BASE_URL_ORDER } from '../../../axios/config';
import { useDispatch, useSelector } from 'react-redux';
import LoaderScreen from '../../LoaderScreen/LoaderScreen';
import Pagination from '../../common/Pagination/Pagination';
import RTOShipment from './Components/RTOShipment/RTOShipment';
import React, { useCallback, useEffect, useState } from 'react';
import AWBTrackingPage from '../AWBTrackingPage/AWBTrackingPage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ThreeDots from '../../../assets/image/icons/ThreeDots.png';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import ActionRequired from './Components/ActionRequired/ActionRequired';
import ActionRequested from './Components/ActionRequested/ActionRequested';
import { customErrorFunction } from '../../../customFunction/errorHandling';
import MoreFiltersPanel from './Components/MoreFiltersPanel/MoreFiltersPanel';
import DeliveredShipment from './Components/DeliveredShipment/DeliveredShipment';
import BulkActionsComponent from './Components/BulkActionsComponent/BulkActionsComponent';
import CustomTooltip from '../../common/CustomTooltip/CustomTooltip';

const SearchOptions = [
    { value: 'awb_number', label: 'AWB' },
    { value: 'customer_order_number', label: 'Order ID' },
    { value: 'shipping_detail__mobile_number', label: 'Mobile' },
    { value: 'shipping_detail__email', label: 'Email' },
    { value: 'shipping_detail__recipient_name', label: 'Name' },
    { value: 'shipping_detail__pincode', label: 'Pincode' },
    { value: 'shipping_detail__city', label: 'City' },
];


const ShipmentsPage = () => {
    const dispatch = useDispatch()
    const apiEndpoint = `${BASE_URL_ORDER}`;
    const [errors, setErrors] = useState({});
    const [awbNo, setAwbNo] = useState(null)
    const [reset, setReset] = useState(null)
    let authToken = Cookies.get("access_token")
    const [loader, setLoader] = useState(false)
    const [queryName, setQueryName] = useState([])
    const [backDrop, setBackDrop] = useState(false);
    const [shipmentCard, setShipment] = useState([])
    const [totalItems, setTotalItems] = useState("");
    const [selectAll, setSelectAll] = useState(false);
    const [filterData, setFilterData] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageStatus, pageStatusSet] = useState(true)
    const [searchValue, setSearchValue] = useState("")
    const [selectedRows, setSelectedRows] = useState([]);
    const [counterData, setCounterData] = useState(null)
    const [itemsPerPage, setItemsPerPage] = useState(20);
    const [MoreFilters, setMoreFilters] = useState(false);
    const [queryParamTemp, setQueryParamTemp] = useState({})
    const [orderTracking, setOrderTracking] = useState(false)
    const [BulkActionShow, setBulkActionShow] = useState(false)
    const [activeTab, setActiveTab] = useState("Action Required");
    const [handleResetFrom, setHandleResetFrom] = useState(false);
    const [queryParamSearch, setQueryParamSearch] = useState(null)
    const partnerList = JSON.parse(localStorage.getItem('partnerList'));
    const [SearchOption, setSearchOption] = useState(SearchOptions[0]);
    const [searchType, setsearchType] = useState(SearchOptions[0].value);
    const { favListData } = useSelector(state => state?.orderSectionReducer)
    const { screenWidthData } = useSelector(state => state?.authDataReducer)
    const shipmentCardData = useSelector(state => state?.shipmentSectionReducer?.shipmentCard)
    const tabData = activeTab === "Action Required" ? "pending" : activeTab === "Action Requested" ? "requested" : activeTab === "Delivered" ? "delivered" : "rto";

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
        let apiUrl = '';
        let sanitizedSearchValue = searchValue.replace(/#/g, '');
        setLoader(true)
        switch (activeTab) {
            case "Action Required":
                apiUrl = `${apiEndpoint}/orders-api/orders/shipment/?action=pending&page_size=${itemsPerPage}&page=${currentPage}&search_by=${searchType}&q=${sanitizedSearchValue}`;
                break;
            case "Action Requested":
                apiUrl = `${apiEndpoint}/orders-api/orders/shipment/?action=requested&page_size=${itemsPerPage}&page=${currentPage}&search_by=${searchType}&q=${sanitizedSearchValue}`;
                break;
            case "RTO":
                apiUrl = `${apiEndpoint}/orders-api/orders/shipment/?action=rto&page_size=${itemsPerPage}&page=${currentPage}&search_by=${searchType}&q=${sanitizedSearchValue}`;
                break;
            case "Delivered":
                apiUrl = `${apiEndpoint}/orders-api/orders/shipment/?action=delivered&page_size=${itemsPerPage}&page=${currentPage}&search_by=${searchType}&q=${sanitizedSearchValue}`;
                break;
            default:
                apiUrl = '';
        }

        if (apiUrl) {
            const queryParams = { ...queryParamTemp };
            const queryString = Object.keys(queryParams)
                .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(queryParams[key]))
                .join('&');

            if (queryString) {
                apiUrl += '&' + queryString;
            }
            axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            })
                .then(response => {
                    setTotalItems(response?.data?.count)
                    setShipment(response.data.results);
                    setLoader(false)
                })
                .catch(error => {
                    customErrorFunction(error);
                    setLoader(false)
                });
        }
    }, [JSON.stringify(queryParamTemp), activeTab, reset, currentPage,]);

    useEffect(() => {
        dispatch({ type: "GET_SAVE_FAVOURITE_ORDERS_ACTION" })
    }, [])

    useEffect(() => {
        if (shipmentCardData && shipmentCardData.length) {
            setShipment(shipmentCardData);
            setTotalItems(shipmentCardData.length);
        }
    }, [shipmentCardData]);

    useEffect(() => {
        if (activeTab) {
            setLoader(true)
            setErrors({})
            setSelectedRows([])
            setSearchValue("");
            setQueryParamTemp({});
            setBulkActionShow(false)
            setQueryParamSearch(null);
            setSearchOption(SearchOptions[0])
        }
    }, [activeTab])

    const handleSidePanel = () => {
        setMoreFilters(true);
        setBackDrop(true)
    }

    const CloseSidePanel = () => {
        setMoreFilters(false);
        setBackDrop(false)
    }


    const handleSearch = () => {
        setCurrentPage(1)
        setReset(new Date())
    };

    const handleReset = () => {
        setSearchValue("")
        pageStatusSet(true);
        setQueryParamTemp({})
        setHandleResetFrom(true)
        setsearchType(SearchOptions[0].value)
        setSearchOption(SearchOptions[0].value)
        setReset(new Date())
    }

    const handleChange = (option) => {
        setSearchOption(option);
        setsearchType(option.value)
    };

    const handleMoreFilter = (data) => {
        setItemsPerPage(20)
        setCurrentPage(1)
        setFilterData(data);
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

    const handleQueryfilter = (value) => {
        setQueryParamTemp({})
        axios.get(`${apiEndpoint}/orders-api/orders/shipment/?action=${tabData}&page_size=${itemsPerPage}&page=${currentPage}&${value}`, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        })
            .then(response => {
                setTotalItems(response?.data?.count)
                setShipment(response?.data?.results);
            })
            .catch(error => {
                customErrorFunction(error)
            });
    }

    const handleSearchKey = (e) => {
        if (e.key === "Enter") {
            setReset(new Date())
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
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BASE_URL_ORDER}/orders-api/orders/get-shipment-counter/`, {
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

    const [mostPopular, setMostPopular] = useState({ most_popular_search: "" })

    const searchOptions = [
        { key: 'one_attempt', label: 'One Attempt', tooltip: 'This will show all the orders with 1 delivery attempt' },
        { key: 'two_attempts', label: 'Two Attempts', tooltip: 'This will show all the orders with 2 delivery attempts' },
        { key: 'three_attempts', label: 'Three Attempts', tooltip: 'This will show all the orders with 2 delivery attempts' },
        { key: 'more_than_three_attempts', label: 'More Than Three Attempts', tooltip: 'This will show all the orders with more than 3 delivery attempts' },
    ];

    return (
        <>
            <NavTabs activeTab={activeTab} setActiveTab={setActiveTab} pageStatusSet={pageStatusSet} counterData={counterData} />
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
                                className={`input-field`}
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
                                    <button className="btn main-button dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                                        <span className="visually-hidden" >Toggle Dropdown</span>
                                    </button>
                                    <ul
                                        className="dropdown-menu"
                                        type="button"
                                        style={{
                                            paddingInline: '0px',
                                            minWidth: '110px',
                                        }}
                                    >
                                        {queryName?.map((item) => <li onClick={() => handleQueryfilter(item?.filter_query)}>{item?.filter_name}</li>)}
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
            <div className='orders-section-tabs'>
                <div className={`${activeTab === "Action Required" ? "d-block" : "d-none"}`}>
                    <ActionRequired
                        setAwbNo={setAwbNo}
                        selectAll={selectAll}
                        partnerList={partnerList}
                        setSelectAll={setSelectAll}
                        shipmentCard={shipmentCard}
                        selectedRows={selectedRows}
                        setSelectedRows={setSelectedRows}
                        setBulkActionShow={setBulkActionShow}
                        setOrderTracking={setOrderTracking}
                    />
                </div>

                <div className={`${activeTab === "Action Requested" ? "d-block" : "d-none"}`}>
                    <ActionRequested
                        setAwbNo={setAwbNo}
                        selectAll={selectAll}
                        setSelectAll={setSelectAll}
                        shipmentCard={shipmentCard}
                        partnerList={partnerList}
                        selectedRows={selectedRows}
                        setSelectedRows={setSelectedRows}
                        setBulkActionShow={setBulkActionShow}
                        setOrderTracking={setOrderTracking}
                    />
                </div>

                <div className={`${activeTab === "RTO" ? "d-block" : "d-none"}`}>
                    <RTOShipment
                        setAwbNo={setAwbNo}
                        selectAll={selectAll}
                        partnerList={partnerList}
                        setSelectAll={setSelectAll}
                        shipmentCard={shipmentCard}
                        selectedRows={selectedRows}
                        setSelectedRows={setSelectedRows}
                        setBulkActionShow={setBulkActionShow}
                        setOrderTracking={setOrderTracking}
                    />
                </div>

                <div className={`${activeTab === "Delivered" ? "d-block" : "d-none"}`}>
                    <DeliveredShipment
                        setAwbNo={setAwbNo}
                        selectAll={selectAll}
                        partnerList={partnerList}
                        setSelectAll={setSelectAll}
                        shipmentCard={shipmentCard}
                        selectedRows={selectedRows}
                        setSelectedRows={setSelectedRows}
                        setBulkActionShow={setBulkActionShow}
                        setOrderTracking={setOrderTracking}

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
                        setSelectAll={setSelectAll}
                        activeTab={activeTab}
                        setBulkActionShow={setBulkActionShow}
                        selectedRows={selectedRows}
                        setSelectedRows={setSelectedRows}
                        filterData={filterData}
                        setFilterData={setFilterData}
                        queryParamTemp={queryParamTemp}
                        setQueryParamTemp={setQueryParamTemp}
                        searchType={searchType}
                        searchValue={searchValue} />
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
                <AWBTrackingPage setOrderTracking={setOrderTracking} orderTracking={orderTracking} awbNo={awbNo} partnerList={partnerList} />
            </section>
            <div onClick={() => setOrderTracking(false)} className={`backdrop ${!orderTracking && 'd-none'}`}></div>
            <LoaderScreen loading={loader} />
        </>
    )
}

export default ShipmentsPage;
