import axios from 'axios';
import './LabelCustomization.css';
import 'react-toggle/style.css';
import Cookies from 'js-cookie';
import Toggle from 'react-toggle';
import LabelData from './LabelData';
import { Col, Row } from 'react-bootstrap';
import { BASE_URL_CORE } from '../../../../../axios/config';
import React, { useState, useCallback, useEffect } from 'react';
import { customErrorFunction } from '../../../../../customFunction/errorHandling';
import { toast } from 'react-toastify';
import NonActiveService from '../../../Dashboard/Components/NonActiveService/NonActiveService';
import { useSelector } from 'react-redux';
import { DUMMY_LABEL_CUSTOMIZATION } from '../../../../../mockData/dashboardDummyData';


const LabelCustomization = () => {
    const authToken = Cookies.get("access_token");
    const [customizationData, setCustomizationData] = useState(null)
    const [items, setItems] = useState({
        contact_mask: false,
        shipping_address_visibility: false,
        header_logo_visibility: false,
        shipment_detail_visibility: false,
        awb_barcode_visibility: false,
        s_contact_mask: false,
        s_gst_mask: false,
        order_detail_visibility: false,
        manifest_date_visibility: false,
        order_barcode_visibility: false,
        ordernumber_visibility: false,
        product_detail_visibility: false,
        invoice_value_visibility: false,
        gift_visibility: false,
        all_product_display: false,
        display_full_product_name: false,
        other_charges: false,
        disclaimer_text: false,
        footer_visibility: false,
        tabular_form_enabled: false,
        footer_customize_value: "THIS IS AN AUTO-GENERATED LABEL AND DOES NOT NEED SIGNATURE",
        custom_footer_enable: false,
        section1: false,
        section2: false,
        section3: false,
        section4: false,
        section5: false,
        section6: false,
        dimension_visibility: false,
        product_price_visibility: false,
        product_name_as_sku: false
    });

    const { planStatusData } = useSelector(state => state?.authDataReducer);


    const handleToggleChange = useCallback((key) => {
        setItems(prevState => ({
            ...prevState,
            [key]: !prevState[key]
        }));
    }, []);

    const handleParentSection = useCallback((e) => {
        const { name, checked } = e.target;
        if (name === "section1") {
            setItems(prevState => ({
                ...prevState,
                [name]: checked,
                contact_mask: checked,
                shipping_address_visibility: checked,
                header_logo_visibility: checked

            }));
        }
        if (name === "section2") {
            setItems(prevState => ({
                ...prevState,
                [name]: checked,
                shipment_detail_visibility: checked,
                awb_barcode_visibility: checked,
                dimension_visibility: checked

            }));
        }
        if (name === "section3") {
            setItems(prevState => ({
                ...prevState,
                [name]: checked,
                s_contact_mask: checked,
                s_gst_mask: checked,
                order_barcode_visibility: checked,
                ordernumber_visibility: checked,
                manifest_date_visibility: checked,
                order_detail_visibility: checked,
                s_warehouse_visibility: checked
            }));
        }
        if (name === "section4") {
            setItems(prevState => ({
                ...prevState,
                [name]: checked,
                product_detail_visibility: checked,
                invoice_value_visibility: checked,
                gift_visibility: checked,
                all_product_display: checked,
                display_full_product_name: checked,
                tabular_form_enabled: checked,
                product_price_visibility: checked,
                product_name_as_sku: checked

            }));
        }
        if (name === "section5") {
            setItems(prevState => ({
                ...prevState,
                [name]: checked,
                other_charges: checked,
            }));
        }
        if (name === "section6") {
            setItems(prevState => ({
                ...prevState,
                [name]: checked,
                disclaimer_text: checked,
                footer_visibility: checked,
                custom_footer_enable: checked,
                footer_customize_value: "THIS IS AN AUTO-GENERATED LABEL AND DOES NOT NEED SIGNATURE"
            }));
        }
    }, []);


    const handleSubmit = async () => {
        try {
            const response = await axios.post(`${BASE_URL_CORE}/core-api/features/label/customization/`, items, {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 201) {
                toast.success("Label update successfully")
            }
        } catch (error) {
            customErrorFunction(error)
        }
    }


    const isLocalBypass = process.env.REACT_APP_BYPASS_LOGIN === 'true';

    useEffect(() => {
        if (isLocalBypass) {
            setCustomizationData(DUMMY_LABEL_CUSTOMIZATION);
        } else {
            const fetchLabelCustomization = async () => {
                try {
                    const response = await axios.get(`${BASE_URL_CORE}/core-api/features/label/customization/`, {
                        headers: {
                            Authorization: `Bearer ${authToken}`
                        }
                    });
                    setCustomizationData(response?.data)
                } catch (error) {
                    customErrorFunction(error)
                }
            };
            fetchLabelCustomization();
        }
    }, [authToken, isLocalBypass]);


    useEffect(() => {
        if (customizationData) {
            setItems({
                contact_mask: customizationData?.contact_mask,
                shipping_address_visibility: customizationData?.shipping_address_visibility,
                header_logo_visibility: customizationData?.header_logo_visibility,
                shipment_detail_visibility: customizationData?.shipment_detail_visibility,
                dimension_visibility: customizationData?.dimension_visibility,
                awb_barcode_visibility: customizationData?.awb_barcode_visibility,
                s_warehouse_visibility: customizationData?.s_warehouse_visibility,
                s_contact_mask: customizationData?.s_contact_mask,
                s_gst_mask: customizationData?.s_gst_mask,
                order_detail_visibility: customizationData?.order_detail_visibility,
                manifest_date_visibility: customizationData?.manifest_date_visibility,
                order_barcode_visibility: customizationData?.order_barcode_visibility,
                ordernumber_visibility: customizationData?.ordernumber_visibility,
                product_detail_visibility: customizationData?.product_detail_visibility,
                invoice_value_visibility: customizationData?.invoice_value_visibility,
                gift_visibility: customizationData?.gift_visibility,
                all_product_display: customizationData?.all_product_display,
                display_full_product_name: customizationData?.display_full_product_name,
                other_charges: customizationData?.other_charges,
                disclaimer_text: customizationData?.disclaimer_text,
                footer_visibility: customizationData?.footer_visibility,
                tabular_form_enabled: customizationData?.tabular_form_enabled,
                footer_customize_value: customizationData?.footer_customize_value,
                custom_footer_enable: customizationData?.custom_footer_enable,
                section1: customizationData?.section1,
                section2: customizationData?.section2,
                section3: customizationData?.section3,
                section4: customizationData?.section4,
                section5: customizationData?.section5,
                section6: customizationData?.section6,
                dimension_visibility: customizationData?.dimension_visibility,
                s_warehouse_visibility: customizationData?.s_warehouse_visibility,
                product_price_visibility: customizationData?.product_price_visibility,
                product_name_as_sku: customizationData?.product_name_as_sku
            })
        }
    }, [customizationData])

    return (
        <section className='label-customize-page position-relative'>
            {process.env.REACT_APP_BYPASS_LOGIN !== 'true' && !planStatusData?.label_customization && <NonActiveService />}
            <Row>
                <Col className="col-3">
                    <div className='lc-section-column'>
                        <div className='lc-section-item'>
                            <div className="lc-section-header">
                                <p>Section 1</p>
                                <Toggle
                                    name={"section1"}
                                    checked={items.section1}
                                    onChange={(e) => handleParentSection(e)}
                                    aria-label="Toggle section 1"
                                />
                            </div>
                            <div className='lc-section-body'>
                                <ul>
                                    <li>
                                        <p>Customer Contact Number</p>
                                        <Toggle
                                            disabled={items.section1 ? false : true}
                                            checked={items.contact_mask}
                                            onChange={(e) => handleToggleChange('contact_mask')}
                                            aria-label="Toggle contact"
                                        />
                                    </li>
                                    <li>
                                        <p>Shipping Address</p>
                                        <Toggle
                                            checked={items.shipping_address_visibility}
                                            disabled={items.section1 ? false : true}
                                            onChange={() => handleToggleChange('shipping_address_visibility')}
                                            aria-label="Toggle shipping"
                                        />
                                    </li>
                                    <li>
                                        <p>Logo</p>
                                        <Toggle
                                            checked={items.header_logo_visibility}
                                            disabled={items.section1 ? false : true}
                                            onChange={() => handleToggleChange('header_logo_visibility')}
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
                                    name={"section2"}
                                    checked={items.section2}
                                    onChange={(e) => handleParentSection(e)}
                                    aria-label="Toggle section 2"
                                />
                            </div>
                            <div className='lc-section-body'>
                                <ul>
                                    <li>
                                        <p>Shipping Details</p>
                                        <Toggle
                                            disabled={items.section2 ? false : true}
                                            checked={items.shipment_detail_visibility}
                                            onChange={() => handleToggleChange('shipment_detail_visibility')}
                                            aria-label="Toggle shipping details"
                                        />
                                    </li>
                                    <li>
                                        <p>Package Information</p>
                                        <Toggle
                                            disabled={items.section2 ? false : true}
                                            checked={items.dimension_visibility}
                                            onChange={() => handleToggleChange('dimension_visibility')}
                                            aria-label="Toggle shipping details"
                                        />
                                    </li>
                                    <li>
                                        <p>AWB Barcode</p>
                                        <Toggle
                                            checked={items.awb_barcode_visibility}
                                            disabled={items.section2 ? false : true}
                                            onChange={() => handleToggleChange('awb_barcode_visibility')}
                                            aria-label="Toggle AWB barcode"
                                        />
                                    </li>
                                    {/* <li>
                                        <p>Weight/Dimension</p>
                                        <Toggle
                                            checked={items.dimension_visibility}
                                            disabled={items.section2 ? false : true}
                                            onChange={() => handleToggleChange('dimension_visibility')}
                                            aria-label="Toggle AWB barcode"
                                        />
                                    </li> */}
                                </ul>
                            </div>
                        </div>
                        <div className='lc-section-item'>
                            <div className="lc-section-header">
                                <p>Section 3</p>
                                <Toggle
                                    name={"section3"}
                                    checked={items.section3}
                                    onChange={(e) => handleParentSection(e)}
                                    aria-label="Toggle section 3"
                                />
                            </div>
                            <div className='lc-section-body'>
                                <ul>
                                    <li>
                                        <p>Warehouse Details</p>
                                        <Toggle
                                            checked={items.s_warehouse_visibility}
                                            disabled={items.section3 ? false : true}
                                            onChange={() => handleToggleChange('s_warehouse_visibility')}
                                        />
                                    </li>
                                    <li>
                                        <p>Seller Contact</p>
                                        <Toggle
                                            checked={items.s_contact_mask}
                                            aria-label="Toggle seller contact"
                                            disabled={items.section3 ? false : true}
                                            onChange={() => handleToggleChange('s_contact_mask')}
                                        />
                                    </li>
                                    <li>
                                        <p>Seller GSTIN and Invoice</p>
                                        <Toggle
                                            checked={items.s_gst_mask}
                                            aria-label="Toggle seller GSTIN"
                                            disabled={items.section3 ? false : true}
                                            onChange={() => handleToggleChange('s_gst_mask')}
                                        />
                                    </li>
                                    <li>
                                        <p>Order Number and Date</p>
                                        <Toggle
                                            checked={items.manifest_date_visibility}
                                            aria-label="Toggle manifest date"
                                            disabled={items.section3 ? false : true}
                                            onChange={() => handleToggleChange('manifest_date_visibility')}
                                        />
                                    </li>
                                    <li>
                                        <p>Order Barcode</p>
                                        <Toggle
                                            aria-label="Toggle order barcode"
                                            checked={items.order_barcode_visibility}
                                            disabled={items.section3 ? false : true}
                                            onChange={() => handleToggleChange('order_barcode_visibility')}
                                        />
                                    </li>
                                    {/* <li>
                                        <p>Order Number and Date</p>
                                        <Toggle
                                            checked={items.ordernumber_visibility}
                                            disabled={items.section3 ? false : true}
                                            aria-label="Toggle order number visibility"
                                            onChange={() => handleToggleChange('ordernumber_visibility')}
                                        />
                                    </li> */}
                                </ul>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col className="col-6 box-shadow shadow-sm p10">
                    <div>
                        <LabelData items={items} setItems={setItems} />
                        <div className='d-flex justify-content-between align-items-center w-100'>
                            <p className='text-sh-red font12'>**Order ID must be 20 characters or less</p>
                            <button className='btn main-button' onClick={() => {
                                if (planStatusData?.label_customization) {
                                    handleSubmit()
                                }
                            }}>Save Customization</button>
                        </div>
                    </div>
                </Col>
                <Col className="col-3">
                    <div className='lc-section-column'>
                        <div className='lc-section-item'>
                            <div className="lc-section-header">
                                <p>Section 4</p>
                                <Toggle
                                    name={"section4"}
                                    checked={items.section4}
                                    aria-label="Toggle section 4"
                                    onChange={(e) => handleParentSection(e)}
                                />
                            </div>
                            <div className='lc-section-body'>
                                <ul>
                                    <li>
                                        <p>Product Detail</p>
                                        <Toggle
                                            aria-label="Toggle product detail"
                                            disabled={items.section4 ? false : true}
                                            checked={items.product_detail_visibility}
                                            onChange={() => handleToggleChange('product_detail_visibility')}
                                        />
                                    </li>

                                    <li>
                                        <p>Display All Products</p>
                                        <Toggle
                                            aria-label="Toggle display product"
                                            checked={items.all_product_display}
                                            disabled={items.section4 ? false : true}
                                            onChange={() => handleToggleChange('all_product_display')}
                                        />
                                    </li>
                                    <li>
                                        <p>Full Product Name</p>
                                        <Toggle
                                            aria-label="Toggle product name"
                                            disabled={items.section4 ? false : true}
                                            checked={items.display_full_product_name}
                                            onChange={() => handleToggleChange('display_full_product_name')}
                                        />
                                    </li>
                                    <li>
                                        <p>Tabular</p>
                                        <Toggle
                                            checked={items.tabular_form_enabled}
                                            aria-label="Toggle tabular"
                                            disabled={items.section4 ? false : true}
                                            onChange={() => handleToggleChange('tabular_form_enabled')}
                                        />
                                    </li>
                                    <li>
                                        <p>Invoice Value</p>
                                        <Toggle
                                            aria-label="Toggle invoice value"
                                            disabled={items.section4 ? false : true}
                                            checked={items.invoice_value_visibility}
                                            onChange={() => handleToggleChange('invoice_value_visibility')}
                                        />
                                    </li>
                                    <li>
                                        <p>As a Gift</p>
                                        <Toggle
                                            aria-label="Toggle gift"
                                            checked={items.gift_visibility}
                                            disabled={items.section4 ? false : true}
                                            onChange={() => handleToggleChange('gift_visibility')}
                                        />
                                    </li>
                                    <li>
                                        <p>Price</p>
                                        <Toggle
                                            aria-label="Toggle gift"
                                            checked={items.product_price_visibility}
                                            disabled={items.section4 ? false : true}
                                            onChange={() => handleToggleChange('product_price_visibility')}
                                        />
                                    </li>
                                    <li>
                                        <p>Product Name As SKU</p>
                                        <Toggle
                                            aria-label="Toggle gift"
                                            checked={items.product_name_as_sku}
                                            disabled={items.section4 ? false : true}
                                            onChange={() => handleToggleChange('product_name_as_sku')}
                                        />
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className='lc-section-item'>
                            <div className="lc-section-header">
                                <p>Section 5</p>
                                <Toggle
                                    name={"section5"}
                                    checked={items.section5}
                                    aria-label="Toggle section 5"
                                    onChange={(e) => handleParentSection(e)}
                                />
                            </div>
                            <div className='lc-section-body'>
                                <ul>
                                    <li>
                                        <p>Other Charges</p>
                                        <Toggle
                                            checked={items.other_charges}
                                            aria-label="Toggle other charges"
                                            disabled={items.section5 ? false : true}
                                            onChange={() => handleToggleChange('other_charges')}
                                        />
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className='lc-section-item'>
                            <div className="lc-section-header">
                                <p>Section 6</p>
                                <Toggle
                                    name={"section6"}
                                    checked={items.section6}
                                    aria-label="Toggle section 6"
                                    onChange={(e) => handleParentSection(e)}
                                />
                            </div>
                            <div className='lc-section-body'>
                                <ul>
                                    <li>
                                        <p>Disclaimer Text</p>
                                        <Toggle
                                            checked={items.disclaimer_text}
                                            aria-label="Toggle disclaimer text"
                                            disabled={items.section6 ? false : true}
                                            onChange={() => handleToggleChange('disclaimer_text')}
                                        />
                                    </li>
                                    <li>
                                        <p>Footer</p>
                                        <Toggle
                                            checked={items.footer_visibility}
                                            aria-label="Toggle footer"
                                            disabled={items.section6 ? false : true}
                                            onChange={() => handleToggleChange('footer_visibility')}
                                        />
                                    </li>
                                    <li>
                                        <p>Footer Customize Text</p>
                                        <Toggle
                                            checked={items.custom_footer_enable}
                                            disabled={items.section6 ? false : true}
                                            aria-label="Toggle footer customize text"
                                            onChange={() => handleToggleChange('custom_footer_enable')}
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
