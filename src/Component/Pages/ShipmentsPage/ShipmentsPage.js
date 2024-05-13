import React, { useEffect, useState } from 'react';
import NavTabs from './Components/navTabs/NavTabs';
import { useDispatch, useSelector } from 'react-redux';
import RTOShipment from './Components/RTOShipment/RTOShipment';
import ActionRequired from './Components/ActionRequired/ActionRequired';
import ActionRequested from './Components/ActionRequested/ActionRequested';
import DeliveredShipment from './Components/DeliveredShipment/DeliveredShipment';
import MoreFiltersPanel from './Components/MoreFiltersPanel/MoreFiltersPanel';
import Pagination from '../../common/Pagination/Pagination';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { HiOutlineFilter } from "react-icons/hi";
import { RxReset } from "react-icons/rx";
import BulkActionsComponent from './Components/BulkActionsComponent/BulkActionsComponent';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import moment from 'moment';
import { BASE_URL_ORDER } from '../../../axios/config';
import { customErrorFunction } from '../../../customFunction/errorHandling';

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
    const [activeTab, setActiveTab] = useState("Action Required");
    const dispatch = useDispatch()
    const [selectedOption, setSelectedOption] = useState("Domestic");
    const [isOpen, setIsOpen] = useState(false);
    const [itemsPerPage, setItemsPerPage] = useState(20);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState("");
    const [MoreFilters, setMoreFilters] = useState(false);
    const [backDrop, setBackDrop] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [searchValue, setSearchValue] = useState("")
    const reattemptOrderIds = selectedRows.join(',');
    const [SearchOption, setSearchOption] = useState(SearchOptions[0]);
    const [searchType, setsearchType] = useState(SearchOptions[0].value);
    const [BulkActionShow, setBulkActionShow] = useState(false)
    const [errors, setErrors] = useState({});
    let authToken = Cookies.get("access_token")
    const [pageStatus, pageStatusSet] = useState(true)
    const [queryName, setQueryName] = useState([])
    const [shipmentCard, setShipment] = useState([])
    const [handleResetFrom, setHandleResetFrom] = useState(false);
    const [queryParamTemp, setQueryParamTemp] = useState({})
    const [queryParamSearch, setQueryParamSearch] = useState(null)
    const tabData = activeTab === "Action Required" ? "pending" : activeTab === "Action Requested" ? "requested" : activeTab === "Delivered" ? "delivered" : "rto";
    const apiEndpoint =`${BASE_URL_ORDER}`;

    const handleSidePanel = () => {
        setMoreFilters(true);
        setBackDrop(true)
    }

    const CloseSidePanel = () => {
        setMoreFilters(false);
        setBackDrop(false)
    }

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    const toggleOptions = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        let apiUrl = '';
        switch (activeTab) {
            case "Action Required":
                apiUrl = `${apiEndpoint}/orders-api/orders/shipment/?action=pending&page_size=${itemsPerPage}&page=${currentPage}`;
                break;
            case "Action Requested":
                apiUrl = `${apiEndpoint}/orders-api/orders/shipment/?action=requested&page_size=${itemsPerPage}&page=${currentPage}`;
                break;
            case "RTO":
                apiUrl = `${apiEndpoint}/orders-api/orders/shipment/?action=rto&page_size=${itemsPerPage}&page=${currentPage}`;
                break;
            case "Delivered":
                apiUrl = `${apiEndpoint}/orders-api/orders/shipment/?action=delivered&page_size=${itemsPerPage}&page=${currentPage}`;
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
                })
                .catch(error => {
                    customErrorFunction(error);
                });
        }
    }, [JSON.stringify(queryParamTemp), activeTab, currentPage, itemsPerPage]);
      

    const shipmentCardData = useSelector(state => state?.shipmentSectionReducer?.shipmentCard)

    console.log(shipmentCard.length, "Active Tab DADA")

    useEffect(() => {
        if (shipmentCardData && shipmentCardData.length) {
            setShipment(shipmentCardData);
            setTotalItems(shipmentCardData.length);
        }
    }, [shipmentCardData]);


    console.log(activeTab, "Active Tab")

    const handleReattemptOrder = (() => {
        dispatch({ type: "SHIPMENT_REATTEMPT_DATA_ACTION", payload: { "order_ids": reattemptOrderIds } });
    });

    const handleRtoOrder = (() => {
        dispatch({ type: "SHIPMENT_RTO_DATA_ACTION", payload: { "order_ids": reattemptOrderIds } });
    });

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
        console.log(newErrors, "this is new errors")
        return Object.keys(newErrors).length === 0;
    };

    const handleSearch = () => {
        if (validateData()) {
            axios.get(`${apiEndpoint}/orders-api/orders/shipment/?action=${tabData}&search_by=${searchType}&q=${searchValue}&page_size=${20}&page=${1}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            })
                .then(response => {
                    setTotalItems(response?.data?.count)
                    setShipment(response.data?.results);
                    pageStatusSet(false)
                })
                .catch(error => {
                    customErrorFunction(error);
                });
                setQueryParamTemp({
                    search_by:searchType,
                    q:searchValue
                })
                setCurrentPage(1)
        }
    };

    useEffect(() => {
        if (BulkActionShow) {
            setBulkActionShow(false)
            setSelectedRows([])

        }
    }, [activeTab])

    const handleReset = () => {
        setSearchValue("")
        pageStatusSet(true);
        setHandleResetFrom(true)
        setQueryParamTemp({})
        axios.get(`${apiEndpoint}/orders-api/orders/shipment/?action=${tabData}&page_size=${itemsPerPage}&page=${currentPage}`, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        })
            .then(response => {
                setTotalItems(response?.data?.count)
                setShipment(response?.data?.results);
            })
            .catch(error => {
                customErrorFunction(error);
            });
    }

    const handleChange = (option) => {
        setSearchOption(option);
        setsearchType(option.value)
    };

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
                            <input className={`input-field ${errors.customer_order_number || errors.shipping_detail__mobile_number || errors.shipping_detail__email || errors.shipping_detail__recipient_name || errors.shipping_detail__pincode || errors.shipping_detail__city || errors.awb_number ? 'input-field-error' : ''}`} type="search" value={searchValue} placeholder="Search for AWB | Order ID | Mobile Number | Email | SKU | Pickup ID" onChange={(e) => setSearchValue(e.target.value)} />
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
                                {queryName?.map((item) => {
                                    return (
                                        <>
                                            <li>{item?.filter_name}</li>
                                        </>
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
            </div>}
            <div className='orders-section-tabs'>
                <div className={`${activeTab === "Action Required" ? "d-block" : "d-none"}`}>
                    <ActionRequired shipmentCard={shipmentCard}
                        selectedRows={selectedRows}
                        setSelectedRows={setSelectedRows}
                        setBulkActionShow={setBulkActionShow}
                    />
                </div>

                <div className={`${activeTab === "Action Requested" ? "d-block" : "d-none"}`}>
                    <ActionRequested shipmentCard={shipmentCard}
                        selectedRows={selectedRows}
                        setSelectedRows={setSelectedRows}
                        setBulkActionShow={setBulkActionShow}
                    />
                </div>

                <div className={`${activeTab === "RTO" ? "d-block" : "d-none"}`}>
                    <RTOShipment shipmentCard={shipmentCard}
                        selectedRows={selectedRows}
                        setSelectedRows={setSelectedRows}
                        setBulkActionShow={setBulkActionShow}
                    />
                </div>

                <div className={`${activeTab === "Delivered" ? "d-block" : "d-none"}`}>
                    <DeliveredShipment shipmentCard={shipmentCard}
                        selectedRows={selectedRows}
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
                    <BulkActionsComponent activeTab={activeTab} selectedRows={selectedRows} setSelectedRows={setSelectedRows}/>
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

export default ShipmentsPage;
