import './OrdersPage.css';
import axios from 'axios';
import moment from 'moment';
import Cookies from 'js-cookie';
import Select from 'react-select';
import { RxReset } from "react-icons/rx";
import { HiOutlineFilter } from "react-icons/hi";
import React, { useEffect, useState } from 'react';
import Pickups from './Components/Pickups/Pickups';
import NavTabs from './Components/navTabs/NavTabs';
import globalDebouncedClick from '../../../debounce';
import Manifest from './Components/Manifest/Manifest';
import { BASE_URL_ORDER } from '../../../axios/config';
import { useDispatch, useSelector } from 'react-redux';
import EditOrder from './Components/EditOrder/EditOrder';
import AllOrders from './Components/AllOrders/AllOrders';
import LoaderScreen from '../../LoaderScreen/LoaderScreen';
import Processing from './Components/Processing/Processing';
import CloneOrder from './Components/CloneOrder/CloneOrder';
import Pagination from '../../common/Pagination/Pagination';
import ReadyToShip from './Components/ReadyToShip/ReadyToShip';
import AWBTrackingPage from '../AWBTrackingPage/AWBTrackingPage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReturnOrders from './Components/ReturnOrders/ReturnOrders';
import Unprocessable from './Components/Unprocessable/Unprocessable';
import { faMagnifyingGlass, } from '@fortawesome/free-solid-svg-icons';
import { customErrorFunction } from '../../../customFunction/errorHandling';
import MoreFiltersPanel from './Components/MoreFiltersPanel/MoreFiltersPanel';
import AddTagPop from './Components/BulkActionsComponent/Components/AddTagPop/AddTagPop';
import BulkActionsComponent from './Components/BulkActionsComponent/BulkActionsComponent';
import WeightUpdatePop from './Components/BulkActionsComponent/Components/WeightUpdatePop/WeightUpdatePop';
import WarehouseUpdatePop from './Components/BulkActionsComponent/Components/WarehouseUpdatePop/WarehouseUpdatePop';
import ThreeDots from '../../../assets/image/icons/ThreeDots.png'

const SearchOptions = [
    { value: 'customer_order_number', label: 'Order ID' },
    { value: 'awb_number', label: 'AWB' },
    { value: 'shipping_detail__mobile_number', label: 'Mobile' },
    { value: 'shipping_detail__email', label: 'Email' },
    { value: 'shipping_detail__recipient_name', label: 'Name' },
    { value: 'shipping_detail__pincode', label: 'Pincode' },
    { value: 'shipping_detail__city', label: 'City' },
];

const OrdersPage = () => {
    const dispatch = useDispatch()
    let authToken = Cookies.get("access_token")
    const [awbNo, setAwbNo] = useState("")
    const [reset, setReset] = useState(null)
    const [orders, setOrders] = useState([])
    const [errors, setErrors] = useState({});
    const [bulkAwb, setbulkAwb] = useState([]);
    const [loader, setLoader] = useState(false)
    const [rateRef, setRateRef] = useState(null)
    const [orderId, setOrderId] = useState(null)
    const [queryName, setQueryName] = useState([])
    const [backDrop, setBackDrop] = useState(false);
    const [orderTagId, setOrderTagId] = useState([])
    const [filterData, setFilterData] = useState({});
    const [totalItems, setTotalItems] = useState("");
    const [selectAll, setSelectAll] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState("")
    const [addTagShow, setaddTagShow] = useState(false)
    const [pickupStatus, setPickupStatus] = useState('')
    const [selectedRows, setSelectedRows] = useState([]);
    const [MoreFilters, setMoreFilters] = useState(false);
    const [itemsPerPage, setItemsPerPage] = useState(20);
    const [searchStatus, setSearchStatus] = useState(false)
    const [UpdateWeight, setUpdateWeight] = useState(false)
    const [queryParamTemp, setQueryParamTemp] = useState({})
    const [manifestOrders, setManifestOrders] = useState([])
    const [orderTracking, setOrderTracking] = useState(false)
    const [activeTab, setActiveTab] = useState("Processing");
    const [BulkActionShow, setBulkActionShow] = useState(false)
    const [UpdateWarehouse, setUpdateWarehouse] = useState(false)
    const [handleResetFrom, setHandleResetFrom] = useState(false);
    const [EditOrderSection, setEditOrderSection] = useState(false)
    const [CloneOrderSection, setCloneOrderSection] = useState(false)
    const [SearchOption, setSearchOption] = useState(SearchOptions[0]);
    const partnerList = JSON.parse(localStorage.getItem('partnerList'));
    const [searchType, setsearchType] = useState(SearchOptions[0].value);
    const { loaderState } = useSelector(state => state?.errorLoaderReducer)
    const { screenWidthData } = useSelector(state => state?.authDataReducer)
    const exportCard = useSelector(state => state?.exportSectionReducer?.exportCard)
    const { moreorderShipCardStatus } = useSelector(state => state?.moreorderSectionReducer)
    const { orderCancelled, orderdelete, orderClone, orderUpdateRes, favListData } = useSelector(state => state?.orderSectionReducer)

    useEffect(() => {
        if (orderCancelled || orderdelete || loaderState) {
            dispatch({ type: "PAYMENT_DATA_ACTION" });
            setLoader(false)
        }
    }, [orderCancelled, orderdelete, loaderState])

    const [mostPopular, setMostPopular] = useState({ most_popular_search: "" })
    console.log(mostPopular, "queryParamTempqueryParamTemp")

    useEffect(() => {
        if (activeTab) {
            setOrders([])
            setErrors({})
            setbulkAwb([])
            setSelectedRows([])
            setQueryParamTemp({})
            setSearchStatus(false)
            setSearchStatus(false)
            setBulkActionShow(false)
            setSearchOption(SearchOptions[0])
        }
    }, [activeTab])

    useEffect(() => {
        if (itemsPerPage || currentPage) {
            setSearchStatus(false)
        }
    }, [itemsPerPage, currentPage])

    useEffect(() => {
        if (itemsPerPage || MoreFilters) {
            setBulkActionShow(false)
            setSelectedRows([])
            setSearchStatus(false)
        }
    }, [itemsPerPage, MoreFilters])

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
        if (exportCard) {
            setBulkActionShow(false)
            setSelectedRows([])
        }
    }, [exportCard])

    useEffect(() => {
        if (orderdelete || orderClone || orderCancelled || orderUpdateRes) {
            setSelectedRows([])
            setbulkAwb([])
            setBulkActionShow(false)
        }
    }, [orderdelete, orderCancelled])

    useEffect(() => {
        dispatch({ type: "GET_SAVE_FAVOURITE_ORDERS_ACTION" })
    }, [])

    useEffect(() => {
        let sanitizedSearchValue = searchValue.replace(/#/g, '');
        if (!searchStatus) {
            let apiUrl = '';
            switch (activeTab) {
                case "All":
                    apiUrl = `${BASE_URL_ORDER}/orders-api/orders/?page_size=${itemsPerPage}&page=${currentPage}&q=${sanitizedSearchValue}&search_by=${searchType}`;
                    break;
                case "Unprocessable":
                    apiUrl = `${BASE_URL_ORDER}/orders-api/orders/?courier_status=Unprocessable&page_size=${itemsPerPage}&page=${currentPage}&q=${sanitizedSearchValue}&search_by=${searchType}`;
                    break;
                case "Processing":
                    apiUrl = `${BASE_URL_ORDER}/orders-api/orders/?courier_status=Processing&page_size=${itemsPerPage}&page=${currentPage}&q=${sanitizedSearchValue}&search_by=${searchType}`;
                    break;
                case "Ready to Ship":
                    apiUrl = `${BASE_URL_ORDER}/orders-api/orders/?courier_status=Ready_to_ship&page_size=${itemsPerPage}&page=${currentPage}&q=${sanitizedSearchValue}&search_by=${searchType}`;
                    break;
                case "Pickup":
                    apiUrl = `${BASE_URL_ORDER}/orders-api/orders/?courier_status=manifest&page_size=${itemsPerPage}&page=${currentPage}&q=${sanitizedSearchValue}&search_by=${searchType}`;
                    break;
                case "Returns":
                    apiUrl = `${BASE_URL_ORDER}/orders-api/orders/?courier_status=Returns&page_size=${itemsPerPage}&page=${currentPage}&q=${sanitizedSearchValue}&search_by=${searchType}`;
                    break;
                default:
                    apiUrl = '';
            }
            if (apiUrl) {
                setLoader(true)
                const queryParams = { ...queryParamTemp };
                const queryString = Object.keys(queryParams)
                    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(queryParams[key]))
                    .join('&');
                const decodedURL = decodeURIComponent(`${queryString}&most_popular_search=${mostPopular?.most_popular_search}`)
                if (decodedURL) {
                    apiUrl += '&' + decodedURL;
                }
                axios.get(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                })
                    .then(response => {
                        setTotalItems(response?.data?.count)
                        setLoader(false)
                        setOrders(response.data.results);
                    })
                    .catch(error => {
                        customErrorFunction(error)
                        setLoader(false)
                    });
            }
        }
    }, [activeTab, searchStatus, orderCancelled, orderdelete, reset, orderClone, currentPage, rateRef, JSON.stringify(queryParamTemp), pickupStatus, orderUpdateRes, moreorderShipCardStatus]);

    useEffect(() => {
        setLoader(true)
        if (activeTab === "Manifest") {
            axios.get(`${BASE_URL_ORDER}/orders-api/orders/manifest/?page_size=${itemsPerPage}&page=${currentPage}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            })
                .then(response => {
                    setTotalItems(response?.data?.count)
                    setManifestOrders(response.data.results);
                    setLoader(false)
                })
                .catch(error => {
                    customErrorFunction(error)
                    setLoader(false)
                });
        }
    }, [activeTab, itemsPerPage, currentPage])

    const handleSidePanel = () => {
        setMoreFilters(true);
        setBackDrop(true)
    }

    const CloseSidePanel = () => {
        setMoreFilters(false);
        setBackDrop(false)
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

    const handleSearch = () => {
        setReset(new Date())
        setCurrentPage(1)
    };

    const handleReset = () => {
        setSearchValue("")
        setHandleResetFrom(true)
        setItemsPerPage(20)
        setCurrentPage(1)
        setQueryParamTemp({})
        setReset(new Date())
        setSearchOption(SearchOptions[0])
        setSearchStatus(false)
        setMostPopular({ most_popular_search: '' })
    }

    const handleQueryfilter = (value) => {
        setQueryParamTemp({})
        axios.get(`${BASE_URL_ORDER}/orders-api/orders/?page_size=${20}&page=${1}&courier_status=${activeTab
            === "All" ? '' : activeTab}&${value}`, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        })
            .then(response => {
                setTotalItems(response?.data?.count)
                setOrders(response.data.results);
            })
            .catch(error => {
                customErrorFunction(error)
            });
    }


    const handleSearchKey = (e) => {
        if (e.key === "Enter") {
            setReset(new Date())
        }
        const allowedCharacters = /^[a-zA-Z0-9\s!@#$%^&*(),.?":{}|<>]*$/;
        if (
            e.key === ' ' &&
            e.target.value.endsWith(' ')
        ) {
            e.preventDefault();
        } else if (!allowedCharacters.test(e.key)) {
            e.preventDefault();
        }
    }






    return (
        <>
            <NavTabs
                activeTab={activeTab}
                setRateRef={setRateRef}
                setActiveTab={setActiveTab}
                SearchOptions={SearchOptions}
                setsearchType={setsearchType}
                setCurrentPage={setCurrentPage}
                setSearchValue={setSearchValue}
                setItemsPerPage={setItemsPerPage}
            />
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
                                        {queryName?.map((item) => <li onClick={() => handleQueryfilter(item?.filter_query)} key={item?.filter_name}>{item?.filter_name}</li>)}
                                    </ul>
                                </div>
                                <button className='btn main-button-outline ms-2' onClick={() => handleReset()}><RxReset className='align-text-bottom' /> Reset</button>
                            </>
                        }


                    </div>
                    <p className='popular-search'>Most Popular Search by
                        <span className='text-sh-red' onClick={() => { setMostPopular({ most_popular_search: "info_missing" }); setReset(new Date()) }}>Info Missing</span>|
                        <span className="text-green" onClick={() => { setMostPopular({ most_popular_search: "live" }); setReset(new Date()) }}>Live</span>|
                        <span className='text-sh-primary' onClick={() => { setMostPopular({ most_popular_search: "cod" }); setReset(new Date()) }}>COD</span>|
                        <span className='text-sh-primary' onClick={() => { setMostPopular({ most_popular_search: "prepaid" }); setReset(new Date()) }}>Prepaid</span>|
                        <span className='text-green' onClick={() => { setMostPopular({ most_popular_search: "delivered" }); setReset(new Date()) }}>Delivered</span>|
                        <span className='text-sh-red' onClick={() => { setMostPopular({ most_popular_search: "cancel_order" }); setReset(new Date()) }}>Cancelled order</span>|
                        <span className='text-sh-primary' onClick={() => { setMostPopular({ most_popular_search: "yesterday" }); setReset(new Date()) }}>Yesterday</span>|
                        <span className='text-yellow' onClick={() => { setMostPopular({ most_popular_search: "one_week" }); setReset(new Date()) }}>Last Week</span>|
                        <span onClick={() => { setMostPopular({ most_popular_search: "last_month" }); setReset(new Date()) }}>Last Month</span>
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
                {/* All */}
                <div className={`${activeTab === "All" ? "d-block" : "d-none"}`}>
                    <AllOrders
                        orders={orders}
                        bulkAwb={bulkAwb}
                        setAwbNo={setAwbNo}
                        activeTab={activeTab}
                        setLoader={setLoader}
                        selectAll={selectAll}
                        setOrderId={setOrderId}
                        setbulkAwb={setbulkAwb}
                        setRateRef={setRateRef}
                        partnerList={partnerList}
                        MoreFilters={MoreFilters}
                        setSelectAll={setSelectAll}
                        handleSearch={handleSearch}
                        selectedRows={selectedRows}
                        BulkActionShow={BulkActionShow}
                        setSelectedRows={setSelectedRows}
                        setOrderTracking={setOrderTracking}
                        setBulkActionShow={setBulkActionShow}
                        setCloneOrderSection={setCloneOrderSection}
                        setEditOrderSection={setEditOrderSection}
                    />
                </div>

                {/* Unprocessable */}
                <div className={`${activeTab === "Unprocessable" ? "d-block" : "d-none"}`}>
                    <Unprocessable
                        setOrderId={setOrderId}
                        handleSearch={handleSearch}
                        selectedRows={selectedRows}
                        BulkActionShow={BulkActionShow}
                        setSelectedRows={setSelectedRows}
                        setBulkActionShow={setBulkActionShow}
                        activeTab={activeTab} orders={orders}
                        setEditOrderSection={setEditOrderSection}
                    />
                </div>

                {/* Processing */}
                <div className={`${activeTab === "Processing" ? "d-block" : "d-none"}`}>
                    <Processing
                        orders={orders}
                        bulkAwb={bulkAwb}
                        activeTab={activeTab}
                        setLoader={setLoader}
                        selectAll={selectAll}
                        setbulkAwb={setbulkAwb}
                        setOrderId={setOrderId}
                        MoreFilters={MoreFilters}
                        setSelectAll={setSelectAll}
                        handleSearch={handleSearch}
                        selectedRows={selectedRows}
                        setOrderTagId={setOrderTagId}
                        setaddTagShow={setaddTagShow}
                        BulkActionShow={BulkActionShow}
                        setSelectedRows={setSelectedRows}
                        setBulkActionShow={setBulkActionShow}
                        setEditOrderSection={setEditOrderSection}
                        setCloneOrderSection={setCloneOrderSection}
                    />
                </div>

                {/* ReadyToShip */}
                <div className={`${activeTab === "Ready to Ship" ? "d-block" : "d-none"}`}>
                    <ReadyToShip
                        orders={orders}
                        bulkAwb={bulkAwb}
                        setAwbNo={setAwbNo}
                        setLoader={setLoader}
                        activeTab={activeTab}
                        setbulkAwb={setbulkAwb}
                        partnerList={partnerList}
                        MoreFilters={MoreFilters}
                        selectedRows={selectedRows}
                        handleSearch={handleSearch}
                        BulkActionShow={BulkActionShow}
                        setPickupStatus={setPickupStatus}
                        setSelectedRows={setSelectedRows}
                        setOrderTracking={setOrderTracking}
                        setBulkActionShow={setBulkActionShow}
                    />
                </div>

                {/* Pickups */}
                <div className={`${activeTab === "Pickup" ? "d-block" : "d-none"}`}>
                    <Pickups
                        orders={orders}
                        bulkAwb={bulkAwb}
                        setAwbNo={setAwbNo}
                        setLoader={setLoader}
                        activeTab={activeTab}
                        setbulkAwb={setbulkAwb}
                        MoreFilters={MoreFilters}
                        partnerList={partnerList}
                        handleSearch={handleSearch}
                        selectedRows={selectedRows}
                        BulkActionShow={BulkActionShow}
                        setSelectedRows={setSelectedRows}
                        setOrderTracking={setOrderTracking}
                        setBulkActionShow={setBulkActionShow}

                    />
                </div>

                {/* Manifest */}
                <div className={`${activeTab === "Manifest" ? "d-block" : "d-none"}`}>
                    <Manifest
                        setLoader={setLoader}
                        activeTab={activeTab}
                        partnerList={partnerList}
                        MoreFilters={MoreFilters}
                        handleSearch={handleSearch}
                        setTotalItems={setTotalItems}
                        manifestOrders={manifestOrders}
                        setManifestOrders={setManifestOrders}
                        setBulkActionShow={setBulkActionShow}

                    />
                </div>

                {/* Returns */}
                <div className={`${activeTab === "Returns" ? "d-block" : "d-none"}`}>
                    <ReturnOrders
                        orders={orders}
                        setAwbNo={setAwbNo}
                        activeTab={activeTab}
                        MoreFilters={MoreFilters}
                        partnerList={partnerList}
                        handleSearch={handleSearch}
                        selectedRows={selectedRows}
                        BulkActionShow={BulkActionShow}
                        setSelectedRows={setSelectedRows}
                        setOrderTracking={setOrderTracking}
                        setBulkActionShow={setBulkActionShow}
                    />
                </div>
                <Pagination
                    setReset={setReset}
                    activeTab={activeTab}
                    totalItems={totalItems}
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    setCurrentPage={setCurrentPage}
                    setItemsPerPage={setItemsPerPage}
                />
                {BulkActionShow && (
                    <BulkActionsComponent
                        totalItems={totalItems}
                        bulkAwb={bulkAwb}
                        activeTab={activeTab}
                        setbulkAwb={setbulkAwb}
                        filterData={filterData}
                        selectedRows={selectedRows}
                        setSelectAll={setSelectAll}
                        setaddTagShow={setaddTagShow}
                        setFilterData={setFilterData}
                        queryParamTemp={queryParamTemp}
                        setSelectedRows={setSelectedRows}
                        setUpdateWeight={setUpdateWeight}
                        setQueryParamTemp={setQueryParamTemp}
                        setBulkActionShow={setBulkActionShow}
                        setUpdateWarehouse={setUpdateWarehouse}
                        searchType={searchType}
                        searchValue={searchValue}
                    />
                )
                }
            </div>

            <EditOrder setEditOrderSection={setEditOrderSection} EditOrderSection={EditOrderSection} orderId={orderId} />
            <CloneOrder setCloneOrderSection={setCloneOrderSection} CloneOrderSection={CloneOrderSection} orderId={orderId} />

            <MoreFiltersPanel
                MoreFilters={MoreFilters}
                activeTab={activeTab}
                CloseSidePanel={CloseSidePanel}
                handleMoreFilter={handleMoreFilter}
                handleResetFrom={handleResetFrom}
                setHandleResetFrom={setHandleResetFrom}
            />
            <div onClick={CloseSidePanel} className={`backdrop ${backDrop ? 'd-flex' : 'd-none'}`}></div>
            <section className={`ba-popup-container ${!addTagShow ? 'invisible' : ''}`}>
                <AddTagPop
                    setLoader={setLoader}
                    orderTagId={orderTagId}
                    addTagShow={addTagShow}
                    selectedRows={selectedRows}
                    setOrderTagId={setOrderTagId}
                    setaddTagShow={setaddTagShow}
                    setSelectedRows={setSelectedRows}
                    setBulkActionShow={setBulkActionShow}
                />
                {addTagShow &&
                    <div onClick={() => setaddTagShow(false)} className="backdrop"></div>
                }
            </section>

            <section className={`ba-popup-container ${!UpdateWarehouse ? 'invisible' : ''}`}>
                <WarehouseUpdatePop
                    selectedRows={selectedRows}
                    UpdateWarehouse={UpdateWarehouse}
                    setUpdateWarehouse={setUpdateWarehouse}
                />
                {UpdateWarehouse &&
                    <div onClick={() => setUpdateWarehouse(false)} className="backdrop"></div>
                }
            </section>

            <section className={`ba-popup-container ${!UpdateWeight ? 'invisible' : ''}`}>
                <WeightUpdatePop
                    UpdateWeight={UpdateWeight}
                    selectedRows={selectedRows}
                    setUpdateWeight={setUpdateWeight}
                />
                {UpdateWeight &&
                    <div onClick={() => setUpdateWeight(false)} className="backdrop"></div>
                }
            </section>

            <section className={`awb-tracking-slider ${orderTracking && 'open'}`}>
                <AWBTrackingPage partnerList={partnerList} setOrderTracking={setOrderTracking} orderTracking={orderTracking} awbNo={awbNo} setAwbNo={setAwbNo} />
            </section>
            <div onClick={() => setOrderTracking(false)} className={`backdrop ${!orderTracking && 'd-none'}`}></div>
            <LoaderScreen loading={loader} />
        </>
    )
}

export default OrdersPage;
