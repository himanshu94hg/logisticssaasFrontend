import React, { useState } from 'react';
import './EditOrder.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { PackageDetailStep } from '../CreateOrderFlow/Components/DomesticCreateOrder/create-order-steps/PackageDetailStep';
import { OrderDetailsStep } from '../CreateOrderFlow/Components/DomesticCreateOrder/create-order-steps/OrderDetailsStep';
import { AddressDetailStep } from '../CreateOrderFlow/Components/DomesticCreateOrder/create-order-steps/AddressDetailStep';
import { ProductDetailStep } from '../CreateOrderFlow/Components/DomesticCreateOrder/create-order-steps/ProductDetailStep';
import { WareHouseDetailStep } from '../CreateOrderFlow/Components/DomesticCreateOrder/create-order-steps/WareHouseDetailStep';

const EditOrder = ({ EditOrderSection, setEditOrderSection }) => {
    const [activeSection, setActiveSection] = useState("Order Details");
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

    };

    const handlePrev = () => {

    };

    const handleFormSubmit = async () => {
        // try {
        //     const response = await axios.post('https://dev.shipease.in/orders-api/orders/', formData, {
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'Authorization': `Bearer ${authToken}`
        //         }
        //     });
        //     if (response !== null) {
        //         if (response.status === 201) {
        //             const responseData = response.data;
        //             toast.success("Order Created successfully!")
        //             navigation('/Orders');
        //         } else {
        //             const errorData = response.data;
        //             toast.error("Something went wrong!", errorData)
        //         }
        //     }
        // } catch (error) {
        //     toast.error('something went wrong!')
        // }
    };


    return (
        <>
            <section className={`edit-order-section ${EditOrderSection ? 'open-edit' : ''}`}>
                <div id='sidepanel-closer' onClick={() => setEditOrderSection(false)}>
                    <FontAwesomeIcon icon={faChevronRight} />
                </div>
                <section className='edit-order-header'>
                    <div>
                        <h2 className='mb-1'>#<span className='text-capitalize'>order_14524aq</span></h2>
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
                                        onNext={handleNext}
                                        onPrev={handlePrev}
                                        formData={formData}
                                        setFormData={setFormData}
                                    />
                                </div>
                            )}

                            {/* Shipping Details */}
                            {activeSection === "Shipping Details" && (
                                <div>
                                    <AddressDetailStep
                                        onNext={handleNext}
                                        onPrev={handlePrev}
                                        formData={formData}
                                        setFormData={setFormData}
                                    />
                                </div>
                            )}

                            {/* Product Details */}
                            {activeSection === "Product Details" && (
                                <div>
                                    <ProductDetailStep
                                        onNext={handleNext}
                                        onPrev={handlePrev}
                                        formData={formData}
                                        setFormData={setFormData}
                                    />
                                </div>
                            )}

                            {/* Package Details */}
                            {activeSection === "Package Details" && (
                                <div>
                                    <PackageDetailStep
                                        onNext={handleNext}
                                        onPrev={handlePrev}
                                        formData={formData}
                                        setFormData={setFormData}
                                    />
                                </div>
                            )}

                            {/* Warehouse Details */}
                            {activeSection === "Warehouse Details" && (
                                <div>
                                    <WareHouseDetailStep
                                        onSubmit={handleFormSubmit}
                                        onPrev={handlePrev}
                                        formData={formData}
                                        setFormData={setFormData}
                                    />
                                </div>
                            )}
                        </section>
                        <button className='btn main-button ms-3 mt-3' onClick={() => setEditOrderSection(false)}>Update</button>
                    </section>
                </section>
            </section>
            <div onClick={() => setEditOrderSection(false)} className={`backdrop ${EditOrderSection ? 'd-block' : 'd-none'}`}></div>
        </>
    );
};

export default EditOrder;
