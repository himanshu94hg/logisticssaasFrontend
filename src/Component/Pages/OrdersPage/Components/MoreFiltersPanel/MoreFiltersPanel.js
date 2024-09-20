import axios from 'axios';
import moment from 'moment';
import './MoreFiltersPanel.css'
import Cookies from 'js-cookie';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import React, { useEffect, useState } from 'react'
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL_CORE } from '../../../../../axios/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { customErrorFunction } from '../../../../../customFunction/errorHandling';

const orderStatusAll = [
    { label: "Shipped", value: "shipped" },
    { label: "Pending", value: "pending" },
    { label: "cancelled", value: "cancelled" },
    { label: "Delivered", value: "delivered" },
    { label: "Picked Up", value: "picked_up" },
    { label: "In Transit", value: "in_transit" },
    { label: "Out for Delivery", value: "out_for_delivery" },
    { label: "Pickup Requested", value: "pickup_requested" },
    { label: "Pickup Scheduled", value: "pickup_scheduled" },
    { label: "RTO In Transit", value: "rto_in_transit" },
    { label: "RTO Initiated", value: "rto_initiated" },
    { label: "RTO Delivered", value: "rto_delivered" },
    { label: "NDR", value: "ndr" },
    { label: "Lost", value: "lost" },
    { label: "Damaged", value: "damaged" },
];
const orderStatusReadytoShip = [
    { label: "Shipped", value: "shipped" },
];
const orderStatusPickup = [
    { label: "Pickup Requested", value: "pickup_requested" },
    { label: "Pickup Scheduled", value: "pickup_scheduled" },
];
const orderStatusReturns = [
    { label: "RTO In Transit", value: "rto_in_transit" },
    { label: "RTO Initiated", value: "rto_initiated" },
    { label: "RTO Delivered", value: "rto_delivered" },
];

const paymentOptions = [
    { label: "Prepaid", value: "Prepaid" },
    { label: "COD", value: "COD" },
]
const orderTypeOptions = [
    { label: "Forrward", value: "forward" },
    { label: "Reverse", value: "reverse" },
]

const MoreFiltersPanel = React.memo(({ activeTab, MoreFilters, CloseSidePanel, handleMoreFilter, handleResetFrom, setHandleResetFrom }) => {
    const dispatch = useDispatch()
    const [errors, setErrors] = useState({})
    const [favName, setFavName] = useState("");
    const [orderTag, setorderTag] = useState([]);
    const authToken = Cookies.get("access_token")
    const [saveFav, setSaveFav] = useState(false);
    const [orderSource, setOrderSource] = useState([]);
    const [storeName, setStoreName] = useState([]);
    const [SaveFilter, setSaveFilter] = useState(false);
    const [pickupAddresses, setPickupAddresses] = useState([]);
    const [courierPartners, setCourierPartners] = useState([]);
    const [orderStatusOptions, setOrderStatusOptions] = useState([]);
    const { tagListData, orderSourceListData } = useSelector(state => state?.orderSectionReducer);
    const courierPartnerData = useSelector(state => state?.toolsSectionReducer?.courierPartnerData);
    const [filterParams, setFilterParams] = useState({
        start_date: "",
        end_date: "",
        status: "",
        order_source: "",
        courier_partner: "",
        payment_type: "",
        order_id: "",
        product: "",
        order_tag: "",
        sku: "",
        sku_match_type: "",
        pickup_address: "",
        pickup_address_id: "",
        channel_name: "",
        order_type: null
    })

    useEffect(() => {
        if (activeTab === "All") {
            setOrderStatusOptions(orderStatusAll)
        }
        if (activeTab === "Ready to Ship") {
            setOrderStatusOptions(orderStatusReadytoShip)
        }
        if (activeTab === "Pickup") {
            setOrderStatusOptions(orderStatusPickup)
        }
        if (activeTab === "Returns") {
            setOrderStatusOptions(orderStatusReturns)
        }
    }, [activeTab])


    useEffect(() => {
        if (MoreFilters) {
            dispatch({ type: "GET_ORDER_SOURCE_API_ACTION" })
        }
    }, [MoreFilters])

    useEffect(() => {
        if (MoreFilters) {
            dispatch({ type: "COURIER_PARTNER_ACTION" });
        }
    }, [MoreFilters]);

    useEffect(() => {
        if (MoreFilters) {
            dispatch({ type: "ORDERS_TAG_LIST_API_ACTION" })
        }
    }, [MoreFilters])

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (filterParams.order_source) {
                    const response = await axios.get(`${BASE_URL_CORE}/orders-api/orders/get-channel-name/?keyword=${filterParams.order_source}`, {
                        headers: {
                            Authorization: `Bearer ${authToken}`
                        }
                    });
                    const temp = response?.data?.map((item) => ({
                        label: item,
                        value: item,
                    }));
                    setStoreName(temp)
                }
            } catch (error) {
                customErrorFunction(error)
            }
        };
        fetchData();
    }, [filterParams.order_source]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                if (MoreFilters) {
                    const response = await axios.get(`${BASE_URL_CORE}/core-api/features/warehouse/`, {
                        headers: {
                            Authorization: `Bearer ${authToken}`
                        }
                    });
                    const temp = response?.data?.map((item, index) => ({
                        id: item?.id,
                        label: item?.warehouse_name,
                        value: item?.warehouse_name,
                    }));
                    setPickupAddresses(temp)
                }
            } catch (error) {
                customErrorFunction(error)
            }
        };
        fetchData();
    }, [MoreFilters]);

    useEffect(() => {
        if (courierPartnerData?.data?.length) {
            const formattedData = courierPartnerData?.data.map(item => ({
                value: item?.keyword,
                label: item?.title
            }));
            setCourierPartners(formattedData);
        } else {
            setCourierPartners([]);
        }
    }, [courierPartnerData])

    useEffect(() => {
        if (orderSourceListData && orderSourceListData.length > 0) {
            const formattedData = orderSourceListData
                .filter(item => item?.order_source)
                .map(item => ({
                    value: item?.order_source,
                    label: item?.order_source
                }));
            setOrderSource(formattedData);
        } else {
            setOrderSource([]);
        }
    }, [orderSourceListData]);

    useEffect(() => {
        if (tagListData && tagListData.length > 0) {
            const formattedData = tagListData.map(item => ({
                value: item?.id,
                label: item?.name
            }));
            setorderTag(formattedData);
        } else {
            setorderTag([]);
        }
    }, [tagListData]);

    useEffect(() => {
        if (activeTab) {
            setFilterParams({
                start_date: null,
                end_date: null,
                status: "",
                order_source: "",
                courier_partner: "",
                payment_type: null,
                product: "",
                channel_name: "",
                order_id: "",
                order_tag: "",
                sku: "",
                sku_match_type: "",
                pickup_address: "",
                pickup_address_id: "",
                order_type: ""
            })
            setErrors({})
        }
    }, [activeTab])

    useEffect(() => {
        if (handleResetFrom) {
            setFilterParams({
                start_date: null,
                end_date: null,
                status: "",
                order_source: "",
                courier_partner: "",
                payment_type: null,
                order_id: "",
                product: "",
                channel_name: "",
                order_tag: "",
                sku: "",
                sku_match_type: "",
                pickup_address: "",
                pickup_address_id: "",
                order_type: null
            })
            setHandleResetFrom(false)
            setSaveFilter(false)
            setSaveFav(true)
            setErrors({})
        }
    }, [handleResetFrom])

    const handleCheckboxChange = (select) => {
        setSaveFilter(prevState => !prevState);
        setSaveFav(true)
    };

    const handleChange = (name, value) => {
        if (["start_date", "end_date"].includes(name)) {
            setFilterParams(prev => ({
                ...prev,
                [name]: value
            }));
        } else if (["status", "order_source", "courier_partner", "order_tag", "payment_type", "order_type", "channel_name"].includes(name)) {
            const temp_data = value.map(item => item?.value).join(",");
            setFilterParams(prev => ({
                ...prev,
                [name]: temp_data
            }));
        } else if (name === "order_id" || name === "sku" || name === "product") {
            setFilterParams(prev => ({
                ...prev,
                [name]: value.target.value
            }));
        } else if (name === "sku_match_type") {
            setFilterParams(prev => ({
                ...prev,
                sku_match_type: value
            }));
        }
        else if (name === "pickup_address") {
            const ids = value.map(item => item?.id).join(",");
            const names = value.map(item => item?.value).join(",");
            setFilterParams(prev => ({
                ...prev,
                pickup_address: names,
                pickup_address_id: ids
            }));
        }
    };

    const handleKeyDown = (e) => {
        const allowedCharacters = /[0-9/]/;
        if (e.key === 'Backspace' || e.key === 'Delete') {
            return;
        }
        if (!allowedCharacters.test(e.key)) {
            e.preventDefault();
        }
    }

    const handleReset = () => {
        setFilterParams({
            start_date: null,
            end_date: null,
            status: "",
            order_source: "",
            courier_partner: "",
            payment_type: null,
            order_id: "",
            product: "",
            channel_name: "",
            order_tag: "",
            sku: "",
            sku_match_type: "",
            pickup_address: "",
            pickup_address_id: "",
            order_type: null
        })
        setErrors({})
    };

    const handleSubmit = e => {
        e.preventDefault();
        const encodedParams = Object.entries(filterParams)
            .filter(([key, value]) => value !== null && value !== '')
            .map(([key, value]) => {
                if (key === 'start_date' || key === 'end_date') {
                    const formattedDate = moment(value).format('YYYY-MM-DD');
                    return `${key}=${formattedDate}`;
                }
                else {
                    const trimmedValue = value.replace(/,+$/, '');
                    return `${key}=${trimmedValue}`;
                }
            })
            .join('&');
        if (SaveFilter && favName.trim() === "") {
            const validationErrors = {};
            if (!favName.trim() & favName !== null) {
                validationErrors.favName = "Required";
            }
            setErrors(validationErrors);
            return;
        }
        if ((!filterParams.start_date && filterParams.end_date) || (filterParams.start_date && !filterParams.end_date)) {
            setErrors({ ...errors, start_date: 'Please select both start and end dates', end_date: 'Please select both start and end dates' });
            return;
        } else {
            setErrors({});
        }
        handleMoreFilter(filterParams)
        CloseSidePanel()
        if (saveFav && SaveFilter) {
            dispatch({
                type: "SAVE_FAVOURITE_ORDERS_ACTION", payload: {
                    filter_query: encodedParams,
                    filter_name: favName
                }
            })
        }
        setSaveFilter(false)
        setFavName("")
    };

    return (
        <>
            <div id='sidePanel' className={`side-panel morefilters-panel ${MoreFilters ? 'open' : ''}`}>
                <div id='sidepanel-closer' onClick={CloseSidePanel}>
                    <FontAwesomeIcon icon={faChevronRight} />
                </div>
                <section className='sidepanel-header'>
                    <h4>Explore Additional Filters</h4>
                    <p>Fine-Tune Your Search</p>
                </section>
                <section className='sidepanel-body'>
                    <form onSubmit={handleSubmit}>
                        <div className="form-input-fields">
                            <div className='filter-row'>
                                {/* <label className='filter-date-by'>
                                    Filter By
                                    <select className='select-field' name="" id="">
                                        <option value="">Order Date</option>
                                        <option value="">Shipped Date</option>
                                        <option value="">Pickup Requested Date</option>
                                    </select>
                                </label> */}
                                <div className="date-picker-container">
                                    From
                                    <DatePicker
                                        showIcon
                                        isClearable
                                        showTimeInput
                                        showYearDropdown
                                        showMonthDropdown
                                        maxDate={new Date()}
                                        placeholderText='Select Start Date'
                                        dateFormat="dd MMM, yyyy, h:mm aa"
                                        onKeyDown={(e) => handleKeyDown(e)}
                                        selected={filterParams?.start_date}
                                        closeOnScroll={(e) => e.target === document}
                                        onChange={(e) => handleChange("start_date", e)}
                                        className={`input-field ${errors.start_date ? 'input-field-error' : ''}`}
                                        icon={<FontAwesomeIcon icon={faCalendarAlt} className='calendar-icon' />}
                                    />
                                </div>
                                <div className="date-picker-container">
                                    To
                                    <DatePicker
                                        showIcon
                                        isClearable
                                        showTimeInput
                                        showMonthDropdown
                                        showYearDropdown
                                        maxDate={new Date()}
                                        placeholderText='Select End Date'
                                        selected={filterParams?.end_date}
                                        dateFormat="dd MMM, yyyy h:mm aa"
                                        onKeyDown={(e) => handleKeyDown(e)}
                                        closeOnScroll={(e) => e.target === document}
                                        onChange={(e) => handleChange("end_date", e)}
                                        className={`input-field ${errors.end_date ? 'input-field-error' : ''}`}
                                        icon={<FontAwesomeIcon icon={faCalendarAlt} className='calendar-icon' />}
                                    />
                                </div>
                            </div>
                            <div className='filter-row'>
                                <label>Order Type
                                    <Select
                                        options={orderTypeOptions}
                                        defaultValue={null}
                                        onChange={(e) => handleChange("order_type", e)}
                                        value={filterParams.order_type !== null ? orderTypeOptions.find(option => option.value === filterParams.order_type) : null}
                                        isMulti
                                    />
                                </label>
                            </div>
                            <div className='filter-row'>
                                <label>Payment Type
                                    <Select
                                        options={paymentOptions}
                                        defaultValue={null}
                                        onChange={(e) => handleChange("payment_type", e)}
                                        value={filterParams.payment_type !== null ? paymentOptions.find(option => option.value === filterParams.payment_type) : null}
                                        isMulti
                                    />
                                </label>
                            </div>
                            {activeTab != "Processing" &&
                                <div className='filter-row'>
                                    <label >Order Status
                                        <Select
                                            isMulti
                                            isSearchable
                                            options={orderStatusOptions}
                                            onChange={(e) => handleChange("status", e)}
                                            value={orderStatusOptions?.filter(option => filterParams.status.split(",").includes(option.value))}
                                        />
                                    </label>
                                </div>}
                            <div className='filter-row'>
                                <label >Order Source
                                    <Select
                                        options={orderSource}
                                        onChange={(e) => handleChange("order_source", e)}
                                        isMulti
                                        isSearchable
                                        value={orderSource.filter(option => filterParams.order_source.split(",").includes(option.value))}
                                    />
                                </label>
                            </div>
                            <div className='filter-row'>
                                <label >Store Name
                                    <Select
                                        options={storeName}
                                        onChange={(e) => handleChange("channel_name", e)}
                                        isMulti
                                        isSearchable
                                        value={storeName.filter(option => filterParams.channel_name.split(",").includes(option.value))}
                                    />
                                </label>
                            </div>
                            <div className='filter-row'>
                                <label>Courier Partner
                                    <Select
                                        options={courierPartners}
                                        onChange={(e) => handleChange("courier_partner", e)}
                                        isMulti
                                        isSearchable
                                        value={courierPartners.filter(option => filterParams.courier_partner.split(",").includes(option.value))}
                                    />
                                </label>
                            </div>

                            <div className='filter-row'>
                                <label>Pickup Address
                                    <Select
                                        isMulti
                                        isSearchable
                                        options={pickupAddresses}
                                        onChange={(e) => handleChange("pickup_address", e)}
                                        value={filterParams.pickup_address ? pickupAddresses?.filter(option => filterParams.pickup_address?.includes(option.value)) : null}
                                    />
                                </label>
                            </div>
                            <div className='filter-row'>
                                <label>Order Tag
                                    <Select
                                        isMulti
                                        isSearchable
                                        options={orderTag}
                                        onChange={(e) => handleChange("order_tag", e)}
                                        value={filterParams.order_tag ? orderTag?.filter(option => filterParams.order_tag.includes(option.value)) : null}
                                    />
                                </label>
                            </div>
                            <div className='filter-row'>
                                <label>Product Name
                                    <input
                                        type="text"
                                        className='input-field'
                                        placeholder='Enter product name'
                                        value={filterParams.product}
                                        onChange={(e) => handleChange("product", e)}
                                    />
                                </label>
                            </div>
                            {/* <div className='filter-row'>
                                <label>Min Weight
                                    <input
                                        type="text"
                                        className='input-field'
                                        placeholder='Enter Min Weight (in gram)'
                                        value={filterParams.product}
                                        onChange={(e) => handleChange("product", e)}
                                    />
                                </label>
                                <label>Max Weight
                                    <input
                                        type="text"
                                        className='input-field'
                                        placeholder='Enter Max Weight (in gram)'
                                        value={filterParams.product}
                                        onChange={(e) => handleChange("product", e)}
                                    />
                                </label>
                            </div> */}
                            <div className='filter-row'>
                                <label>SKU
                                    <input
                                        type="text"
                                        className='input-field'
                                        placeholder='Enter SKU'
                                        value={filterParams.sku}
                                        onChange={(e) => handleChange("sku", e)}
                                    />
                                </label>
                            </div>
                            <div className='filter-row sku-checkbox'>
                                <label htmlFor="singleSku">
                                    Single SKU
                                    <input
                                        type="radio"
                                        id="singleSku"
                                        value="single"
                                        name="sku_match_type"
                                        onChange={() => handleChange("sku_match_type", "single")}
                                    />
                                </label>
                                <label htmlFor="multiSku">
                                    Multi SKU
                                    <input
                                        type="radio"
                                        id="multiSku"
                                        value="multi"
                                        name="sku_match_type"
                                        onChange={() => handleChange("sku_match_type", "multi")}
                                    />
                                </label>
                                <label htmlFor="matchExact">
                                    Match Exact
                                    <input
                                        type="radio"
                                        value="exact"
                                        id="matchExact"
                                        name="sku_match_type"
                                        onChange={() => handleChange("sku_match_type", "exact")}
                                    />
                                </label>
                            </div>
                            <div className='filter-row mb-2'>
                                <label>Search Multiple Order Ids
                                    <input
                                        type="text"
                                        className='input-field'
                                        value={filterParams.order_id}
                                        placeholder='Enter Order ID comma separated'
                                        onChange={(e) => handleChange("order_id", e)}
                                    />
                                </label>
                            </div>

                        </div>
                        <div className='more-filters-footer'>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={SaveFilter}
                                    value={SaveFilter}
                                    onChange={(e) => handleCheckboxChange(e.target.checked)}
                                />
                                {!SaveFilter ? 'Save Filter (Optional)' : (
                                    <input className={`input-field filter-name-ip ${errors.favName && "input-field-error"}`} type="text" value={favName} placeholder='Enter name for filter' onChange={(e) => setFavName(e.target.value)} />
                                )}
                            </label>
                            <div className='d-flex'>
                                <button className='btn cancel-button' type="button" onClick={handleReset}>
                                    Reset
                                </button>
                                <button className='btn main-button ms-3' type="submit">Apply</button>
                            </div>
                        </div>
                    </form>
                </section>
            </div>
        </>
    )
})

export default MoreFiltersPanel