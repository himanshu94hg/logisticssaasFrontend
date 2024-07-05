import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SingleShipPop from '../ReassignOrder/SingleShipPop/SingleShipPop';
import ForwardIcon from '../../../../../assets/image/icons/ForwardIcon.png'
import InfoIcon from '../../../../common/Icons/InfoIcon';
import InfoMissingIcon from '../../../../common/Icons/InfoMissingIcon';
import moment from 'moment';
import shopifyImg from "../../../../../assets/image/integration/shopify.png"
import woocomImg from "../../../../../assets/image/integration/WCLogo.png"
import openCartImg from "../../../../../assets/image/integration/OpenCart.png"
import storeHipImg from "../../../../../assets/image/integration/StoreHippoLogo.png"
import magentoImg from "../../../../../assets/image/integration/magento.png"
import amazonImg from "../../../../../assets/image/logo/AmazonLogo.png"
import amazonDirImg from "../../../../../assets/image/integration/AmazonLogo.png"
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import CustomIcon from '../../../../common/Icons/CustomIcon';
import { toast } from 'react-toastify';
import NoData from '../../../../common/noData';
import { weightGreater } from '../../../../../customFunction/functionLogic';
import { Link } from 'react-router-dom';

const ReassignOrder = ({ orders, selectAll, setSelectAll, selectedRows, setSelectedRows, setBulkActionShow, setAwbNo, setOrderTracking, orderStatus }) => {
    const dispatch = useDispatch()
    const [backDrop, setBackDrop] = useState(false);
    const [SingleShip, setSingleShip] = useState(false)
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const paymentCard = useSelector(state => state?.paymentSectionReducer.paymentCard);
    const reassignCard = useSelector(state => state?.moreorderSectionReducer?.moreorderCard)
    const moreorderShipCardStatusData = useSelector(state => state?.moreorderSectionReducer?.moreorderShipCardStatus)

    useEffect(() => {
        if (moreorderShipCardStatusData) {
            setSingleShip(false)
        }
    }, [moreorderShipCardStatusData])

    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        if (!selectAll) {
            setSelectedRows(orders.map(row => row?.id));
            setBulkActionShow(true)
        } else {
            setSelectedRows([]);
            setBulkActionShow(false)
        }
    };

    const handleSelectRow = (orderId) => {
        const isSelected = selectedRows.includes(orderId);
        if (isSelected) {
            setSelectedRows(selectedRows.filter(id => id !== orderId));
            setBulkActionShow(true)
        } else {
            setSelectedRows([...selectedRows, orderId]);
        }
        if (setSelectedRows !== ([])) {
            setBulkActionShow(true)
        }
        if (selectedRows.length === orders.length - 1 && isSelected) {
            setSelectAll(false);
        } else {
            setSelectAll(false);
        }
    };


    const handleShipNow = (orderId) => {
        setSelectedOrderId(orderId)
        dispatch({ type: "REASSIGN_DATA_ACTION", payload: orderId });
        setSingleShip(true);
        setBulkActionShow(false)
    };

    const handleClickAWB = (orders) => {
        // event.preventDefault();
        // const url = `https://shipease.in/order-tracking/`;
        // window.open(url, '_blank');
        setAwbNo(orders)
        setOrderTracking(true)
    };

    const handleClickpartner = (event, row) => {
        event.preventDefault();
        const courierPartner = row.courier_partner.toLowerCase();
        switch (courierPartner) {
            case "bluedart":
                window.open('https://www.bluedart.com/web/guest/home', '_blank');
                break;
            case "delhivery":
                window.open('https://www.delhivery.com/track/package', '_blank');
                break;
            case "smartr":
                window.open('https://smartr.in/tracking', '_blank');
                break;
            case "ekart":
            case "ekart_5kg":
                window.open('https://ekartlogistics.com/', '_blank');
                break;
            case "shadowfax":
                window.open('https://tracker.shadowfax.in/#/', '_blank');
                break;
            case "amazon_swa":
                window.open('https://track.amazon.in/', '_blank');
                break;
            case "xpressbees":
                window.open('https://www.xpressbees.com/shipment/tracking', '_blank');
                break;
            case "shree maruti":
                window.open('https://www.shreemaruti.com/', '_blank');
                break;
            case "movin":
                window.open('https://www.movin.in/shipment/track', '_blank');
                break;
            case "ecom express":
                window.open('https://ecomexpress.in/tracking/', '_blank');
                break;
            case "professional":
                window.open('https://www.tpcindia.com/Default.aspx', '_blank');
                break;
            default:
                console.error("Courier partner not recognized");
                break;
        }
    }

    const handleBackdropClick = () => {
        setBackDrop(false)
        setSingleShip(false)
    }

    return (
        <section className='position-relative'>
            <div className="position-relative">
                <div className='table-container'>
                    <table className="w-100">
                        <thead className="sticky-header">
                            <tr className="table-row box-shadow">
                                <th style={{ width: '1%' }}>
                                    <input
                                        type="checkbox"
                                        checked={selectAll}
                                        onChange={handleSelectAll}
                                    />
                                </th>
                                <th style={{ width: '24%' }}>Order Details</th>
                                <th style={{ width: '12.5%' }}>Customer details</th>
                                <th style={{ width: '16%' }}>Package Details</th>
                                <th style={{ width: '8%' }}>Payment</th>
                                <th style={{ width: '12.5%' }}>Pickup Address</th>
                                <th style={{ width: '12.5%' }}>Shipping Details</th>
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
                                            <input
                                                type="checkbox"
                                                checked={selectedRows.includes(row?.id)}
                                                onChange={() => handleSelectRow(row?.id)}
                                            />
                                        </td>
                                        <td>
                                            {/* order detail */}
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
                                                    &nbsp; <Link to={`/orderdetail/${row?.id}`} className='anchor-order'>{row.customer_order_number}</Link>
                                                </p>
                                                <p className='ws-nowrap d-flex align-items-center'>
                                                    <OverlayTrigger
                                                        placement="right"
                                                        overlay={
                                                            <Tooltip id={`tooltip-right`}>
                                                                {row?.order_type}
                                                            </Tooltip>
                                                        }
                                                    >
                                                        <img src={ForwardIcon} className={`${row?.order_type === 'Forward' ? '' : 'icon-rotate'}`} alt="Forward/Reverse" width={24} />
                                                    </OverlayTrigger>
                                                    <span className='ms-2'>{`${moment(row?.created_at).format('DD MMM YYYY')} || ${moment(row?.created_at).format('h:mm A')}`}</span>
                                                    {row.is_mps === true &&
                                                        <span className="mps-flag">MPS</span>
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
                                            {/* pickup adress */}
                                            <td className='align-middle'>
                                                <div className='cell-inside-box'>
                                                    <p>{row?.pickup_details?.p_warehouse_name}
                                                        <span className='details-on-hover ms-2'>
                                                            <InfoIcon />
                                                            <span style={{ width: '250px' }}>
                                                                {row?.pickup_details?.p_address_line1}, {row?.pickup_details?.p_address_line2},<br />{row?.pickup_details?.p_city}, {row?.pickup_details?.p_state}, {row?.pickup_details?.p_pincode}
                                                            </span>
                                                        </span>
                                                    </p>

                                                </div>
                                            </td>
                                        </td>
                                        <td>
                                            <div className='cell-inside-box shipping-details'>
                                                {row?.courier_image && <img src={row.courier_image} title='partner' />}
                                                <div>
                                                    <p className='details-on-hover anchor-awb' onClick={() => handleClickAWB(row.awb_number)}>{row.awb_number ?? ""}
                                                    </p>
                                                    <p className='mt-1' onClick={(event) => handleClickpartner(event, row)}>{row && row.courier_partner}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='align-middle status-box'>
                                            <p className='order-Status-box'>{orderStatus[row?.status] || 'New'}</p>
                                        </td>
                                        <td className='align-middle'>
                                            {/* action section */}
                                            <div className='d-flex align-items-center gap-3'>
                                                <button className='btn main-button' onClick={() => handleShipNow(row?.id)}>Reassign Order</button>
                                                {/* <div className='action-options'>
                                                    <div className='threedots-img'>
                                                        <img src={ThreeDots} alt="ThreeDots" width={24} />
                                                    </div>
                                                    <div className='action-list'>
                                                        <ul>
                                                            <li>Add Tag</li>
                                                            <li>Verify Order</li>
                                                            <li className='action-hr'></li>
                                                            <li>Call Buyer</li>
                                                            <li onClick={() => dispatch({ type: "CLONE_ORDERS_UPDATE_ACTION",payload:row?.id })}>Clone Order</li>
                                                            <li>Mark As Verified</li>
                                                            <li className='action-hr'></li>
                                                            <li onClick={() => dispatch({ type: "ORDERS_DETAILS_CANCEL_ACTION",payload:row?.id })}>Cancel Order</li>

                                                        </ul>
                                                    </div>
                                                </div> */}
                                            </div>
                                        </td>
                                    </tr>
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                    {orders?.length === 0 && <NoData />}
                </div>
                <SingleShipPop reassignCard={reassignCard} setSingleShip={setSingleShip} SingleShip={SingleShip} orderId={selectedOrderId} />
                <div onClick={handleBackdropClick} className={`backdrop ${!SingleShip && 'd-none'}`}></div>

            </div>
        </section>
    );
};

export default ReassignOrder;
