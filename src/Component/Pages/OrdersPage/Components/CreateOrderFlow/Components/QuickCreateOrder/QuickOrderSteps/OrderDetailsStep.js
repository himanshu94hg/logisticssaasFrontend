import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import pathClearAction from '../../../../../../../../redux/action/pathname/pathClear';

const OrderDetailsStep = ({ onNext, formData, setFormData, editStatus }) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});
    const [orderStaus, setOrderStatus] = useState(false)

    const { pathName } = useSelector(state => state?.authDataReducer)


    useEffect(() => {
        if (location.pathname === "/create-order" && location?.state?.orderType === "normalOrder") {
            dispatch(pathClearAction('ddd'))
        }
    }, [location.pathname])



    useEffect(() => {
        if (pathName === "Reverse Order" && location?.state?.orderType != "normalOrder") {
            console.log(location?.state?.orderType, "this is a state daya")

            setOrderStatus(true)
            setFormData(prevFormData => ({
                ...prevFormData,
                order_details: {
                    ...prevFormData.order_details,
                    order_type: "Reverse",
                    payment_type: "Prepaid"
                }
            }));
        }
        else {
            setOrderStatus(false)
            console.log('This is else xond')
            setFormData(prevFormData => ({
                ...prevFormData,
                order_details: {
                    ...prevFormData.order_details,
                    order_type: "",
                    payment_type: ""
                }
            }));
        }
    }, [location, editStatus, pathName, location?.pathname, location?.state?.orderType])

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
            {/* Order Details Section */}
            <div className='box-shadow p10 w-100'>
                <div className='inputs-container mx-auto mb-3'>
                    <h3 className='mb-5'>Create a quick order!</h3>
                    {/* <h3 className='mb-4'>Order Details</h3> */}
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
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrderDetailsStep