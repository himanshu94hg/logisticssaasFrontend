import { faCalendarAlt, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import './MoreFiltersPanel.css'
import Cookies from 'js-cookie';
import axios from 'axios';

const SourceOptions = [
    { label: "Amazon", value: "amazon" },
    { label: "Custom", value: "Custom" },
    { label: "Shopify", value: "shopify" },
];

const OrderStatus = [
    { label: "Shipped", value: "shipped" },
    { label: "cancelled", value: "cancelled" },
    { label: "Delivered", value: "delivered" },
    { label: "In Transit", value: "in_transit" },
    { label: "Out of Delivery", value: "out_for_delivery" },
    { label: "Pending", value: "pending" },
    { label: "Lost", value: "lost" },
    { label: "Manifested", value: "manifested" },
    { label: "Pickup Scheduled", value: "pickup_scheduled" },
    { label: "RTO Initiated", value: "rto_initiated" },
];

const paymentOptions = [
    { label: "Prepaid", value: "Prepaid" },
    { label: "COD", value: "cod" },
]

const Ordertags = [
    { label: "Tag 1", value: "Tag1" },
];

const CourierPartner = [
    { label: "Bluedart", value: "bluedart" },
    { label: "Shadowfax", value: "shadowfax" },
    { label: "Delhivery", value: "delhivery" },
    { label: "Xpressbees", value: "xpressbees" },
];


const MoreFiltersPanel = React.memo(({ activeTab, MoreFilters, CloseSidePanel, handleMoreFilter }) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [SaveFilter, setSaveFilter] = useState(false)
    const [clearState, setClearState] = useState(false)
    const [pickupAddresses, setPickupAddresses] = useState([

    ]);

    const sellerData = Cookies.get("user_id")
    const authToken = Cookies.get("access_token")


    const handleCheckboxChange = () => {
        setSaveFilter(prevState => !prevState);
    };

    const handleSubmit = e => {
        e.preventDefault();
        handleMoreFilter(filterParams)
        CloseSidePanel()
        setClearState(true)

    };

    const [filterParams, setFilterParams] = useState({
        start_date: "",
        end_date: "",
        status: "",
        order_source: "",
        courier_partner: "",
        payment_type: "",
        order_id: "",
        // order_tag: ""
    })

    console.log(activeTab,"this is a activeTabactiveTabactiveTabactiveTab",filterParams)

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
                order_tag: ""
            })
        }
    }, [activeTab,clearState])

    const handleChange = (name, value) => {
        if (name === "start_date" || name === "end_date") {
            setFilterParams(prev => ({
                ...prev,
                [name]: value
            }));
        }
        if (name === "status") {
            let temp_data = ''
            let temp = value.map((item) => {
                temp_data += item.value + ","
            })
            setFilterParams(prev => ({
                ...prev,
                [name]: temp_data
            }));
        }
        if (name === "order_source") {
            let temp_data = ''
            let temp = value.map((item) => {
                temp_data += item.value + ","
            })
            setFilterParams(prev => ({
                ...prev,
                [name]: temp_data
            }));
        }
        if (name === "courier_partner") {
            let temp_data = ''
            let temp = value.map((item) => {
                temp_data += item.value + ","
            })
            setFilterParams(prev => ({
                ...prev,
                [name]: temp_data
            }));
        }
        if (name === "payment_type") {
            setFilterParams(prev => ({
                ...prev,
                [name]: value.value
            }));
        }
        if (name === "order_id") {
            setFilterParams(prev => ({
                ...prev,
                [name]: value.target.value
            }));
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                if (MoreFilters) {
                    const response = await axios.get(`https://dev.shipease.in/core-api/features/warehouse/?seller_id=${sellerData}`, {
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
                console.error('Error fetching data:', error);
            }
        };

        fetchData(); // Call the fetchData function

    }, [MoreFilters, sellerData, authToken]);

    const handleReset = () => {
        setFilterParams({
            start_date: null,
            end_date: null,
            status: "",
            order_source: "",
            courier_partner: "",
            payment_type: "",
            order_id: "",
            order_tag: ""
        })
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
                                <label>
                                    Start Date
                                    <div className="date-picker-container">
                                        <FontAwesomeIcon icon={faCalendarAlt} className="calendar-icon" />
                                        <DatePicker
                                            dateFormat='dd/MM/yyyy'
                                            className='input-field'
                                            selected={filterParams?.start_date}
                                            onChange={(e) => handleChange("start_date", e)}
                                            maxDate={new Date()}
                                        />
                                    </div>
                                </label>
                                <label>
                                    End Date
                                    <div className="date-picker-container">
                                        <FontAwesomeIcon icon={faCalendarAlt} className="calendar-icon" />
                                        <DatePicker
                                            dateFormat='dd/MM/yyyy'
                                            className='input-field'
                                            selected={filterParams?.end_date}
                                            onChange={(e) => handleChange("end_date", e)}
                                            maxDate={new Date()}
                                        />
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
                                        options={CourierPartner}
                                        onChange={(e) => handleChange("courier_partner", e)}
                                        isMulti
                                        isSearchable
                                        value={filterParams.courier_partner ? CourierPartner.filter(option => filterParams.courier_partner.includes(option.value)) : null}
                                    />
                                </label>
                            </div>
                            <div className='filter-row'>
                                <label>Payment Option
                                    <Select
                                        options={paymentOptions}
                                        defaultValue={filterParams?.payment_type}
                                        onChange={(e) => handleChange("payment_type", e)}
                                        value={paymentOptions.find(option => option.value === filterParams.payment_type)}
                                    />
                                </label>
                            </div>
                            <div className='filter-row'>
                                <label>Pickup Address
                                    <Select
                                        options={pickupAddresses}
                                    />
                                </label>
                            </div>
                            <div className='filter-row'>
                                <label>Order Tag
                                    <Select
                                        options={Ordertags}
                                        // onChange={(e) => handleChange(e, "courier_partner")}
                                        isMulti
                                        isSearchable
                                    />
                                </label>
                            </div>
                           
                            <div className='filter-row'>
                                <label>SKU
                                    <input
                                        className='input-field'
                                        type="text"
                                        placeholder='Enter SKU'
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
                                    onChange={handleCheckboxChange}
                                />
                                {!SaveFilter ? 'Save Filter (Optional)' : (
                                    <input className='input-field filter-name-ip' type="text" placeholder='Enter name for filter' />
                                )}
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