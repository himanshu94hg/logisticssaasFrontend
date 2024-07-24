import axios from 'axios';
import './MoreOnOrders.css'
import moment from 'moment';
import Cookies from 'js-cookie';
import Select from 'react-select';
import { RxReset } from "react-icons/rx";
import { HiOutlineFilter } from "react-icons/hi";
import NavTabs from './Components/navTabs/NavTabs';
import globalDebouncedClick from '../../../debounce';
import { BASE_URL_CORE } from '../../../axios/config';
import { useDispatch, useSelector } from 'react-redux';
import LoaderScreen from '../../LoaderScreen/LoaderScreen';
import Pagination from '../../common/Pagination/Pagination';
import SplitOrder from './Components/SplitOrder/SplitOrder';
import MergeOrder from './Components/MergeOrder/MergeOrder';
import React, { useCallback, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AWBTrackingPage from '../AWBTrackingPage/AWBTrackingPage';
import ReassignOrder from './Components/ReassignOrder/ReassignOrder';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import MoreFiltersPanel from './Components/MoreFiltersPanel/MoreFiltersPanel';
import BulkActionsComponent from './BulkActionsComponent/BulkActionsComponent';
import { customErrorFunction } from '../../../customFunction/errorHandling';

const SearchOptions = [
    { value: 'customer_order_number', label: 'Order ID' },
    { value: 'awb_number', label: 'AWB' },
    { value: 'shipping_detail__mobile_number', label: 'Mobile' },
    { value: 'shipping_detail__email', label: 'Email' },
    { value: 'shipping_detail__recipient_name', label: 'Name' },
    { value: 'shipping_detail__pincode', label: 'Pincode' },
    { value: 'shipping_detail__city', label: 'City' },
];

const MoreOnOrders = () => {
    const dispatch = useDispatch()
    const apiEndpoint = `${BASE_URL_CORE}`;
    const [awbNo, setAwbNo] = useState(null)
    let authToken = Cookies.get("access_token")
    const [loader, setLoader] = useState(false)
    const [queryName, setQueryName] = useState([])
    const [totalItems, setTotalItems] = useState("");
    const [selectAll, setSelectAll] = useState(false);
    const [mergeOrders, setMergeOrders] = useState([]);
    const [reassOrders, setReassOrders] = useState([])
    const [splitOrders, setSplitOrders] = useState([])
    const [pageStatus, pageStatusSet] = useState(true)
    const [searchValue, setSearchValue] = useState("")
    const [currentPage, setCurrentPage] = useState(1);
    const [addTagShow, setaddTagShow] = useState(false)
    const [splitStatus, setSplitStatus] = useState(null)
    const [selectedRows, setSelectedRows] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(20);
    const [MoreFilters, setMoreFilters] = useState(false);
    const [queryParamTemp, setQueryParamTemp] = useState({})
    const [activeTab, setActiveTab] = useState("Reassign Order");
    const [BulkActionShow, setBulkActionShow] = useState(false)
    const [UpdateWarehouse, setUpdateWarehouse] = useState(false)
    const [handleResetFrom, setHandleResetFrom] = useState(false);
    const [queryParamSearch, setQueryParamSearch] = useState(null)
    const [orderTracking, setOrderTracking] = useState(false)
    const [SearchOption, setSearchOption] = useState(SearchOptions[0]);
    const [searchType, setsearchType] = useState(SearchOptions[0].value);
    const { pathName } = useSelector(state => state?.authDataReducer)
    const { orderdelete } = useSelector(state => state?.orderSectionReducer)
    const { favListData } = useSelector(state => state?.orderSectionReducer)
    const { moreorderShipCardStatus } = useSelector(state => state?.moreorderSectionReducer)

    const activeTabValueSet =
        activeTab === "Reassign Order"
            ? "core-api/shipping/reassign/"
            : activeTab === "Merge Order"
                ? "orders-api/orders/merge-order/"
                : activeTab === "Split Order"
                    ? "orders-api/orders/split-order/"
                    : "";


    useEffect(() => {
        setLoader(true)
        if (activeTab) {
            setTimeout(() => {
                setLoader(false)
            }, 500);
            setCurrentPage(1)
            setSearchValue("");
            setQueryParamTemp({});
            setQueryParamSearch(null);
            setSearchOption(SearchOptions[0])
        }
    }, [activeTab])

    useEffect(() => {
        if (pathName === "Reassign Orders") {
            setActiveTab("Reassign Order");
        }
        else if (pathName === "Merge Orders") {
            setActiveTab("Merge Order");
        }
        else if (pathName === "Split Orders") {
            setActiveTab("Split Order");
        }

    }, [pathName]);

    useEffect(() => {
        let apiUrl = '';
        switch (activeTab) {
            case "Reassign Order":
                apiUrl = `${apiEndpoint}/${activeTabValueSet}?page_size=${itemsPerPage}&page=${currentPage}`;
                break;
            case "Merge Order":
                apiUrl = `${apiEndpoint}/${activeTabValueSet}?page_size=${itemsPerPage}&page=${currentPage}`;
                break;
            case "Split Order":
                apiUrl = `${apiEndpoint}/${activeTabValueSet}?page_size=${itemsPerPage}&page=${currentPage}`;
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
                    if (activeTab === "Reassign Order") {
                        setReassOrders(response.data.results);
                    }
                    else if (activeTab === "Merge Order") {
                        setMergeOrders(response.data.results)
                    }
                    else if (activeTab === "Split Order") {
                        setSplitOrders(response.data.results);
                    }
                })
                .catch(error => {
                    customErrorFunction(error)
                });
        }
    }, [JSON.stringify(queryParamTemp), currentPage, activeTab, itemsPerPage, moreorderShipCardStatus, orderdelete, splitStatus]);

    useEffect(() => {
        dispatch({ type: "GET_SAVE_FAVOURITE_ORDERS_ACTION" })
    }, [])

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
        if (BulkActionShow) {
            setBulkActionShow(false)
            setSelectedRows([])

        }
    }, [activeTab])


    const handleSidePanel = () => {
        setMoreFilters(true);
    }

    const CloseSidePanel = () => {
        setMoreFilters(false);
    }

    const handleSearch = () => {
        axios.get(`${apiEndpoint}/${activeTabValueSet}?search_by=${searchType}&q=${searchValue}&page_size=${20}&page=${1}`, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        })
            .then(response => {
                setTotalItems(response?.data?.count)
                setReassOrders(response.data.results);
                setMergeOrders(response.data.results)
                setSplitOrders(response.data.results)
                pageStatusSet(false)
            })
            .catch(error => {
                customErrorFunction(error)
            });
        setQueryParamTemp({
            search_by: searchType,
            q: searchValue
        })
        setCurrentPage(1)
    }

    const handleChange = (option) => {
        setSearchOption(option);
        setsearchType(option.value)
    };

    const handleReset = () => {
        setSearchValue("")
        setHandleResetFrom(true)
        setQueryParamTemp({})
        axios.get(`${apiEndpoint}/${activeTabValueSet}?page_size=${20}&page=${1}`, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        })
            .then(response => {
                setTotalItems(response?.data?.count)
                setMergeOrders(response.data.results);
                setReassOrders(response.data.results)
                setSplitOrders(response.data.results)
            })
            .catch(error => {
                customErrorFunction(error)
            });
        setSearchOption(SearchOptions[0])

    }

    const handleQueryfilter = (value) => {
        setQueryParamTemp({})
        axios.get(`${apiEndpoint}/${activeTabValueSet}?page_size=${20}&page=${1}&${value}`, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        })
            .then(response => {
                setTotalItems(response?.data?.count)
                setReassOrders(response.data.results)
                setMergeOrders(response.data.results)
                setSplitOrders(response.data.results)
            })
            .catch(error => {
                customErrorFunction(error)
            });
    }

    const handleMoreFilter = (data) => {
        setItemsPerPage(20)
        setCurrentPage(1)
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
                            <input
                                type="search"
                                value={searchValue}
                                className='input-field'
                                onChange={(e) => setSearchValue(e.target.value)}
                                maxLength={50}
                                onKeyPress={(e) => {
                                    const allowedCharacters = /^[a-zA-Z0-9\s!@#$%^&*(),.?":{}|<>]*$/;
                                    if (
                                        e.key === ' ' &&
                                        e.target.value.endsWith(' ')
                                    ) {
                                        e.preventDefault();
                                    } else if (!allowedCharacters.test(e.key)) {
                                        e.preventDefault();
                                    }
                                }}
                                placeholder="Search for AWB | Order ID | Mobile Number | Email | SKU"
                            />
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
            <div className='orders-section-tabs'>
                <div className={`${activeTab === "Reassign Order" ? "d-block" : "d-none"}`}>
                    <ReassignOrder
                        orders={reassOrders}
                        setAwbNo={setAwbNo}
                        selectAll={selectAll}
                        activeTab={activeTab}
                        setSelectAll={setSelectAll}
                        handleSearch={handleSearch}
                        selectedRows={selectedRows}
                        setSelectedRows={setSelectedRows}
                        setBulkActionShow={setBulkActionShow}
                        setOrderTracking={setOrderTracking}
                    />
                </div>
                <div className={`${activeTab === "Merge Order" ? "d-block" : "d-none"}`}>
                    <MergeOrder
                        orders={mergeOrders}
                        selectAll={selectAll}
                        activeTab={activeTab}
                        setSelectAll={setSelectAll}
                        handleSearch={handleSearch}
                        selectedRows={selectedRows}
                        setSelectedRows={setSelectedRows}
                        setBulkActionShow={setBulkActionShow}
                    />
                </div>
                <div className={`${activeTab === "Split Order" ? "d-block" : "d-none"}`}>
                    <SplitOrder
                        orders={splitOrders}
                        activeTab={activeTab}
                        handleSearch={handleSearch}
                        selectedRows={selectedRows}
                        setSplitStatus={setSplitStatus}
                        setSelectedRows={setSelectedRows}
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
                        setSelectAll={setSelectAll}
                        setSplitStatus={setSplitStatus}
                        setSelectedRows={setSelectedRows}
                        setaddTagShow={setaddTagShow}
                        setBulkActionShow={setBulkActionShow}
                        setUpdateWarehouse={setUpdateWarehouse}
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
            <div onClick={CloseSidePanel} className={`backdrop ${!MoreFilters && 'd-none'}`}></div>
            <section className={`awb-tracking-slider ${orderTracking && 'open'}`}>
                <AWBTrackingPage setOrderTracking={setOrderTracking} orderTracking={orderTracking} awbNo={awbNo} />
            </section>
            <div onClick={() => setOrderTracking(false)} className={`backdrop ${!orderTracking && 'd-none'}`}></div>
            <LoaderScreen loading={loader} />
        </>
    )
}

export default MoreOnOrders;
