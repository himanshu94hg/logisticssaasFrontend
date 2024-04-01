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
import { HiOutlineFilter } from "react-icons/hi";
import { RxReset } from "react-icons/rx";
import MoreFiltersPanel from './Components/MoreFiltersPanel/MoreFiltersPanel';

const SearchOptions = [
    { value: 'awb', label: 'AWB' },
    { value: 'order_id', label: 'Order ID' },
    { value: 'mobile', label: 'Mobile' },
    { value: 'email', label: 'Email' },
    { value: 'name', label: 'Name' },
    { value: 'sku', label: 'SKU' },
    { value: 'picup_address', label: 'Pickup Address' },
];


const MoreOnOrders = () => {
    const dispatch = useDispatch();
    const [selectedOption, setSelectedOption] = useState("Domestic");
    const [activeTab, setActiveTab] = useState("Merge Order");
    const [isOpen, setIsOpen] = useState(false);
    const [orders, setOrders] = useState([])
    const [searchValue, setSearchValue] = useState("")
    const [reassignedOrderId, setReassignedOrderId] = useState(null);
    const [itemsPerPage, setItemsPerPage] = useState(20);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState("");
    const [SearchOption, setSearchOption] = useState(SearchOptions[0]);
    const [MoreFilters, setMoreFilters] = useState(false);
    const [backDrop, setBackDrop] = useState(false);
    const [exportButtonClick, setExportButtonClick] = useState(false)
    const [selectedRows, setSelectedRows] = useState([]);

    const exportCard = useSelector(state => state?.exportSectionReducer?.exportCard)

    const handleSidePanel = () => {
        setMoreFilters(true);
        setBackDrop(true)
    }

    const sellerData = Cookies.get("user_id")
    let authToken = Cookies.get("access_token")

    const { orderCancelled, orderdelete, orderClone } = useSelector(state => state?.orderSectionReducer)
    const { pathName } = useSelector(state => state?.authDataReducer)


    let reassign = `https://dev.shipease.in/core-api/shipping/reassign/`
    let merge = `https://dev.shipease.in/orders-api/orders/merge-order/`
    let split = `https://dev.shipease.in/orders-api/orders/split-order/`
    let reverse = `https://dev.shipease.in/orders-api/orders/reverse-order/`

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
                apiUrl = `${reassign}?page=${currentPage}&page_size=${itemsPerPage}`;
                break;
            case "Merge Order":
                apiUrl = `${merge}?page=${currentPage}&page_size=${itemsPerPage}`;
                break;
            case "Split Order":
                apiUrl = `${split}?page=${currentPage}&page_size=${itemsPerPage}`;
                break;
            case "Reverse Order":
                apiUrl = `${reverse}?page=${currentPage}&page_size=${itemsPerPage}`;
                break;
            default:
                apiUrl = '';
        }

        if (apiUrl) {
            if (searchValue?.trim() !== '' && searchValue?.length >= 3) {
                apiUrl += `&q=${encodeURIComponent(searchValue.trim())}`;
            }

            axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            })
                .then(response => {
                    console.log('Data is data:', response.data.results);
                    setTotalItems(response?.data?.count)
                    setOrders(response.data.results);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    }, [activeTab, orderCancelled, orderdelete, orderClone, sellerData, searchValue, itemsPerPage, currentPage]);


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


    const handleSearch = (value) => {
        setSearchValue(value)
    }

    const handleReassignOrder = (orderId) => {
        setReassignedOrderId(orderId);
    };

    const handleChange = (SearchOption) => {
        setSearchOption(SearchOption);
    };

    const CloseSidePanel = () => {
        setMoreFilters(false);
        setBackDrop(false)
    }

    return (
        <>
            <NavTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            {activeTab != "Manifest" && <div className="box-shadow shadow-sm p7 filter-container">
                <div className="search-container">
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
                {/* reassign */}
                <div className={`${activeTab === "Reassign Order" ? "d-block" : "d-none"}`}>
                    <ReassignOrder activeTab={activeTab} orders={orders} handleSearch={handleSearch} />
                </div>

                {/* merge */}
                <div className={`${activeTab === "Merge Order" ? "d-block" : "d-none"}`}>
                    <MergeOrder activeTab={activeTab} orders={orders} handleSearch={handleSearch} />
                </div>

                {/* split */}
                <div className={`${activeTab === "Split Order" ? "d-block" : "d-none"}`}>
                    <SplitOrder activeTab={activeTab} orders={orders} handleSearch={handleSearch} />
                </div>

                {/* reverse */}
                <div className={`${activeTab === "Reverse Order" ? "d-block" : "d-none"}`}>
                    <ReverseOrder activeTab={activeTab} orders={orders} handleSearch={handleSearch} />
                </div>

                <Pagination
                    totalItems={totalItems}
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    setItemsPerPage={setItemsPerPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>


            <MoreFiltersPanel
                MoreFilters={MoreFilters}
                activeTab={activeTab}
                CloseSidePanel={CloseSidePanel}
            />
            <div className={`backdrop ${backDrop ? 'd-block' : 'd-none'}`}></div>

        </>
    )
}

export default MoreOnOrders