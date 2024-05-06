import React from 'react';

const OrderDetail = () => {

    // Here you can fetch the order details using the orderId from your API
    // For this example, I'll just display the orderId
    return (
        <>
            <section className='box-shadow shadow-sm p10 order-detials-page h-100'>
                <div className='d-flex justify-content-between align-items-center'>
                    <div className='d-flex flex-column'>
                        <h3>Order ID: #Order@1</h3>
                        <p className='order-Status-box'>Ready To Ship</p>
                    </div>
                    <div className='d-flex gap-2'>
                        <button className='btn main-button-outline'>Export</button>
                        <button className='btn main-button'>Ship Now</button>
                    </div>
                </div>

                <div>
                    <h4>Order Details</h4>
                    <hr />
                </div>

            </section>
        </>
    );
};

export default OrderDetail;
