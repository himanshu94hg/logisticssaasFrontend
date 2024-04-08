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
import AddTagPop from './Components/BulkActionsComponent/Components/AddTagPop/AddTagPop';
import WarehouseUpdatePop from './Components/BulkActionsComponent/Components/WarehouseUpdatePop/WarehouseUpdatePop';
import WeightUpdatePop from './Components/BulkActionsComponent/Components/WeightUpdatePop/WeightUpdatePop';

const SearchOptions = [
    { value: 'awb_number', label: 'AWB' },
    { value: 'customer_order_number', label: 'Order ID' },
    { value: 'shipping_detail__mobile_number', label: 'Mobile' },
    { value: 'shipping_detail__email', label: 'Email' },
    { value: 'shipping_detail__recipient_name', label: 'Name' },
    { value: 'shipping_detail__pincode', label: 'Pincode' },
    { value: 'shipping_detail__city', label: 'City' },
];

const OrdersPage = () => {
    const dispatch = useDispatch()
    const sellerData = Cookies.get("user_id")
    let authToken = Cookies.get("access_token")
    const [pageStatus, pageStatusSet] = useState(true)
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
    const [searchType, setsearchType] = useState(SearchOptions[0].value);
    const [handleResetFrom, setHandleResetFrom] = useState(false);
    const exportCard = useSelector(state => state?.exportSectionReducer?.exportCard)
    const { orderCancelled, orderdelete, orderClone, orderUpdateRes, favListData } = useSelector(state => state?.orderSectionReducer)
    const [addTagShow, setaddTagShow] = useState(false)
    // const {exportCard}=useSelector(state=>state?.billingSectionReducer)

    const [queryName, setQueryName] = useState([])

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

    console.log(queryName, "billingShipingReceiptExportCard")
    const [UpdateWarehouse, setUpdateWarehouse] = useState(false)
    const [UpdateWeight, setUpdateWeight] = useState(false)

    useEffect(() => {

        if (orderdelete) {
            setSelectedRows([])
            setBulkActionShow(false)
        }

    }, [orderdelete])

    const handleSidePanel = () => {
        setMoreFilters(true);
        setBackDrop(true)
    }

    const CloseSidePanel = () => {
        setMoreFilters(false);
        setBackDrop(false)
    }

    const handleSearch = () => {
        axios.get(`https://dev.shipease.in/orders-api/orders/?search_by=${searchType}&q=${searchValue}&page_size=${20}&page=${1}`, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        })
            .then(response => {
                setTotalItems(response?.data?.count)
                setOrders(response.data.results);
                setSearchValue('');
                pageStatusSet(false)
            })
            .catch(error => {
                toast.error("Something went wrong!")
            });
    }


    useEffect(() => {
        if (activeTab) {
            setSearchValue("");
            setQueryParamTemp({});
            setQueryParamSearch(null);
            dispatch({ type: "GET_SAVE_FAVOURITE_ORDERS_ACTION" })
        }
    }, [activeTab])

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



    useEffect(() => {
        let apiUrl = '';
        if (pageStatus) {
            switch (activeTab) {
                case "All Orders":
                    apiUrl = `https://dev.shipease.in/orders-api/orders/?page_size=${itemsPerPage}&page=${currentPage}`;
                    break;
                case "Unprocessable":
                    apiUrl = `https://dev.shipease.in/orders-api/orders/?courier_status=Unprocessable&page_size=${itemsPerPage}&page=${currentPage}`;
                    break;
                case "Processing":
                    apiUrl = `https://dev.shipease.in/orders-api/orders/?courier_status=Processing&page_size=${itemsPerPage}&page=${currentPage}`;
                    break;
                case "Ready to Ship":
                    apiUrl = `https://dev.shipease.in/orders-api/orders/?courier_status=Ready_to_ship&page_size=${itemsPerPage}&page=${currentPage}`;
                    break;
                case "Pickup":
                    apiUrl = `https://dev.shipease.in/orders-api/orders/?courier_status=manifest&page_size=${itemsPerPage}&page=${currentPage}`;
                    break;
                case "Returns":
                    apiUrl = `https://dev.shipease.in/orders-api/orders/?courier_status=Returns&page_size=${itemsPerPage}&page=${currentPage}`;
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
                        setOrders(response.data.results);
                    })
                    .catch(error => {
                        toast.error("Api Call failed!")
                    });
            }
        }
    }, [orderCancelled, orderdelete, orderClone, orderUpdateRes, activeTab, queryParamTemp, currentPage, itemsPerPage]);


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


    const handleChange = (option) => {
        setSearchOption(option);
        setsearchType(option.value)
    };

    // const handleAddTagPop = () => {
    //     setaddTagShow(false)
    // }


    useEffect(() => {
        if (BulkActionShow) {
            setBulkActionShow(false)
            setSelectedRows([])

        }
    }, [activeTab])

    const handleReset = () => {
        setSearchValue("")
        setHandleResetFrom(true)
    }




    return (
        <>
            <NavTabs activeTab={activeTab} setActiveTab={setActiveTab} pageStatusSet={pageStatusSet} />
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
                                <HiOutlineFilter className='align-text-bottom' />More Filters
                            </button>
                            <button className="btn main-button dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                                <span className="visually-hidden" >Toggle Dropdown</span>
                            </button>
                            <ul
                                className="dropdown-menu"
                                type="button"
                                style={{
                                    paddingInline: '12px',
                                    minWidth: '110px',
                                }}
                            >
                                {queryName?.map((item) => {
                                    return (
                                        <li>{item?.filter_name}</li>
                                    )
                                })}
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
                        BulkActionShow={BulkActionShow}
                        setBulkActionShow={setBulkActionShow}
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
                        setaddTagShow={setaddTagShow}
                        BulkActionShow={BulkActionShow}
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
                        BulkActionShow={BulkActionShow}
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
                        BulkActionShow={BulkActionShow}
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
                        selectedRows={selectedRows}
                        BulkActionShow={BulkActionShow}
                        setBulkActionShow={setBulkActionShow}
                        setSelectedRows={setSelectedRows}
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
                        selectedRows={selectedRows}
                        setaddTagShow={setaddTagShow}
                        setSelectedRows={setSelectedRows}
                        setBulkActionShow={setBulkActionShow}
                        setUpdateWarehouse={setUpdateWarehouse}
                        setUpdateWeight={setUpdateWeight}
                    />
                )
                }
            </div>

            <EditOrder setEditOrderSection={setEditOrderSection} EditOrderSection={EditOrderSection} orderId={orderId} />
            <MoreFiltersPanel
                MoreFilters={MoreFilters}
                activeTab={activeTab}
                CloseSidePanel={CloseSidePanel}
                handleMoreFilter={handleMoreFilter}
                handleResetFrom={handleResetFrom}
                setHandleResetFrom={setHandleResetFrom}
            />
            <div className={`backdrop ${backDrop ? 'd-flex' : 'd-none'}`}></div>

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
                    setUpdateWeight={setUpdateWeight}
                />
                {UpdateWeight &&
                    <div onClick={() => setUpdateWeight(false)} className="backdrop"></div>
                }
            </section>
        </>
    )
}

export default OrdersPage;
