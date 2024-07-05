import React, { useCallback, useEffect, useState } from 'react';
import NavTabs from './Components/navTabs/NavTabs';
import './OrdersPage.css'
import Unprocessable from './Components/Unprocessable/Unprocessable';
import Processing from './Components/Processing/Processing';
import ReadyToShip from './Components/ReadyToShip/ReadyToShip';
import Manifest from './Components/Manifest/Manifest';
import ReturnOrders from './Components/ReturnOrders/ReturnOrders';
import AllOrders from './Components/AllOrders/AllOrders';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Cookies from 'js-cookie';
import EditOrder from './Components/EditOrder/EditOrder';
import Pagination from '../../common/Pagination/Pagination';
import BulkActionsComponent from './Components/BulkActionsComponent/BulkActionsComponent';
import Pickups from './Components/Pickups/Pickups';
import MoreFiltersPanel from './Components/MoreFiltersPanel/MoreFiltersPanel';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';
import { HiOutlineFilter } from "react-icons/hi";
import { RxReset } from "react-icons/rx";
import AddTagPop from './Components/BulkActionsComponent/Components/AddTagPop/AddTagPop';
import WarehouseUpdatePop from './Components/BulkActionsComponent/Components/WarehouseUpdatePop/WarehouseUpdatePop';
import WeightUpdatePop from './Components/BulkActionsComponent/Components/WeightUpdatePop/WeightUpdatePop';
import CloneOrder from './Components/CloneOrder/CloneOrder';
import { BASE_URL_ORDER } from '../../../axios/config';
import { customErrorFunction } from '../../../customFunction/errorHandling';
import globalDebouncedClick from '../../../debounce';
import AWBTrackingPage from '../AWBTrackingPage/AWBTrackingPage';
import { debounce } from 'lodash';
import { useLocation } from 'react-router-dom';

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
    const location = useLocation()
    let authToken = Cookies.get("access_token")
    const [orders, setOrders] = useState([])
    const [manifestOrders, setManifestOrders] = useState([])
    const [searchValue, setSearchValue] = useState("")
    const [orderId, setOrderId] = useState(null)
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState("");
    const [itemsPerPage, setItemsPerPage] = useState(20);
    const [queryParamTemp, setQueryParamTemp] = useState({})
    const [activeTab, setActiveTab] = useState("Processing");
    const [EditOrderSection, setEditOrderSection] = useState(false)
    const [CloneOrderSection, setCloneOrderSection] = useState(false)
    const [BulkActionShow, setBulkActionShow] = useState(false)
    const [MoreFilters, setMoreFilters] = useState(false);
    const [backDrop, setBackDrop] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [bulkAwb, setbulkAwb] = useState([]);
    const [SearchOption, setSearchOption] = useState(SearchOptions[0]);
    const [searchType, setsearchType] = useState(SearchOptions[0].value);
    const [addTagShow, setaddTagShow] = useState(false)
    const [errors, setErrors] = useState({});
    const [handleResetFrom, setHandleResetFrom] = useState(false);
    const [queryName, setQueryName] = useState([])
    const [UpdateWarehouse, setUpdateWarehouse] = useState(false)
    const [UpdateWeight, setUpdateWeight] = useState(false)
    const [orderTracking, setOrderTracking] = useState(false)
    const [awbNo, setAwbNo] = useState(null)
    const [pickupStatus, setPickupStatus] = useState('')
    const [filterData, setFilterData] = useState({});
    const [selectAll, setSelectAll] = useState(false);
    const [rateRef, setRateRef] = useState(null)

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
    const { orderCancelled, orderdelete, orderClone, orderUpdateRes, favListData } = useSelector(state => state?.orderSectionReducer)
    const { moreorderShipCardStatus } = useSelector(state => state?.moreorderSectionReducer)

    useEffect(() => {
        dispatch({ type: "PAYMENT_DATA_ACTION" });
    }, [orderCancelled])


    // useEffect(() => {
    //     if (location?.state?.data === "ratecalc") {
    //         setActiveTab("Processing")
    //         setRateRef(new Date())
    //     } else {
    //         setActiveTab("Processing")
    //     }
    // }, [location])


    useEffect(() => {
        if (activeTab) {
            setSearchValue("");
            setQueryParamTemp({});
            setItemsPerPage(20)
            setbulkAwb([])
            setSearchOption(SearchOptions[0])
            setBulkActionShow(false)
            setSelectedRows([])
            setCurrentPage(1)
            setOrders([])
        }
    }, [activeTab])

    useEffect(() => {
        if (itemsPerPage || MoreFilters) {
            setBulkActionShow(false)
            setSelectedRows([])
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
        if (BulkActionShow) {
            setBulkActionShow(false)
            setSelectedRows([])
        }
    }, [activeTab])

    useEffect(() => {
        dispatch({ type: "GET_SAVE_FAVOURITE_ORDERS_ACTION" })
    }, [])

    const handleSidePanel = () => {
        setMoreFilters(true);
        setBackDrop(true)
    }

    const CloseSidePanel = () => {
        setMoreFilters(false);
        setBackDrop(false)
    }

    const validateData = () => {
        const newErrors = {};
        if (searchType === 'customer_order_number' && !searchValue) {
            newErrors.customer_order_number = 'Order Number is required!';
        }
        if (searchType === 'shipping_detail__mobile_number' && !searchValue) {
            newErrors.customer_order_number = 'Mobile Number is required!';
        }
        if (searchType === 'shipping_detail__email' && !searchValue) {
            newErrors.shipping_detail__email = 'Email is required!';
        }
        if (searchType === 'shipping_detail__recipient_name' && !searchValue) {
            newErrors.shipping_detail__recipient_name = 'Name is required!';
        }
        if (searchType === 'shipping_detail__pincode' && !searchValue) {
            newErrors.customer_order_number = 'Pincode Number is required!';
        }
        if (searchType === 'shipping_detail__city' && !searchValue) {
            newErrors.customer_order_number = 'City is required!';
        }
        if (searchType === 'awb_number' && !searchValue) {
            newErrors.customer_order_number = 'AWB is required!';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (option) => {
        setSearchOption(option);
        setsearchType(option.value)
    };

    const handleSearch = () => {
        if (validateData()) {
            axios.get(`${BASE_URL_ORDER}/orders-api/orders/?courier_status=${activeTab === "All" ? "" : activeTab}&search_by=${searchType}&q=${searchValue}&page_size=${20}&page=${1}`, {
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
            setQueryParamTemp({
                search_by: searchType,
                q: searchValue
            })
            setCurrentPage(1)
        }
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


    console.log(activeTab, "this is active tab data")

    const handleReset = () => {
        setSearchValue("")
        setHandleResetFrom(true)
        setItemsPerPage(20)
        setQueryParamTemp({})
        setSearchOption(SearchOptions[0])

        axios.get(`${BASE_URL_ORDER}/orders-api/orders/?page_size=${20}&page=${1}&courier_status=${activeTab === "All" ? '' : activeTab === "Ready to Ship" ? "Ready_to_ship" : activeTab === "Pickup" ? "manifest" : activeTab}`, {
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
    // const debouncedHandleClick = useCallback(
    //     debounce((param) => handleClick(param), 1000),
    //     []
    //   );

    // const handleReset = () => {
    //     debouncedHandleClick();
    // }

    useEffect(() => {
        let apiUrl = '';
        switch (activeTab) {
            case "All":
                apiUrl = `${BASE_URL_ORDER}/orders-api/orders/?page_size=${itemsPerPage}&page=${currentPage}`;
                break;
            case "Unprocessable":
                apiUrl = `${BASE_URL_ORDER}/orders-api/orders/?courier_status=Unprocessable&page_size=${itemsPerPage}&page=${currentPage}`;
                break;
            case "Processing":
                apiUrl = `${BASE_URL_ORDER}/orders-api/orders/?courier_status=Processing&page_size=${itemsPerPage}&page=${currentPage}`;
                break;
            case "Ready to Ship":
                apiUrl = `${BASE_URL_ORDER}/orders-api/orders/?courier_status=Ready_to_ship&page_size=${itemsPerPage}&page=${currentPage}`;
                break;
            case "Pickup":
                apiUrl = `${BASE_URL_ORDER}/orders-api/orders/?courier_status=manifest&page_size=${itemsPerPage}&page=${currentPage}`;
                break;
            case "Returns":
                apiUrl = `${BASE_URL_ORDER}/orders-api/orders/?courier_status=Returns&page_size=${itemsPerPage}&page=${currentPage}`;
                break;
            default:
                apiUrl = '';
        }

        if (apiUrl) {
            const queryParams = { ...queryParamTemp };
            const queryString = Object.keys(queryParams)
                .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(queryParams[key]))
                .join('&');

            const decodedURL = decodeURIComponent(queryString);

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
                    const start = performance.now();
                    setOrders(response.data.results);
                    const end = performance.now();

                })
                .catch(error => {
                    customErrorFunction(error)
                });
        }
        // }
    }, [orderCancelled,rateRef, orderdelete, JSON.stringify(queryParamTemp), pickupStatus, orderClone, orderUpdateRes, currentPage, itemsPerPage, activeTab, moreorderShipCardStatus]);

    useEffect(() => {
        if (activeTab === "Manifest") {
            axios.get(`${BASE_URL_ORDER}/orders-api/orders/manifest/?page_size=${itemsPerPage}&page=${currentPage}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            })
                .then(response => {
                    setTotalItems(response?.data?.count)
                    setManifestOrders(response.data.results);
                })
                .catch(error => {
                    customErrorFunction(error)
                });
        }
    }, [activeTab, itemsPerPage, currentPage])


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
                                onChange={(e) => setSearchValue(e.target.value)}
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
                                className={`input-field ${errors.customer_order_number || errors.shipping_detail__mobile_number || errors.shipping_detail__email || errors.shipping_detail__recipient_name || errors.shipping_detail__pincode || errors.shipping_detail__city || errors.awb_number ? 'input-field-error' : ''}`}
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
                    </div>
                    <p className='font10 mt-1'>Most Popular Search by
                        <span> COD</span> |
                        <span>Prepaid</span> |
                        <span>Yesterday</span> |
                        <span>One Week</span> |
                        <span>Last Month</span> |
                        <span>Delivered</span> |
                        <span>Cancel order</span> </p>
                </div>
            </div>}

            <div className='orders-section-tabs'>
                {/* All */}
                <div className={`${activeTab === "All" ? "d-block" : "d-none"}`}>
                    <AllOrders
                        orders={orders}
                        activeTab={activeTab}
                        bulkAwb={bulkAwb}
                        MoreFilters={MoreFilters}
                        setbulkAwb={setbulkAwb}
                        handleSearch={handleSearch}
                        selectedRows={selectedRows}
                        setSelectedRows={setSelectedRows}
                        BulkActionShow={BulkActionShow}
                        setBulkActionShow={setBulkActionShow}
                        setCloneOrderSection={setCloneOrderSection}
                        setOrderId={setOrderId}
                        setAwbNo={setAwbNo}
                        setOrderTracking={setOrderTracking}
                        orderStatus={orderStatus}
                        selectAll={selectAll}
                        setSelectAll={setSelectAll}
                        setRateRef={setRateRef}
                    />
                </div>

                {/* Unprocessable */}
                <div className={`${activeTab === "Unprocessable" ? "d-block" : "d-none"}`}>
                    <Unprocessable
                        handleSearch={handleSearch}
                        selectedRows={selectedRows}
                        setSelectedRows={setSelectedRows}
                        BulkActionShow={BulkActionShow}
                        setBulkActionShow={setBulkActionShow}
                        activeTab={activeTab} orders={orders}
                        orderStatus={orderStatus}
                    />
                </div>

                {/* Processing */}
                <div className={`${activeTab === "Processing" ? "d-block" : "d-none"}`}>
                    <Processing
                        orders={orders}
                        activeTab={activeTab}
                        MoreFilters={MoreFilters}
                        bulkAwb={bulkAwb}
                        setbulkAwb={setbulkAwb}
                        setOrderId={setOrderId}
                        handleSearch={handleSearch}
                        selectedRows={selectedRows}
                        setSelectedRows={setSelectedRows}
                        setBulkActionShow={setBulkActionShow}
                        setEditOrderSection={setEditOrderSection}
                        setCloneOrderSection={setCloneOrderSection}
                        setaddTagShow={setaddTagShow}
                        BulkActionShow={BulkActionShow}
                        orderStatus={orderStatus}

                    />
                </div>

                {/* ReadyToShip */}
                <div className={`${activeTab === "Ready to Ship" ? "d-block" : "d-none"}`}>
                    <ReadyToShip
                        bulkAwb={bulkAwb}
                        setAwbNo={setAwbNo}
                        setbulkAwb={setbulkAwb}
                        orders={orders}
                        MoreFilters={MoreFilters}
                        activeTab={activeTab}
                        handleSearch={handleSearch}
                        setBulkActionShow={setBulkActionShow}
                        selectedRows={selectedRows}
                        BulkActionShow={BulkActionShow}
                        setSelectedRows={setSelectedRows}
                        setOrderTracking={setOrderTracking}
                        orderStatus={orderStatus}
                        setPickupStatus={setPickupStatus}
                    />
                </div>

                {/* Pickups */}
                <div className={`${activeTab === "Pickup" ? "d-block" : "d-none"}`}>
                    <Pickups
                        orders={orders}
                        bulkAwb={bulkAwb}
                        setAwbNo={setAwbNo}
                        MoreFilters={MoreFilters}
                        setbulkAwb={setbulkAwb}
                        activeTab={activeTab}
                        handleSearch={handleSearch}
                        setBulkActionShow={setBulkActionShow}
                        selectedRows={selectedRows}
                        BulkActionShow={BulkActionShow}
                        setSelectedRows={setSelectedRows}
                        setOrderTracking={setOrderTracking}
                        orderStatus={orderStatus}
                    />
                </div>

                {/* Manifest */}
                <div className={`${activeTab === "Manifest" ? "d-block" : "d-none"}`}>
                    <Manifest
                        manifestOrders={manifestOrders}
                        setManifestOrders={setManifestOrders}
                        activeTab={activeTab}
                        MoreFilters={MoreFilters}
                        handleSearch={handleSearch}
                        setTotalItems={setTotalItems}
                        setBulkActionShow={setBulkActionShow}
                        orderStatus={orderStatus}
                    />
                </div>

                {/* Returns */}
                <div className={`${activeTab === "Returns" ? "d-block" : "d-none"}`}>
                    <ReturnOrders
                        orders={orders}
                        activeTab={activeTab}
                        MoreFilters={MoreFilters}
                        setAwbNo={setAwbNo}
                        handleSearch={handleSearch}
                        selectedRows={selectedRows}
                        BulkActionShow={BulkActionShow}
                        setBulkActionShow={setBulkActionShow}
                        setSelectedRows={setSelectedRows}
                        setOrderTracking={setOrderTracking}
                        orderStatus={orderStatus}
                    />
                </div>
                <Pagination
                    totalItems={totalItems}
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    setCurrentPage={setCurrentPage}
                    setItemsPerPage={setItemsPerPage}
                />
                {BulkActionShow && (
                    <BulkActionsComponent
                        activeTab={activeTab}
                        setSelectAll={setSelectAll}
                        bulkAwb={bulkAwb}
                        setbulkAwb={setbulkAwb}
                        selectedRows={selectedRows}
                        setaddTagShow={setaddTagShow}
                        setSelectedRows={setSelectedRows}
                        setBulkActionShow={setBulkActionShow}
                        setUpdateWarehouse={setUpdateWarehouse}
                        setUpdateWeight={setUpdateWeight}
                        filterData={filterData}
                        setFilterData={setFilterData}
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
                    addTagShow={addTagShow}
                    setaddTagShow={setaddTagShow}
                    selectedRows={selectedRows}
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
                <AWBTrackingPage setOrderTracking={setOrderTracking} orderTracking={orderTracking} awbNo={awbNo} />
            </section>
            <div onClick={() => setOrderTracking(false)} className={`backdrop ${!orderTracking && 'd-none'}`}></div>
        </>
    )
}

export default OrdersPage;
