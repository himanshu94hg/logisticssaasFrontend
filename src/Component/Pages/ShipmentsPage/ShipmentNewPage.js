import axios from 'axios';
import moment from 'moment';
import Cookies from 'js-cookie';
import Select from 'react-select';
import { DUMMY_SHIPMENTS, DUMMY_SHIPMENT_NEW_KPI } from '../../../mockData/dashboardDummyData';
import { RxReset } from "react-icons/rx";
import { HiOutlineFilter } from "react-icons/hi";
import globalDebouncedClick from '../../../debounce';
import { BASE_URL_ORDER } from '../../../axios/config';
import { useDispatch, useSelector } from 'react-redux';
import LoaderScreen from '../../LoaderScreen/LoaderScreen';
import Pagination from '../../common/Pagination/Pagination';
import React, { useEffect, useState } from 'react';
import AWBTrackingPage from '../AWBTrackingPage/AWBTrackingPage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ThreeDots from '../../../assets/image/icons/ThreeDots.png';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { customErrorFunction } from '../../../customFunction/errorHandling';
import MoreFiltersPanel from './Components/MoreFiltersPanel/MoreFiltersPanel';
import UnifiedShipmentTable from './Components/UnifiedShipmentTable/UnifiedShipmentTable';
import BulkActionsComponent from './Components/BulkActionsComponent/BulkActionsComponent';
import CustomTooltip from '../../common/CustomTooltip/CustomTooltip';
import './ShipmentsPage.css';

const SearchOptions = [
    { value: 'awb_number', label: 'AWB' },
    { value: 'customer_order_number', label: 'Order ID' },
    { value: 'shipping_detail__mobile_number', label: 'Mobile' },
    { value: 'shipping_detail__email', label: 'Email' },
    { value: 'shipping_detail__recipient_name', label: 'Name' },
    { value: 'shipping_detail__pincode', label: 'Pincode' },
    { value: 'shipping_detail__city', label: 'City' },
];

const TAB_TYPES = [
    { action: 'pending', label: 'Action Required' },
    { action: 'requested', label: 'Action Requested' },
    { action: 'rto', label: 'RTO' },
    { action: 'delivered', label: 'Delivered' },
];

const ShipmentNewPage = () => {
    const dispatch = useDispatch();
    const isLocalBypass = process.env.REACT_APP_BYPASS_LOGIN === 'true';
    const apiEndpoint = `${BASE_URL_ORDER}`;
    const authToken = Cookies.get("access_token");
    const [awbNo, setAwbNo] = useState(null);
    const [reset, setReset] = useState(null);
    const [loader, setLoader] = useState(false);
    const [queryName, setQueryName] = useState([]);
    const [backDrop, setBackDrop] = useState(false);
    const [shipmentCard, setShipment] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [selectAll, setSelectAll] = useState(false);
    const [filterData, setFilterData] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState("");
    const [selectedRows, setSelectedRows] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(50);
    const [MoreFilters, setMoreFilters] = useState(false);
    const [queryParamTemp, setQueryParamTemp] = useState({});
    const [orderTracking, setOrderTracking] = useState(false);
    const [BulkActionShow, setBulkActionShow] = useState(false);
    const [handleResetFrom, setHandleResetFrom] = useState(false);
    const [SearchOption, setSearchOption] = useState(SearchOptions[0]);
    const [searchType, setsearchType] = useState(SearchOptions[0].value);
    const [mostPopular, setMostPopular] = useState({ most_popular_search: "" });
    const [kpiData, setKpiData] = useState(DUMMY_SHIPMENT_NEW_KPI);
    const partnerList = JSON.parse(localStorage.getItem('partnerList')) || {};
    const { favListData } = useSelector(state => state?.orderSectionReducer);
    const { screenWidthData } = useSelector(state => state?.authDataReducer);

    useEffect(() => {
        if (favListData) {
            setQueryName([...favListData]);
        }
    }, [favListData]);

    useEffect(() => {
        setLoader(true);
        if (isLocalBypass) {
            const merged = [];
            TAB_TYPES.forEach(({ action, label }) => {
                const data = DUMMY_SHIPMENTS[action] || [];
                data.forEach(row => merged.push({ ...row, shipmentType: label }));
            });
            setTotalItems(merged.length);
            setShipment(merged);
            setLoader(false);
            return;
        }
        const sanitizedSearchValue = (searchValue || '').replace(/#/g, '');
        const fetchAll = async () => {
            try {
                const promises = TAB_TYPES.map(({ action }) => {
                    let url = `${apiEndpoint}/orders-api/orders/shipment/?action=${action}&page_size=1000&page=1&search_by=${searchType}&q=${sanitizedSearchValue}&most_popular_search=${mostPopular.most_popular_search}`;
                    const queryString = Object.keys(queryParamTemp)
                        .filter(k => queryParamTemp[k] !== '' && queryParamTemp[k] != null)
                        .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(queryParamTemp[k])}`)
                        .join('&');
                    if (queryString) url += '&' + queryString;
                    return axios.get(url, { headers: { Authorization: `Bearer ${authToken}` } });
                });
                const responses = await Promise.all(promises);
                const merged = [];
                responses.forEach((res, idx) => {
                    const results = res?.data?.results || [];
                    const label = TAB_TYPES[idx].label;
                    results.forEach(row => merged.push({ ...row, shipmentType: label }));
                });
                setTotalItems(merged.length);
                setShipment(merged);
            } catch (error) {
                customErrorFunction(error);
                setShipment([]);
                setTotalItems(0);
            } finally {
                setLoader(false);
            }
        };
        fetchAll();
    }, [JSON.stringify(queryParamTemp), reset, searchValue, searchType, mostPopular.most_popular_search, isLocalBypass]);

    useEffect(() => {
        dispatch({ type: "GET_SAVE_FAVOURITE_ORDERS_ACTION" });
    }, []);

    useEffect(() => {
        if (shipmentCard?.length > 0) {
            const affected = shipmentCard.filter(r => r.shipmentType !== 'Delivered').length;
            setKpiData(prev => ({
                ...prev,
                affected_shipments: affected,
                financial_impact: prev.financial_impact,
                avg_resolution_time: prev.avg_resolution_time,
                sla_breach: prev.sla_breach,
            }));
        } else if (isLocalBypass) {
            setKpiData(DUMMY_SHIPMENT_NEW_KPI);
        }
    }, [shipmentCard, isLocalBypass]);

    const handleSidePanel = () => {
        setMoreFilters(true);
        setBackDrop(true);
    };

    const CloseSidePanel = () => {
        setMoreFilters(false);
        setBackDrop(false);
    };

    const handleSearch = () => {
        setCurrentPage(1);
        setReset(new Date());
    };

    const handleReset = () => {
        setSearchValue("");
        setQueryParamTemp({});
        setsearchType(SearchOptions[0].value);
        setSearchOption(SearchOptions[0]);
        setReset(new Date());
        setMostPopular({ most_popular_search: '' });
    };

    const handleChange = (option) => {
        setSearchOption(option);
        setsearchType(option.value);
    };

    const handleMoreFilter = (data) => {
        setCurrentPage(1);
        setFilterData(data);
        const queryParams = {};
        Object.keys(data || {}).forEach(key => {
            if (data[key] !== '' && data[key] != null) {
                queryParams[key] = key === 'start_date' || key === 'end_date' ? moment(data[key]).format('YYYY-MM-DD') : data[key];
            }
        });
        setQueryParamTemp(queryParams);
    };

    const handleQueryfilter = (value) => {
        setQueryParamTemp({});
        const fetchAll = async () => {
            try {
                const promises = TAB_TYPES.map(({ action }) =>
                    axios.get(`${apiEndpoint}/orders-api/orders/shipment/?action=${action}&page_size=1000&page=1&${value}`, {
                        headers: { Authorization: `Bearer ${authToken}` }
                    })
                );
                const responses = await Promise.all(promises);
                const merged = [];
                responses.forEach((res, idx) => {
                    (res?.data?.results || []).forEach(row => merged.push({ ...row, shipmentType: TAB_TYPES[idx].label }));
                });
                setTotalItems(merged.length);
                setShipment(merged);
            } catch (error) {
                customErrorFunction(error);
            }
        };
        fetchAll();
    };

    const handleSearchKey = (e) => {
        if (e.key === "Enter") setReset(new Date());
        const allowedCharacters = /^[a-zA-Z0-9\s!@#$%^&*(),-.?":{}|<>]*$/;
        if (e.key === ' ' && e.target.value.endsWith(' ')) e.preventDefault();
        else if (!allowedCharacters.test(e.key)) e.preventDefault();
    };

    const searchOptions = [
        { key: '1', label: 'One Attempt', tooltip: 'This will show all the orders with 1 delivery attempt' },
        { key: '2', label: 'Two Attempts', tooltip: 'This will show all the orders with 2 delivery attempts' },
        { key: '3', label: 'Three Attempts', tooltip: 'This will show all the orders with 3 delivery attempts' },
        { key: '3_plus', label: 'More Than Three Attempts', tooltip: 'This will show all the orders with more than 3 delivery attempts' },
    ];

    return (
        <>
            <div className="box-shadow shadow-sm p7 shipment-new-kpi-row">
                <div className="row g-3">
                    <div className="col-6 col-md-3">
                        <div className="shipment-kpi-card">
                            <p className="shipment-kpi-label">Affected Shipments</p>
                            <p className="shipment-kpi-value">{kpiData.affected_shipments}</p>
                        </div>
                    </div>
                    <div className="col-6 col-md-3">
                        <div className="shipment-kpi-card">
                            <p className="shipment-kpi-label">Financial Impact</p>
                            <p className="shipment-kpi-value">{kpiData.financial_impact}</p>
                        </div>
                    </div>
                    <div className="col-6 col-md-3">
                        <div className="shipment-kpi-card">
                            <p className="shipment-kpi-label">Avg Resolution Time</p>
                            <p className="shipment-kpi-value">{kpiData.avg_resolution_time}</p>
                        </div>
                    </div>
                    <div className="col-6 col-md-3">
                        <div className="shipment-kpi-card">
                            <p className="shipment-kpi-label">SLA Breach</p>
                            <p className="shipment-kpi-value">{kpiData.sla_breach}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="box-shadow shadow-sm p7 filter-container">
                <div className="search-container ot-filters">
                    <div className='d-flex'>
                        <label>
                            <Select value={SearchOption} onChange={handleChange} options={SearchOptions} />
                            <input
                                type="search"
                                value={searchValue}
                                className="input-field"
                                onChange={(e) => setSearchValue(e.target.value)}
                                placeholder="Search for AWB | Order ID | Mobile Number | Email | SKU"
                                onKeyPress={handleSearchKey}
                            />
                            <button onClick={() => globalDebouncedClick(handleSearch)}>
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </button>
                        </label>
                        {screenWidthData > 591 && (
                            <>
                                <div className="btn-group">
                                    <button onClick={handleSidePanel} type="button" className="btn main-button-outline ms-2">
                                        <HiOutlineFilter className='align-text-bottom' /> More Filters
                                    </button>
                                    <button className="btn main-button dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                                        <span className="visually-hidden">Toggle Dropdown</span>
                                    </button>
                                    <ul className="dropdown-menu" type="button" style={{ paddingInline: '0px', minWidth: '110px' }}>
                                        {queryName?.map((item) => (
                                            <li key={item?.filter_name} onClick={() => handleQueryfilter(item?.filter_query)}>{item?.filter_name}</li>
                                        ))}
                                    </ul>
                                </div>
                                <button className='btn main-button-outline ms-2' onClick={handleReset}>
                                    <RxReset className='align-text-bottom' /> Reset
                                </button>
                            </>
                        )}
                    </div>
                    <p className='popular-search'>
                        Looking for:
                        {searchOptions.map(({ key, label, tooltip }) => (
                            <CustomTooltip
                                key={key}
                                triggerComponent={
                                    <span
                                        className={mostPopular.most_popular_search === key ? 'active' : ''}
                                        onClick={() => { setMostPopular({ most_popular_search: key }); setReset(new Date()); setCurrentPage(1); }}
                                    >
                                        {label}
                                    </span>
                                }
                                tooltipComponent={tooltip}
                                addClassName='popular-search-tooltip'
                            />
                        ))}
                    </p>
                </div>
                {screenWidthData < 592 && (
                    <div className="nav-actions-container">
                        <div className="nav-action-dots">
                            <img src={ThreeDots} alt="ThreeDots" width={24} />
                        </div>
                        <div className="nav-actions-list">
                            <ul>
                                <li onClick={handleSidePanel}><HiOutlineFilter className='align-text-bottom' /> More Filters</li>
                                <li onClick={handleReset}><RxReset className='align-text-bottom' /> Reset</li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
            <div className='orders-section-tabs'>
                <UnifiedShipmentTable
                    shipmentCard={shipmentCard.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)}
                    setAwbNo={setAwbNo}
                    selectAll={selectAll}
                    partnerList={partnerList}
                    setSelectAll={setSelectAll}
                    selectedRows={selectedRows}
                    setSelectedRows={setSelectedRows}
                    setBulkActionShow={setBulkActionShow}
                    setOrderTracking={setOrderTracking}
                />
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
                        activeTab="Action Required"
                        setBulkActionShow={setBulkActionShow}
                        selectedRows={selectedRows}
                        setSelectedRows={setSelectedRows}
                        filterData={filterData}
                        setFilterData={setFilterData}
                        queryParamTemp={queryParamTemp}
                        setQueryParamTemp={setQueryParamTemp}
                        searchType={searchType}
                        searchValue={searchValue}
                    />
                )}
            </div>
            <MoreFiltersPanel
                MoreFilters={MoreFilters}
                activeTab="Action Required"
                CloseSidePanel={CloseSidePanel}
                handleMoreFilter={handleMoreFilter}
                handleResetFrom={handleResetFrom}
                setHandleResetFrom={setHandleResetFrom}
            />
            <div onClick={CloseSidePanel} className={`backdrop ${backDrop ? 'd-flex' : 'd-none'}`}></div>
            <section className={`awb-tracking-slider ${orderTracking ? 'open' : ''}`}>
                <AWBTrackingPage setOrderTracking={setOrderTracking} orderTracking={orderTracking} awbNo={awbNo} partnerList={partnerList} />
            </section>
            <div onClick={() => setOrderTracking(false)} className={`backdrop ${!orderTracking ? 'd-none' : ''}`}></div>
            <LoaderScreen loading={loader} />
        </>
    );
};

export default ShipmentNewPage;
