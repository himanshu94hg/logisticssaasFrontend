import React, { useState, useCallback } from 'react';
import './LabelCustomization.css';
import LabelData from './LabelData';
import { Col, Row } from 'react-bootstrap';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';

const LabelCustomization = () => {
    const [items, setItems] = useState({
        contact: true,
        shipping: true,
        logo: true,
        shipping_details: true,
        awb_barcode: true,
        seller_contact: true,
        seller_gstin: true,
        order_details: true,
        manifest_date: true,
        order_barcode: true,
        order_number_visibility: true,
        product_detail: true,
        invoice_value: true,
        gift: false,
        display_product: true,
        product_name: true,
        other_charges: true,
        disclaimer_text: true,
        footer: true,
        tabular: true,
        footer_customize_text: true,
        Section1: true,
        Section2: true,
        Section3: true,
        Section4: true,
        Section5: true,
        Section6: true,
    });

    const handleToggleChange = useCallback((key) => {
        setItems(prevState => ({
            ...prevState,
            [key]: !prevState[key]
        }));
    }, []);

    return (
        <section className='label-customize-page'>
            <Row>
                <Col className="col-3">
                    <div className='lc-section-column'>
                        <div className='lc-section-item'>
                            <div className="lc-section-header">
                                <p>Section 1</p>
                                <Toggle
                                    checked={items.Section1}
                                    onChange={() => handleToggleChange('Section1')}
                                    aria-label="Toggle section 1"
                                />
                            </div>
                            <div className='lc-section-body'>
                                <ul>
                                    <li>
                                        <p>Contact Mask</p>
                                        <Toggle
                                            checked={items.contact}
                                            onChange={() => handleToggleChange('contact')}
                                            aria-label="Toggle contact"
                                        />
                                    </li>
                                    <li>
                                        <p>Shipping Address</p>
                                        <Toggle
                                            checked={items.shipping}
                                            onChange={() => handleToggleChange('shipping')}
                                            aria-label="Toggle shipping"
                                        />
                                    </li>
                                    <li>
                                        <p>Logo</p>
                                        <Toggle
                                            checked={items.logo}
                                            onChange={() => handleToggleChange('logo')}
                                            aria-label="Toggle logo"
                                        />
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className='lc-section-item'>
                            <div className="lc-section-header">
                                <p>Section 2</p>
                                <Toggle
                                    checked={items.Section2}
                                    onChange={() => handleToggleChange('Section2')}
                                    aria-label="Toggle section 2"
                                />
                            </div>
                            <div className='lc-section-body'>
                                <ul>
                                    <li>
                                        <p>Shipping Details</p>
                                        <Toggle
                                            checked={items.shipping_details}
                                            onChange={() => handleToggleChange('shipping_details')}
                                            aria-label="Toggle shipping details"
                                        />
                                    </li>
                                    <li>
                                        <p>AWB Barcode</p>
                                        <Toggle
                                            checked={items.awb_barcode}
                                            onChange={() => handleToggleChange('awb_barcode')}
                                            aria-label="Toggle AWB barcode"
                                        />
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className='lc-section-item'>
                            <div className="lc-section-header">
                                <p>Section 3</p>
                                <Toggle
                                    checked={items.Section3}
                                    onChange={() => handleToggleChange('Section3')}
                                    aria-label="Toggle section 3"
                                />
                            </div>
                            <div className='lc-section-body'>
                                <ul>
                                    <li>
                                        <p>Seller Contact Mask</p>
                                        <Toggle
                                            checked={items.seller_contact}
                                            onChange={() => handleToggleChange('seller_contact')}
                                            aria-label="Toggle seller contact"
                                        />
                                    </li>
                                    <li>
                                        <p>Seller GSTIN Mask</p>
                                        <Toggle
                                            checked={items.seller_gstin}
                                            onChange={() => handleToggleChange('seller_gstin')}
                                            aria-label="Toggle seller GSTIN"
                                        />
                                    </li>
                                    <li>
                                        <p>Order Details</p>
                                        <Toggle
                                            checked={items.order_details}
                                            onChange={() => handleToggleChange('order_details')}
                                            aria-label="Toggle order details"
                                        />
                                    </li>
                                    <li>
                                        <p>Manifest Date</p>
                                        <Toggle
                                            checked={items.manifest_date}
                                            onChange={() => handleToggleChange('manifest_date')}
                                            aria-label="Toggle manifest date"
                                        />
                                    </li>
                                    <li>
                                        <p>Order Barcode</p>
                                        <Toggle
                                            checked={items.order_barcode}
                                            onChange={() => handleToggleChange('order_barcode')}
                                            aria-label="Toggle order barcode"
                                        />
                                    </li>
                                    <li>
                                        <p>Order Number Visibility</p>
                                        <Toggle
                                            checked={items.order_number_visibility}
                                            onChange={() => handleToggleChange('order_number_visibility')}
                                            aria-label="Toggle order number visibility"
                                        />
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col className="col-6 box-shadow shadow-sm p10">
                    <div>
                        <LabelData items={items} />
                        <div className='float-end'>
                            <button className='btn main-button'>Save Customization</button>
                        </div>
                    </div>
                </Col>
                <Col className="col-3">
                    <div className='lc-section-column'>

                        <div className='lc-section-item'>
                            <div className="lc-section-header">
                                <p>Section 4</p>
                                <Toggle
                                    checked={items.Section4}
                                    onChange={() => handleToggleChange('Section4')}
                                    aria-label="Toggle section 4"
                                />
                            </div>
                            <div className='lc-section-body'>
                                <ul>
                                    <li>
                                        <p>Product Detail</p>
                                        <Toggle
                                            checked={items.product_detail}
                                            onChange={() => handleToggleChange('product_detail')}
                                            aria-label="Toggle product detail"
                                        />
                                    </li>
                                    <li>
                                        <p>Invoice Value</p>
                                        <Toggle
                                            checked={items.invoice_value}
                                            onChange={() => handleToggleChange('invoice_value')}
                                            aria-label="Toggle invoice value"
                                        />
                                    </li>
                                    <li>
                                        <p>As a Gift</p>
                                        <Toggle
                                            checked={items.gift}
                                            onChange={() => handleToggleChange('gift')}
                                            aria-label="Toggle gift"
                                        />
                                    </li>
                                    <li>
                                        <p>Display All Products</p>
                                        <Toggle
                                            checked={items.display_product}
                                            onChange={() => handleToggleChange('display_product')}
                                            aria-label="Toggle display product"
                                        />
                                    </li>
                                    <li>
                                        <p>Full Product Name</p>
                                        <Toggle
                                            checked={items.product_name}
                                            onChange={() => handleToggleChange('product_name')}
                                            aria-label="Toggle product name"
                                        />
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className='lc-section-item'>
                            <div className="lc-section-header">
                                <p>Section 5</p>
                                {/* <Toggle
                                    checked={items.Section5}
                                    onChange={() => handleToggleChange('Section5')}
                                    aria-label="Toggle section 5"
                                /> */}
                            </div>
                            <div className='lc-section-body'>
                                <ul>
                                    <li>
                                        <p>Other Charges</p>
                                        <Toggle
                                            checked={items.other_charges}
                                            onChange={() => handleToggleChange('other_charges')}
                                            aria-label="Toggle other charges"
                                        />
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className='lc-section-item'>
                            <div className="lc-section-header">
                                <p>Section 6</p>
                                <Toggle
                                    checked={items.Section6}
                                    onChange={() => handleToggleChange('Section6')}
                                    aria-label="Toggle section 6"
                                />
                            </div>
                            <div className='lc-section-body'>
                                <ul>
                                    <li>
                                        <p>Disclaimer Text</p>
                                        <Toggle
                                            checked={items.disclaimer_text}
                                            onChange={() => handleToggleChange('disclaimer_text')}
                                            aria-label="Toggle disclaimer text"
                                        />
                                    </li>
                                    <li>
                                        <p>Footer</p>
                                        <Toggle
                                            checked={items.footer}
                                            onChange={() => handleToggleChange('footer')}
                                            aria-label="Toggle footer"
                                        />
                                    </li>
                                    <li>
                                        <p>Tabular</p>
                                        <Toggle
                                            checked={items.tabular}
                                            onChange={() => handleToggleChange('tabular')}
                                            aria-label="Toggle tabular"
                                        />
                                    </li>
                                    <li>
                                        <p>Footer Customize Text</p>
                                        <Toggle
                                            checked={items.footer_customize_text}
                                            onChange={() => handleToggleChange('footer_customize_text')}
                                            aria-label="Toggle footer customize text"
                                        />
                                    </li>
                                </ul>
                            </div>
                        </div>








                    </div>
                </Col>
            </Row>
        </section>
    );
}

export default LabelCustomization;
