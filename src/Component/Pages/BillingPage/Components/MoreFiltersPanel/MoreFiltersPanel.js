import { faCalendarAlt, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { BASE_URL_CORE } from '../../../../../axios/config';
import { customErrorFunction } from '../../../../../customFunction/errorHandling';

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

const MoreFiltersPanel = React.memo(({ activeTab, MoreFilters, setMoreFilters, handleMoreFilter, handleResetFrom, setHandleResetFrom }) => {
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
    const [orderSource, setOrderSource] = useState([]);
    const [errors, setErrors] = useState({})
    const [SidePanelOption, setSidePanelOption] = useState('Filter')

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


    useEffect(() => {
        if (orderSourceListData && orderSourceListData.length > 0) {
            const formattedData = orderSourceListData
                .filter(item => item?.order_source)
                .map(item => ({
                    value: item.order_source,
                    label: item.order_source
                }));
            setOrderSource(formattedData);
        } else {
            setOrderSource([]);
        }
    }, [orderSourceListData]);

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
        setMoreFilters(false)
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
                customErrorFunction(error)
            }
        };

        fetchData();

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


    const customStyles = {
        menuList: (provided) => ({
            ...provided,
            maxHeight: '150px', // Set the height for the dropdown
            overflowY: 'auto',  // Add scroll if content exceeds the height
        }),
    };

    return (
        <>
            <div id='sidePanel' className={`side-panel morefilters-panel remitance-logs-filter ${MoreFilters ? 'open' : ''}`}>
                <div id='sidepanel-closer' onClick={() => setMoreFilters(false)}>
                    <FontAwesomeIcon icon={faChevronRight} />
                </div>
                <section className='sidepanel-header'>
                    <h4>Explore Additional Filters</h4>
                    <p>Fine-Tune Your Search</p>
                </section>
                <section className='sidepanel-tabs'>
                    <p onClick={() => setSidePanelOption('Filter')} className={`${SidePanelOption === 'Filter' && 'active'}`}>Filter</p>
                    <p onClick={() => setSidePanelOption('Export')} className={`${SidePanelOption === 'Export' && 'active'}`}>Export</p>
                </section>
                <section className='sidepanel-body'>
                    {SidePanelOption === 'Filter' &&
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
                                                placeholderText='Select End Date'
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
                                    <label >UTR Number
                                        <input className='input-field' type="text" />
                                    </label>
                                </div>
                            </div>
                            <div className='more-filters-footer justify-content-end'>
                                <div>
                                    <button className='btn seconadary-button' type="button" onClick={handleReset}>
                                        Reset
                                    </button>
                                    <button className='btn main-button ms-3' type="submit">Submit</button>
                                </div>
                            </div>
                        </form>
                    }

                    {
                        SidePanelOption === 'Export' &&
                        <>

                            <div className="form-input-fields">
                                <div className='filter-row'>
                                    <label>
                                        Enter AWB Number(s)
                                        <input className='input-field' type="text" placeholder='Enter awb numbers (comma separated)' />
                                    </label>
                                </div>
                                <div className='d-flex justify-content-end'>
                                    <button className='btn main-button'>Export</button>
                                </div>
                                <div className='section-divider invisible'>
                                    <hr />
                                    <span>OR</span>
                                </div>
                                <div className='filter-row'>
                                    <label>
                                        Courier Partner(s)
                                        <Select
                                            isMulti
                                            isSearchable
                                            placeholder="Select Courier Partner(s)"
                                        />
                                    </label>
                                </div>
                                <div className='d-flex justify-content-end'>
                                    <button className='btn main-button'>Export</button>
                                </div>
                            </div>
                        </>
                    }
                </section>
            </div>
        </>
    )
})

export default MoreFiltersPanel