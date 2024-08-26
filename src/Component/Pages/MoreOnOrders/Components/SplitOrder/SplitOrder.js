import moment from 'moment';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import Tooltip from 'react-bootstrap/Tooltip';
import SidePanel from './SidePanel/SidePanel';
import NoData from '../../../../common/noData';
import InfoIcon from '../../../../common/Icons/InfoIcon';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import SplitOrderModal from "../SplitOrder/SplitOrderModal";
import CustomIcon from '../../../../common/Icons/CustomIcon';
import amazonImg from "../../../../../assets/image/logo/AmazonLogo.png"
import woocomImg from "../../../../../assets/image/integration/WCLogo.png"
import ForwardIcon from '../../../../../assets/image/icons/ForwardIcon.png'
import magentoImg from "../../../../../assets/image/integration/magento.png"
import { weightGreater } from '../../../../../customFunction/functionLogic';
import shopifyImg from "../../../../../assets/image/integration/shopify.png"
import openCartImg from "../../../../../assets/image/integration/OpenCart.png"
import amazonDirImg from "../../../../../assets/image/integration/AmazonLogo.png"
import UnicommerceIcon from "../../../../../assets/image/integration/UnicommerceIcon.png"
import storeHipImg from "../../../../../assets/image/integration/StoreHippoLogo.png"
import APIChannelIcon from "../../../../../assets/image/integration/APIChannelIcon.png"
import VerifiedOrderIcon from '../../../../common/Icons/VerifiedOrderIcon';
import CustomTooltip from '../../../../common/CustomTooltip/CustomTooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import OrderTagsIcon from '../../../../common/Icons/OrderTagsIcon';

const SplitOrder = ({ orders, setSplitStatus }) => {
    const [show, setShow] = useState(false);
    const [backDrop, setBackDrop] = useState(false);
    const [orderDetails, setOrderDetails] = useState(null);
    const handleClose = () => setShow(false);

    const handleSubmit = () => {
    };

    const CloseSidePanel = () => {
        document.getElementById("sidePanel").style.right = "-50em"
        setBackDrop(false)
    }
    const handleShow = (orderDetails) => {
        setShow(true);
        setOrderDetails(orderDetails);
    };

    return (
        <section className='position-relative'>
            <div className="position-relative">
                <div className='table-container'>
                    <table className="w-100">
                        <thead className="sticky-header">
                            <tr className="table-row box-shadow">
                                <th style={{ width: '1%' }}>

                                </th>
                                <th style={{ width: '24%' }}>Order Details</th>
                                <th style={{ width: '12.5%' }}>Customer details</th>
                                <th style={{ width: '16%' }}>Package Details</th>
                                <th style={{ width: '8%' }}>Payment</th>
                                <th style={{ width: '12.5%' }}>Pickup Address</th>
                                <th style={{ width: '6%' }}>Status</th>
                                <th style={{ width: '6%' }}>Action</th>
                            </tr>
                            <tr className="blank-row"><td></td></tr>
                        </thead>
                        <tbody>
                            {Array.isArray(orders) && orders?.map((row, index) => (
                                <React.Fragment key={row?.id}>
                                    {index > 0 && <tr className="blank-row"><td></td></tr>}
                                    <tr className='table-row box-shadow'>
                                        <td className='checkbox-cell'>
                                        </td>
                                        <td>
                                            {/* order detail */}
                                            <div className='cell-inside-box'>
                                                <p className=''>
                                                    {row?.channel.toLowerCase() === "shopify" ? <img src={shopifyImg} alt="Manual" width="20" />
                                                        : row?.channel.toLowerCase() === "woocommerce" ? <img src={woocomImg} alt="Manual" width="20" />
                                                            : row?.channel.toLowerCase() === "opencart" ? <img src={openCartImg} alt="Manual" width="20" />
                                                                : row?.channel.toLowerCase() === "storehippo" ? <img src={storeHipImg} alt="Manual" width="20" />
                                                                    : row?.channel.toLowerCase() === "magento" ? <img src={magentoImg} alt="Manual" width="20" />
                                                                        : row?.channel.toLowerCase() === "amazon" ? <img src={amazonImg} alt="Manual" width="20" />
                                                                            : row?.channel.toLowerCase() === "amazon_direct" ? <img src={amazonDirImg} alt="Manual" width="20" />
                                                                                : row?.channel.toLowerCase() === "unicommerce" ? <img src={UnicommerceIcon} alt="Manual" width="20" />
                                                                                    : row?.channel.toLowerCase() === "api" ? <img src={APIChannelIcon} alt="Manual" width="30" />
                                                                                        : <CustomIcon />}
                                                    <span className='d-inline-flex align-items-center gap-1 ms-2'>
                                                        <Link to={`/orderdetail/${row?.id}`} className='anchor-order'>{row?.customer_order_number}</Link>
                                                        {row?.other_details?.is_verified &&
                                                            <CustomTooltip
                                                                triggerComponent={<VerifiedOrderIcon />}
                                                                tooltipComponent='Verified'
                                                                addClassName='verified-hover'
                                                            />
                                                        }
                                                    </span>
                                                </p>
                                                <p className='ws-nowrap d-flex align-items-center'>
                                                    <CustomTooltip
                                                        triggerComponent={
                                                            <img
                                                                src={ForwardIcon}
                                                                className={`${row?.order_type === 'Forward' ? '' : 'icon-rotate'}`}
                                                                alt="Forward/Reverse"
                                                                width={24}
                                                            />
                                                        }
                                                        tooltipComponent={<>{row?.order_type}</>}
                                                        addClassName='verified-hover'
                                                    />
                                                    <span className='ms-2'>{`${moment(row?.created_at).format('DD MMM YYYY')} || ${moment(row?.created_at).format('h:mm A')}`}</span>
                                                    {row?.is_mps === true &&
                                                        <span className="mps-flag">MPS</span>
                                                    }
                                                    {
                                                        row?.order_tag?.length > 0 && <CustomTooltip
                                                            triggerComponent={<span className='ms-1'>
                                                                <OrderTagsIcon />
                                                            </span>}
                                                            tooltipComponent={
                                                                <div className='Labels-pool'>
                                                                    {row?.order_tag?.map((item) => {
                                                                        return (
                                                                            <div className="label-button-container active"><button className='label-button'><FontAwesomeIcon icon={faCircle} className='me-2' />{item.name}</button></div>
                                                                        )
                                                                    })}
                                                                </div>
                                                            }
                                                        />
                                                    }
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            {/* customer detail */}
                                            <div className='cell-inside-box'>
                                                <p>{row?.shipping_detail?.recipient_name}</p>
                                                <p>{row?.shipping_detail?.mobile_number}
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
                                            {/* package  details */}
                                            <div className='cell-inside-box'>
                                                <p className='width-eclipse'>{row?.order_products.product_name}</p>
                                                <p>Wt:  {weightGreater(row?.dimension_detail?.weight, row?.dimension_detail?.vol_weight)} kg
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
                                            {/* payment section here */}
                                            <div className='cell-inside-box'>
                                                <p>&#x20B9; {row?.invoice_amount}</p>
                                                <p className='order-Status-box mt-1'>{row?.payment_type}</p>
                                            </div>
                                        </td>
                                        <td className='align-middle'>
                                            <div className='cell-inside-box'>
                                                {
                                                    row?.order_type === "Forward" ?
                                                        <p>{row?.pickup_details?.p_warehouse_name}
                                                            <span className='details-on-hover ms-2'>
                                                                <InfoIcon />
                                                                <span style={{ width: '250px' }}>
                                                                    {row?.pickup_details?.p_address_line1 && `${row?.pickup_details?.p_address_line1},`}
                                                                    {row?.pickup_details?.p_address_line2 && `${row?.pickup_details?.p_address_line2},`}<br />
                                                                    {row?.pickup_details?.p_city && `${row?.pickup_details?.p_city},`}
                                                                    {row?.pickup_details?.p_state && `${row?.pickup_details?.p_state},`}
                                                                    {row?.pickup_details?.p_pincode}
                                                                </span>
                                                            </span>
                                                        </p> : <p>{row?.shipping_detail?.recipient_name}
                                                            <span className='details-on-hover ms-2'>
                                                                <InfoIcon />
                                                                <span style={{ width: '250px' }}>
                                                                    {row?.shipping_detail?.address && `${row?.shipping_detail?.address},`}
                                                                    {row?.shipping_detail?.landmark && `${row?.shipping_detail?.landmark},`} < br />
                                                                    {row?.shipping_detail?.city && `${row?.shipping_detail?.city},`}
                                                                    {row?.shipping_detail?.state && `${row?.shipping_detail?.state},`}
                                                                    {row?.shipping_detail?.pincode}
                                                                </span>
                                                            </span>
                                                        </p>
                                                }
                                            </div>
                                        </td>

                                        <td className='align-middle status-box'>
                                            <p className='order-Status-box'>{row && row?.status?.split("_").join(" ")}</p>
                                        </td>
                                        <td className='align-middle'>
                                            <div className='d-flex align-items-center gap-3'>
                                                <button className='btn main-button' onClick={() => handleShow(row)}>Split Order</button>
                                                <div className='action-options'>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                    {orders?.length === 0 && <NoData />}
                </div>
                <SidePanel CloseSidePanel={CloseSidePanel} />
                <div className={`backdrop ${backDrop ? 'd-block' : 'd-none'}`}></div>
            </div>
            <SplitOrderModal
                show={show}
                handleClose={handleClose}
                handleSubmit={handleSubmit}
                orderDetails={orderDetails}
                setSplitStatus={setSplitStatus}
            />

        </section >
    );
};
export default SplitOrder;