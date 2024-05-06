import React from 'react';
import './OrderDetail.css'

const OrderDetail = () => {

    // Here you can fetch the order details using the orderId from your API
    // For this example, I'll just display the orderId
    return (
        <>
            <section className='order-detials-page'>
                <div className='box-shadow shadow-sm p10 d-flex flex-column gap-3'>
                    <div className='d-flex justify-content-between align-items-center'>
                        <div className='d-flex flex-column'>
                            <h3>Order ID: #Order@1</h3>
                            <p className='order-Status-box'>Ready To Ship</p>
                        </div>
                        <div className='d-flex gap-2'>
                            <button className='btn main-button-outline'>More</button>
                            <button className='btn main-button-outline'>Export</button>
                            <button className='btn main-button'>Ship Now</button>
                        </div>
                    </div>
                    <div className='od-status-lines d-flex gap-3'>
                        <p>Created at: 06 May 2024 || 5:00 PM</p>
                    </div>
                </div>
                <div className='mt-4'>
                    {/* <h5>Order Details</h5> */}
                    <div className='od-row row'>
                        <div className='col-4'>
                            <div className='od-col'>
                                <div>
                                    <h6>Order Details</h6>
                                </div>
                                <ul className='od-list'>
                                    <li>Channel</li>
                                    <li>Pickup Address</li>
                                    <li>Payment</li>
                                </ul>
                            </div>
                        </div>
                        <div className='col-4'>
                            <div className='od-col'>
                                <div>
                                    <h6>Package Details</h6>
                                </div>
                                <ul className='od-list'>
                                    <li>Dead Weight (in Kg)</li>
                                    <li>Dimensions (in cm)</li>
                                    <li>Volumetric Weight (in Kg)</li>
                                    <li>Applied Weight (in Kg)</li>
                                </ul>
                            </div>
                        </div>
                        <div className='col-4'>
                            <div className='od-col'>
                                <div>
                                    <h6>Customer Details</h6>
                                </div>
                                <ul className='od-list'>
                                    <li>Name</li>
                                    <li>Contact No.</li>
                                    <li>Email</li>
                                    <li>Address</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='od-col mt-4'>
                        <div>
                            <h6>Product Details</h6>
                        </div>
                    </div>
                </div>

            </section>
        </>
    );
};

export default OrderDetail;
