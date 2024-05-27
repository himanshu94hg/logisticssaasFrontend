import React, { useState } from 'react';
import Logo from '../../../../../assets/image/logo/logo.svg';

const LabelData = ({ sections }) => {
    const [text, setText] = useState('THIS IS AN AUTO-GENERATED LABEL AND DOES NOT NEED SIGNATURE')
    const renderSection = (section) => {
        switch (section.id) {
            case 1:
                return (
                    <tr id="label-header">
                        <td className="noPadding">
                            <table className="tableInner">
                                <tbody>
                                    <tr>
                                        <td style={{ width: "70%", border: 0 }}>
                                            {section.items.find(item => item.field === 'shipping' && item.included) &&
                                                <div id="label-shipping-address">
                                                    <b style={{ padding: 0, margin: 0, marginBottom: 5 }}>
                                                        Ship To
                                                    </b>
                                                    <p id="contact_paragraph" style={{ padding: 0, margin: 0 }}>
                                                        Unit - 321, M3M Cosmopolitan<br />
                                                        Tower - B1, Sector 66<br />
                                                        Gurugram, Haryana<br />
                                                        122002
                                                        <br />
                                                        Contact : {section.items.find(item => item.field === 'contact' && item.included) ?
                                                            "987*****10" : "9876543210"
                                                        }
                                                    </p>
                                                </div>
                                            }
                                        </td>
                                        {section.items.find(item => item.field === 'logo' && item.included) &&
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
                                                <img
                                                    src={Logo}
                                                    style={{ width: "80%", height: 60 }}
                                                />
                                            </td>
                                        }
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                );
            case 2:
                return (
                    <tr>
                        <td className="noPadding">
                            <table className="tableInner">
                                <tbody>
                                    <tr>
                                        {section.items.find(item => item.field === 'shipping_details' && item.included) &&
                                            <td
                                                style={{ width: "50%", border: 0 }}
                                                id="label-shipment-detail"
                                            >
                                                Dimension (cm) : 1 x 1 x 1<br />
                                                Payment : <b>Prepaid</b>
                                                <br />
                                                Weight (kg) : 1<br />
                                                AWB No. : 123456789
                                                <br />
                                                Route Code : DEL/ALT
                                            </td>
                                        }
                                        {section.items.find(item => item.field === 'awb_barcode' && item.included) &&
                                            <td
                                                style={{ width: "50%", textAlign: "center", border: 0 }}
                                                id="label-awb-barcode"
                                            >
                                                <b>Delhivery</b>
                                                <br />
                                                <img
                                                    src="https://www.shipease.in/barcode/test.php?code=12345678923430"
                                                    style={{ height: 60, margin: 10, maxWidth: 160 }}
                                                />
                                            </td>
                                        }
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                );
            case 3:
                return (
                    <tr>
                        <td className="noPadding">
                            <table className="tableInner">
                                <tbody>
                                    <tr>
                                        <td style={{ width: "50%", border: 0 }}>
                                            {section.items.find(item => item.field === 'order_details' && item.included) &&
                                                <div id="label-order-detail">
                                                    <b>Shipped By</b> (if undelivered,return to)
                                                    <br />
                                                    <p style={{ padding: 0, margin: 0 }}>
                                                        Unit - 321, M3M Cosmopolitan, Tower - B1, Sector 66, Gurugram, Haryana 122002<br />
                                                        Contact: {section.items.find(item => item.field === 'seller_contact' && item.included) ? "**********" : "9876543210"}
                                                    </p>
                                                    GSTIN: {section.items.find(item => item.field === 'seller_gstin' && item.included) ? "***************" : "22AAAAA0000A1Z5"}
                                                    <br />
                                                    Invoice No. : SE-1000123
                                                    <br />
                                                </div>
                                            }
                                            {section.items.find(item => item.field === 'manifest_date' && item.included) &&
                                                <div id="label-manifest-date" style={{}}>
                                                    Manifest Date. : 2024-01-05
                                                </div>
                                            }
                                        </td>
                                        <td
                                            style={{ width: "50%", textAlign: "center", border: 0 }}
                                            id="label-order-barcode"
                                        >
                                            {section.items.find(item => item.field === 'order_barcode' && item.included) &&
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
                                            }
                                            {section.items.find(item => item.field === 'order_number_visibility' && item.included) &&
                                                <span id="ordernumberVisibility">Order #: 1000***</span>
                                            }
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                );
            case 4:
                return (
                    <tr id="label-product-detail" style={{}}>
                        <td className="noPadding">
                            {section.items.find(item => item.field === 'product_detail' && item.included) &&
                                <table
                                    className="tableInner"
                                    id="productTable"
                                    style={{ width: "100%", borderCollapse: "collapse", border: 0 }}
                                >
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
                                                <span className="bullet" style={{ display: "none" }}>
                                                    ...
                                                </span>{" "}
                                                <span className="full-name" style={{}}>
                                                    13 12GB
                                                </span>{" "}
                                                &nbsp; &nbsp; SKU : SKU-Name
                                            </td>
                                            <td>1</td>
                                        </tr>

                                        {section.items.find(item => item.field === 'invoice_value' && item.included) &&
                                            <tr id="label-invoice-value" style={{}}>
                                                <td colSpan={3} style={{ textAlign: "right" }}>
                                                    TOTAL Amount :
                                                    {section.items.find(item => item.field === 'gift' && item.included) ? " AS A GIFT" : " Rs. 100"}
                                                </td>
                                            </tr>
                                        }
                                    </tbody>
                                </table>
                            }
                        </td>
                    </tr>
                );
            case 5:
                return (
                    <tr id="other-charges">
                        <td className="noPadding">
                            {section.items.find(item => item.field === 'other_charges' && item.included) &&
                                <table
                                    className="tableInner"
                                    border={5}
                                    id="productTable"
                                    style={{ width: "100%", borderCollapse: "collapse", border: 0 }}
                                >
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
                            }
                        </td>
                    </tr>
                );
            case 6:
                return (
                    <>
                        {section.items.find(item => item.field === 'disclaimer_text' && item.included) &&
                            <tr id="disclaimer-text" style={{}}>
                                <td>
                                    <p style={{ margin: 0 }}>
                                        All disputes are subject to delhi jurisdiction. Goods once sold will
                                        only be taken back or exchange as per the store's exchange/return
                                        policy.
                                    </p>
                                </td>
                            </tr>
                        }
                        {section.items.find(item => item.field === 'footer' && item.included) &&
                            <tr id="label-footer" style={{}}>
                                <td className="noPadding">
                                    <table className="tableInner">
                                        <tbody>
                                            <tr>
                                                <td style={{ width: "70%" }}>
                                                    {section.items.find(item => item.field === 'footer_customize_text' && item.included) ?
                                                        <input
                                                            style={{ height: '24px' }}
                                                            className='w-100'
                                                            type="text"
                                                            onChange={(e) => setText(e.target.value)} 
                                                            value={text} />
                                                        :
                                                        <p style={{ marginLeft: '4px' }}>THIS IS AN AUTO-GENERATED LABEL AND DOES NOT NEED SIGNATURE</p>
                                                    }
                                                </td>
                                                <td
                                                    style={{
                                                        width: "30%",
                                                        alignContent: "center",
                                                        alignItems: "center",
                                                        textAlign: "center"
                                                    }}
                                                >
                                                    <img
                                                        src={Logo}
                                                        style={{ height: 25, width: 70 }}
                                                    />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        }
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <div
                style={{
                    margin: "0 2rem",
                    display: "flex",
                    flexDirection: "column"
                }}
            >
                <table>
                    <tbody>
                        {sections.map((section) => (
                            section.included && renderSection(section)
                        ))}
                    </tbody>
                </table>
                <br />
            </div>
        </>
    );
};

export default LabelData;
