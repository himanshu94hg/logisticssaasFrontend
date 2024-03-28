import 'react-toggle/style.css';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import "./createOrderStep.css"
import 'react-datepicker/dist/react-datepicker.css';
import { alphaNumReg } from '../../../../../../../../regex';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router';

export const OrderDetailsStep = ({ onNext, formData, setFormData, editStatus }) => {
    const location = useLocation();
    const [errors, setErrors] = useState({});
    const [AddFields, SetAddFields] = useState(false);
    const [AddPayFields, SetAddPayFields] = useState(false);
    const [orderStaus, setOrderStatus] = useState(false)

    useEffect(() => {
        if (location?.state?.orderType != "normalOrder" && location.pathname === "/create-order" || editStatus != "editStatus" && location.pathname === "/Orders") {
            setOrderStatus(true)
            setFormData({
                ...formData,
                order_details: {
                    ...formData.order_details,
                    order_type: "Reverse",
                    payment_type: "Prepaid"
                }
            });
        }

    }, [location, editStatus])

    const validateFormData = () => {
        const newErrors = {};
        if (!formData.order_details.customer_order_number) {
            newErrors.customer_order_number = ' Order Number is required!';
        }
        if (!formData.order_details.order_type) {
            newErrors.order_type = 'Order Type is required!';
        }
        if (!formData.order_details.order_date) {
            newErrors.order_date = 'Order Date is required!';
        }
        if (!formData.order_details.payment_type) {
            newErrors.payment_type = 'Payment Type is required!';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e, field) => {
        const value = e.target.value === '' ? null : e.target.value;
        setFormData(prevData => ({
            ...prevData,
            order_details: {
                ...prevData.order_details,
                [field]: value
            }
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
        const charge = e.target.value === '' ? null : e.target.value;
        setFormData(prevData => ({
            ...prevData,
            charge_details: {
                ...prevData.charge_details,
                [field]: charge
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
    const handleToggleChange = (field) => {
        const charValue = formData[field] ? null : "1";
        setFormData({ ...formData, [field]: charValue });
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
                                className={`input-field ${errors.customer_order_number && 'input-field-error'}`}
                                value={formData.order_details.customer_order_number}
                                onChange={(e) => handleCustomerOrderNumberChange(e, 'customer_order_number')}
                                placeholder='Enter Customer Order Number'
                            />
                            {errors.customer_order_number && <div className="custom-error">{errors.customer_order_number}</div>}
                        </label>
                    </div>
                    <div className='row mt-4 gap-2'>
                        {/* Order Type */}
                        <label className='col'>
                            Order Type
                            <select
                                className={`select-field ${errors.customer_order_number && 'input-field-error'}`}
                                value={formData.order_details.order_type}
                                onChange={(e) => handleSelectChange(e, 'order_type')}
                                disabled={orderStaus}
                            >
                                <option value="">Select Order Type</option>
                                <option value="Forward">Forward</option>
                                <option value="Reverse">Reverse</option>
                            </select>
                            {errors.order_type && <div className="custom-error">{errors.order_type}</div>}
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
                                    className={`input-field ${errors.customer_order_number && 'input-field-error'}`}
                                />
                            </div>
                            {errors.order_date && <div className="custom-error">{errors.order_date}</div>}
                        </label>

                        <label className='col'>
                            Order Channel
                            <select
                                className={`select-field`}
                                value={formData.order_details.Channel}
                                onChange={(e) => handleSelectChange(e, 'Channel')}
                            >
                                <option value="">Select Order Channel</option>
                                <option value="Custom">Custom</option>
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
                        <label className='col'>
                            Order Tag
                            <input
                                type="text"
                                className='input-field'
                                value={formData.order_details.order_tag}
                                onChange={(e) => handleChange(e, 'order_tag')}
                                placeholder='Enter Customer Order Tag'
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
                            />
                        </label>
                    </div>
                    <hr />
                    {/* Payment Section */}
                    <div className='row gap-2'>
                        <label className='col'>
                            Payment Type
                            <select
                                className={`select-field ${errors.customer_order_number && 'input-field-error'}`}
                                value={formData.order_details.payment_type}
                                onChange={(e) => handleSelectChange(e, 'payment_type')}
                                disabled={orderStaus}
                            >
                                <option value="">Select Payment Type</option>
                                <option value="Prepaid">Prepaid</option>
                                <option value="COD">COD</option>
                            </select>
                            {errors.payment_type && <div className="custom-error">{errors.payment_type}</div>}
                        </label>
                        <div className='col d-flex gap-4'>
                            <label style={{ height: '54px' }}>
                                MPS
                                <div className="toggle-switch mt-1">
                                    <label className='col'>
                                        <input
                                            type="checkbox"
                                            checked={formData.shipment_type}
                                            onChange={() => handleToggleChange('shipment_type')}
                                        />
                                        <span className="slider"></span>
                                    </label>
                                </div>
                            </label>
                            <label style={{ width: '100%' }} className={`${formData.shipment_type === "1" ? '' : 'd-none'}`}>
                                Number of packets
                                <input
                                    type="text"
                                    className='input-field'
                                    value={formData.other_details.number_of_packets || 0}
                                    onChange={(e) => handleChangeReseller(e, 'number_of_packets')}
                                    placeholder='Enter Number of Packets'
                                    onKeyPress={(e) => {
                                        if (!/\d/.test(e.key)) {
                                            e.preventDefault();
                                        }
                                    }}
                                />
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
                            <input
                                type="text"
                                className='input-field'
                                value={formData.charge_details.gift_wrap}
                                onChange={(e) => handleChangeCharge(e, 'gift_wrap')}
                                placeholder='Yes / NO'
                            />
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
