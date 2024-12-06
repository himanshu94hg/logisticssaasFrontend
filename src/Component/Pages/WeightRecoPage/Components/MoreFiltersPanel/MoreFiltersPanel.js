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
    { label: "RTO In Transit", value: "rto_in_transit" },
    { label: "RTO Initiated", value: "rto_initiated" },
    { label: "RTO Delivered", value: "rto_delivered" },
    { label: "NDR", value: "ndr" },
    { label: "Lost", value: "lost" },
    { label: "Damaged", value: "damaged" },
];

const paymentOptions = [
    { label: "Prepaid", value: "Prepaid" },
    { label: "COD", value: "cod" },
];
const orderTypeOptions = [
    { label: "Forward", value: "forward" },
    { label: "Reverse", value: "reverse" },
]

const CourierPartner = [
    { label: "Bluedart", value: "bluedart" },
    { label: "Shadowfax", value: "shadowfax" },
    { label: "Delhivery", value: "delhivery" },
    { label: "Xpressbees", value: "xpressbees" },
];


const MoreFiltersPanel = React.memo(({ activeTab, MoreFilters, CloseSidePanel, handleMoreFilter, handleResetFrom, setHandleResetFrom }) => {
    const dispatch = useDispatch()
    const [errors, setErrors] = useState({})
    const [favName, setFavName] = useState("");
    const [orderTag, setorderTag] = useState([]);
    const authToken = Cookies.get("access_token")
    const [saveFav, setSaveFav] = useState(false);
    const [orderSource, setOrderSource] = useState([]);
    const [clearState, setClearState] = useState(false)
    const [SaveFilter, setSaveFilter] = useState(false)
    const [pickupAddresses, setPickupAddresses] = useState([]);
    const { tagListData, orderSourceListData } = useSelector(state => state?.orderSectionReducer);
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
        pickup_address: ""
    })

    useEffect(() => {
        if (MoreFilters) {
            dispatch({ type: "GET_ORDER_SOURCE_API_ACTION" })
        }
    }, [MoreFilters])

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

    const handleCheckboxChange = () => {
        setSaveFilter(prevState => !prevState);
        setSaveFav(true)
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
                    const trimmedValue = value?.replace(/,+$/, '');
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
        if (SaveFilter) {
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



    useEffect(() => {
        if (activeTab || clearState) {
            setFilterParams({
                start_date: null,
                end_date: null,
                status: "",
                order_source: "",
                courier_partner: "",
                payment_type: "",
                order_id: "",
                order_tag: "",
                sku: "",
                sku_match_type: "",
                pickup_address: "",
                order_type: null
            })
            setErrors({})
        }
    }, [activeTab, clearState])

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
        } else if (name === "order_id" || name === "sku" || name === "product" || name === "min_weight" || name === "max_weight") {
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
        else if (name === "date_filter_by") {
            setFilterParams(prev => ({
                ...prev,
                date_filter_by: value.target.value
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


    useEffect(() => {
        const fetchData = async () => {
            try {
                if (MoreFilters) {
                    const response = await axios.get(`${BASE_URL_CORE}/core-api/features/warehouse/`, {
                        headers: {
                            Authorization: `Bearer ${authToken}`
                        }
                    });
                    const temp = response?.data?.map((item) => ({
                        label: item?.warehouse_name,
                        value: item?.warehouse_name,
                    }));
                    setPickupAddresses(temp)
                }
            } catch (error) {
            }
        };

        fetchData();

    }, [MoreFilters, authToken]);

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
                pickup_address: ""
            })
            setHandleResetFrom(false)
            setSaveFilter(false)
            setSaveFav(true)
            setErrors({})
        }
    }, [handleResetFrom])

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
            pickup_address: ""
        });
        setFavName("")
        setSaveFav(false)
        setSaveFilter(false)
        setErrors({})
    };

    useEffect(() => {
        if (MoreFilters) {
            dispatch({ type: "ORDERS_TAG_LIST_API_ACTION" })
        }
    }, [MoreFilters])

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
                                    />
                                </div>
                                {/* </label> */}
                                {/* <label> */}
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
                                    />
                                </div>
                                {/* </label> */}
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
                                <label>Payment type
                                    <Select
                                        isMulti
                                        options={paymentOptions}
                                        defaultValue={filterParams?.payment_type}
                                        onChange={(e) => handleChange("payment_type", e)}
                                        value={filterParams.payment_type !== null ? paymentOptions.find(option => option.value === filterParams.payment_type) : null}
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
                                        options={orderSource}
                                        onChange={(e) => handleChange("order_source", e)}
                                        isMulti
                                        isSearchable
                                        value={filterParams.order_source ? orderSource.filter(option => filterParams.order_source.includes(option.value)) : null}
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
                                        value={filterParams.pickup_address ? pickupAddresses.filter(option => filterParams.pickup_address.includes(option.value)) : null}
                                    />
                                </label>
                            </div>
                            <div className='filter-row'>
                                <label>Order Tag
                                    <Select
                                        // onChange={(e) => handleChange(e, "courier_partner")}
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
                                    // onChange={(e) => handleChange(e, "order_id")}
                                    />
                                </label>
                            </div>
                            <div className='filter-row sku-checkbox'>
                                <label>
                                    Single SKU
                                    <input type="radio" name="skuType" id="" />
                                </label>
                                <label>
                                    Multi SKU
                                    <input type="radio" name="skuType" id="" />
                                </label>
                                <label>
                                    Match Exact
                                    <input type="radio" name="skuType" id="" />
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
                                    value={SaveFilter}
                                    onChange={handleCheckboxChange}
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