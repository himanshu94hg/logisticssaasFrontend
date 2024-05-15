import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfoIcon from '../../../../common/Icons/InfoIcon';
import ThreeDots from '../../../../../assets/image/icons/ThreeDots.png'
import SearchIcon from '../../../../../assets/image/icons/search-icon.png'
import ForwardIcon from '../../../../../assets/image/icons/ForwardIcon.png'
import shopifyImg from "../../../../../assets/image/integration/shopify.png"
import woocomImg from "../../../../../assets/image/integration/WCLogo.png"
import openCartImg from "../../../../../assets/image/integration/OpenCart.png"
import storeHipImg from "../../../../../assets/image/integration/StoreHippoLogo.png"
import magentoImg from "../../../../../assets/image/integration/magento.png"
import amazonImg from "../../../../../assets/image/logo/AmazonLogo.png"
import amazonDirImg from "../../../../../assets/image/integration/AmazonLogo.png"
import customImg from "../../../../../assets/image/integration/Manual.png"
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import CustomIcon from '../../../../common/Icons/CustomIcon';
import moment from "moment";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'react-bootstrap';
import NoData from '../../../../common/noData';
import { Link } from 'react-router-dom';
import { weightGreater } from '../../../../../customFunction/functionLogic';

const DateFormatter = ({ dateTimeString }) => {
    const [formattedDate, setFormattedDate] = useState('');

    useEffect(() => {
        const formattedDateTime = formatDateTime(dateTimeString);
        setFormattedDate(formattedDateTime);
    }, [dateTimeString]);

    const formatDateTime = (dateTimeString) => {
        const options = {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        };
        const dateObject = new Date(dateTimeString);
        const formattedDateTime = new Intl.DateTimeFormat('en-US', options).format(dateObject);

        return formattedDateTime;
    };

    return <p>{formattedDate}</p>;
};

const RTOShipment = ({shipmentCard,selectedRows,setSelectedRows,setBulkActionShow}) => {

    const dispatch = useDispatch()
    const [selectAll, setSelectAll] = useState(false);
    const [backDrop, setBackDrop] = useState(false);
    const [orders, setAllOrders] = useState([]);
    const [allShipment, setAllShipment] = useState([]);

    useEffect(() => {
        if (shipmentCard) {
            setAllShipment(shipmentCard);
        }
    }, [shipmentCard]);

    const reasons = [
        { count: 1, data: "NETWORK DELAY, WILL IMPACT DELIVERY" },
        { count: 3, data: "null" },
        { count: 2, data: "Reattempt Requested" },
      ];
    
      const getRandomCount = (reasons) => {
        const randomIndex = Math.floor(Math.random() * reasons.length);
        return reasons[randomIndex].count;
      };
    
      const getRandomReason = (reasons) => {
        const randomIndex = Math.floor(Math.random() * reasons.length);
        return reasons[randomIndex].data;
      };

    // Handler for "Select All" checkbox
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

    // Handler for individual checkbox
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

        // Check if all rows are selected, then select/deselect "Select All"
        if (selectedRows.length === orders.length - 1 && isSelected) {
            setSelectAll(false);
        } else {
            setSelectAll(false);
        }
    };

    const handleSidePanel = () => {
        document.getElementById("sidePanel").style.right = "0"
        setBackDrop(true)
    }

    const CloseSidePanel = () => {
        document.getElementById("sidePanel").style.right = "-50em"
        setBackDrop(false)
    }

    const [show, setShow] = useState(false);
    const [selectedData, setSelectedData] = useState(null);

    const handleShow = (row) => {
        console.log("Modal",row);
        setSelectedData(row);
        setShow(true);
    };

    const handleClose = () => setShow(false);

    const handleClickAWB = (event, orders) => {
        event.preventDefault();
        console.log(orders, "this is orders");
        const url = `https://shipease.in/order-tracking/`;
        window.open(url, '_blank');
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
                                <th>NDR Reason</th>
                                <th>Package Details</th>
                                <th>Customer details</th>
                                <th>Tracking Detail</th>
                                <th>Status</th>
                                {/* <th>Action</th> */}
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
                                                                                : row.channel.toLowerCase() === "custom" ? <CustomIcon />
                                                                                    : ""}
                                                    &nbsp;  <Link to={`/orderdetail/${row?.id}`} className='anchor-order'>{row.customer_order_number}</Link>
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
                                                    <span className='ms-2'>{`${moment(row?.created_at).format('DD MMM YYYY')} || ${moment(row?.created_at).format('h:mm A')}`}</span>                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            {/* NDR Reason*/}
                                            <div className='cell-inside-box'>
                                                <p ><strong>Attempts: </strong>{row?.ndr_details.length }<span>{" "}</span>
                                                     {/* <FontAwesomeIcon onClick={() => handleShow(row)} icon={faEye} /> */}
                                                     <InfoIcon onClick={() => handleShow(row)} />
                                                </p>
                                                {/* {row?.ndr_details.length > 0 && (
                                                    row.ndr_details.map((detail, index) => (
                                                        <p key={index}>NDR Reason: {detail.reason}</p>
                                                    ))
                                                )} */}
                                            </div>
                                        </td>
                                        <td>
                                            {/* package  details */}
                                            <div className='cell-inside-box'>
                                                <p className='width-eclipse'>{row.order_products.product_name}</p>
                                                <p>Wt:   {weightGreater(row?.dimension_detail?.weight,row?.dimension_detail?.vol_weight)}kg <br />
                                                    <span>LBH: {row?.dimension_detail?.length} x {row?.dimension_detail?.breadth} x {row?.dimension_detail?.height}</span>
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
                                            <div className='cell-inside-box'>
                                                <p className='details-on-hover anchor-awb' onClick={handleClickAWB} >{row?.awb_number ?? ""} </p>
                                                <p className='' onClick={(event) => handleClickpartner(event, row)}>{row?.courier_partner ?? ""} </p>
                                            </div>
                                        </td>
                                        <td className='align-middle'>
                                            {/*  Status section  */}
                                            <p className='order-Status-box'>{row.status}</p>
                                        </td>
                                    </tr>
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                    {allShipment?.length === 0 && <NoData />}
                </div>

                {/* <div id='sidePanel' className="side-panel">
                    <div className='sidepanel-closer'>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </div>
                </div> */}

                <div className={`backdrop ${backDrop ? 'd-block' : 'd-none'}`}></div>
                <Preview show={show} handleClose={handleClose} selectedData={selectedData} />

            </div>
        </section >
    );
};

export default RTOShipment;

function Preview({ show, handleClose, selectedData }) {
    console.log("All Select",selectedData);
    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>NDR Attempt History</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <table className="table">
                <tbody>
                    <tr>
                        <th>Raised Date</th>
                        <th>Action By</th>
                        <th>Reason</th>
                        <th>Remark</th>
                        <th>Status</th>
                    </tr>
                    {selectedData?.ndr_details?.map((row, index) => (
                        <tr key={index}>
                            <td>{row?.raised_date ? <DateFormatter dateTimeString={row?.raised_date} /> : ''}</td>
                            <td>{row?.action_by}</td>
                            <td>{row?.reason}</td>
                            <td>{row?.remark}</td>
                            <td>{row?.action_status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            </Modal.Body>
        </Modal>
    );
}