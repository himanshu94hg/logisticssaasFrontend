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




    const handleNext = () => {
        setStep(step + 1);
    };

    const handlePrev = () => {
        setStep(step - 1);
    };

    const handleFormSubmit = async () => {
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
    };

    return (
        <div className="stepper-form-container">
            <div className='w-100'>
                <div className=''>
                    {/* Steps */}
                    <OrderDetailsStep
                        onNext={handleNext}
                        formData={formData}
                        setFormData={setFormData}
                    />
                    {/* <hr /> */}
                    <div className='my-4'></div>
                    <AddressDetailStep
                        onPrev={handlePrev}
                        onNext={handleNext}
                        formData={formData}
                        setFormData={setFormData}
                    />
                    {/* <hr /> */}
                    <div className='my-4'></div>
                    <ProductDetailStep
                        onPrev={handlePrev}
                        onNext={handleNext}
                        formData={formData}
                        setFormData={setFormData}
                    />
                    {/* <hr /> */}
                    <div className='my-4'></div>
                    <PackageDetailStep
                        onPrev={handlePrev}
                        onNext={handleNext}
                        formData={formData}
                        setFormData={setFormData}
                    />
                    {/* <hr /> */}
                    <div className='my-4'></div>
                    <WareHouseDetailStep
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