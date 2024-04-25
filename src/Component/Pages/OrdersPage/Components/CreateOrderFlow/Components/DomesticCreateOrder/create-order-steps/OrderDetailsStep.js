import 'react-toggle/style.css';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import "./createOrderStep.css"
import 'react-datepicker/dist/react-datepicker.css';
import { alphaNumReg } from '../../../../../../../../regex';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router';
import { useDispatch,useSelector } from 'react-redux';
import Select from 'react-select';
import Cookies from "js-cookie"

export const OrderDetailsStep = ({ onNext, formData, setFormData, editStatus, editErrors, seteditErrors }) => {
    const dispatch = useDispatch()
    const location = useLocation();
    const [errors, setErrors] = useState({});
    const [AddFields, SetAddFields] = useState(false);
    const [AddPayFields, SetAddPayFields] = useState(false);
    const [orderStaus, setOrderStatus] = useState(false)
    const { pathName } = useSelector(state => state?.authDataReducer)
    const { tagListData } = useSelector(state => state?.orderSectionReducer);
    const [orderTag, setOrderTag] = useState([]);

    useEffect(() => {
        if (location.pathname === "/create-orders") {
            if (pathName === "Reverse Order") {
                setOrderStatus(true);
                setFormData(prevFormData => ({
                    ...prevFormData,
                    order_details: {
                        ...prevFormData.order_details,
                        order_type: "Reverse",
                        payment_type: "Prepaid",

                    }
                }));
            } else if (pathName === "Quick Order" || location.state && (location.state.orderType === "normalOrder")) {
                setOrderStatus(false);
                setFormData({
                    ...formData,
                    order_details: {
                        ...formData.order_details,
                        order_type: "",
                        payment_type: ""
                    }
                });
            }
        }
    }, [location, pathName, editStatus]);



    useEffect(() => {
        if (location?.state) {
            if (location.state.orderType === "BulkCreateOrder" || location.state.orderType === "quickOrder" || location.state.orderType === "normalOrder") {
                setOrderStatus(false);
                // setFormData(prevFormData => ({
                //     ...prevFormData,
                //     order_details: {
                //         ...prevFormData.order_details,
                //         order_type: "",
                //         payment_type: ""
                //     }
                // }));
            }
        }
    }, [location?.state?.orderType]);

    useEffect(() => {
        if (tagListData && tagListData.length > 0) {
            const formattedData = tagListData.map(item => ({
                id:item.id,
                value: item.name,
                label: item.name
            }));
            console.log("All formattedData formattedData",formattedData);
            setOrderTag(formattedData);
        } else {
            setOrderTag([]);
        }
    }, [tagListData]);
    

   const token=Cookies.get("access_token")

    useEffect(() => {
        if(token){
            dispatch({ type: "ORDERS_TAG_LIST_API_ACTION" })
        }
    },[])

    const validateFormData = () => {
        const newErrors = {};
        if (!formData.order_details.customer_order_number) {
            newErrors.customer_order_number = ' Order Number is required!';
        }
        if (!formData.order_details.order_type) {
            newErrors.order_type = 'Order Type is required!';
        }
        if (!formData.order_details.payment_type) {
            newErrors.payment_type = 'Payment Type is required!';
        }
        if (formData.order_details.is_mps && formData.other_details.number_of_packets == null || "") {
            newErrors.number_of_packets = 'Packets is required!';
        }
        setErrors(newErrors);
        console.log(newErrors, "this is new errors")
        return Object.keys(newErrors).length === 0;
    };
   
    const handleChange = (selectedOptions, field) => {
        const selectedIds = selectedOptions ? selectedOptions.map(option => option.id) : [];
        const selectedNames = selectedOptions ? selectedOptions.map(option => option.value) : [];
        setFormData(prevData => ({
            ...prevData,
            order_details: {
                ...prevData.order_details,
                [field]: selectedIds
            },
            order_tag_names: selectedNames || []
        }));
    };      

    const handleReSeller = (e, field) => {
        const value = e.target.value === '' ? null : e.target.value;
        setFormData(prevData => ({
            ...prevData,
            other_details: {
                ...prevData.other_details,
                [field]: value
            }
        }));
    };

    const handleChangeReseller = (e, field) => {
        const info = e.target.value === '' ? null : e.target.value;
        setFormData(prevData => ({
            ...prevData,
            other_details: {
                ...prevData.other_details,
                [field]: info
            }
        }));
    };
    const handleChangeCharge = (e, field) => {
        let value = e.target.value;
        if (field === 'is_gift_wrap') {
            value = value === 'true';
        }
        setFormData(prevData => ({
            ...prevData,
            charge_details: {
                ...prevData.charge_details,
                [field]: value
            }
        }));
    };


    const handleSelectChange = (e, field) => {
        setFormData({
            ...formData,
            order_details: {
                ...formData.order_details,
                [field]: e.target.value
            }
        });
    };

    const handleDateChange = (date, field) => {
        setFormData({
            ...formData,
            order_details: {
                ...formData.order_details,
                [field]: date
            }
        });
    };
    const handleToggleChange = (e) => {
        const isChecked = e.target.checked;
        setFormData(prevData => ({
            ...prevData,
            order_details: {
                ...prevData.order_details,
                is_mps: isChecked,
            },
            other_details: {
                ...prevData.other_details,
                number_of_packets: isChecked ? 1 : 0,
            },
        }));
    };

    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const onNextClicked = () => {
        if (validateFormData()) {
            onNext();
        }
    };
    const handleCustomerOrderNumberChange = (e) => {
        const value = e.target.value === '' ? null : e.target.value;
        setFormData(prevData => ({
            ...prevData,
            order_details: {
                ...prevData.order_details,
                customer_order_number: value
            }
        }));
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


    return (
        <>
            {/* Order Details Section */}
            <div className='box-shadow shadow-sm p10 w-100 form-box-h'>
                <div className='inputs-container mx-auto mb-3'>
                    <h3 className='mb-4'>Order Details</h3>
                    <div className='row'>
                        {/* Customer Order Number */}
                        <label className='col'>
                            <span>Order Number <span className='mandatory'>*</span></span>
                            <input
                                type="text"
                                className={`input-field ${errors.customer_order_number || editErrors?.customer_order_number ? 'input-field-error' : ''}`}
                                value={formData.order_details.customer_order_number}
                                onChange={(e) => handleCustomerOrderNumberChange(e, 'customer_order_number')}
                                placeholder='Enter Customer Order Number'
                                onKeyPress={(e) => {
                                    const allowedCharacters = /^[a-zA-Z0-9\s]*$/;
                                    if (
                                        e.key === ' ' &&
                                        e.target.value.endsWith(' ')
                                    ) {
                                        e.preventDefault();
                                    } else if (!allowedCharacters.test(e.key)) {
                                        e.preventDefault();
                                    }
                                }}
                            />
                            {(errors.customer_order_number || editErrors?.customer_order_number) && <div className="custom-error">{errors.customer_order_number || editErrors?.customer_order_number}</div>}
                        </label>
                    </div>
                    <div className='row mt-4 gap-2'>
                        {/* Order Type */}
                        <label className='col'>
                            Order Type
                            <select
                                className={`select-field ${errors.order_type || editErrors?.order_type ? 'input-field-error' : ''}`}
                                value={formData.order_details.order_type}
                                onChange={(e) => handleSelectChange(e, 'order_type')}
                                disabled={orderStaus}
                            >
                                <option value="">Select Order Type</option>
                                <option value="Forward">Forward</option>
                                <option value="Reverse">Reverse</option>
                            </select>
                            {(errors.order_type || editErrors?.order_type) && <div className="custom-error">{errors.order_type || editErrors?.order_type}</div>}
                        </label>
                        {/* Order Date with react-datepicker */}
                        <label className='col'>
                            Order Date
                            <div className="date-picker-container">
                                <FontAwesomeIcon icon={faCalendarAlt} className="calendar-icon" />
                                <DatePicker
                                    selected={formData?.order_details?.order_date}
                                    onChange={(date) => { handleDateChange(date, "order_date") }}
                                    dateFormat="dd/MM/yyyy"
                                    maxDate={new Date()}
                                    onKeyDown={(e) => handleKeyDown(e)}
                                    className={`input-field`}
                                />
                            </div>
                            {(errors.order_date || editErrors?.order_date) && <div className="custom-error">{errors.order_date || editErrors?.order_date}</div>}
                        </label>

                        <label className='col'>
                            Order Channel
                            <select
                                className={`select-field`}
                                value={formData.order_details.Channel}
                                onChange={(e) => handleSelectChange(e, 'Channel')}
                            >
                                <option value="">Select Order Channel</option>
                                <option value="custom">Custom</option>
                            </select>
                            {/* {errors.Channel && <div className="custom-error">{errors.Channel}</div>} */}
                        </label>
                    </div>
                    {/* Add Fields Section */}
                    <div className="row mt-4">
                        <p onClick={() => SetAddFields(!AddFields)} className='add-fields-text'>
                            <span>+ Add Order Tag, Reseller's </span>
                            <span className='text-gray'> (Optional)  <FontAwesomeIcon icon={AddFields ? faChevronUp : faChevronDown} /></span>
                        </p>
                    </div>

                    {/* Additional Fields */}
                    <div className={`row gap-2 ${!AddFields ? 'd-none' : ''}`}>
                        <label className='col' >
                            Order Tag
                            <Select
                                isMulti
                                isSearchable
                                options={orderTag}
                                onChange={(selectedOptions) => handleChange(selectedOptions, 'order_tag')}
                                value={
                                    formData.order_details.order_tag
                                    ? formData.order_tag_names
                                        ? formData.order_details.order_tag.map(tagId => ({ 
                                            id: tagId, 
                                            value: formData.order_tag_names[formData.order_details.order_tag.indexOf(tagId)], 
                                            label: formData.order_tag_names[formData.order_details.order_tag.indexOf(tagId)] 
                                        }))
                                        : []
                                    : []
                                }
                                styles={{
                                    control: styles => ({ ...styles, width: "325px" })
                                }}
                            />

                        </label>
                        <label className='col'>
                            Reseller Name
                            <input
                                type="text"
                                className='input-field'
                                value={formData.other_details.reseller_name}
                                onChange={(e) => handleReSeller(e, 'reseller_name')}
                                placeholder='Enter Reseller Name'
                                onKeyPress={(e) => {
                                    const allowedCharacters = /^[a-zA-Z0-9\s]*$/;
                                    if (
                                        e.key === ' ' &&
                                        e.target.value.endsWith(' ')
                                    ) {
                                        e.preventDefault();
                                    } else if (!allowedCharacters.test(e.key)) {
                                        e.preventDefault();
                                    }
                                }}
                            />
                        </label>
                    </div>
                    <hr />
                    {/* Payment Section */}
                    <div className='row gap-2'>
                        <label className='col'>
                            Payment Type
                            <select
                                className={`select-field ${errors.payment_type || editErrors?.payment_type ? 'input-field-error' : ''}`}
                                value={formData.order_details.payment_type}
                                onChange={(e) => handleSelectChange(e, 'payment_type')}
                                disabled={orderStaus}
                            >
                                <option value="">Select Payment Type</option>
                                {formData.order_details.order_type === "Reverse" ? (
                                    <option value="Prepaid">Prepaid</option>
                                ) : (
                                    <>
                                        <option value="Prepaid">Prepaid</option>
                                        <option value="COD">COD</option>
                                    </>
                                )}
                            </select>
                            {(errors.payment_type || editErrors?.payment_type) && <div className="custom-error">{errors.payment_type || editErrors?.payment_type}</div>}
                        </label>
                        <div className='col d-flex gap-4'>
                            <label style={{ height: '54px' }}>
                                MPS
                                <div className="toggle-switch mt-1">
                                    <label className='col'>
                                        <input
                                            type="checkbox"
                                            disabled={orderStaus}
                                            checked={formData.order_details.is_mps}
                                            onChange={(e) => handleToggleChange(e, 'is_mps')}
                                        />
                                        <span className="slider"></span>
                                    </label>
                                </div>
                            </label>
                            <label style={{ width: '100%' }} className={`${formData.order_details.is_mps ? '' : 'd-none'}`}>
                                Number of packets
                                <input
                                    type="text"
                                    className='input-field'
                                    value={formData.other_details.number_of_packets}
                                    onChange={(e) => handleChangeReseller(e, 'number_of_packets')}
                                    placeholder='Enter Number of Packets'
                                    onKeyPress={(e) => {
                                        if (!/\d/.test(e.key)) {
                                            e.preventDefault();
                                        }
                                    }}
                                />
                                {(errors.number_of_packets || editErrors?.number_of_packets) && <div className="custom-error">{errors.number_of_packets || editErrors?.number_of_packets}</div>}
                            </label>

                        </div>
                    </div>
                    {/* Add Payment Fields Section */}
                    <div className="row mt-4">
                        <p onClick={() => SetAddPayFields(!AddPayFields)} className='add-fields-text'>
                            <span>+ Add Shipping Charges, Gift Wrap, Transaction fee</span>
                            <span className='text-gray'> (Optional)  <FontAwesomeIcon icon={AddPayFields ? faChevronUp : faChevronDown} /></span>
                        </p>
                    </div>

                    {/* Additional Payment Fields */}
                    <div className={`row gap-2 ${!AddPayFields ? 'd-none' : ''}`}>
                        <label className='col'>
                            Shipping Charges
                            <input
                                type="text"
                                className='input-field'
                                value={formData.charge_details.shipping_charges}
                                onChange={(e) => handleChangeCharge(e, 'shipping_charges')}
                                placeholder='Enter Shipping Charges'
                                onKeyPress={(e) => {
                                    if (!/\d/.test(e.key)) {
                                        e.preventDefault();
                                    }
                                }}
                            />
                        </label>
                        <label className='col'>
                            Gift Wrap
                            <select
                                name=""
                                className='select-field'
                                onChange={(e) => handleChangeCharge(e, 'is_gift_wrap')}
                                value={formData.charge_details.is_gift_wrap}
                            >
                                <option value={true}>Yes</option>
                                <option value={false}>No</option>
                            </select>
                            {/* <input
                                type="text"
                                className='input-field'
                                value={formData.charge_details.gift_wrap}
                                onChange={(e) => handleChangeCharge(e, 'gift_wrap')}
                                placeholder='Yes / NO'
                            /> */}
                        </label>
                        <label className='col'>
                            Transaction fee
                            <input
                                type="text"
                                className='input-field'
                                value={formData.charge_details.transaction_fee}
                                onChange={(e) => handleChangeCharge(e, 'transaction_fee')}
                                placeholder='Enter Transaction fee'
                                onKeyPress={(e) => {
                                    if (!/\d/.test(e.key)) {
                                        e.preventDefault();
                                    }
                                }}
                            />
                        </label>
                    </div>
                </div>
            </div>
            {/* Next Button */}
            <div className='d-flex justify-content-end my-3 cof-btn-container'>
                <button className='btn main-button' onClick={onNextClicked}>
                    Next
                </button>
            </div>
        </>
    );
};
