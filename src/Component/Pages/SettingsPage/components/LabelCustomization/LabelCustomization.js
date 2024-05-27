import React, { useState } from 'react';
import './LabelCustomization.css';
import LabelData from './LabelData';
import Logo from '../../../../../assets/image/logo/logo.svg';
import { Col, Row } from 'react-bootstrap';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';

const LabelCustomization = () => {
    const [sections, setSections] = useState([
        {
            id: 1,
            name: 'Section 1',
            field: "select-one",
            included: true,
            items: [
                { name: 'Contact Mask', field: "contact", included: true },
                { name: 'Shipping Address', field: "shipping", included: true },
                { name: 'Logo', field: "logo", included: true },
            ],
        },
        {
            id: 2,
            name: 'Section 2',
            included: true,
            items: [
                { name: 'Shipment Details', field: "shipping_details", included: true },
                { name: 'AWB Barcode', field: "awb_barcode", included: true },
            ],
        },
        {
            id: 3,
            name: 'Section 3',
            included: true,
            items: [
                { name: 'Seller Contact Mask', field: "seller_contact", included: true },
                { name: 'Seller GSTIN Mask', field: "seller_gstin", included: true },
                { name: 'Order Details', field: "order_details", included: true },
                { name: 'Manifest Date', field: "manifest_date", included: true },
                { name: 'Order Barcode', field: "order_barcode", included: true },
                { name: 'Order Number Visibility', field: "order_number_visibility", included: true },
            ],
        },
        {
            id: 4,
            name: 'Section 4',
            included: true,
            items: [
                { name: 'Product Details', field: "product_detail", included: true },
                { name: 'Invoice Value', field: "invoice_value", included: true },
                { name: 'As a Gift', field: "gift", included: false },
                { name: 'Display All Products', field: "display_product", included: true },
                { name: 'Full Product Name', field: "product_name", included: true },
            ],
        },
        {
            id: 5,
            name: 'Section 5',
            included: true,
            items: [
                { name: 'Other Charges', field: "other_charges", included: true },
            ],
        },
        {
            id: 6,
            name: 'Section 6',
            included: true,
            items: [
                { name: 'Disclaimer Text', field: "disclaimer_text", included: true },
                { name: 'Footer', field: "footer", included: true },
                { name: 'Tabular Product Data', field: "tabular", included: true },
                { name: 'Footer Customize Text', field: "footer_customize_text", included: true },
            ],
        },
    ]);

    const handleSectionChange = (sectionIndex, e) => {
        const updatedSections = sections.map((section, index) => {
            if (index === sectionIndex) {
                return { ...section, included: e.target.checked };
            }
            return section;
        });
        setSections(updatedSections);
    };

    const handleItemChange = (sectionIndex, itemIndex, e) => {
        const updatedSections = sections.map((section, sIndex) => {
            if (sIndex === sectionIndex) {
                const updatedItems = section.items.map((item, iIndex) => {
                    if (iIndex === itemIndex) {
                        return { ...item, included: e.target.checked };
                    }
                    return item;
                });
                return { ...section, items: updatedItems };
            }
            return section;
        });
        setSections(updatedSections);
    };

    console.log(sections, "sections");

    return (
        <>
            <section className='label-customize-page'>
                <Row>
                    <Col className="col-3">
                        <div className='lc-section-column'>
                            {sections.slice(0, 3).map((section, sectionIndex) => (
                                <div key={section.id} className='lc-section-item'>
                                    <div className="lc-section-header">
                                        <p>{section.name}</p>
                                        <Toggle
                                            checked={section.included}
                                            onChange={(e) => handleSectionChange(sectionIndex, e)}
                                        />
                                    </div>
                                    <div className='lc-section-body'>
                                        <ul>
                                            {section.items.map((item, itemIndex) => (
                                                <li key={item.field}>
                                                    {item.name}
                                                    <Toggle
                                                        checked={item.included}
                                                        onChange={(e) => handleItemChange(sectionIndex, itemIndex, e)}
                                                    />
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Col>
                    <Col className="col-6 box-shadow shadow-sm p10">
                        <div>
                            <LabelData sections={sections} />
                            <div className='float-end'>
                                <button className='btn main-button'>Save Customization</button>
                            </div>
                        </div>
                    </Col>
                    <Col className="col-3">
                        <div className='lc-section-column'>
                            {sections.slice(3, 6).map((section, sectionIndex) => (
                                <div key={section.id} className='lc-section-item'>
                                    <div className="lc-section-header">
                                        <p>{section.name}</p>
                                        <Toggle
                                            checked={section.included}
                                            onChange={(e) => handleSectionChange(sectionIndex + 3, e)} // Adjust index for correct state update
                                        />
                                    </div>
                                    <div className='lc-section-body'>
                                        <ul>
                                            {section.items.map((item, itemIndex) => (
                                                <li key={item.field}>
                                                    {item.name}
                                                    <Toggle
                                                        checked={item.included}
                                                        onChange={(e) => handleItemChange(sectionIndex + 3, itemIndex, e)} // Adjust index for correct state update
                                                    />
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Col>
                </Row>
            </section>
        </>
    );
}

export default LabelCustomization;
