import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import pathClearAction from '../../../../../../../../redux/action/pathname/pathClear';

const OrderDetailsStep = ({ onNext, formData, setFormData, editStatus, errors, setErrors }) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const [orderStaus, setOrderStatus] = useState(false)
    const { pathName } = useSelector(state => state?.authDataReducer)

    useEffect(() => {
        if (location.pathname === "/create-order" && location?.state?.orderType === "normalOrder") {
            dispatch(pathClearAction('ddd'))
        }
    }, [location.pathname])

    const validateFormData = () => {
        const newErrors = {};
        if (!formData.order_details.customer_order_number) {
            newErrors.customer_order_number = 'Order Number is required!';
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

    return (
        <>
            <div className='box-shadow p10 w-100'>
                <div className='inputs-container mx-auto mb-3'>
                    <h3 className='mb-5'>Create a quick order!</h3>
                    <div className='row'>
                        <label className='col'>
                            <span>Order Number <span className='mandatory'>*</span></span>
                            <input
                                type="text"
                                className={`input-field ${errors.customer_order_number && 'input-field-error'}`}
                                value={formData.order_details.customer_order_number}
                                onChange={(e) => handleCustomerOrderNumberChange(e, 'customer_order_number')}
                                placeholder='Enter Customer Order Number'
                                maxLength={100}
                                onKeyPress={(e) => {
                                    const allowedCharacters = /^[a-zA-Z0-9\s!@#$%^&*(),.?":{}|<>]*$/;
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
                            {errors.customer_order_number && <div className="custom-error">{errors.customer_order_number}</div>}
                        </label>

                        <label className='col'>
                            <span>Order Type <span className='mandatory'>*</span></span>
                            <select
                                className={`select-field ${errors.order_type && 'input-field-error'}`}
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
                        <label className='col'>
                            <span>Payment Type <span className='mandatory'>*</span></span>
                            <select
                                className={`select-field ${errors.payment_type && 'input-field-error'}`}
                                value={formData.order_details.payment_type}
                                onChange={(e) => handleChange(e, 'payment_type')}
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
                            {errors.payment_type && <div className="custom-error">{errors.payment_type}</div>}
                        </label>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrderDetailsStep