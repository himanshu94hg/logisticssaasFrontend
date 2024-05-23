import React from 'react'

const LabelData = () => {

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
                        <tr id="label-header">
                            <td className="noPadding">
                                <table className="tableInner">
                                    <tbody>
                                        <tr>
                                            <td style={{ width: "70%", border: 0 }}>
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
                                                        Contact :<span id="spanContactMask" style={{}}> **********</span>
                                                    </p>
                                                </div>
                                            </td>
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
                                                    src="https://www.shipease.in/public/assets/admin/images/20201125223903LOGO.png"
                                                    style={{ width: "80%", height: 60 }}
                                                />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td className="noPadding">
                                <table className="tableInner">
                                    <tbody>
                                        <tr>
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
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td className="noPadding">
                                <table className="tableInner">
                                    <tbody>
                                        <tr>
                                            <td style={{ width: "50%", border: 0 }}>
                                                <div id="label-order-detail">
                                                    <b>Shipped By</b> (if undelivered,return to)
                                                    <br />
                                                    <p style={{ padding: 0, margin: 0 }}>
                                                        Unit - 321, M3M Cosmopolitan, Tower - B1, Sector 66, Gurugram, Haryana 122002<br />
                                                        Contact :
                                                        <span id="spanSContactMask" style={{}}>
                                                            **********
                                                        </span>
                                                    </p>
                                                    GSTIN:
                                                    <span id="spanGstMask" style={{}}>
                                                        **********
                                                    </span>
                                                    <br />
                                                    Invoice No. : SE-1000123
                                                    <br />
                                                </div>
                                                <div id="label-manifest-date" style={{}}>
                                                    Manifest Date. : 2024-01-05
                                                </div>
                                            </td>
                                            <td
                                                style={{ width: "50%", textAlign: "center", border: 0 }}
                                                id="label-order-barcode"
                                            >
                                                <b>Essentials</b>
                                                <br />
                                                <span id="barcodeImage">
                                                    <img
                                                        src="https://www.shipease.in/barcode/test.php?code=1000123"
                                                        style={{ height: 60, margin: 10, maxWidth: 160 }}
                                                    />
                                                    <br />
                                                </span>
                                                <span id="ordernumberVisibility">Order #: 1000***</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr id="label-product-detail" style={{}}>
                            <td className="noPadding">
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
                                        <tr>
                                            <td>
                                                <br />
                                            </td>
                                            <td />
                                        </tr>
                                        <tr>
                                            <td>
                                                <br />
                                            </td>
                                            <td />
                                        </tr>
                                        <tr id="label-invoice-value" style={{}}>
                                            <td colSpan={3} style={{ textAlign: "right" }}>
                                                TOTAL Amount :{" "}
                                                <span id="label-gift" style={{}}>
                                                    AS A GIFT
                                                </span>
                                                <span id="label-amount" style={{ display: "none" }}>
                                                    Rs. 100
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr id="other-charges" style={{}}>
                            <td className="noPadding">
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
                            </td>
                        </tr>
                        <tr id="disclaimer-text" style={{}}>
                            <td>
                                <p style={{ margin: 0 }}>
                                    All disputes are subject to delhi jurisdiction. Goods once sold will
                                    only be taken back or exchange as per the store's exchange/return
                                    policy.
                                </p>
                            </td>
                        </tr>
                        <tr id="label-footer" style={{}}>
                            <td className="noPadding">
                                <table className="tableInner">
                                    <tbody>
                                        <tr>
                                            <td style={{ width: "70%" }}>
                                                THIS IS AN AUTO-GENERATED LABEL AND DOES NOT NEED SIGNATURE
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
                                                    src="https://www.shipease.in/public/assets/admin/images/20201125223903LOGO.png"
                                                    style={{ height: 25, width: 70 }}
                                                />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <br />
            </div>

        </>
    )
}

export default LabelData