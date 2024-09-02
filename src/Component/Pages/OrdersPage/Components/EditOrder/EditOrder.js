import React, { useEffect, useState } from 'react';
import './EditOrder.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { PackageDetailStep } from '../CreateOrderFlow/Components/DomesticCreateOrder/create-order-steps/PackageDetailStep';
import { OrderDetailsStep } from '../CreateOrderFlow/Components/DomesticCreateOrder/create-order-steps/OrderDetailsStep';
import { AddressDetailStep } from '../CreateOrderFlow/Components/DomesticCreateOrder/create-order-steps/AddressDetailStep';
import { ProductDetailStep } from '../CreateOrderFlow/Components/DomesticCreateOrder/create-order-steps/ProductDetailStep';
import { WareHouseDetailStep } from '../CreateOrderFlow/Components/DomesticCreateOrder/create-order-steps/WareHouseDetailStep';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import axios from 'axios';
import orderIdAction from '../../../../../redux/action/orders/orderId';
import ErrorIcon from './ErrorIcon';

const EditOrder = ({ EditOrderSection, setEditOrderSection, orderId }) => {
    const dispatch = useDispatch()
    const currentDate = new Date();
    const [wareHouseName, setWareHouseName] = useState("")
    const authToken = Cookies.get("access_token");
    const [activeSection, setActiveSection] = useState("Order Details");
    const [editErrors, seteditErrors] = useState({});
    const [isChecked, setIsChecked] = useState(true);
    const [editForm, setEditForm] = useState(true)
    const [tagData, setTagData] = useState([])

    const { orderDetailsData, orderUpdateRes } = useSelector(state => state?.orderSectionReducer)


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

    useEffect(() => {
        if (orderUpdateRes) {
            setEditOrderSection(false)
        }
    }, [orderUpdateRes])

    useEffect(() => {
        if (EditOrderSection) {
            setActiveSection("Order Details");
        }
    }, [EditOrderSection]);

    const validateFormData = () => {
        const newErrors = {};
        if (!formData.order_details.customer_order_number) {
            newErrors.customer_order_number = ' Order Number is required!';
        }
        if (!formData.order_details.order_type) {
            newErrors.order_type = 'Select the Order Type!';
        }
        if (!formData.order_details.channel) {
            newErrors.channel = 'Select the Channel !';
        }
        if (!formData.order_details.payment_type) {
            newErrors.payment_type = 'Select the Payment Type!';
        }
        if (formData.order_details.is_mps && formData.other_details.number_of_packets == null || "") {
            newErrors.number_of_packets = 'Packets is required!';
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
        if (!formData.order_details.invoice_amount) {
            newErrors.invoice_amount = 'Invoice amount is required!';
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
            if (!formData.billing_details.city) {
                newErrors.billing_city = 'City is required!';
            }
            if (!formData.billing_details.state) {
                newErrors.billing_state = 'State is required!';
            }
            if (!formData.billing_details.country) {
                newErrors.billing_country = 'Country is required!';
            }
        }
        formData?.product_details?.forEach((product, index) => {
            if (!product?.product_name?.trim()) {
                newErrors[`product_name_${index}`] = 'Product Name is required!';
            }
            if (!product?.quantity) {
                newErrors[`quantity_${index}`]='Product Quantity is required!'
                // newErrors.quantity = 'Product Quantity is required!'
            }
            if (!product?.sku?.trim()) {
                newErrors[`sku_${index}`] = 'SKU is required!';
            }
        });

        seteditErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleUpdate = () => {
        if (validateFormData()) {
            dispatch({
                type: "ORDERS_DETAILS_UPDATE_ACTION",
                payload: {
                    formData: formData,
                    orderId: orderId
                }
            });
            setEditOrderSection(false);
        }
    };

    useEffect(() => {
        if (orderId && EditOrderSection) {
            dispatch({ type: "ORDERS_DETAILS_GET_ACTION", payload: orderId })
            dispatch(orderIdAction(orderId))
            seteditErrors({})
        }
    }, [orderId, EditOrderSection, dispatch])

    useEffect(() => {
        if (orderDetailsData) {
            const orderTagIds = orderDetailsData?.order_tag?.map(tag => tag.id);
            const orderTagTemp = orderDetailsData?.order_tag?.map(item => ({
                label: item?.name,
                value: item?.id,
            }));
            setTagData(orderTagTemp)
            setFormData(prevData => ({
                ...prevData,
                order_details: {
                    customer_order_number: orderDetailsData?.customer_order_number,
                    invoice_amount: orderDetailsData?.invoice_amount,
                    is_mps: orderDetailsData?.is_mps,
                    warehouse_id: orderDetailsData?.warehouse_id,
                    order_tag: orderTagIds,
                    payment_type: orderDetailsData?.payment_type,
                    order_date: orderDetailsData.order_date && new Date(orderDetailsData?.order_date),
                    order_type: orderDetailsData?.order_type,
                    channel: orderDetailsData?.channel,
                    channel_id: orderDetailsData?.channel_id
                },
                shipping_details: {
                    recipient_name: orderDetailsData?.shipping_detail?.recipient_name,
                    address: orderDetailsData?.shipping_detail?.address,
                    landmark: orderDetailsData?.shipping_detail?.landmark,
                    country: "India",
                    state: orderDetailsData?.shipping_detail?.state,
                    city: orderDetailsData?.shipping_detail?.city,
                    pincode: orderDetailsData?.shipping_detail?.pincode,
                    mobile_number: orderDetailsData?.shipping_detail?.mobile_number,
                    email: orderDetailsData?.shipping_detail?.email,
                    company_name: orderDetailsData?.shipping_detail?.company_name,
                    contact_code: "91"
                },
                billing_details: {
                    customer_name: orderDetailsData?.billing_detail?.customer_name,
                    address: orderDetailsData?.billing_detail?.address,
                    landmark: orderDetailsData?.billing_detail?.landmark,
                    country: "India",
                    state: orderDetailsData?.billing_detail?.state,
                    city: orderDetailsData?.billing_detail?.city,
                    pincode: orderDetailsData?.billing_detail?.pincode,
                    mobile_number: orderDetailsData?.billing_detail?.mobile_number,
                    email: orderDetailsData?.billing_detail?.email,
                    company_name: orderDetailsData?.billing_detail?.company_name,
                    contact_code: "91"
                },
                other_details: {
                    number_of_packets: orderDetailsData?.other_details?.number_of_packets,
                    reseller_name: orderDetailsData?.other_details?.reseller_name
                },
                charge_details: {
                    cod_charges: orderDetailsData?.charge_detail?.cod_charges,
                    shipping_charges: orderDetailsData?.charge_detail?.shipping_charges,
                    transaction_fee: orderDetailsData?.charge_detail?.transaction_fee,
                    is_gift_wrap: orderDetailsData?.charge_detail?.is_gift_wrap ? "Yes" : "No"
                },
                dimension_details: {
                    weight: orderDetailsData?.dimension_detail?.weight / 1000,
                    length: orderDetailsData?.dimension_detail?.length,
                    breadth: orderDetailsData?.dimension_detail?.breadth,
                    height: orderDetailsData?.dimension_detail?.height,
                    vol_weight: orderDetailsData?.dimension_detail?.vol_weight
                },
                product_details:
                    orderDetailsData?.order_products?.map(product => ({
                        sku: product.sku,
                        product_name: product.product_name.slice(0, 154),
                        quantity: product.quantity,
                        product_category: product.product_category,
                        unit_price: product.unit_price,
                        hsn_code: product.hsn_code,
                        tax_rate: product.tax_rate,
                        product_discount: product.product_discount
                    }))
            }))
            setWareHouseName(orderDetailsData?.pickup_details?.p_warehouse_name)

            if (orderDetailsData?.shipping_detail?.address === orderDetailsData?.billing_detail?.address && orderDetailsData?.shipping_detail?.pincode === orderDetailsData?.billing_detail?.pincode) {
                setIsChecked(true)
            } else {
                setIsChecked(false)
            }

        }
    }, [orderDetailsData])


    const checkValuePresence = (obj, valueToCheck) => {
        return Object.values(obj).includes(valueToCheck);
    };
    const pname_err = checkValuePresence(editErrors, "Product Name is required!");
    const qty_err = checkValuePresence(editErrors, "Product Quantity is required!");
    const sku_err = checkValuePresence(editErrors, "SKU is required!");


    return (
        <>
            <section className={`edit-order-section ${EditOrderSection ? 'open-edit' : ''}`}>
                <div id='sidepanel-closer' onClick={() => setEditOrderSection(false)}>
                    <FontAwesomeIcon icon={faChevronRight} />
                </div>
                <section className='edit-order-header'>
                    <div>
                        <h2 className='mb-1'>Order ID : <span className='text-capitalize'>{orderDetailsData?.customer_order_number && orderDetailsData.customer_order_number.slice(0, 40)}</span></h2>
                        <h5 className='mb-0'>Edit Your Order Details!</h5>
                    </div>
                </section>
                <section className='edit-order-body'>
                    <section className='navigation-side'>
                        <ul>
                            <li onClick={() => setActiveSection("Order Details")} className={activeSection === "Order Details" ? "active" : ""}>Order Details
                                {(editErrors?.hasOwnProperty("customer_order_number") || editErrors?.hasOwnProperty("order_type") || editErrors?.hasOwnProperty("payment_type")) && <ErrorIcon />}
                            </li>
                            <li onClick={() => setActiveSection("Shipping Details")} className={activeSection === "Shipping Details" ? "active" : ""}>Shipping Details
                                {(
                                    editErrors?.hasOwnProperty("address") || editErrors?.hasOwnProperty("city") || editErrors?.hasOwnProperty("state") || editErrors?.hasOwnProperty("country") ||
                                    editErrors?.hasOwnProperty("recipient_name") || editErrors?.hasOwnProperty("mobile_number") || editErrors?.hasOwnProperty("pincode") || editErrors?.hasOwnProperty("billing_address") ||
                                    editErrors?.hasOwnProperty("billing_city") || editErrors?.hasOwnProperty("billing_country") || editErrors?.hasOwnProperty("billing_customer_name") ||
                                    editErrors?.hasOwnProperty("billing_mobile_number") || editErrors?.hasOwnProperty("billing_pincode") || editErrors?.hasOwnProperty("billing_state")
                                )
                                    && <ErrorIcon />}
                            </li>
                            <li onClick={() => setActiveSection("Product Details")} className={activeSection === "Product Details" ? "active" : ""}>Product Details
                                {(pname_err || qty_err || sku_err) && <ErrorIcon />}
                            </li>
                            <li onClick={() => setActiveSection("Package Details")} className={activeSection === "Package Details" ? "active" : ""}>Package Details
                                {(
                                    editErrors?.hasOwnProperty("invoice_amount") || editErrors?.hasOwnProperty("height") || editErrors?.hasOwnProperty("breadth") ||
                                    editErrors?.hasOwnProperty("length") || editErrors?.hasOwnProperty("weight")
                                ) && <ErrorIcon />}
                            </li>
                            <li onClick={() => setActiveSection("Warehouse Details")} className={activeSection === "Warehouse Details" ? "active" : ""}>Warehouse Details
                            </li>
                        </ul>
                    </section>
                    <section className='details-side'>
                        <section className='details-component'>
                            {/* Order Details */}
                            {activeSection === "Order Details" && (
                                <div>
                                    <OrderDetailsStep
                                        tagData={tagData}
                                        editStatus={"editStatus"}
                                        editForm={editForm}
                                        formData={formData}
                                        setFormData={setFormData}
                                        handleUpdate={handleUpdate}
                                        editErrors={editErrors}
                                        seteditErrors={seteditErrors}
                                    />
                                </div>
                            )}

                            {/* Shipping Details */}
                            {activeSection === "Shipping Details" && (
                                <div>
                                    <AddressDetailStep
                                        formData={formData}
                                        setFormData={setFormData}
                                        editErrors={editErrors}
                                        setIsChecked={setIsChecked}
                                        isChecked={isChecked}
                                        seteditErrors={seteditErrors}
                                    />
                                </div>
                            )}

                            {/* Product Details */}
                            {activeSection === "Product Details" && (
                                <div>
                                    <ProductDetailStep
                                        formData={formData}
                                        setFormData={setFormData}
                                        editErrors={editErrors}
                                        seteditErrors={seteditErrors}
                                    />
                                </div>
                            )}

                            {/* Package Details */}
                            {activeSection === "Package Details" && (
                                <div>
                                    <PackageDetailStep
                                        formData={formData}
                                        setFormData={setFormData}
                                        editErrors={editErrors}
                                        seteditErrors={seteditErrors}
                                    />
                                </div>
                            )}

                            {/* Warehouse Details */}
                            {activeSection === "Warehouse Details" && (
                                <div>
                                    <WareHouseDetailStep
                                        editForm={editForm}
                                        formData={formData}
                                        setFormData={setFormData}
                                        wareHouseName={wareHouseName}
                                        setWareHouseName={setWareHouseName}
                                    />
                                </div>
                            )}
                        </section>
                        <div className='d-flex align-items-center gap-3 ms-3 mt-3'>
                            <button className='btn main-button' onClick={handleUpdate}>Update</button>
                            {formData?.order_details?.order_type === "Reverse" && <p className='mb-0 '><ErrorIcon /> Reverse order can only be prepaid!</p>}
                        </div>
                    </section>
                </section>
            </section>
            <div onClick={() => setEditOrderSection(false)} className={`backdrop ${EditOrderSection ? 'd-block' : 'd-none'}`}></div>
        </>
    );
};

export default EditOrder;
