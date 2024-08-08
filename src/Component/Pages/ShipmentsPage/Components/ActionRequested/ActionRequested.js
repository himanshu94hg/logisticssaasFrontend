import moment from "moment";
import { Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Tooltip from 'react-bootstrap/Tooltip';
import NoData from '../../../../common/noData';
import React, { useState, useEffect } from 'react';
import InfoIcon from '../../../../common/Icons/InfoIcon';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import CustomIcon from '../../../../common/Icons/CustomIcon';
import ThreeDots from '../../../../../assets/image/icons/ThreeDots.png'
import amazonImg from "../../../../../assets/image/logo/AmazonLogo.png"
import woocomImg from "../../../../../assets/image/integration/WCLogo.png"
import ForwardIcon from '../../../../../assets/image/icons/ForwardIcon.png'
import shopifyImg from "../../../../../assets/image/integration/shopify.png"
import { weightGreater } from '../../../../../customFunction/functionLogic';
import magentoImg from "../../../../../assets/image/integration/magento.png"
import openCartImg from "../../../../../assets/image/integration/OpenCart.png"
import amazonDirImg from "../../../../../assets/image/integration/AmazonLogo.png"
import storeHipImg from "../../../../../assets/image/integration/StoreHippoLogo.png"
import { FaRegCopy } from "react-icons/fa";
import CustomTooltip from "../../../../common/CustomTooltip/CustomTooltip";
import VerifiedOrderIcon from "../../../../common/Icons/VerifiedOrderIcon";
import APIChannelIcon from "../../../../../assets/image/integration/APIChannelIcon.png"
import OrderTagsIcon from "../../../../common/Icons/OrderTagsIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

const ActionRequested = ({ selectAll, setSelectAll, shipmentCard, selectedRows, setSelectedRows, setBulkActionShow, setOrderTracking, setAwbNo, partnerList }) => {
    const dispatch = useDispatch()
    const [show, setShow] = useState(false);
    const [backDrop, setBackDrop] = useState(false);
    const [allShipment, setAllShipment] = useState([]);
    const [selectedData, setSelectedData] = useState(null);
    const [copyText, setcopyText] = useState("Tracking Link")


    useEffect(() => {
        if (shipmentCard) {
            setAllShipment(shipmentCard);
        }
    }, [shipmentCard]);

    const handleRto = ((orderIds) => {
        const updatedRules = allShipment.filter(shipment => shipment.id !== orderIds);
        setAllShipment(updatedRules);
        const stringifiedReattempt = JSON.stringify(orderIds);
        dispatch({ type: "SHIPMENT_RTO_DATA_ACTION", payload: { "order_ids": stringifiedReattempt } });
    });

    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        if (!selectAll) {
            setSelectedRows(shipmentCard.map(row => row.id));
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
    };

    const handleShow = (row) => {
        setSelectedData(row);
        setShow(true);
    };

    const handleClose = () => setShow(false);

    const handleClickAWB = (orders) => {
        setOrderTracking(true)
        setAwbNo(orders)
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
                break;
        }
    }

    const handleCopy = (awb) => {
        const temp_url = `https://shipease.in/order-tracking/${awb}`
        navigator.clipboard.writeText(temp_url)
            .then(() => {
                setcopyText("Copied")
                setTimeout(() => {
                    setcopyText('Tracking Link');
                }, 2000);
            })
            .catch(err => {
            });
    };

    return (
        <section className='position-relative'>
            <div className="position-relative">
                <div className='table-container'>
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
                                <th>Order Details</th>
                                <th>NDR Attempt</th>
                                <th>Package Details</th>
                                <th>Customer details</th>
                                <th>Tracking Detail</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                            <tr className="blank-row"><td></td></tr>
                        </thead>
                        <tbody>
                            {allShipment?.map((row, index) => (
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
                                            {/* Date detail */}
                                            <div className='cell-inside-box'>
                                                <p className=''>
                                                    {row.channel.toLowerCase() === "shopify" ? <img src={shopifyImg} alt="Manual" width="20" />
                                                        : row.channel.toLowerCase() === "woocommerce" ? <img src={woocomImg} alt="Manual" width="20" />
                                                            : row.channel.toLowerCase() === "opencart" ? <img src={openCartImg} alt="Manual" width="20" />
                                                                : row.channel.toLowerCase() === "storehippo" ? <img src={storeHipImg} alt="Manual" width="20" />
                                                                    : row.channel.toLowerCase() === "magento" ? <img src={magentoImg} alt="Manual" width="20" />
                                                                        : row.channel.toLowerCase() === "amazon" ? <img src={amazonImg} alt="Manual" width="20" />
                                                                            : row.channel.toLowerCase() === "amazondirect" ? <img src={amazonDirImg} alt="Manual" width="20" />
                                                                                : row.channel.toLowerCase() === "api" ? <img src={APIChannelIcon} alt="Manual" width="30" />
                                                                                    : <CustomIcon />}
                                                    <span className='d-inline-flex align-items-center gap-1 ms-2'>
                                                        <Link to={`/orderdetail/${row?.id}`} className='anchor-order'>{row.customer_order_number}</Link>
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
                                                                className={`${row.order_type === 'Forward' ? '' : 'icon-rotate'}`}
                                                                alt="Forward/Reverse"
                                                                width={24}
                                                            />
                                                        }
                                                        tooltipComponent={<>{row?.order_type}</>}
                                                        addClassName='verified-hover'
                                                    />
                                                    <span className='ms-2'>{`${moment(row?.created_at).format('DD MMM YYYY')} || ${moment(row?.created_at).format('h:mm A')}`}</span>
                                                    {row.is_mps === true &&
                                                        <span className="mps-flag">MPS</span>
                                                    }
                                                    {/* {
                                                        row?.order_tag.length > 0 && <CustomTooltip
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
                                                    } */}
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            {/* NDR Reason*/}
                                            <div className='cell-inside-box'>
                                                <p ><strong>Attempts: </strong>{row?.ndr_details.length}<span>{" "}</span>
                                                    <InfoIcon onClick={() => handleShow(row)} />
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            {/* package  details */}
                                            <div className='cell-inside-box'>
                                                <p className='width-eclipse'>{row.order_products.product_name}</p>
                                                <p>Wt:   {weightGreater(row?.dimension_detail?.weight, row?.dimension_detail?.vol_weight)} kg
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
                                            {/* customer detail */}
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
                                            <div className='cell-inside-box shipping-details'>
                                                {row?.courier_partner && <img src={partnerList[row.courier_partner]["image"]} title='Partner' />}
                                                <div>
                                                    <p className='details-on-hover anchor-awb' onClick={(e) => handleClickAWB(row?.awb_number)}>
                                                        {row?.awb_number}
                                                    </p>
                                                    <p className='mt-1 cursor-pointer text-capitalize' onClick={(event) => handleClickpartner(event, row)}>
                                                        {row.courier_partner && partnerList[row.courier_partner]["title"]}
                                                    </p>
                                                </div>
                                                <CustomTooltip
                                                    triggerComponent={<button className='btn copy-button p-0 ps-1' onClick={() => handleCopy(row?.awb_number)}><FaRegCopy /></button>}
                                                    tooltipComponent={copyText}
                                                    addClassName='copytext-tooltip'
                                                />
                                            </div>
                                        </td>
                                        <td className='align-middle status-box'>
                                            <p className='order-Status-box'>{row?.status.split("_").join(" ")}</p>
                                        </td>
                                        <td className='align-middle'>
                                            <div className='d-flex align-items-center gap-3'>
                                                <button className='btn main-button'><Link to={`/customer-support?awb_number=${row?.awb_number}`}>Escalate</Link></button>
                                                <div className='action-options'>
                                                    <div className='threedots-img'>
                                                        <img src={ThreeDots} alt="ThreeDots" width={24} />
                                                    </div>
                                                    <div className='action-list'>
                                                        <ul>
                                                            <li onClick={() => handleRto(row.id)}>RTO</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                    {allShipment?.length === 0 && <NoData />}
                </div>

                <div className={`backdrop ${backDrop ? 'd-block' : 'd-none'}`}></div>
                <Preview show={show} handleClose={handleClose} selectedData={selectedData} />

            </div>
        </section>
    );
};

export default ActionRequested;

function Preview({ show, handleClose, selectedData }) {
    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>NDR Attempt History</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <table className="table">
                    <tbody>
                        <tr>
                            <th>Action Date</th>
                            <th>Action By</th>
                            <th>Reason</th>
                            <th>Remark</th>
                            <th>Status</th>
                        </tr>
                        {selectedData?.other_details?.ndr_reason != null &&
                            <tr>
                                <td>{selectedData?.other_details?.ndr_action_date ? <>{moment(selectedData?.other_details?.ndr_action_date).format("DD MMM YYYY, h:mm A")}</> : "NA"}</td>
                                <td>Courier</td>
                                <td>{selectedData?.other_details?.ndr_reason}</td>
                                <td>{selectedData?.other_details?.ndr_reason}</td>
                                <td>{selectedData?.other_details?.ndr_action}</td>
                            </tr>
                        }
                        {selectedData?.ndr_details?.map((row, index) => (
                            <tr key={index}>
                                <td>{row?.action_date ? <>{moment(row?.action_date).format("DD MMM YYYY, h:mm A")}</> : "NA"}</td>
                                <td>{row?.action_by}</td>
                                <td>{row?.reason}</td>
                                <td className="text-capitalize">{row?.remark}</td>
                                <td className="text-capitalize">{row?.action_status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </Modal.Body>
        </Modal>
    );
}
