import React, { useState, useEffect } from 'react'
import moment from 'moment'
import shopifyImg from "../../../../../../assets/image/integration/shopify.png"
import woocomImg from "../../../../../../assets/image/integration/WCLogo.png"
import openCartImg from "../../../../../../assets/image/integration/OpenCart.png"
import storeHipImg from "../../../../../../assets/image/integration/StoreHippoLogo.png"
import magentoImg from "../../../../../../assets/image/integration/magento.png"
import amazonImg from "../../../../../../assets/image/logo/AmazonLogo.png"
import amazonDirImg from "../../../../../../assets/image/integration/AmazonLogo.png"
import customImg from "../../../../../../assets/image/integration/Manual.png"
import ForwardIcon from '../../../../../../assets/image/icons/ForwardIcon.png'
import InfoIcon from '../../../../../common/Icons/InfoIcon'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import CustomIcon from '../../../../../common/Icons/CustomIcon'
import NoData from '../../../../../common/noData'

const ReturnsTableMIS = ({ setTotalItems, selectedRows, setSelectedRows, setBulkActionShow, selectAll, setSelectAll, setAwbNo, setOrderTracking, orderStatus }) => {

    const [returnsData, setReturnsData] = useState([]);
    const { reportsReturnsData } = useSelector(state => state?.misSectionReducer)

    useEffect(() => {
        if (reportsReturnsData && reportsReturnsData?.results !== null) {
            setReturnsData(reportsReturnsData?.results);
            setTotalItems(reportsReturnsData?.count)
        }
    }, [reportsReturnsData])

    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        if (!selectAll) {
            setSelectedRows(returnsData?.map(row => row?.id));
            setBulkActionShow(true)
        } else {
            setSelectedRows([]);
            setBulkActionShow(false)
        }
    };

    const handleSelectRow = (orderId) => {
        const isSelected = selectedRows.includes(orderId);
        let updatedSelectedRows;
        if (isSelected) {
            updatedSelectedRows = selectedRows.filter(id => id !== orderId);
        } else {
            updatedSelectedRows = [...selectedRows, orderId];
        }
        setSelectedRows(updatedSelectedRows);
        if (updatedSelectedRows.length > 0) {
            setBulkActionShow(true);
        } else {
            setBulkActionShow(false);

        }
        if (updatedSelectedRows.length === returnsData?.length - 1 && isSelected) {
            setSelectAll(false);
        } else {
            setSelectAll(false);
        }
    };
    const handleClickAWB = (orders) => {
        setOrderTracking(true)
        setAwbNo(orders)
    };
    return (
        <>
            <table className=" w-100">
                <thead className="sticky-header">
                    <tr className="table-row box-shadow">
                        <th style={{ width: '1%' }}>
                            <input
                                type="checkbox"
                                checked={selectAll}
                                onChange={handleSelectAll}
                            />
                        </th>
                        <th style={{ width: '25%' }}>Order Details</th>
                        <th>Customer Details</th>
                        <th>Package Details</th>
                        <th>Payment</th>
                        <th>Pickup Address</th>
                        <th>Shipping Details</th>
                        <th>Status</th>
                    </tr>
                    <tr className="blank-row"><td></td></tr>
                </thead>
                <tbody>
                    {returnsData?.length > 0 && returnsData?.map((row, index) => (
                        <React.Fragment key={row.id}>
                            {index > 0 && <tr className="blank-row"><td></td></tr>}
                            <tr className='table-row box-shadow'>
                                <td className='checkbox-cell'>
                                    <input
                                        type="checkbox"
                                        checked={selectedRows.includes(row.id)}
                                        onChange={() => handleSelectRow(row.id)}
                                    />
                                </td>
                                <td>
                                    {/* User Details */}
                                    <div className='cell-inside-box'>
                                        <p className=''>
                                            {row.channel.toLowerCase() === "shopify" ? <img src={shopifyImg} alt="Manual" width="20" />
                                                : row.channel.toLowerCase() === "woocommerce" ? <img src={woocomImg} alt="Manual" width="20" />
                                                    : row.channel.toLowerCase() === "opencart" ? <img src={openCartImg} alt="Manual" width="20" />
                                                        : row.channel.toLowerCase() === "storehippo" ? <img src={storeHipImg} alt="Manual" width="20" />
                                                            : row.channel.toLowerCase() === "magento" ? <img src={magentoImg} alt="Manual" width="20" />
                                                                : row.channel.toLowerCase() === "amazon" ? <img src={amazonImg} alt="Manual" width="20" />
                                                                    : row.channel.toLowerCase() === "amazondirect" ? <img src={amazonDirImg} alt="Manual" width="20" />
                                                                        : row.channel.toLowerCase() === "custom" ? <CustomIcon />
                                                                            : ""}
                                            &nbsp;  <Link to={`/orderdetail/${row?.id}`} className='anchor-order'>{row.customer_order_number}</Link>
                                        </p>
                                        <p className='ws-nowrap d-flex align-items-center'>
                                            <img src={ForwardIcon} className={`${row.order_type === 'Forward' ? '' : 'icon-rotate'}`} alt="Forward/Reverse" width={24} />
                                            <span className='ms-2'>{`${moment(row?.created_at).format('DD MMM YYYY')} || ${moment(row?.created_at).format('h:mm A')}`}</span>
                                            {row.is_mps === true &&
                                                <span className="mps-flag">MPS</span>
                                            }
                                        </p>
                                    </div>
                                </td>
                                <td>
                                    {/* Customer Details */}
                                    <div className='cell-inside-box'>
                                        <p>{row?.shipping_detail?.recipient_name}</p>
                                        <p>{row?.shipping_detail?.mobile_number ?? null}
                                            <span className='details-on-hover ms-2'>
                                                <InfoIcon />
                                                <span style={{ width: '250px' }}>
                                                    {row?.shipping_detail?.address}, {row?.shipping_detail?.landmark}, {row?.shipping_detail?.city},{row?.shipping_detail?.state}, {row?.shipping_detail?.pincode}
                                                </span>
                                            </span>
                                        </p>
                                    </div>
                                </td>
                                <td>
                                    {/* Package Details */}
                                    <div className='cell-inside-box'>
                                        <p className='width-eclipse'>{row.order_products.product_name}</p>
                                        <p>Wt:  {row?.dimension_detail?.weight} kg
                                            <span className='details-on-hover ms-2 align-middle'>
                                                <InfoIcon />
                                                <span style={{ width: '250px' }}>
                                                    {row?.order_products.map((product, index) => (
                                                        <React.Fragment key={index}>
                                                            <strong>Product:</strong> {product.product_name}<br />
                                                            <strong>SKU:</strong> {product.sku}<br />
                                                            <strong>Qt.:</strong> {product.quantity}<br />
                                                        </React.Fragment>
                                                    ))}
                                                </span>
                                            </span>
                                            <br />
                                            <span>LBH(cm): {row?.dimension_detail?.length} x {row?.dimension_detail?.breadth} x {row?.dimension_detail?.height}</span>

                                        </p>
                                    </div>
                                </td>
                                <td>
                                    {/* Payment */}
                                    <div className='cell-inside-box'>
                                        <p>&#x20B9; {row?.invoice_amount}</p>
                                        <p className='order-Status-box mt-1'>{row?.payment_type}</p>
                                    </div>
                                </td>
                                <td>
                                    {/* Pickup Address */}
                                    <div className='cell-inside-box'>
                                        {row?.pickup_details ? (
                                            <p>{row?.pickup_details?.p_warehouse_name}
                                                <span className='details-on-hover ms-2'>
                                                    <InfoIcon />
                                                    {/* {!row?.pickup_details?.p_warehouse_name && ( */}
                                                    <span style={{ width: '250px' }}>
                                                        {row?.pickup_details?.p_address_line1},
                                                        {row?.pickup_details?.p_address_line2},<br />
                                                        {row?.pickup_details?.p_city},
                                                        {row?.pickup_details?.p_state},
                                                        {row?.pickup_details?.p_pincode}
                                                    </span>
                                                    {/* )} */}

                                                </span>
                                            </p>
                                        ) : ''}
                                    </div>
                                </td>
                                <td>
                                    {/* Shipping Details */}
                                    <div className='cell-inside-box shipping-details'>
                                        {row?.courier_image && <img src={row?.courier_image} title='partner' />}
                                        <div>
                                            <p className='details-on-hover anchor-awb' onClick={() => handleClickAWB(row?.awb_number)}>{row?.awb_number ?? ""} </p>
                                            <p className='text-capitalize'>{row?.courier_partner ?? ""} </p>
                                        </div>
                                    </div>
                                </td>
                                <td className='align-middle status-box'>
                                    <p className='order-Status-box'>{orderStatus[row?.status] || 'New'}</p>
                                </td>
                            </tr>
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
            {returnsData?.length < 1 && <NoData label={"No Records Found!"} />}
        </>

    )
}

export default ReturnsTableMIS