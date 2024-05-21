import React from 'react'

const LabelData = ({
    order,
    companyLogo,
    label,
    sellerConfig,
    basicInfo,
    warehouse,
    product,
}) => {

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '95vh' }}>
                <table>
                    <tbody>
                        <tr>
                            <td className="noPadding">
                                <table className="tableInner">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <b style={{ lineHeight: 3 }}>Ship To</b>
                                                <p style={{ margin: 0, lineHeight: 3 }}>
                                                    {order.shipping_detail.recipient_name}
                                                    <br />
                                                    {order.shipping_detail.address}
                                                    <br />
                                                    {order.shipping_detail.city}, {order.shipping_detail.state}, {order.shipping_detail.country}
                                                    <br />
                                                    {order.shipping_detail.pincode}
                                                    <br />
                                                    Contact: {label.contact_mask ? '**********' : order.shipping_detail.mobile_number}
                                                </p>
                                            </td>
                                            <td style={{ width: '30%', alignItems: 'center', textAlign: 'center', border: 0 }}>
                                                <img src={companyLogo} alt="Company Logo" style={{ width: '80%', height: '80%' }} />
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
                                            <td>
                                                <p style={{ margin: 0, lineHeight: 3 }}>
                                                    <b>Order No: </b> {order.order_code} &nbsp;&nbsp;&nbsp;&nbsp;
                                                    <b>Invoice Number: </b> {label.invoice_number} &nbsp;&nbsp;&nbsp;&nbsp;
                                                    <b>Order Date: </b> {order.order_date}
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p style={{ margin: 0, lineHeight: 3 }}>
                                                    <b>Seller Name: </b> {sellerConfig.display_name} &nbsp;&nbsp;&nbsp;&nbsp;
                                                    <b>GST No: </b> {basicInfo.gst_number}
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p style={{ margin: 0, lineHeight: 3 }}>
                                                    <b>Warehouse: </b> {warehouse.name}
                                                </p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h3 style={{ textAlign: 'center' }}>Product Information</h3>
                                <table style={{ width: '100%', textAlign: 'center' }}>
                                    <thead>
                                        <tr>
                                            <th>SL No.</th>
                                            <th>Product</th>
                                            <th>Quantity</th>
                                            <th>Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {product.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.name}</td>
                                                <td>{item.quantity}</td>
                                                <td>{item.price}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p style={{ margin: 0, lineHeight: 3 }}>
                                    <b>Order Total: </b> {order.total_amount}
                                </p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default LabelData