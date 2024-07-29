import axios from 'axios';
import './OrderDetail.css'
import moment from 'moment';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { AiOutlineExport } from 'react-icons/ai';
import React, { useEffect, useState } from 'react';
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { BASE_URL_ORDER } from '../../../../../axios/config';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { weightGreater } from '../../../../../customFunction/functionLogic';
import { customErrorFunction } from '../../../../../customFunction/errorHandling';
import { useSelector } from 'react-redux';

const OrderDetail = () => {
    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate()
    let authToken = Cookies.get("access_token")
    const [orderDetails, setOrderDetails] = useState({})
    const partnerList = JSON.parse(localStorage.getItem('partnerList'));
    const { screenWidthData } = useSelector(state => state?.authDataReducer)

    useEffect(() => {
        if (params?.slug && location && location?.state?.path != "searchOrderData") {
            axios.get(`${BASE_URL_ORDER}/orders-api/orders/get-order-by-id/${params?.slug}/`, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            })
                .then(response => {
                    setOrderDetails(response?.data)
                })
                .catch(error => {
                    customErrorFunction(error)
                });
        } else {
            setOrderDetails(location?.state?.orderData)
        }
    }, [params])

    const handleExport = async () => {
        const requestData = {
            "order_tab": {
                "type": "",
                "subtype": ""
            },
            "order_id": `${params?.slug}`,
            "courier": "",
            "awb_number": "",
            "min_awb_assign_date": "",
            "max_awb_assign_date": "",
            "status": "",
            "order_type": "",
            "customer_order_number": "",
            "channel": "",
            "min_invoice_amount": "",
            "max_invoice_amount": "",
            "warehouse_id": "",
            "product_name": "",
            "delivery_address": "",
            "min_weight": "",
            "max_weight": "",
            "min_product_qty": "",
            "max_product_qty": "",
            "rto_status": false,
            "global_type": "",
            "payment_type": ""
        };

        try {
            const response = await axios.post(`${BASE_URL_ORDER}/orders-api/orders/export-order/`, requestData, {
                responseType: 'blob',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                }
            });
            if (response !== null) {
                if (response.status === 200) {
                    toast.success("Order Exported successfully!")
                    var FileSaver = require('file-saver');
                    var blob = new Blob([response?.data], { type: 'application/ms-excel' });
                    FileSaver.saveAs(blob, `order.xlsx`);
                }
            }
        } catch (error) {
            customErrorFunction(error)
        }
    }

    return (
        <>
            {orderDetails !== null &&
                <section className='order-detials-page'>
                    <div className='box-shadow shadow-sm p10 d-flex flex-column gap-3 od-bg'>
                        <div className='d-flex justify-content-between align-items-center flex-column-reverse flex-md-row row-gap-3'>
                            <h3 className='text-white text-start w-100'>Order ID: {orderDetails?.customer_order_number}</h3>
                            <div className='d-flex gap-2 w-100 justify-content-end'>
                                <button className='btn white-btn' onClick={() => navigate(-1)}><MdOutlineKeyboardBackspace className='align-text-bottom' /> Go back</button>
                                <button className='btn white-btn' onClick={handleExport}><AiOutlineExport className='align-text-bottom' /> Export</button>
                            </div>
                        </div>
                        <div className='d-flex justify-content-between'>
                            <div className='d-flex gap-2 flex-column'>
                                <div className='d-flex gap-2'>
                                    <p className='order-Status-box'>{orderDetails?.status}</p>
                                    {orderDetails?.awb_number &&
                                        <p className='order-Status-box'>AWB: {orderDetails?.awb_number}</p>
                                    }
                                </div>
                                <div className='od-status-lines d-flex gap-2 flex-column flex-md-row'>
                                    <p>Created at: {moment(orderDetails?.created_at).format("DD MMM YYYY")} || {moment(orderDetails?.created_at).format("h:mm A")}</p>
                                    {orderDetails?.awb_assigned_date && <p>AWB Assigned at: {moment(orderDetails?.awb_assigned_date).format("DD MMM YYYY")} || {moment(orderDetails?.awb_assigned_date).format("h:mm A")}</p>}
                                </div>
                            </div>
                            <div className='od-courier-details'>
                                {orderDetails?.awb_number &&
                                    <>
                                        {screenWidthData > 767 &&
                                            <p className='text-ddd text-capitalize'> {orderDetails?.courier_partner && partnerList[orderDetails?.courier_partner]["title"]}</p>
                                        }
                                        {orderDetails?.courier_partner && <img className='partner-image' src={partnerList[orderDetails?.courier_partner]["image"]} alt='Partner' />}
                                    </>
                                }

                            </div>
                        </div>
                    </div>
                    <div className='mt-4'>
                        <div className='od-row row row-gap-3'>
                            <div className='col-12 col-md-4'>
                                <div className='od-col'>
                                    <div>
                                        <h6>Order Details</h6>
                                    </div>
                                    <ul className='od-list'>
                                        <li><span>Channel:</span><span>{orderDetails?.channel}</span></li>
                                        <li><span>Payment:</span><span>{orderDetails?.payment_type}</span></li>
                                        <li><span>Pickup Address:</span><span>
                                            {orderDetails?.pickup_details?.p_address_line1}, {orderDetails?.pickup_details?.p_address_line2}, {orderDetails?.pickup_details?.p_city}, {orderDetails?.pickup_details?.p_state}, ({orderDetails?.pickup_details?.p_pincode})
                                        </span></li>
                                        <li><span>AWB:</span><span>{orderDetails?.awb_number}</span></li>
                                        <li><span>Courier Partner:</span><span className='text-capitalize'>{orderDetails?.courier_partner}</span></li>
                                    </ul>
                                </div>
                            </div>
                            <div className='col-12 col-md-4'>
                                <div className='od-col'>
                                    <div>
                                        <h6>Package Details</h6>
                                    </div>
                                    <ul className='od-list od-pd-list'>
                                        <li><span>Dead Weight (in Kg):</span><span>{orderDetails?.dimension_detail?.weight / 1000}</span></li>
                                        <li><span>Dimensions (in cm):</span><span>{orderDetails?.dimension_detail?.length} x {orderDetails?.dimension_detail?.breadth} x {orderDetails?.dimension_detail?.height}</span></li>
                                        <li><span>Volumetric Weight (in Kg):</span><span> {orderDetails?.dimension_detail?.vol_weight ? `${(orderDetails.dimension_detail.vol_weight/1000)} Kg` : "NA"}</span></li>
                                        <li><span>Applied Weight (in Kg):</span><span> {weightGreater(orderDetails?.dimension_detail?.weight, orderDetails?.dimension_detail?.vol_weight)} Kg</span></li>
                                    </ul>
                                </div>
                            </div>
                            <div className='col-12 col-md-4'>
                                <div className='od-col'>
                                    <div>
                                        <h6>Customer Details</h6>
                                    </div>
                                    <ul className='od-list'>
                                        <li><span>Name:</span><span>{orderDetails?.shipping_detail?.recipient_name}</span></li>
                                        <li><span>Contact No.:</span><span>{orderDetails?.shipping_detail?.mobile_number}</span></li>
                                        <li><span>Email:</span><span>{orderDetails?.shipping_detail?.email ? orderDetails?.shipping_detail?.email : "NA"}</span></li>
                                        <li><span>Address:</span><span>{orderDetails?.shipping_detail?.address}, {orderDetails?.shipping_detail?.city}, {orderDetails?.shipping_detail?.state}, ({orderDetails?.shipping_detail?.pincode})</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* orderDetails?.order_products.length &&orderDetails?.order_products?.map((item)=> */}


                    <div className='od-col product-details-sec my-4'>
                        <div>
                            <h6>Product Details</h6>
                        </div>
                        <div className='d-flex flex-column justify-content-between'>
                            <div>
                                <table className='w-100 mt-3'>
                                    <thead>
                                        <tr>
                                            <th style={{ width: '5%' }}>s.no</th>
                                            <th style={{ width: '20%' }}>Name</th>
                                            <th style={{ width: '10%' }}>Category</th>
                                            <th style={{ width: '10%' }}>HSN</th>
                                            <th style={{ width: '10%' }}>SKU</th>
                                            <th style={{ width: '2%' }}>Qt.</th>
                                            {/* <th style={{ width: '10%' }}>Unit Price</th> */}
                                            {/* <th style={{ width: '10%' }}>Discount</th> */}
                                            {/* <th style={{ width: '10%' }}>Tax</th> */}
                                            {/* <th style={{ width: '10%' }}>Total</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orderDetails?.order_products?.length > 0 && orderDetails?.order_products?.map((item, index) => {
                                            return (
                                                <tr>
                                                    <td>{index + 1}</td>
                                                    <td>{item?.product_name}</td>
                                                    <td>{item?.product_category ? item?.product_category : ""}</td>
                                                    <td>{item?.hsn_code ? item?.hsn_code : ""}</td>
                                                    <td>{item?.sku ? item?.sku : ""}</td>
                                                    <td>{item?.quantity ? item?.quantity : ""}</td>
                                                    {/* <td>{item?.unit_price ? item?.unit_price : ""}</td> */}
                                                    {/* <td>{item?.product_discount ? item?.product_discount : ""}</td> */}
                                                    {/* <td>{item?.tax_rate ? item?.tax_rate : ""}</td> */}
                                                    {/* <td>{item?.quantity * item?.unit_price}</td> */}
                                                </tr>
                                            )
                                        })}
                                    </tbody>

                                </table>
                                <hr />
                                <table className='w-100'>
                                    <tbody>
                                        <tr>
                                            <td style={{ width: '70%', paddingBottom: '20px', textAlign: 'end', paddingRight: '25px' }}>Product Total ({orderDetails?.order_products?.length} Item)</td>
                                            <td style={{ width: '20%', paddingBottom: '20px' }}>
                                                <p className='text-end'>
                                                    ₹ {orderDetails?.invoice_amount || 0.00}
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{ width: '70%', textAlign: 'end', paddingRight: '25px' }}>Order Total</td>
                                            <td style={{ width: '20%' }}>
                                                <p className='text-end'>
                                                    ₹ {orderDetails?.invoice_amount || 0.00}
                                                </p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>
            }

        </>
    );
};

export default OrderDetail;
