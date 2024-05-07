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
                    <div className='od-row row'>
                        <div className='col-4'>
                            <div className='od-col'>
                                <div>
                                    <h6>Order Details</h6>
                                </div>
                                <ul className='od-list'>
                                    <li><span>Channel:</span><span>Custom</span></li>
                                    <li><span>Pickup Address:</span><span>Custom</span></li>
                                    <li><span>Payment:</span><span>Custom</span></li>
                                </ul>
                            </div>
                        </div>
                        <div className='col-4'>
                            <div className='od-col'>
                                <div>
                                    <h6>Package Details</h6>
                                </div>
                                <ul className='od-list od-pd-list'>
                                    <li><span>Dead Weight (in Kg):</span><span>0.30KG</span></li>
                                    <li><span>Dimensions (in cm):</span><span>10 x 10 x 10</span></li>
                                    <li><span>Volumetric Weight (in Kg):</span><span>0.20KG</span></li>
                                    <li><span>Applied Weight (in Kg):</span><span>0.30KG</span></li>
                                </ul>
                            </div>
                        </div>
                        <div className='col-4'>
                            <div className='od-col'>
                                <div>
                                    <h6>Customer Details</h6>
                                </div>
                                <ul className='od-list'>
                                    <li><span>Name:</span><span>Test User</span></li>
                                    <li><span>Contact No.:</span><span>9874563210</span></li>
                                    <li><span>Email:</span><span>test@gmail.com</span></li>
                                    <li><span>Address:</span><span>test, Gurugram, Hariyana</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='od-col product-details-sec mt-4'>
                    <div>
                        <h6>Product Details</h6>
                    </div>
                    <div className='d-flex flex-column justify-content-between'>
                        <div>
                            <table className='w-100 mt-3'>
                                <thead>
                                    <tr>
                                        <th style={{ width: '20%' }}>Name</th>
                                        <th style={{ width: '10%' }}>Category</th>
                                        <th style={{ width: '10%' }}>HSN</th>
                                        <th style={{ width: '10%' }}>SKU</th>
                                        <th style={{ width: '10%' }}>Qt.</th>
                                        <th style={{ width: '10%' }}>Unit Price</th>
                                        <th style={{ width: '10%' }}>Discount</th>
                                        <th style={{ width: '10%' }}>Tax</th>
                                        <th style={{ width: '10%' }}>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Zimmer Aufraumen Marble-Granite Cleaner 5lit Tiles Floor Cleaner 5lit</td>
                                        <td></td>
                                        <td></td>
                                        <td>ZACOM-MARBLE5L+</td>
                                        <td>1</td>
                                        <td>₹1016.1</td>
                                        <td>0.00</td>
                                        <td>182.9</td>
                                        <td>₹1,199.00</td>
                                    </tr>
                                </tbody>
                            </table>
                            <hr />
                        </div>

                        <div className='d-flex justify-content-end'>
                            <div className='pd-total'>
                                <p><span>Product Total (1 Item)</span><span>₹ 0.00</span></p>
                                <p><span>Order Total</span><span>₹ 1,199.00</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default OrderDetail;
