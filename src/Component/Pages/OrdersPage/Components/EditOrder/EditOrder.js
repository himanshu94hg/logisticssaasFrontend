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

const EditOrder = ({ EditOrderSection, setEditOrderSection, orderId }) => {
    const dispatch = useDispatch()
    const [wareHouses, setWarehouses] = useState([])
    const currentDate = new Date();
    const [wareHouseName, setWareHouseName] = useState("")
    const authToken = Cookies.get("access_token");
    const sellerData = Cookies.get("user_id");
    const [activeSection, setActiveSection] = useState("Order Details");


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
    const { orderDetailsData, orderUpdateRes } = useSelector(state => state?.orderSectionReducer)

    useEffect(() => {
        if (orderUpdateRes === 200) {
            setEditOrderSection(false)
        }
    }, [orderUpdateRes])

    useEffect(() => {
        if (EditOrderSection) {
            setActiveSection("Order Details");
        }
    }, [EditOrderSection]);


    const handleUpdate = () => {
        dispatch({
            type: "ORDERS_DETAILS_UPDATE_ACTION", payload: {
                formData: formData,
                orderId: orderId
            }
        })
        setEditOrderSection(false)
    };

    useEffect(() => {
        if (orderId) {
            dispatch({ type: "ORDERS_DETAILS_GET_ACTION", payload: orderId })
            dispatch(orderIdAction(orderId))
        }
    }, [orderId])

    console.log(new Date(orderDetailsData?.order_date),"this is a data dtaa",new Date())

    useEffect(() => {
        if (orderDetailsData) {
            setFormData(prevData => ({
                ...prevData,
                order_details: {
                    customer_order_number: orderDetailsData?.customer_order_number,
                    invoice_amount: orderDetailsData?.invoice_amount,
                    is_mps: orderDetailsData?.is_mps,
                    // warehouse_id: orderDetailsData,
                    order_tag: orderDetailsData?.order_tag,
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
                    customer_name: orderDetailsData?.shipping_detail?.recipient_name,
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
                    weight: orderDetailsData?.dimension_detail?.weight,
                    length: orderDetailsData?.dimension_detail?.length,
                    breadth: orderDetailsData?.dimension_detail?.breadth,
                    height: orderDetailsData?.dimension_detail?.height,
                    vol_weight: orderDetailsData?.dimension_detail?.vol_weight
                },
                product_details:
                    orderDetailsData?.order_products?.map(product => ({
                        sku: product.sku,
                        product_name: product.product_name,
                        quantity: product.quantity,
                        product_category: product.product_category,
                        unit_price: product.unit_price,
                        hsn_code: product.hsn_code,
                        tax_rate: product.tax_rate,
                        product_discount: product.product_discount
                    }))
            }))
            setWareHouseName(orderDetailsData?.pickup_details?.p_warehouse_name)
        }
    }, [orderDetailsData])



    useEffect(() => {
        if (orderId) {
            const fetchWarehouses = async () => {
                try {
                    const response = await axios.get(`https://dev.shipease.in/core-api/features/warehouse/?seller_id=${sellerData}`, {
                        headers: {
                            Authorization: `Bearer ${authToken}`
                        }
                    });
                    setWarehouses(response.data);
                } catch (error) {
                }
            };
            fetchWarehouses();
        }
    }, [orderId]);

    useEffect(() => {
        if (wareHouses) {
            let data = wareHouses.filter(item => item?.warehouse_name === wareHouseName)
            setFormData(prevFormData => ({
                ...prevFormData,
                order_details: {
                    ...prevFormData.order_details,
                    warehouse_id: data[0]?.id
                }
            }));
        }
    }, [wareHouses])

    // const {orderId}=useSelector(state=>state?.orderSectionReducer)
    // console.log(orderId,"this is orderId data")


    return (
        <>
            <section className={`edit-order-section ${EditOrderSection ? 'open-edit' : ''}`}>
                <div id='sidepanel-closer' onClick={() => setEditOrderSection(false)}>
                    <FontAwesomeIcon icon={faChevronRight} />
                </div>
                <section className='edit-order-header'>
                    <div>
                        <h2 className='mb-1'>Order Id : <span className='text-capitalize'>{orderDetailsData?.customer_order_number && orderDetailsData.customer_order_number.slice(0, 40)}</span></h2>
                        <h5 className='mb-0'>Edit Your Order Details!</h5>
                    </div>
                </section>
                <section className='edit-order-body'>
                    <section className='navigation-side'>
                        <ul>
                            <li onClick={() => setActiveSection("Order Details")} className={activeSection === "Order Details" ? "active" : ""}>Order Details</li>
                            <li onClick={() => setActiveSection("Shipping Details")} className={activeSection === "Shipping Details" ? "active" : ""}>Shipping Details</li>
                            <li onClick={() => setActiveSection("Product Details")} className={activeSection === "Product Details" ? "active" : ""}>Product Details</li>
                            <li onClick={() => setActiveSection("Package Details")} className={activeSection === "Package Details" ? "active" : ""}>Package Details</li>
                            <li onClick={() => setActiveSection("Warehouse Details")} className={activeSection === "Warehouse Details" ? "active" : ""}>Warehouse Details</li>
                        </ul>
                    </section>
                    <section className='details-side'>
                        <section className='details-component'>
                            {/* Order Details */}
                            {activeSection === "Order Details" && (
                                <div>
                                    <OrderDetailsStep
                                        editStatus={"editStatus"}
                                        formData={formData}
                                        setFormData={setFormData}
                                    />
                                </div>
                            )}

                            {/* Shipping Details */}
                            {activeSection === "Shipping Details" && (
                                <div>
                                    <AddressDetailStep
                                        formData={formData}
                                        setFormData={setFormData}
                                    />
                                </div>
                            )}

                            {/* Product Details */}
                            {activeSection === "Product Details" && (
                                <div>
                                    <ProductDetailStep
                                        formData={formData}
                                        setFormData={setFormData}
                                    />
                                </div>
                            )}

                            {/* Package Details */}
                            {activeSection === "Package Details" && (
                                <div>
                                    <PackageDetailStep
                                        formData={formData}
                                        setFormData={setFormData}
                                    />
                                </div>
                            )}

                            {/* Warehouse Details */}
                            {activeSection === "Warehouse Details" && (
                                <div>
                                    <WareHouseDetailStep
                                        formData={formData}
                                        setFormData={setFormData}
                                        wareHouseName={wareHouseName}
                                        setWareHouseName={setWareHouseName}
                                        wareHouses={wareHouses}
                                        setWarehouses={setWarehouses}
                                    />
                                </div>
                            )}
                        </section>
                        <button className='btn main-button ms-3 mt-3' onClick={() => handleUpdate()}>Update</button>
                    </section>
                </section>
            </section>
            <div onClick={() => setEditOrderSection(false)} className={`backdrop ${EditOrderSection ? 'd-block' : 'd-none'}`}></div>
        </>
    );
};

export default EditOrder;
