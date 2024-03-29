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
import Pagination from './Components/Pagination/Pagination';
import BulkActionsComponent from './Components/BulkActionsComponent/BulkActionsComponent';
import Pickups from './Components/Pickups/Pickups';
// import SearchIcon from '../../../../../assets/image/icons/search-icon.png'
import SearchIcon from '../../../assets/image/icons/search-icon.png'
import MoreFiltersPanel from './Components/MoreFiltersPanel/MoreFiltersPanel';
import { toast } from 'react-toastify';
import moment from 'moment';


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
    const [activeTab, setActiveTab] = useState("Processing");
    const [EditOrderSection, setEditOrderSection] = useState(false)
    const [BulkActionShow, setBulkActionShow] = useState(false)
    const [MoreFilters, setMoreFilters] = useState(false);
    const [backDrop, setBackDrop] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [exportButtonClick, setExportButtonClick] = useState(false)


    const exportCard = useSelector(state => state?.exportSectionReducer?.exportCard)
    const { orderCancelled, orderdelete, orderClone } = useSelector(state => state?.orderSectionReducer)
    let orderCancelledRes = orderCancelled + new Date();
    let orderdeleteRes = orderdelete + new Date();
    let orderClonRes = orderClone + new Date();

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



    let allOrders = `https://dev.shipease.in/orders-api/orders/?seller_id=${sellerData}&page_size=${itemsPerPage}&page=${currentPage}`;
    let unprocessable = `https://dev.shipease.in/orders-api/orders/?seller_id=${sellerData}&courier_status=Unprocessable&page_size=${itemsPerPage}&page=${currentPage}`;
    let processing = `https://dev.shipease.in/orders-api/orders/?seller_id=${sellerData}&courier_status=Processing&page_size=${itemsPerPage}&page=${currentPage}`;
    let readyToShip = `https://dev.shipease.in/orders-api/orders/?seller_id=${sellerData}&courier_status=Ready_to_ship&page_size=${itemsPerPage}&page=${currentPage}`;
    let returnOrders = `https://dev.shipease.in/orders-api/orders/?seller_id=${sellerData}&courier_status=Returns&page_size=${itemsPerPage}&page=${currentPage}`;
    let manifest = `https://dev.shipease.in/orders-api/orders/?seller_id=${sellerData}&courier_status=manifest&page_size=${itemsPerPage}&page=${currentPage}`;

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
            const queryString = Object.keys(queryParamTemp)
                .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(queryParamTemp[key]))
                .join('&');

            if (searchValue?.trim() !== '' && searchValue?.length >= 3) {
                apiUrl += `&q=${encodeURIComponent(searchValue.trim())}`;
            }

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
                    setOrders(response.data.results);
                })
                .catch(error => {
                    toast.error("Something went wrong!")
                });
        }
    }, [orderCancelledRes, orderdeleteRes, orderClonRes, searchValue]);

    const handleSearch = (value) => {
        setSearchValue(value)
    }

    useEffect(() => {
        if (activeTab) {
            setSearchValue("")
        }
    }, [activeTab])

    const handleExport = () => {
        setExportButtonClick(true);
        const requestData = {
            "order_tab": {
                "type": activeTab,
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
        console.log("All Request data",requestData);
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


    console.log(activeTab, "activeTabactiveTabactiveTabactiveTab")

    return (
        <>
            <NavTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            {activeTab != "Manifest" && <div className="box-shadow shadow-sm p7 mb-3 filter-container">
                <div className="search-container">
                    <div className='d-flex'>
                        <label>
                            <input type="text" placeholder="Search for AWB | Order ID | Mobile Number | Email | SKU | Pickup ID" onChange={(e) => handleSearch(e.target.value)} />
                            <button>
                                <img src={SearchIcon} alt="Search" />
                            </button>
                        </label>
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

        </>
    )
}

export default OrdersPage;
