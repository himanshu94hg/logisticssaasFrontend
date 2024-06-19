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
import { checkType, customErrorFunction } from '../../../../../../../customFunction/errorHandling';
import SingleShipPop from '../../../Processing/SingleShipPop/SingleShipPop';
import { BASE_URL_CORE, BASE_URL_ORDER } from '../../../../../../../axios/config';


const QuickCreateOrder = () => {
    const totalSteps = 5;
    const navigation = useNavigate();
    const [step, setStep] = useState(1);
    const currentDate = new Date();
    const [errors, setErrors] = useState({});
    const authToken = Cookies.get("access_token")
    const [isChecked, setIsChecked] = useState(true);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [SingleShip, setSingleShip] = useState(false)
    const [shipingResponse, setShipingResponse] = useState(null);


    const [formData, setFormData] = useState({
        order_details: {
            customer_order_number: '',
            invoice_amount: '',
            is_mps: false,
            warehouse_id: '',
            order_tag: [],
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
        if (!formData.order_details.payment_type) {
            newErrors.payment_type = 'Payment Type is required!';
        }
        if (!formData.shipping_details.recipient_name) {
            newErrors.recipient_name = 'Recipient Name is required!';
        }
        if (!formData.shipping_details.mobile_number) {
            newErrors.mobile_number = 'Mobile Number is required!';
        } 
        // else if (!/^[0-9]{10}$/.test(formData.shipping_details.mobile_number)) {
        //     newErrors.mobile_number = 'Mobile Number should be 10 digits!';
        // }
        if (!formData.shipping_details.address) {
            newErrors.address = 'Address is required!';
        }
        if (!formData.shipping_details.pincode) {
            newErrors.pincode = 'Pincode is required!';
        } else if (!/^[0-9]{6}$/.test(formData.shipping_details.pincode)) {
            newErrors.pincode = 'Pincode should be 6 digits!';
        }
        if (!formData.order_details.invoice_amount) {
            newErrors.invoice_amount = 'Invoice Amount is required!';
        }
        if (formData.order_details.payment_type === "COD") {
            if (!formData.charge_details.cod_charges) {
                newErrors.cod_charges = 'COD Charges is required!';
            }
        }
        if (formData.dimension_details.weight == 0) {
            newErrors.weight = 'Dead Weight should be greater than 0!';
        }
        if (!formData.dimension_details.weight) {
            newErrors.weight = 'Dead Weight is required!';
        }
        if (formData.dimension_details.height == 0) {
            newErrors.height = 'Height should be greater than 0!';
        }
        if (!formData.dimension_details.height) {
            newErrors.height = 'Height is required!';
        }
        if (formData.dimension_details.length == 0) {
            newErrors.length = 'Length should be greater than 0!';
        }
        if (!formData.dimension_details.length) {
            newErrors.length = 'Length is required!';
        }
        if (formData.dimension_details.breadth == 0) {
            newErrors.breadth = 'Breadth should be greater than 0!';
        }
        if (!formData.dimension_details.breadth) {
            newErrors.breadth = 'Breadth is required!';
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
            if (!formData.billing_details.pincode) {
                newErrors.billing_pincode = 'Pincode is required!';
            } else if (!/^[0-9]{6}$/.test(formData.billing_details.pincode)) {
                newErrors.billing_pincode = 'Pincode should be 6 digits!';
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


    const handleNext = () => {
        setStep(step + 1);
    };

    const handlePrev = () => {
        setStep(step - 1);
    };

    const handleFormSubmit = async () => {
        if (validatequickFormData()) {
            try {
                const response = await axios.post(`${BASE_URL_ORDER}/orders-api/orders/`, formData, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authToken}`
                    }
                });
                if (response !== null) {
                    if (response.status === 201) {
                        const responseData = response.data;
                        // toast.success("Order Created successfully!")
                        // navigation('/Orders');
                        console.log(response)
                        setSelectedOrderId(response?.data?.id)
                    } else {
                        //    console.log(object)
                        toast.error("Something went wrong!")
                    }
                }
            } catch (error) {
               customErrorFunction(error)
            }
        }
    };


    useEffect(() => {
        if (selectedOrderId !== null) {
            const config = {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            };
            axios.get(`${BASE_URL_CORE}/core-api/shipping/ship-rate-card/?order_id=${selectedOrderId}`, config)
                .then((response) => {
                    setShipingResponse(response.data);
                    setSingleShip(true);

                }).catch((error) => {
                    customErrorFunction(error)
                });
        }
    }, [selectedOrderId]);

    console.log(formData,"formDataformDataformData")

    return (
        <div className="stepper-form-container">
            <div className='w-100'>
                <div className=''>
                    {/* Steps */}
                    <OrderDetailsStep
                        onNext={handleNext}
                        errors={errors}
                        setErrors={setErrors}
                        formData={formData}
                        setFormData={setFormData}
                    />
                    {/* <hr /> */}
                    <div className='my-4'></div>
                    <AddressDetailStep
                        onPrev={handlePrev}
                        onNext={handleNext}
                        isChecked={isChecked}
                        setIsChecked={setIsChecked}
                        errors={errors}
                        setErrors={setErrors}
                        formData={formData}
                        setFormData={setFormData}
                    />
                    {/* <hr /> */}
                    <div className='my-4'></div>
                    <ProductDetailStep
                        errors={errors}
                        setErrors={setErrors}
                        onPrev={handlePrev}
                        onNext={handleNext}
                        formData={formData}
                        setFormData={setFormData}
                    />
                    {/* <hr /> */}
                    <div className='my-4'></div>
                    <PackageDetailStep
                        errors={errors}
                        setErrors={setErrors}
                        onPrev={handlePrev}
                        onNext={handleNext}
                        formData={formData}
                        setFormData={setFormData}
                    />
                    {/* <hr /> */}
                    <div className='my-4'></div>
                    <WareHouseDetailStep
                        errors={errors}
                        setErrors={setErrors}
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
            <SingleShipPop orderId={selectedOrderId} setSingleShip={setSingleShip} SingleShip={SingleShip} shipingResponse={shipingResponse} />

        </div>
    );
};

export default QuickCreateOrder;