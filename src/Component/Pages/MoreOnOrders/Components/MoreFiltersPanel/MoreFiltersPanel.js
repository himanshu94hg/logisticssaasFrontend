import axios from 'axios';
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

const SourceOptions = [
    { label: "Amazon", value: "amazon" },
    { label: "Custom", value: "Custom" },
    { label: "Shopify", value: "shopify" },
];

const OrderStatus = [
    { label: "Shipped", value: "shipped" },
    { label: "Pending", value: "pending" },
    { label: "cancelled", value: "cancelled" },
    { label: "Delivered", value: "delivered" },
    { label: "Picked Up", value: "picked_up" },
    { label: "In Transit", value: "in_transit" },
    { label: "Out of Delivery", value: "out_for_delivery" },
    { label: "Pickup Requested", value: "pickup_requested" },
    { label: "Pickup Scheduled", value: "pickup_scheduled" },
    { label: "Manifested", value: "manifested" },
    { label: "RTO Initiated", value: "rto_initiated" },
    { label: "NDR", value: "ndr" },
    { label: "Lost", value: "lost" },
    { label: "Damaged", value: "damaged" },
];

const paymentOptions = [
    { label: "Prepaid", value: "Prepaid" },
    { label: "COD", value: "cod" },
]
const orderTypeOptions = [
    { label: "Forward", value: "forward" },
    { label: "Reverse", value: "reverse" },
]

const CourierPartner = [
    { label: "Smartr", value: "smartr" },
    { label: "Ekart", value: "ekart" },
    { label: "Ekart 5kg", value: "ekart_5kg" },
    { label: "Bluedart", value: "bluedart" },
    { label: "Shadowfax", value: "shadowfax" },
    { label: "Delhivery", value: "delhivery" },
    { label: "Amazon Swa", value: "amazon_swa" },
    { label: "Xpressbees", value: "xpressbees" },
    { label: "Professional", value: "professional" },
    { label: "Ecom Express", value: "ecom_express" },
];


const MoreFiltersPanel = React.memo(({ activeTab, MoreFilters, CloseSidePanel, handleMoreFilter, handleResetFrom, setHandleResetFrom }) => {
    const dispatch = useDispatch()
    const [errors, setErrors] = useState({})
    const sellerData = Cookies.get("user_id")
    const [favName, setFavName] = useState("");
    const authToken = Cookies.get("access_token")
    const [saveFav, setSaveFav] = useState(false);
    const [SaveFilter, setSaveFilter] = useState(false)
    const [orderTag, setorderTag] = useState([]);
    const [clearState, setClearState] = useState(false)
    const [pickupAddresses, setPickupAddresses] = useState([]);
    const { tagListData, } = useSelector(state => state?.orderSectionReducer);

    const [filterParams, setFilterParams] = useState({
        start_date: "",
        end_date: "",
        status: "",
        order_source: "",
        courier_partner: "",
        payment_type: "",
        order_id: "",
        order_tag: "",
        sku: "",
        sku_match_type: "",
        order_type:null,
        pickup_address: ""
    })

    useEffect(() => {
        if (MoreFilters) {
            dispatch({ type: "ORDERS_TAG_LIST_API_ACTION" })
        }
    }, [MoreFilters])

    useEffect(() => {
        if (tagListData && tagListData.length > 0) {
            const formattedData = tagListData.map(item => ({
                value: item.id,
                label: item.name
            }));
            setorderTag(formattedData);
        } else {
            setorderTag([]);
        }
    }, [tagListData]);


    const handleCheckboxChange = () => {
        setSaveFilter(prevState => !prevState);
        setSaveFav(true)
    };

    const handleSubmit = e => {
        e.preventDefault();
        const moment = require('moment');
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

        handleMoreFilter(filterParams)
        CloseSidePanel()
        if (saveFav) {
            dispatch({
                type: "SAVE_FAVOURITE_ORDERS_ACTION", payload: {
                    filter_query: encodedParams,
                    filter_name: favName
                }
            })
        }
        setSaveFilter(false)
        setSaveFav(false)
        setFavName("")
    };

    useEffect(() => {
        if (activeTab) {
            setFilterParams({
                start_date: null,
                end_date: null,
                status: "",
                order_source: "",
                courier_partner: "",
                payment_type: null,
                order_id: "",
                order_tag: "",
                sku: "",
                sku_match_type: "",
                order_type:null,
                pickup_address: ""
            })
            setErrors({})
        }
    }, [activeTab, clearState])

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
                order_tag: "",
                sku: "",
                sku_match_type: "",
                order_type:null,
                pickup_address: ""
            })
            setHandleResetFrom(false)
            setSaveFilter(false)
            setSaveFav(true)
            setErrors({})
        }
    }, [handleResetFrom])

    const handleChange = (name, value) => {
        if (["start_date", "end_date"].includes(name)) {
            setFilterParams(prev => ({
                ...prev,
                [name]: value
            }));
        } else if (["status", "order_source", "courier_partner", "order_tag", "payment_type","order_type"].includes(name)) {
            const temp_data = value.map(item => item.value).join(",");
            setFilterParams(prev => ({
                ...prev,
                [name]: temp_data
            }));
        } else if (name === "order_id" || name === "sku") {
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
            const ids = value.map(item => item.id).join(",");
            const names = value.map(item => item.value).join(",");
            setFilterParams(prev => ({
                ...prev,
                pickup_address: names,
                pickup_address_id: ids
            }));
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (MoreFilters) {
                    const response = await axios.get(`${BASE_URL_CORE}/core-api/features/warehouse/?seller_id=${sellerData}`, {
                        headers: {
                            Authorization: `Bearer ${authToken}`
                        }
                    });
                    const temp = response?.data?.map((item) => ({
                        label: item.warehouse_name,
                        value: item.warehouse_name,
                    }));
                    setPickupAddresses(temp)
                }
            } catch (error) {
            }
        };
        fetchData();
    }, [MoreFilters, sellerData, authToken]);

    const handleReset = () => {
        setFilterParams({
            start_date: null,
            end_date: null,
            status: "",
            order_source: "",
            courier_partner: "",
            payment_type: null,
            order_id: "",
            order_tag: "",
            sku: "",
            sku_match_type: "",
            pickup_address: "",
            order_type:null
        })
        setSaveFilter(false)
        setSaveFav(true)
        setErrors({})
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
                                {/* <label> */}
                                <div className="date-picker-container">
                                    Start Date
                                    <DatePicker
                                        showIcon
                                        icon={<FontAwesomeIcon icon={faCalendarAlt} className='calendar-icon' />}
                                        className='input-field'
                                        selected={filterParams?.start_date}
                                        onChange={(e) => handleChange("start_date", e)}
                                        maxDate={new Date()}
                                        dateFormat="dd MMMM, yyyy, h:mm aa"
                                        isClearable
                                        closeOnScroll={(e) => e.target === document}
                                        showTimeInput
                                        showMonthDropdown
                                        showYearDropdown
                                        placeholderText='Select Start Date'
                                    />
                                </div>

                                <div className="date-picker-container">
                                    End Date
                                    <DatePicker
                                        showIcon
                                        icon={<FontAwesomeIcon icon={faCalendarAlt} className='calendar-icon' />}
                                        className='input-field'
                                        selected={filterParams?.end_date}
                                        onChange={(e) => handleChange("end_date", e)}
                                        maxDate={new Date()}
                                        dateFormat="dd MMMM, yyyy, h:mm aa"
                                        isClearable
                                        closeOnScroll={(e) => e.target === document}
                                        showTimeInput
                                        showMonthDropdown
                                        showYearDropdown
                                        placeholderText='Select End Date'
                                    />
                                </div>
                                {/* </label> */}
                            </div>
                            <div className='filter-row'>
                                <label>Order Type
                                    <Select
                                        options={orderTypeOptions}
                                        defaultValue={filterParams?.payment_type}
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
                                        defaultValue={filterParams?.payment_type}
                                        onChange={(e) => handleChange("payment_type", e)}
                                        value={filterParams.payment_type !== null ? paymentOptions.find(option => option.value === filterParams.payment_type) : null}
                                        isMulti
                                    />
                                </label>
                            </div>
                            <div className='filter-row'>
                                <label >Order Status
                                    <Select
                                        options={OrderStatus}
                                        isMulti
                                        isSearchable
                                        onChange={(e) => handleChange("status", e)}
                                        value={filterParams.status ? OrderStatus.filter(option => filterParams.status.includes(option.value)) : null}
                                    />
                                </label>
                            </div>
                            <div className='filter-row'>
                                <label >Order Source
                                    <Select
                                        options={SourceOptions}
                                        onChange={(e) => handleChange("order_source", e)}
                                        isMulti
                                        isSearchable
                                        value={filterParams.order_source ? SourceOptions.filter(option => filterParams.order_source.includes(option.value)) : null}
                                    />
                                </label>
                            </div>
                            <div className='filter-row'>
                                <label>Courier Partner
                                    <Select
                                        options={CourierPartner}
                                        onChange={(e) => handleChange("courier_partner", e)}
                                        isMulti
                                        isSearchable
                                        value={filterParams.courier_partner ? CourierPartner.filter(option => filterParams.courier_partner.includes(option.value)) : null}
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
                                <label>SKU
                                    <input
                                        className='input-field'
                                        type="text"
                                        value={filterParams.sku}
                                        placeholder='Enter SKU'
                                        onChange={(e) => handleChange("sku", e)}
                                    />
                                </label>
                            </div>
                            <div className='filter-row sku-checkbox'>
                                <label htmlFor="singleSku">
                                    Single SKU
                                    <input
                                        type="radio"
                                        name="skuType"
                                        id="singleSku"
                                        value="single"
                                        onChange={() => handleChange("sku_match_type", "single")}
                                    />
                                </label>
                                <label htmlFor="multiSku">
                                    Multi SKU
                                    <input
                                        type="radio"
                                        name="skuType"
                                        id="multiSku"
                                        value="multi"
                                        onChange={() => handleChange("sku_match_type", "multi")}
                                    />
                                </label>
                                <label htmlFor="matchExact">
                                    Match Exact
                                    <input
                                        type="radio"
                                        name="skuType"
                                        id="matchExact"
                                        value="exact"
                                        onChange={() => handleChange("sku_match_type", "exact")}
                                    />
                                </label>
                            </div>
                            <div className='filter-row mb-2'>
                                <label>Search Multiple Order Ids
                                    <input
                                        className='input-field'
                                        type="text"
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
                                    onChange={handleCheckboxChange}
                                />
                                {!SaveFilter ? 'Save Filter (Optional)' : (
                                    <input className={`input-field filter-name-ip ${errors.favName && "input-field-error"}`} type="text" value={favName} placeholder='Enter name for filter' onChange={(e) => setFavName(e.target.value)} />
                                )}
                            </label>
                            <div className='d-flex'>
                                <button className='btn seconadary-button' type="button" onClick={handleReset}>
                                    Reset
                                </button>
                                <button className='btn main-button ms-3' type="submit">Submit</button>
                            </div>
                        </div>
                    </form>
                </section>
            </div >
        </>
    )
})

export default MoreFiltersPanel