import React, { useState } from 'react';
import Logo from '../../../../../assets/image/logo/logo.svg';

const LabelData = ({ items }) => {
    const [text, setText] = useState('THIS IS AN AUTO-GENERATED LABEL AND DOES NOT NEED SIGNATURE');

    const renderSection = () => {
        return (
            <>
                {items.Section1 && (
                    <tr id="label-header">
                        <td className="noPadding">
                            <table className="tableInner">
                                <tbody>
                                    <tr>
                                        <td style={{ width: "70%", border: 0 }}>
                                            {items.shipping && (
                                                <div id="label-shipping-address">
                                                    <b style={{ padding: 0, margin: 0, marginBottom: 5 }}>Ship To</b>
                                                    <p id="contact_paragraph" style={{ padding: 0, margin: 0 }}>
                                                        Unit - 321, M3M Cosmopolitan<br />
                                                        Tower - B1, Sector 66<br />
                                                        Gurugram, Haryana<br />
                                                        122002
                                                        <br />
                                                        Contact : {items.contact ? "987*****10" : "9876543210"}
                                                    </p>
                                                </div>
                                            )}
                                        </td>
                                        {items.logo && (
                                            <td
                                                style={{
                                                    width: "30%",
                                                    alignItems: "center",
                                                    alignContent: "center",
                                                    textAlign: "center",
                                                    border: 0
                                                }}
                                                id="label-header-logo"
                                            >
                                                <img src={Logo} style={{ width: "80%", height: 60 }} />
                                            </td>
                                        )}
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                )}
                {items.Section2 && (
                    <tr>
                        <td className="noPadding">
                            <table className="tableInner">
                                <tbody>
                                    <tr>
                                        {items.shipping_details && (
                                            <td style={{ width: "50%", border: 0 }} id="label-shipment-detail">
                                                Dimension (cm) : 1 x 1 x 1<br />
                                                Payment : <b>Prepaid</b>
                                                <br />
                                                Weight (kg) : 1<br />
                                                AWB No. : 123456789
                                                <br />
                                                Route Code : DEL/ALT
                                            </td>
                                        )}
                                        {items.awb_barcode && (
                                            <td style={{ width: "50%", textAlign: "center", border: 0 }} id="label-awb-barcode">
                                                <b>Delhivery</b>
                                                <br />
                                                <img
                                                    src="https://www.shipease.in/barcode/test.php?code=12345678923430"
                                                    style={{ height: 60, margin: 10, maxWidth: 160 }}
                                                />
                                            </td>
                                        )}
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                )}
                {items.Section3 && (
                    <tr>
                        <td className="noPadding">
                            <table className="tableInner">
                                <tbody>
                                    <tr>
                                        <td style={{ width: "50%", border: 0 }}>
                                            {items.order_details && (
                                                <div id="label-order-detail">
                                                    <b>Shipped By</b> (if undelivered,return to)
                                                    <br />
                                                    <p style={{ padding: 0, margin: 0 }}>
                                                        Unit - 321, M3M Cosmopolitan, Tower - B1, Sector 66, Gurugram, Haryana 122002<br />
                                                        Contact: {items.seller_contact ? "**********" : "9876543210"}
                                                    </p>
                                                    GSTIN: {items.seller_gstin ? "***************" : "22AAAAA0000A1Z5"}
                                                    <br />
                                                    Invoice No. : SE-1000123
                                                    <br />
                                                </div>
                                            )}
                                            {items.manifest_date && (
                                                <div id="label-manifest-date" style={{}}>
                                                    Manifest Date. : 2024-01-05
                                                </div>
                                            )}
                                        </td>
                                        <td style={{ width: "50%", textAlign: "center", border: 0 }} id="label-order-barcode">
                                            {items.order_barcode && (
                                                <>
                                                    <b>Essentials</b>
                                                    <br />
                                                    <span id="barcodeImage">
                                                        <img
                                                            src="https://www.shipease.in/barcode/test.php?code=1000123"
                                                            style={{ height: 60, margin: 10, maxWidth: 160 }}
                                                        />
                                                        <br />
                                                    </span>
                                                </>
                                            )}
                                            {items.order_number_visibility && (
                                                <span id="ordernumberVisibility">Order #: 1000***</span>
                                            )}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                )}
                {items.Section4 && (
                    <tr id="label-product-detail" style={{}}>
                        <td className="noPadding">
                            {items.product_detail && (
                                <table className="tableInner" id="productTable" style={{ width: "100%", borderCollapse: "collapse", border: 0 }}>
                                    <thead>
                                        <tr style={{ border: "1px solid black" }}>
                                            <th style={{ width: "90%" }}>Name &amp; SKU</th>
                                            <th style={{ width: "10%" }}>QTY</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                Item : Apple iPhone{" "}
                                                <span className="bullet" style={{ display: "none" }}>...</span>{" "}
                                                <span className="full-name" style={{}}>13 12GB</span>{" "}
                                                &nbsp; &nbsp; SKU : SKU-Name
                                            </td>
                                            <td>1</td>
                                        </tr>
                                        {items.invoice_value && (
                                            <tr id="label-invoice-value" style={{}}>
                                                <td colSpan={3} style={{ textAlign: "right" }}>
                                                    TOTAL Amount : {items.gift ? " AS A GIFT" : " Rs. 100"}
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            )}
                        </td>
                    </tr>
                )}
                {items.Section5 && (
                    <tr id="other-charges">
                        <td className="noPadding">
                            {items.other_charges && (
                                <table className="tableInner" border={5} id="productTable" style={{ width: "100%", borderCollapse: "collapse", border: 0 }}>
                                    <tbody>
                                        <tr>
                                            <th>COD Charges</th>
                                            <th>40</th>
                                        </tr>
                                        <tr>
                                            <th>Shipping Charges</th>
                                            <th>30</th>
                                        </tr>
                                        <tr>
                                            <th>Discount</th>
                                            <th>50</th>
                                        </tr>
                                    </tbody>
                                </table>
                            )}
                        </td>
                    </tr>
                )}
                {items.Section6 && (
                    <>
                        {items.disclaimer_text && (
                            <tr id="disclaimer-text" style={{}}>
                                <td>
                                    <p style={{ margin: 0 }}>
                                        All disputes are subject to delhi jurisdiction. Goods once sold will
                                        only be taken back or exchange as per the store's exchange/return
                                        policy.
                                    </p>
                                </td>
                            </tr>
                        )}
                        {items.footer && (
                            <tr id="label-footer" style={{}}>
                                <td className="noPadding">
                                    <table className="tableInner">
                                        <tbody>
                                            <tr>
                                                <td style={{ width: "70%" }}>
                                                    {items.footer_customize_text ? (
                                                        <input
                                                            style={{ height: '24px' }}
                                                            className='w-100'
                                                            type="text"
                                                            onChange={(e) => setText(e.target.value)}
                                                            value={text}
                                                        />
                                                    ) : (
                                                        <p style={{ marginLeft: '4px' }}>THIS IS AN AUTO-GENERATED LABEL AND DOES NOT NEED SIGNATURE</p>
                                                    )}
                                                </td>
                                                <td
                                                    style={{
                                                        width: "30%",
                                                        alignContent: "center",
                                                        alignItems: "center",
                                                        textAlign: "center"
                                                    }}
                                                >
                                                    <img src={Logo} style={{ height: 25, width: 70 }} />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        )}
                    </>
                )}
            </>
        );
    };

    return (
        <>
            <div style={{ margin: "0 2rem", display: "flex", flexDirection: "column" }}>
                <table>
                    <tbody>
                        {renderSection()}
                    </tbody>
                </table>
                <br />
            </div>
        </>
    );
};

export default LabelData;
