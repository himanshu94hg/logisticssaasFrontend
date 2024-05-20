import { faCalendarAlt, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import './MoreFiltersPanel.css'
import Cookies from 'js-cookie';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { BASE_URL_CORE } from '../../../../../axios/config';

const SourceOptions = [
    { label: "Amazon", value: "amazon" },
    { label: "Custom", value: "custom" },
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
    { label: "RTO Initiated", value: "rto_initiated" },
    { label: "NDR", value: "ndr" },
    { label: "Lost", value: "lost" },
    { label: "Damaged", value: "damaged" },
];

const paymentOptions = [
    { label: "Prepaid", value: "Prepaid" },
    { label: "COD", value: "COD" },
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
    const sellerData = Cookies.get("user_id")
    const authToken = Cookies.get("access_token")
    const [favName, setFavName] = useState("");
    const [saveFav, setSaveFav] = useState(false);
    const [SaveFilter, setSaveFilter] = useState(false);
    const [clearState, setClearState] = useState(false);
    const [pickupAddresses, setPickupAddresses] = useState([]);
    const { tagListData, orderSourceListData } = useSelector(state => state?.orderSectionReducer);
    const courierPartnerData = useSelector(state => state?.toolsSectionReducer?.courierPartnerData);
    const [orderTag, setorderTag] = useState([]);
    const [errors, setErrors] = useState({})

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

    const handleCheckboxChange = (select) => {
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
                pickup_address: ""
            })
            setErrors({})
        }
    }, [activeTab])

    const handleChange = (name, value) => {
        if (name === "start_date" || name === "end_date") {
            setFilterParams(prev => ({
                ...prev,
                [name]: value
            }));
        }
        if (name === "status" || name === "order_source" || name === "courier_partner" || name === "pickup_address" || name === "order_tag" || name === "payment_type") {
            let temp_data = ''
            let temp = value.map((item, index) => {
                temp_data += item.value;
                if (index !== value.length - 1) {
                    temp_data += ",";
                }
            })
            setFilterParams(prev => ({
                ...prev,
                [name]: temp_data
            }));
        }
        if (name === "order_id" || name === "sku") {
            setFilterParams(prev => ({
                ...prev,
                [name]: value.target.value
            }));
        }
        if (name === "sku_match_type") {
            setFilterParams(prev => ({
                ...prev,
                sku_match_type: value
            }))
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
                    const temp = response?.data?.map((item, index) => ({
                        label: item.warehouse_name,
                        value: item.warehouse_name,
                    }));
                    setPickupAddresses(temp)
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData(); // Call the fetchData function

    }, [MoreFilters, sellerData, authToken]);

    useEffect(() => {
        if (MoreFilters) {
            dispatch({ type: "ORDERS_TAG_LIST_API_ACTION" })
        }
    }, [MoreFilters])

    useEffect(() => {
        if (MoreFilters) {
            dispatch({ type: "GET_ORDER_SOURCE_API_ACTION" })
        }
    }, [MoreFilters])

    console.log(MoreFilters, "MoreFiltersMoreFilters")

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
        })
        setErrors({})
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

    useEffect(() => {
        dispatch({ type: "COURIER_PARTNER_ACTION" });
    }, [dispatch]);

    const [courierPartners, setCourierPartners] = useState([]);

    useEffect(() => {
        if (courierPartnerData?.data?.length) {
            const formattedData = courierPartnerData?.data.map(item => ({
                value: item.keyword,
                label: item.title
            }));
            setCourierPartners(formattedData);
        } else {
            setCourierPartners([]);
        }
    }, [courierPartnerData])

    console.log(courierPartners, "courierPartnerscourierPartnerscourierPartnerscourierPartners", courierPartnerData)

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
                                <label>
                                    Start Date
                                    <div className="date-picker-container">
                                        <FontAwesomeIcon icon={faCalendarAlt} className="calendar-icon" />
                                        <DatePicker
                                            className={`input-field ${errors.start_date ? 'input-field-error' : ''}`}
                                            maxDate={new Date()}
                                            selected={filterParams?.start_date}
                                            onKeyDown={(e) => handleKeyDown(e)}
                                            onChange={(e) => handleChange("start_date", e)}
                                            placeholderText='Select Start Date'
                                            dateFormat="MM/dd/yyyy h:mm aa"
                                            isClearable
                                            closeOnScroll={(e) => e.target === document}
                                            showTimeInput
                                            showMonthDropdown
                                            showYearDropdown
                                        // dropdownMode="select"
                                        />
                                        {(errors.start_date) && <div className="custom-error">{errors.start_date}</div>}
                                    </div>
                                </label>
                                <label>
                                    End Date
                                    <div className="date-picker-container">
                                        <FontAwesomeIcon icon={faCalendarAlt} className="calendar-icon" />
                                        <DatePicker
                                            dateFormat="MM/dd/yyyy h:mm aa"
                                            className={`input-field ${errors.end_date ? 'input-field-error' : ''}`}
                                            maxDate={new Date()}
                                            selected={filterParams?.end_date}
                                            onKeyDown={(e) => handleKeyDown(e)}
                                            onChange={(e) => handleChange("end_date", e)}
                                            placeholderText='Select Start Date'
                                            isClearable
                                            closeOnScroll={(e) => e.target === document}
                                            showTimeInput
                                            showMonthDropdown
                                            showYearDropdown
                                        // dropdownMode="select"
                                        />
                                        {/*{(errors.end_date) && <div className="custom-error">{errors.end_date}</div>}*/}
                                    </div>
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
                                        options={courierPartners}
                                        onChange={(e) => handleChange("courier_partner", e)}
                                        isMulti
                                        isSearchable
                                        value={courierPartners?.value}
                                    />
                                </label>
                            </div>
                            <div className='filter-row'>
                                <label>Payment Option
                                    <Select
                                        options={paymentOptions}
                                        defaultValue={null}
                                        // defaultValue={filterParams?.payment_type}
                                        onChange={(e) => handleChange("payment_type", e)}
                                        value={filterParams.payment_type !== null ? paymentOptions.find(option => option.value === filterParams.payment_type) : null}
                                        isMulti
                                    />
                                </label>
                            </div>
                            {/* <div className='filter-row'>
                                <label>Courier Partner
                                    <Select
                                        options={courierPartners}
                                        onChange={(e) => handleChange("courier_partner", e)}
                                        isMulti
                                        isSearchable
                                        value={filterParams.courier_partner ? courierPartners.filter(option => filterParams.courier_partner.includes(option.value)) : null}
                                    />
                                </label>
                            </div> */}
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
                                        value={filterParams.order_tag ? orderTag?.filter(option => filterParams.order_tag.includes(option.value)) : null} />
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
                                        name="sku_match_type"
                                        id="singleSku"
                                        value="single"
                                        // checked={filterParams.skuType === "single"}
                                        onChange={() => handleChange("sku_match_type", "single")}
                                    />
                                </label>
                                <label htmlFor="multiSku">
                                    Multi SKU
                                    <input
                                        type="radio"
                                        name="sku_match_type"
                                        id="multiSku"
                                        value="multi"
                                        // checked={filterParams.skuType === "multi"}
                                        onChange={() => handleChange("sku_match_type", "multi")}
                                    />
                                </label>
                                <label htmlFor="matchExact">
                                    Match Exact
                                    <input
                                        type="radio"
                                        name="sku_match_type"
                                        id="matchExact"
                                        value="exact"
                                        // checked={filterParams.skuType === "exact"}
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
                                    value={SaveFilter}
                                    onChange={(e) => handleCheckboxChange(e.target.checked)}
                                />
                                {!SaveFilter ? 'Save Filter (Optional)' : (
                                    <input className={`input-field filter-name-ip ${errors.favName && "input-field-error"}`} type="text" value={favName} placeholder='Enter name for filter' onChange={(e) => setFavName(e.target.value)} />
                                )}

                                {/*errors.favName && <span className='error-text'></span>*/}

                            </label>
                            <div>
                                <button className='btn seconadary-button' type="button" onClick={handleReset}>
                                    Reset
                                </button>
                                <button className='btn main-button ms-3' type="submit">Submit</button>
                            </div>
                        </div>
                    </form>
                </section>
            </div>
        </>
    )
})

export default MoreFiltersPanel