import React, { useEffect, useState } from 'react';
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
import { toast } from 'react-toastify';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';
import { HiOutlineFilter } from "react-icons/hi";
import { RxReset } from "react-icons/rx";

const SearchOptions = [
    { value: 'awb', label: 'AWB' },
    { value: 'order_id', label: 'Order ID' },
    { value: 'mobile', label: 'Mobile' },
    { value: 'email', label: 'Email' },
    { value: 'name', label: 'Name' },
    { value: 'sku', label: 'SKU' },
    { value: 'picup_address', label: 'Pickup Address' },
];

const OrdersPage = () => {
    const dispatch = useDispatch()
    const sellerData = Cookies.get("user_id")
    let authToken = Cookies.get("access_token")
    const [orders, setOrders] = useState([])
    const [searchValue, setSearchValue] = useState("")
    const [orderId, setOrderId] = useState(null)
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState("");
    const [itemsPerPage, setItemsPerPage] = useState(20);
    const [queryParamTemp, setQueryParamTemp] = useState({})
    const [queryParamSearch, setQueryParamSearch] = useState(null)
    const [activeTab, setActiveTab] = useState("Processing");
    const [EditOrderSection, setEditOrderSection] = useState(false)
    const [BulkActionShow, setBulkActionShow] = useState(false)
    const [MoreFilters, setMoreFilters] = useState(false);
    const [backDrop, setBackDrop] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [exportButtonClick, setExportButtonClick] = useState(false)
    const [SearchOption, setSearchOption] = useState(SearchOptions[0]);
    const exportCard = useSelector(state => state?.exportSectionReducer?.exportCard)
    const { orderCancelled, orderdelete, orderClone } = useSelector(state => state?.orderSectionReducer)

    const handleSidePanel = () => {
        setMoreFilters(true);
        setBackDrop(true)
    }

    const CloseSidePanel = () => {
        setMoreFilters(false);
        setBackDrop(false)
    }

    const handleSearch = () => {
        setQueryParamSearch(searchValue);
        setSearchValue('');
      
    }

    useEffect(() => {
        if (activeTab) {
            setSearchValue("");
            setQueryParamTemp({});
            setQueryParamSearch(null);
        }
    }, [activeTab])

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

    let allOrders = `https://dev.shipease.in/orders-api/orders/?seller_id=${sellerData}&page_size=${itemsPerPage}&page=${currentPage}`;
    let unprocessable = `https://dev.shipease.in/orders-api/orders/?seller_id=${sellerData}&courier_status=Unprocessable&page_size=${itemsPerPage}&page=${currentPage}`;
    let processing = `https://dev.shipease.in/orders-api/orders/?seller_id=${sellerData}&courier_status=Processing&page_size=${itemsPerPage}&page=${currentPage}`;
    let readyToShip = `https://dev.shipease.in/orders-api/orders/?seller_id=${sellerData}&courier_status=Ready_to_ship&page_size=${itemsPerPage}&page=${currentPage}`;
    let returnOrders = `https://dev.shipease.in/orders-api/orders/?seller_id=${sellerData}&courier_status=Returns&page_size=${itemsPerPage}&page=${currentPage}`;
    let manifest = `https://dev.shipease.in/orders-api/orders/?seller_id=${sellerData}&courier_status=manifest&page_size=${itemsPerPage}&page=${currentPage}`;

    // useEffect(() => {
    //     let apiUrl = '';
    //     switch (activeTab) {
    //         case "All Orders":
    //             apiUrl = allOrders;
    //             break;
    //         case "Unprocessable":
    //             apiUrl = unprocessable;
    //             break;
    //         case "Processing":
    //             apiUrl = processing;
    //             break;
    //         case "Ready to Ship":
    //             apiUrl = readyToShip;
    //             break;
    //         case "Pickup":
    //             apiUrl = manifest;
    //             break;
    //         case "Returns":
    //             apiUrl = returnOrders;
    //             break;
    //         default:
    //             apiUrl = '';
    //     }

    //     if (apiUrl) {
    //         const queryParams = { ...queryParamTemp };
    //         // if (queryParamSearch) {
    //         //     queryParams['q'] = queryParamSearch;
    //         // }
    //         const queryString = Object.keys(queryParams)
    //             .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(queryParams[key]))
    //             .join('&');

    //         if (queryString) {
    //             apiUrl += '&' + queryString;
    //         }
    //         axios.get(apiUrl, {
    //             headers: {
    //                 Authorization: `Bearer ${authToken}`
    //             }
    //         })
    //             .then(response => {
    //                 setTotalItems(response?.data?.count)
    //                 setOrders(response.data.results);
    //             })
    //             .catch(error => {
    //                 toast.error("Something went wrong!")
    //             });
    //     }
    // }, [orderCancelled, orderdelete, orderClone, activeTab, queryParamTemp, currentPage, itemsPerPage]);
    useEffect(() => {
        let apiUrl = '';
        switch (activeTab) {
            case "All Orders":
                apiUrl = allOrders;
                break;
            case "Unprocessable":
                apiUrl = unprocessable;
                break;
            case "Processing":
                apiUrl = processing;
                break;
            case "Ready to Ship":
                apiUrl = readyToShip;
                break;
            case "Pickup":
                apiUrl = manifest;
                break;
            case "Returns":
                apiUrl = returnOrders;
                break;
            default:
                apiUrl = '';
        }

        if (apiUrl) {
            if (queryParamSearch) {
                // If search is active, construct API URL with search parameters
                apiUrl += `&q=${queryParamSearch}`;
            } else {
                // If search is not active, construct API URL without search parameters
                const queryParams = { ...queryParamTemp };
                const queryString = Object.keys(queryParams)
                    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(queryParams[key]))
                    .join('&');
                if (queryString) {
                    apiUrl += '&' + queryString;
                }
            }

            axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            })
                .then(response => {
                    setTotalItems(response?.data?.count)
                    setOrders(response.data.results);
                })
                .catch(error => {
                    toast.error("Something went wrong!")
                });
        }
    }, [orderCancelled, orderdelete, orderClone, activeTab, queryParamSearch, queryParamTemp, currentPage, itemsPerPage]);

    const handleExport = () => {
        setExportButtonClick(true);
        const requestData = {
            "order_tab": {
                "type": activeTab === "All Orders" ? "" : activeTab,
                "subtype": ""
            },
            "order_id": `${selectedRows.join(',')}`,
            "courier": "",
            "awb_number": "",
            "min_awb_assign_date": "",
            "max_awb_assign_date": "",
            "status": "",
            "order_type": "",
            "customer_order_number": "",
            "channel": "",
            "min_invoice_amount": "",
            "max_invoice_amount": "",
            "warehouse_id": "",
            "product_name": "",
            "delivery_address": "",
            "min_weight": "",
            "max_weight": "",
            "min_product_qty": "",
            "max_product_qty": "",
            "rto_status": false,
            "global_type": "",
            "payment_type": ""
        };
        console.log("All Request data", requestData);
        dispatch({ type: "EXPORT_DATA_ACTION", payload: requestData });
    };

    useEffect(() => {
        if (exportButtonClick) {
            var FileSaver = require('file-saver');
            var blob = new Blob([exportCard], { type: 'application/ms-excel' });
            FileSaver.saveAs(blob, `${activeTab}.xlsx`);
            setExportButtonClick(false);
        }
    }, [exportCard]);

    console.log(activeTab, searchValue, "this is a circle data")


    const handleChange = (SearchOption) => {
        setSearchOption(SearchOption);
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
                            <input className='input-field' type="search" value={searchValue} placeholder="Search for AWB | Order ID | Mobile Number | Email | SKU | Pickup ID" onChange={(e) => setSearchValue(e.target.value)} />
                            <button onClick={() => handleSearch()}>
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
                            <ul className="dropdown-menu" style={{ paddingInline: '12px', minWidth: '190px' }}>
                                <li>Filter 1</li>
                                <li>Filter 2</li>
                                <li>Filter 3</li>
                                <li>Filter 4</li>
                            </ul>
                        </div>
                        <button className='btn main-button-outline ms-2'><RxReset className='align-text-bottom' /> Reset</button>
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

            <div className='orders-section-tabs'>
                {/* All Orders */}
                <div className={`${activeTab === "All Orders" ? "d-block" : "d-none"}`}>
                    <AllOrders
                        orders={orders}
                        activeTab={activeTab}
                        handleSearch={handleSearch}
                        selectedRows={selectedRows}
                        setSelectedRows={setSelectedRows}
                        setBulkActionShow={setBulkActionShow}
                    />
                </div>

                {/* Unprocessable */}
                <div className={`${activeTab === "Unprocessable" ? "d-block" : "d-none"}`}>
                    <Unprocessable
                        handleSearch={handleSearch}
                        selectedRows={selectedRows}
                        setSelectedRows={setSelectedRows}
                        setBulkActionShow={setBulkActionShow}
                        activeTab={activeTab} orders={orders}
                    />
                </div>

                {/* Processing */}
                <div className={`${activeTab === "Processing" ? "d-block" : "d-none"}`}>
                    <Processing
                        orders={orders}
                        activeTab={activeTab}
                        setOrderId={setOrderId}
                        handleSearch={handleSearch}
                        selectedRows={selectedRows}
                        setSelectedRows={setSelectedRows}
                        setBulkActionShow={setBulkActionShow}
                        setEditOrderSection={setEditOrderSection}
                    />
                </div>

                {/* ReadyToShip */}
                <div className={`${activeTab === "Ready to Ship" ? "d-block" : "d-none"}`}>
                    <ReadyToShip
                        orders={orders}
                        activeTab={activeTab}
                        handleSearch={handleSearch}
                        setBulkActionShow={setBulkActionShow}
                        selectedRows={selectedRows}
                        setSelectedRows={setSelectedRows}
                    />
                </div>

                {/* Pickups */}
                <div className={`${activeTab === "Pickup" ? "d-block" : "d-none"}`}>
                    <Pickups
                        orders={orders}
                        activeTab={activeTab}
                        handleSearch={handleSearch}
                        setBulkActionShow={setBulkActionShow}
                        selectedRows={selectedRows}
                        setSelectedRows={setSelectedRows}
                    />
                </div>

                {/* Manifest */}
                <div className={`${activeTab === "Manifest" ? "d-block" : "d-none"}`}>
                    <Manifest setBulkActionShow={setBulkActionShow} activeTab={activeTab} orders={orders} handleSearch={handleSearch} />
                </div>

                {/* Returns */}
                <div className={`${activeTab === "Returns" ? "d-block" : "d-none"}`}>
                    <ReturnOrders
                        orders={orders}
                        activeTab={activeTab}
                        handleSearch={handleSearch}
                        setBulkActionShow={setBulkActionShow}
                        selectedRows={selectedRows}
                        setSelectedRows={setSelectedRows}
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
                    <BulkActionsComponent />
                )
                }
            </div>

            <EditOrder setEditOrderSection={setEditOrderSection} EditOrderSection={EditOrderSection} orderId={orderId} />
            <MoreFiltersPanel
                MoreFilters={MoreFilters}
                activeTab={activeTab}
                CloseSidePanel={CloseSidePanel}
                handleMoreFilter={handleMoreFilter}
            />
            <div className={`backdrop ${backDrop ? 'd-block' : 'd-none'}`}></div>


        </>
    )
}

export default OrdersPage;
