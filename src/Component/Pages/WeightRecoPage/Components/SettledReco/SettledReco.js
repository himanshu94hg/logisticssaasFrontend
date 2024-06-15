import React, { useState, useEffect } from 'react';
import SearchIcon from '../../../../../assets/image/icons/search-icon.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from "axios";
import { faChevronRight, faCircleInfo, faFilter } from '@fortawesome/free-solid-svg-icons';
import AmazonLogo from '../../../../../assets/image/logo/AmazonLogo.png'
import ForwardIcon from '../../../../../assets/image/icons/ForwardIcon.png'
import moment from 'moment';
import shopifyImg from "../../../../../assets/image/integration/shopify.png"
import woocomImg from "../../../../../assets/image/integration/WCLogo.png"
import openCartImg from "../../../../../assets/image/integration/OpenCart.png"
import storeHipImg from "../../../../../assets/image/integration/StoreHippoLogo.png"
import magentoImg from "../../../../../assets/image/integration/magento.png"
import amazonImg from "../../../../../assets/image/logo/AmazonLogo.png"
import amazonDirImg from "../../../../../assets/image/integration/AmazonLogo.png"
import customImg from "../../../../../assets/image/integration/Manual.png"
import ThreeDots from '../../../../../assets/image/icons/ThreeDots.png'
// import InfoIcon from '../../../../../assets/image/icons/InfoIcon.png'
import SidePanel from './SidePanel/SidePanel';
import InfoIcon from '../../../../common/Icons/InfoIcon';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';
import CustomIcon from '../../../../common/Icons/CustomIcon';
import NoData from '../../../../common/noData';
import { Link } from 'react-router-dom';

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

const SettledReco = ({ weightRecoData, selectedRows, setSelectedRows, setBulkActionShow, setAwbNo, setOrderTracking,orderStatus }) => {

    const [selectAll, setSelectAll] = useState(false);
    // const [selectedRows, setSelectedRows] = useState([]);
    const [backDrop, setBackDrop] = useState(false);
    const [data, setData] = useState([]);


    const reasons = [
        { count: "Dabur Hingoli Gas Par Asar Zabardast 90N Tablets Unique B0BKSVZG23", data: "dtdc_surface" },

        { count: "Bru Green Label Ground Coffee, 500g Pouch,Bag B075MN16MZ", data: "dtdc_surface" },

        { count: "UNIQUE FORTUNE KACHI GHANI PURE MUSTARD OIL 1lt  4V-7JZR-OL83", data: "dtdc_surface" },

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
            setSelectedRows(weightRecoData.map(row => row.id));
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
        if (selectedRows.length === data.length - 1 && isSelected) {
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
    const [selectedRow, setSelectedRow] = useState(null);

    const handleShow = (row) => {
        setSelectedRow(row);
        setShow(true);
    };

    const handleClose = () => setShow(false);

    const handleClickAWB = (orders) => {
        setAwbNo(orders)
        setOrderTracking(true)
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
                                <th style={{ width: '14%' }}>Order Details</th>
                                <th style={{ width: '10%' }}>Product Details</th>
                                <th style={{ width: '8%' }}>Order Total</th>
                                <th style={{ width: '12%' }}>Shipping Details</th>
                                <th style={{ width: '14%' }}>Entered Weight & Dimensions (CM)</th>
                                <th style={{ width: '14%' }}>Charged Weight & Dimensions (CM)</th>
                                <th style={{ width: '14%' }}>Settled Weight & Dimensions (CM)</th>
                                <th style={{ width: '4%' }}>Status </th>
                                <th style={{ width: '6%' }}>Action</th>
                            </tr>
                            <tr className="blank-row"><td></td></tr>
                        </thead>
                        <tbody>
                            {weightRecoData?.map((row, index) => (
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
                                                    {row?.order?.channel && row?.order?.channel.toLowerCase() === "shopify" ? <img src={shopifyImg} alt="Manual" width="20" />
                                                        : row?.order?.channel && row?.order?.channel.toLowerCase() === "woocommerce" ? <img src={woocomImg} alt="Manual" width="20" />
                                                            : row?.order?.channel && row?.order?.channel.toLowerCase() === "opencart" ? <img src={openCartImg} alt="Manual" width="20" />
                                                                : row?.order?.channel && row?.order?.channel.toLowerCase() === "storehippo" ? <img src={storeHipImg} alt="Manual" width="20" />
                                                                    : row?.order?.channel && row?.order?.channel.toLowerCase() === "magento" ? <img src={magentoImg} alt="Manual" width="20" />
                                                                        : row?.order?.channel && row?.order?.channel.toLowerCase() === "amazon" ? <img src={amazonImg} alt="Manual" width="20" />
                                                                            : row?.order?.channel && row?.order?.channel.toLowerCase() === "amazondirect" ? <img src={amazonDirImg} alt="Manual" width="20" />
                                                                                : row?.order.channel.toLowerCase() === "custom" ? <CustomIcon />
                                                                                    : ""}
                                                    &nbsp;  <Link to={`/orderdetail/${row?.order?.id}`} className='anchor-order'>{row?.order?.customer_order_number}</Link>
                                                </p>
                                                <p className='ws-nowrap d-flex align-items-center'>
                                                    <img src={ForwardIcon} className={`${row?.order.order_type === 'Forward' ? '' : 'icon-rotate'}`} alt="Forward/Reverse" width={24} />
                                                    <span className='ms-2'>{`${moment(row?.created_at).format('DD MMM YYYY')} || ${moment(row?.created_at).format('h:mm A')}`}</span>
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            {/* package details */}
                                            <div className='cell-inside-box'>
                                                {/* <p className='width-eclipse'>{row?.order?.order_products[0]?.product_name}</p> */}
                                                <p>{row?.order?.order_products[0]?.product_name}
                                                    <span className='details-on-hover ms-2 align-middle'>
                                                        <InfoIcon />
                                                        <span style={{ width: '250px' }}>
                                                            {row?.order?.order_products?.map((product, index) => (
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
                                            {/* package  details */}
                                            <div className='cell-inside-box'>
                                                <p>₹ {row?.order?.invoice_amount}</p>
                                            </div>
                                        </td>
                                        <td>
                                            {/* shiping section here */}
                                            <div className='cell-inside-box shipping-details'>
                                                {row?.order?.courier_image && <img src={row?.order?.courier_image} title='partner' />}
                                                <div>
                                                    {/* <p className='details-on-hover anchor-awb'>{row?.order?.awb_number}</p> */}
                                                    <p className='details-on-hover anchor-awb' onClick={(e) => handleClickAWB(row?.order?.awb_number)}>
                                                        {row?.order?.awb_number}
                                                    </p>
                                                    <p className='text-capitalize'>{row?.order?.courier_partner}</p>
                                                </div>
                                            </div>

                                        </td>
                                        <td className='align-middle'>
                                            {/* Entered Weight & Dimensions (CM) */}
                                            <div className='cell-inside-box'>
                                                <p>Wt:  {row?.e_weight} kg</p>
                                                <p>LBH(cm): {row?.e_length} x {row?.e_breadth} x {row?.e_height}</p>
                                                <p className=''>Applied Amount : {row?.applied_amount}</p>
                                            </div>
                                        </td>
                                        <td className='align-middle'>
                                            {/* Entered Weight & Dimensions (CM) */}
                                            <div className='cell-inside-box'>
                                                <p>Wt:  {row?.c_weight} kg</p>
                                                <p>LBH(cm): {row?.c_length} x {row?.c_breadth} x {row?.c_height}</p>
                                                <p className=''>Charged Amount : {row?.charged_amount}</p>
                                            </div>
                                        </td>
                                        <td className='align-middle'>
                                            {/* Entered Weight & Dimensions (CM) */}
                                            <div className='cell-inside-box'>
                                                <p>Wt:  {row?.s_weight} kg</p>
                                                <p>LBH(cm): {row?.s_length} x {row?.s_breadth} x {row?.s_height}</p>
                                                <p className=''>Settled Amount : {row?.settled_amount}</p>
                                            </div>
                                        </td>
                                        <td className='align-middle'>
                                            {/*  Status section  */}
                                            {row?.status &&
                                                <p className='order-Status-box'>{row?.status}</p>
                                            }                                        </td>
                                        <td className='align-middle'>
                                            <div className='d-flex align-items-center gap-3'>
                                                <button className='btn main-button' onClick={() => handleShow(row)}>View History</button>
                                            </div>
                                        </td>
                                    </tr>
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                    {weightRecoData?.length === 0 && <NoData />}
                </div>
                <SidePanel CloseSidePanel={CloseSidePanel} />
                <div className={`backdrop ${backDrop ? 'd-block' : 'd-none'}`}></div>
                <Preview show={show} handleClose={handleClose} selectedRow={selectedRow} />

            </div>
        </section >
    );
};

export default SettledReco;

function Preview({ show, handleClose, selectedRow }) {
    const dispatch = useDispatch();
    const historyRecord = useSelector(state => state?.weightRecoReducer?.historyData);

    console.log(historyRecord, "All data")
    useEffect(() => {
        if (show && selectedRow) {
            dispatch({ type: "HISTORY_ACTION", payload: selectedRow?.id });
        }
    }, [show, selectedRow, dispatch]);

    return (
        <Modal show={show} onHide={handleClose} size="xl">
            <Modal.Header closeButton>
                <Modal.Title>History Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <table className="table">
                    <tbody>
                        <tr>
                            <th>Weight Discrepancy Date</th>
                            <th>Status</th>
                            <th>Charged Weight (KG)</th>
                            <th>Charged Dimension (CM)</th>
                            <th>Action Taken by</th>
                            <th>Applied Weight</th>
                            <th>Remark</th>
                        </tr>
                        {historyRecord?.map((row, index) => (
                            <tr key={index}>
                                <td>{row?.created_at ? <DateFormatter dateTimeString={row?.created_at} /> : ''}</td>
                                <td>{row?.status}</td>
                                <td>{selectedRow?.c_weight}</td>
                                <td>(L * B * H) : {selectedRow?.c_length} * {selectedRow?.c_breadth} * {selectedRow?.c_height} </td>
                                <td>{row?.action_taken_by}</td>
                                <td>{selectedRow?.e_weight}</td>
                                <td>{row?.remark}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </Modal.Body>
        </Modal>
    );
}
