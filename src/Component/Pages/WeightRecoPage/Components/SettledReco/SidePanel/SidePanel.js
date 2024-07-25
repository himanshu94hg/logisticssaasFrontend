import { faCalendarAlt, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import './SidePanel.css'
import Cookies from 'js-cookie';
import axios from 'axios';

const SourceOptions = [
    { label: "Amazon", value: "amazon" },
    { label: "Custom", value: "Custom" },
    { label: "Shopify", value: "shopify" },
];

const OrderStatus = [
    { value: 'pending', label: 'Pending' },
    { value: 'processing', label: 'Processing' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'delivered', label: 'Delivered' },
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


const SidePanel = React.memo(({ activeTab, MoreFilters, CloseSidePanel, handleMoreFilter }) => {
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
    }, [activeTab, clearState])

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
    const handleChange = (fieldName, value) => {
        // Handle the change
        console.log(fieldName, value);
    };


    return (
        <>
            <div id='sidePanel' className="side-panel">
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
                                <label>Order Status
                                    <Select
                                        options={OrderStatus}
                                        isMulti
                                        isSearchable
                                        onChange={(e) => handleChange("status", e)}
                                        value={filterParams.status ? OrderStatus.filter(option => filterParams.status.includes(option.value)) : null}
                                    />
                                </label>
                            </div>
                        </div>
                        <div className='more-filters-footer'>
                            <div className='d-flex'>
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

export default SidePanel