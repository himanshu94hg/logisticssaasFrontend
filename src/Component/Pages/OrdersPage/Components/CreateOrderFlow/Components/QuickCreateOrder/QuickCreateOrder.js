import axios from 'axios';
import 'react-toggle/style.css';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import OrderDetailsStep from './QuickOrderSteps/OrderDetailsStep';
import AddressDetailStep from './QuickOrderSteps/AddressDetailStep';
import ProductDetailStep from './QuickOrderSteps/ProductDetailStep';
import PackageDetailStep from './QuickOrderSteps/PackageDetailStep';
import WareHouseDetailStep from './QuickOrderSteps/WareHouseDetailStep';
import './QuickCreateOrder.css'


const QuickCreateOrder = () => {
    const totalSteps = 5;
    const navigation = useNavigate();
    const [step, setStep] = useState(1);
    const authToken = Cookies.get("access_token")
    const currentDate = new Date();
    const [errors, setErrors] = useState({});
    const [isChecked, setIsChecked] = useState(true);

    const [formData, setFormData] = useState({
        order_details: {
            customer_order_number: '',
            invoice_amount: '',
            is_mps: false,
            warehouse_id: '',
            order_tag: '',
            payment_type: '',
            order_date: currentDate,
            order_type: "",
            channel: "custom",
            channel_id: null
        },
        shipping_details: {
            recipient_name: "",
            address: "",
            landmark: "",
            country: "India",
            state: "",
            city: "",
            pincode: "",
            mobile_number: "",
            email: "",
            company_name: "",
            contact_code: "91"
        },
        billing_details: {
            customer_name: "",
            address: "",
            landmark: "",
            country: "India",
            state: "",
            city: "",
            pincode: "",
            mobile_number: "",
            email: "",
            company_name: "",
            contact_code: "91"
        },
        other_details: {
            number_of_packets: 0,
            reseller_name: ""
        },
        charge_details: {
            cod_charges: '',
            shipping_charges: '',
            transaction_fee: '',
            is_gift_wrap: true
        },
        dimension_details: {
            weight: '',
            length: '',
            breadth: '',
            height: '',
            vol_weight: ''
        },
        product_details: [
            {
                product_name: "",
                quantity: '',
                unit_price: 0,
                product_category: "",
                weight: 0,
                sku: "",
                hsn_code: "",
                tax_rate: null,
                product_discount: 0,
                hts_number: "",
                export_reference_number: ""
            }
        ],
    })

    const validatequickFormData = () => {
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
        if (!formData.shipping_details.recipient_name) {
            newErrors.recipient_name = 'Recipient Name is required!';
        }
        if (!formData.shipping_details.mobile_number) {
            newErrors.mobile_number = 'Mobile Number is required!';
        } else if (!/^[0-9]{10}$/.test(formData.shipping_details.mobile_number)) {
            newErrors.mobile_number = 'Mobile Number should be 10 digits!';
        }
        if (!formData.shipping_details.address) {
            newErrors.address = 'Address is required!';
        }
        if (!formData.shipping_details.landmark) {
            newErrors.landmark = 'Landmark is required!';
        }
        if (!formData.shipping_details.pincode) {
            newErrors.pincode = 'Pincode is required!';
        } else if (!/^[0-9]{6}$/.test(formData.shipping_details.pincode)) {
            newErrors.pincode = 'Pincode should be 6 digits!';
        }
        if (!formData.shipping_details.city) {
            newErrors.city = 'City is required!';
        }
        if (!formData.shipping_details.state) {
            newErrors.state = 'State is required!';
        }
        if (!formData.shipping_details.country) {
            newErrors.country = 'Country is required!';
        }
        if (!formData.order_details.invoice_amount){
            newErrors.invoice_amount = 'Invoice Amount is required!';
        }
        if (!isChecked) {
            if (!formData.billing_details.customer_name) {
                newErrors.billing_customer_name = 'Customer Name is required!';
            }
            if (!formData.billing_details.mobile_number) {
                newErrors.billing_mobile_number = 'Mobile Number is required!';
            } else if (!/^[0-9]{10}$/.test(formData.billing_details.mobile_number)) {
                newErrors.billing_mobile_number = 'Mobile Number should be 10 digits!';
            }
            if (!formData.billing_details.address) {
                newErrors.billing_address = 'Address is required!';
            }
            if (!formData.billing_details.landmark) {
                newErrors.billing_landmark = 'Landmark is required!';
            }
            if (!formData.billing_details.pincode) {
                newErrors.billing_pincode = 'Pincode is required!';
            } else if (!/^[0-9]{6}$/.test(formData.billing_details.pincode)) {
                newErrors.billing_pincode = 'Pincode should be 6 digits!';
            }
            if (!formData.billing_details.city) {
                newErrors.billing_city = 'City is required!';
            }
            if (!formData.billing_details.state) {
                newErrors.billing_state = 'State is required!';
            }
            if (!formData.billing_details.country) {
                newErrors.billing_country = 'Country is required!';
            }
            if (!formData){

            }
        }
        formData?.product_details?.forEach((product, index) => {
            if (!product?.product_name?.trim()) {
                newErrors[`product_name_${index}`] = 'Product Name is required!';
            }
            if (typeof product?.quantity !== 'string' || !product?.quantity.trim() || isNaN(Number(product?.quantity)) || Number(product?.quantity) <= 0) {
                newErrors[`quantity_${index}`] = 'Product Quantity is required!';
            }
            if (!product?.sku?.trim()) {
                newErrors[`sku_${index}`] = 'SKU is required!';
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleValidation = () => {
        const { cod_charges } = formData?.charge_details;
        const { invoice_amount, } = formData?.order_details;
        const { weight, length, breadth, height } = formData?.dimension_details;

        const errorsObj = {};

        if (!invoice_amount) {
            errorsObj.invoice_amount = "Invoice Amount is required!";
        }
        if (formData.order_details.payment_type === "COD") {
            if (!cod_charges) {
                errorsObj.cod_charges = "COD Charges is required!";
            }
        }
        if (!weight) {
            errorsObj.weight = "Dead Weight is required!";
        }
        if (!length) {
            errorsObj.length = "Length is required!";
        }
        if (!breadth) {
            errorsObj.breadth = "Breadth is required!";
        }
        if (!height) {
            errorsObj.height = "Height is required!";
        }
        setErrors(errorsObj);
        console.log("Package Details Data", Object.keys(errorsObj));
        return Object.keys(errorsObj).length === 0;
    };


    const handleNext = () => {
        setStep(step + 1);
    };

    const handlePrev = () => {
        setStep(step - 1);
    };

    const handleFormSubmit = async () => {
        if (validatequickFormData() || handleValidation()) {
            try {
                const response = await axios.post('https://dev.shipease.in/orders-api/orders/', formData, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authToken}`
                    }
                });
                if (response !== null) {
                    if (response.status === 201) {
                        const responseData = response.data;
                        toast.success("Order Created successfully!")
                        navigation('/Orders');
                    } else {
                        const errorData = response.data;
                        toast.error("Something went wrong!", errorData)
                    }
                }
            } catch (error) {
                toast.error('something went wrong!')
            }  
        }
       
    };

    return (
        <div className="stepper-form-container">
            <div className='w-100'>
                <div className=''>
                    {/* Steps */}
                    <OrderDetailsStep
                        onNext={handleNext}
                        errors = {errors}
                        setErrors = {setErrors}
                        formData={formData}
                        setFormData={setFormData}
                    />
                    {/* <hr /> */}
                    <div className='my-4'></div>
                    <AddressDetailStep
                        onPrev={handlePrev}
                        onNext={handleNext}
                        isChecked = {isChecked}
                        setIsChecked = {setIsChecked}
                        errors = {errors}
                        setErrors = {setErrors}
                        formData={formData}
                        setFormData={setFormData}
                    />
                    {/* <hr /> */}
                    <div className='my-4'></div>
                    <ProductDetailStep
                        errors = {errors}
                        setErrors = {setErrors}
                        onPrev={handlePrev}
                        onNext={handleNext}
                        formData={formData}
                        setFormData={setFormData}
                    />
                    {/* <hr /> */}
                    <div className='my-4'></div>
                    <PackageDetailStep
                        errors = {errors}
                        setErrors = {setErrors}
                        onPrev={handlePrev}
                        onNext={handleNext}
                        formData={formData}
                        setFormData={setFormData}
                    />
                    {/* <hr /> */}
                    <div className='my-4'></div>
                    <WareHouseDetailStep
                        errors = {errors}
                        setErrors = {setErrors}
                        onPrev={handlePrev}
                        onSubmit={handleFormSubmit}
                        formData={formData}
                        setFormData={setFormData}
                    />
                </div>
                {/* <div className='d-flex justify-content-end my-3 cof-btn-container'>
                    <button className='btn main-button ms-3' onClick={handleFormSubmit}>Quick Ship</button>
                </div> */}
            </div>
        </div>
    );
};

export default QuickCreateOrder;