import React from 'react'
import './LabelCustomization.css'
import LabelData from './LabelData';

const order = {
    shipping_detail: {
        recipient_name: 'John Doe',
        address: '123 Main St',
        city: 'Anytown',
        state: 'Anystate',
        country: 'Anycountry',
        pincode: '123456',
        mobile_number: '123-456-7890',
    },
    order_code: 'ORD12345',
    order_date: '2024-05-21',
    total_amount: '$123.45',
};

const companyLogo = 'path/to/logo.png'; // Update with the actual path to the logo
const label = { contact_mask: false, invoice_number: 'INV12345' };
const sellerConfig = { display_name: 'Awesome Seller' };
const basicInfo = { gst_number: '1234567890' };
const warehouse = { name: 'Main Warehouse' };
const product = [
    { name: 'Product 1', quantity: 1, price: '$10.00' },
    { name: 'Product 2', quantity: 2, price: '$20.00' },
];

const LabelCustomization = () => {
    return (
        <>
            <section className='label-customize-page box-shadow shadow-sm'>
                <LabelData
                    order={order}
                    companyLogo={companyLogo}
                    label={label}
                    sellerConfig={sellerConfig}
                    basicInfo={basicInfo}
                    warehouse={warehouse}
                    product={product}
                />
            </section>
        </>
    )
}

export default LabelCustomization