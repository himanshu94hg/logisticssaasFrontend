import React, { useEffect, useState } from 'react';
import NavTabs from './Components/navTabs/NavTabs';
import './MoreOnOrders.css'
import { useDispatch, useSelector } from 'react-redux';
import MergeOrder from './Components/MergeOrder/MergeOrder';
import SplitOrder from './Components/SplitOrder/SplitOrder';
import ReverseOrder from './Components/ReverseOrder/ReverseOrder';
import ReassignOrder from './Components/ReassignOrder/ReassignOrder';
import axios from 'axios';
import Cookies from 'js-cookie';
import Pagination from '../../common/Pagination/Pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';
import { toast } from 'react-toastify';
import moment from 'moment';
import { HiOutlineFilter } from "react-icons/hi";
import { RxReset } from "react-icons/rx";
import MoreFiltersPanel from './Components/MoreFiltersPanel/MoreFiltersPanel';
import BulkActionsComponent from './BulkActionsComponent/BulkActionsComponent';

const SearchOptions = [
    { value: 'awb_number', label: 'AWB' },
    { value: 'customer_order_number', label: 'Order ID' },
    { value: 'shipping_detail__mobile_number', label: 'Mobile' },
    { value: 'shipping_detail__email', label: 'Email' },
    { value: 'shipping_detail__recipient_name', label: 'Name' },
    { value: 'shipping_detail__pincode', label: 'Pincode' },
    { value: 'shipping_detail__city', label: 'City' },
];

const MoreOnOrders = () => {
    const dispatch = useDispatch()
    const sellerData = Cookies.get("user_id")
    let authToken = Cookies.get("access_token")
    const [pageStatus,pageStatusSet]=useState(true)
    const [orders, setOrders] = useState([])
    const [searchValue, setSearchValue] = useState("")
    const [orderId, setOrderId] = useState(null)
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState("");
    const [itemsPerPage, setItemsPerPage] = useState(20);
    const [queryParamTemp, setQueryParamTemp] = useState({})
    const [queryParamSearch, setQueryParamSearch] = useState(null)
    const [activeTab, setActiveTab] = useState("Reassign Order");
    const [EditOrderSection, setEditOrderSection] = useState(false)
    const [BulkActionShow, setBulkActionShow] = useState(false)
    const [MoreFilters, setMoreFilters] = useState(false);
    const [backDrop, setBackDrop] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [exportButtonClick, setExportButtonClick] = useState(false)
    const [SearchOption, setSearchOption] = useState(SearchOptions[0]);
    const [searchType, setsearchType] = useState(SearchOptions[0].value);
    const [addTagShow, setaddTagShow] = useState(false)
    const [UpdateWarehouse, setUpdateWarehouse] = useState(false)
    const exportCard = useSelector(state => state?.exportSectionReducer?.exportCard)
    const { pathName } = useSelector(state => state?.authDataReducer)
    const [handleResetFrom, setHandleResetFrom] = useState(false);
    const apiEndpoint = "https://dev.shipease.in/";
    const activeTabValueSet =
    activeTab === "Reassign Order"
        ? "core-api/shipping/reassign/"
        : activeTab === "Merge Order"
        ? "orders-api/orders/merge-order/"
        : activeTab === "Split Order"
        ? "orders-api/orders/split-order/"
        : "";


    console.log("activeTabValueSetactiveTabValueSetactiveTabValueSet",activeTabValueSet,activeTab)

    const handleSidePanel = () => {
        setMoreFilters(true);
        setBackDrop(true)
    }

    const CloseSidePanel = () => {
        setMoreFilters(false);
        setBackDrop(false)
    }

    const handleSearch = () => {
        axios.get(`${apiEndpoint}${activeTabValueSet}?search_by=${searchType}&q=${searchValue}&page_size=${20}&page=${1}`, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        })
            .then(response => {
                setTotalItems(response?.data?.count)
                setOrders(response.data.results);
                pageStatusSet(false)
            })
            .catch(error => {
                toast.error("Something went wrong!")
            });
            setQueryParamTemp({
                search_by:searchType,
                q:searchValue
            })
            setCurrentPage(1)
    }


    console.log(totalItems, "this is totalItemstotalItemstotalItems")
    useEffect(() => {
        if (activeTab) {
            setSearchValue("");
            setQueryParamTemp({});
            setQueryParamSearch(null);
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
        if (pageStatus) {
            switch (activeTab) {
                case "Reassign Order":
                    apiUrl = `${apiEndpoint}${activeTabValueSet}?page_size=${itemsPerPage}&page=${currentPage}`;
                    break;
                case "Merge Order":
                    apiUrl = `${apiEndpoint}${activeTabValueSet}?page_size=${itemsPerPage}&page=${currentPage}`;
                    break;
                case "Split Order":
                    apiUrl = `${apiEndpoint}${activeTabValueSet}?page_size=${itemsPerPage}&page=${currentPage}`;
                    break;
                case "Reverse Order":
                    apiUrl = `${apiEndpoint}${activeTabValueSet}?page_size=${itemsPerPage}&page=${currentPage}`;
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
    }, [activeTab, JSON.stringify(queryParamTemp), currentPage, itemsPerPage]);

    console.log( activeTab, queryParamTemp, currentPage, itemsPerPage,"this is involve data")


    const handleChange = (option) => {
        setSearchOption(option);
        setsearchType(option.value)
    };

    useEffect(() => {
        if (BulkActionShow) {
            setBulkActionShow(false)
            setSelectedRows([])

        }
    }, [activeTab])
    
    const handleReset = () => {
        setSearchValue("")
        setHandleResetFrom(true)
        setQueryParamTemp({})
        axios.get(`${apiEndpoint}${activeTabValueSet}?page_size=${20}&page=${1}`, {
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
                        <button className='btn main-button-outline ms-2'  onClick={() => handleReset()}><RxReset className='align-text-bottom' /> Reset</button>
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
                {/* reassign */}
                <div className={`${activeTab === "Reassign Order" ? "d-block" : "d-none"}`}>
                    <ReassignOrder activeTab={activeTab} orders={orders} handleSearch={handleSearch} selectedRows={selectedRows} setSelectedRows={setSelectedRows} setBulkActionShow={setBulkActionShow} />
                </div>

                {/* merge */}
                <div className={`${activeTab === "Merge Order" ? "d-block" : "d-none"}`}>
                    <MergeOrder activeTab={activeTab} orders={orders} handleSearch={handleSearch} selectedRows={selectedRows} setSelectedRows={setSelectedRows} setBulkActionShow={setBulkActionShow} />
                </div>

                {/* split */}
                <div className={`${activeTab === "Split Order" ? "d-block" : "d-none"}`}>
                    <SplitOrder activeTab={activeTab} orders={orders} handleSearch={handleSearch} selectedRows={selectedRows} setSelectedRows={setSelectedRows} setBulkActionShow={setBulkActionShow} />
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
                        setaddTagShow={setaddTagShow}
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
            <div className={`backdrop ${backDrop ? 'd-block' : 'd-none'}`}></div>

        </>
    )
}

export default MoreOnOrders;
