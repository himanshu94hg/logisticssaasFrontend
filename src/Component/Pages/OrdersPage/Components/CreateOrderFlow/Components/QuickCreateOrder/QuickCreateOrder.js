import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'react-toggle/style.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

const QuickCreateOrder = () => {
    const navigation = useNavigate();
    const [step, setStep] = useState(1);
    const totalSteps = 5;
    const [formData, setFormData] = useState({
        step1: '',
        step2: '',
        step3: '',
        step4: '',
        step5: '',
        sameAsShipping: true,// New step added
    });
    const [progressBarWidth, setProgressBarWidth] = useState('5%');

    const [activeTab, setActiveTab] = useState("All Orders");


    useEffect(() => {
        const updateProgressBarWidth = () => {
            const width = step > totalSteps ? '100%' : `${((step - 1) / totalSteps) * 100}%`;
            setProgressBarWidth(width);
        };

        updateProgressBarWidth();
    }, [step, totalSteps]);

    const handleNext = () => {
        setStep(step + 1);
        console.log(formData.step1)
    };

    const handlePrev = () => {
        setStep(step - 1);
    };



    const handleFormSubmit = async () => {
        try {
            const response = await fetch('http://dev.shipease.in:8088/order/v1/createorder/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const responseData = await response.json();
                // Handle the API response as needed
                console.log('API Response:', responseData);

                Swal.fire({
                    icon: 'success',
                    title: 'Order Created!',
                    text: 'You can view your Order in Orders Page.',
                    customClass: {
                        confirmButton: 'btn main-button', // Add your custom class here
                    },
                }).then(() => {
                    // Redirect to another page after clicking OK
                    navigation('/Orders');
                });
            } else {
                // Handle error responses
                const errorData = await response.json();
                console.error('API Error:', errorData);

            }
        } catch (error) {
            console.error('Fetch Error:', error);
        }
    };

    return (
        <div className="stepper-form-container">
            <div className='w-100'>
                <div className=''>
                    <QuickOrderForm
                        onNext={handleNext}
                        formData={formData}
                        setFormData={setFormData}
                    />
                </div>
            </div>
        </div>
    );
};

const QuickOrderForm = ({ onNext, formData, setFormData }) => {

    const [AddFields, SetAddFields] = useState(false)
    const [AddPayFields, SetAddPayFields] = useState(false)

    const handleChange = (e, field) => {
        setFormData({ ...formData, [field]: e.target.value });
    };

    const handleSelectChange = (e, field) => {
        setFormData({ ...formData, [field]: e.target.value });
    };

    const handleToggleChange = (field) => {
        const charValue = formData[field] ? null : "1";
        setFormData({ ...formData, [field]: charValue });
    };

    const handleDateChange = (date) => {
        setFormData({ ...formData, order_date: date });
    };

    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);
    const defaultDate = new Date();

    return (
        <>
            {/* Order Details Section */}
            <div className='box-shadow shadow-sm p10 w-100 form-box-h'>
                <div className='inputs-container mx-auto mb-3'>
                    <div className='row'>
                        {/* Customer Order Number */}
                        <label className='col'>
                            Customer Order Number
                            <input
                                type="text"
                                className='input-field'
                                value={formData.customer_order_number}
                                onChange={(e) => handleChange(e, 'customer_order_number')}
                                placeholder='Enter Customer Order ID'
                            />
                        </label>
                    </div>
                    <div className='row mt-4'>

                        {/* Order Type */}
                        <label className='col'>
                            Order Type
                            <select
                                className='select-field'
                                value={formData.order_type}
                                onChange={(e) => handleSelectChange(e, 'order_type')}
                            >
                                <option value="forward">Forward</option>
                                <option value="reverse">Reverse</option>
                            </select>
                        </label>

                        <label className='col'>
                            Payment Type
                            <select
                                className='select-field'
                                value={formData.o_type}
                                onChange={(e) => handleSelectChange(e, 'o_type')}
                            >
                                <option value="prepaid">Prepaid</option>
                                <option value="cod">COD</option>
                            </select>
                        </label>
                    </div>



                    <div className='row gap-2'>
                        {/* Payment Type */}

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
                                    type="number"
                                    className='input-field'
                                    value={formData.number_of_packets || '1'}
                                    onChange={(e) => handleChange(e, 'number_of_packets')}
                                />
                            </label>
                        </div>

                    </div>
                    <div className="row mt-4">
                        <p onClick={() => SetAddPayFields(!AddPayFields)} className='add-fields-text'>
                            <span>+ Add Shipping Charges, Gift Wrap, Transaction fee</span>
                            <span className='text-gray'> (Optional)  <FontAwesomeIcon icon={AddPayFields ? faChevronUp : faChevronDown} /></span>
                        </p>
                    </div>

                    <div className={`row ${!AddPayFields ? 'd-none' : ''}`}>
                        <label className='col'>
                            Shipping Charges
                            <input
                                type="text"
                                className='input-field'
                                value={formData.customer_order_tag}
                                onChange={(e) => handleChange(e, 'customer_order_tag')}
                                placeholder='Enter Customer Order Tag'
                            />
                        </label>
                        <label className='col'>
                            Gift Wrap
                            <input
                                type="text"
                                className='input-field'
                                value={formData.customer_reseller_name}
                                onChange={(e) => handleChange(e, 'customer_reseller_name')}
                                placeholder='Enter Reseller Name'
                            />
                        </label>
                        <label className='col'>
                            Transaction fee
                            <input
                                type="text"
                                className='input-field'
                                value={formData.customer_reseller_name}
                                onChange={(e) => handleChange(e, 'customer_reseller_name')}
                                placeholder='Enter Reseller Name'
                            />
                        </label>
                    </div>
                    {/* <hr /> */}

                </div>
            </div>
            {/* Next Button */}
            <div className='d-flex justify-content-end my-3'>
                <button className='btn main-button' onClick={onNext}>
                    Next
                </button>
            </div>
        </>
    );
};


export default QuickCreateOrder;
