import axios from 'axios';
import './OrderDetail.css'
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import { BASE_URL_ORDER } from '../../../../../axios/config';
import { customErrorFunction } from '../../../../../customFunction/errorHandling';
import { weightGreater } from '../../../../../customFunction/functionLogic';
import { FiEdit } from "react-icons/fi";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { AiOutlineExport } from 'react-icons/ai';

const OrderDetail = () => {
    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate()
    let authToken = Cookies.get("access_token")
    const [orderDetails, setOrderDetails] = useState({})

    useEffect(() => {
        if (params?.slug && location) {
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
        }
    }, [params])


    return (
        <>
            {orderDetails !== null &&
                <section className='order-detials-page'>
                    <div className='box-shadow shadow-sm p10 d-flex flex-column gap-3'>
                        <div className='d-flex justify-content-between align-items-center'>
                            <div className='d-flex flex-column'>
                                <h3>Order ID: {orderDetails?.customer_order_number}</h3>
                                <p className='order-Status-box'>{orderDetails?.status}</p>
                            </div>
                            <div className='d-flex gap-2'>
                                <button className='btn main-button-outline' onClick={() => navigate(-1)}><MdOutlineKeyboardBackspace /> Go back</button>
                                <button className='btn main-button-outline'><FiEdit /> Edit</button>
                                <button className='btn main-button-outline'><AiOutlineExport /> Export</button>
                                <button className='btn main-button'>Ship Now</button>
                            </div>
                        </div>
                        <div className='od-status-lines d-flex gap-3'>
                            <p>Created at: {moment(orderDetails?.created_at).format("DD MMM YYYY")} || {moment(orderDetails?.created_at).format("h:mm A")}</p>
                            {/* <p>Updated at:  {moment(orderDetails?.created_at).format("DD MMM YYYY")} || {moment(orderDetails?.created_at).format("h:mm A")}</p> */}
                            {orderDetails?.awb_assigned_date && <p>AWB Assigned at: {moment(orderDetails?.created_at).format("DD MMM YYYY")} || {moment(orderDetails?.created_at).format("h:mm A")}</p>}
                        </div>
                    </div>
                    <div className='mt-4'>
                        <div className='od-row row'>
                            <div className='col-4'>
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
                                    </ul>
                                </div>
                            </div>
                            <div className='col-4'>
                                <div className='od-col'>
                                    <div>
                                        <h6>Package Details</h6>
                                    </div>
                                    <ul className='od-list od-pd-list'>
                                        <li><span>Dead Weight (in Kg):</span><span>{orderDetails?.dimension_detail?.weight / 1000}</span></li>
                                        <li><span>Dimensions (in cm):</span><span>{orderDetails?.dimension_detail?.length} x {orderDetails?.dimension_detail?.breadth} x {orderDetails?.dimension_detail?.height}</span></li>
                                        <li><span>Volumetric Weight (in Kg):</span><span> {orderDetails?.dimension_detail?.vol_weight ? `${orderDetails.dimension_detail.vol_weight} Kg` : "NA"}</span></li>
                                        <li><span>Applied Weight (in Kg):</span><span> {weightGreater(orderDetails?.dimension_detail?.weight, orderDetails?.dimension_detail?.vol_weight)} Kg</span></li>
                                    </ul>
                                </div>
                            </div>
                            <div className='col-4'>
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


                    <div className='od-col product-details-sec mt-4'>
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
                                            <th style={{ width: '5%' }}>Qt.</th>
                                            <th style={{ width: '10%' }}>Unit Price</th>
                                            <th style={{ width: '10%' }}>Discount</th>
                                            <th style={{ width: '10%' }}>Tax</th>
                                            <th style={{ width: '10%' }}>Total</th>
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
                                                    <td>{item?.unit_price ? item?.unit_price : ""}</td>
                                                    <td>{item?.product_discount ? item?.product_discount : ""}</td>
                                                    <td>{item?.tax_rate ? item?.tax_rate : ""}</td>
                                                    <td>{item?.quantity * item?.unit_price}</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>

                                </table>
                                <hr />
                                <table className='w-100'>
                                    <tbody>
                                        <tr>
                                            <td style={{ width: '90%', paddingBottom: '20px', textAlign: 'end', paddingRight: '25px' }}>Product Total ({orderDetails?.order_products?.length} Item)</td>
                                            <td style={{ width: '10%', paddingBottom: '20px' }}>₹ {orderDetails?.invoice_amount || 0.00}</td>
                                        </tr>
                                        <tr>
                                            <td style={{ width: '90%', textAlign: 'end', paddingRight: '25px' }}>Order Total</td>
                                            <td style={{ width: '10%' }}>₹ {orderDetails?.invoice_amount || 0.00}</td>
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
