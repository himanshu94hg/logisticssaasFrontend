import React, { useState, useEffect } from 'react';
import SearchIcon from '../../../../../assets/image/icons/search-icon.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from "axios";
import { faChevronRight, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import AmazonLogo from '../../../../../assets/image/logo/AmazonLogo.png'
import ForwardIcon from '../../../../../assets/image/icons/ForwardIcon.png'
import ThreeDots from '../../../../../assets/image/icons/ThreeDots.png'
// import InfoIcon from '../../../../../assets/image/icons/InfoIcon.png'
import SidePanel from './SidePanel/SidePanel';
import InfoIcon from '../Icons/InfoIcon';

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

const OnHoldReco = () => {

    const [selectAll, setSelectAll] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [backDrop, setBackDrop] = useState(false);
    const [orders, setAllOrders] = useState([]);

    useEffect(() => {
        axios
            .get('http://35.154.133.143/order/v1/allorderdetail/') // Replace with your API endpoint
            .then(response => {
                console.log('Data is data:', response.data);
                setAllOrders(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%55", orders)

    // Handler for "Select All" checkbox
    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        if (!selectAll) {
            setSelectedRows(orders.map(row => row.id));
        } else {
            setSelectedRows([]);
        }
    };

    // Handler for individual checkbox
    const handleSelectRow = (orderId) => {
        const isSelected = selectedRows.includes(orderId);

        if (isSelected) {
            setSelectedRows(selectedRows.filter(id => id !== orderId));
        } else {
            setSelectedRows([...selectedRows, orderId]);
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
                                <th style={{ width: '25%' }}>Order Details</th>
                                <th>Product Details</th>
                                <th>Order Total</th>
                                <th>Shipping Details</th>
                                <th>Entered Weight & Dimensions (CM)</th>
                                <th>Charged Weight & Dimensions (CM)</th>
                                <th>Settled Weight & Dimensions (CM)</th>
                                <th>Status</th>
                                <th>Action</th>
                                {/* <th style={{ width: '25%' }}>Order Details</th>
                                <th style={{ width: '10%' }}>Customer details</th>
                                <th style={{ width: '10%' }}>Package Details</th>
                                <th style={{ width: '5%' }}>Payment</th>
                                <th style={{ width: '12%' }}>Pickup Address</th>
                                <th style={{ width: '8%' }}>Shipping Details</th>
                                <th style={{ width: '5%' }}>Status</th>
                                <th style={{ width: '5%' }}>Action</th> */}
                            </tr>
                            <tr className="blank-row"><td></td></tr>
                        </thead>
                        <tbody>
                            {orders.map((row, index) => (
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
                                            {/* order detail */}
                                            <div className='cell-inside-box'>
                                                <p className=''>
                                                    <img src={AmazonLogo} alt='AmazonLogo' width={24} className='me-2' /><span className='me-2 text-capitalize'>{row.channel}</span>
                                                    {row.order_number}

                                                    {/* <span className="product-details ms-2"> */}
                                                    {/* <FontAwesomeIcon icon={faCircleInfo} /> */}
                                                    {/* <img src={InfoIcon} alt="InfoIcon" width={18}/> */}
                                                    {/* <InfoIcon /> */}
                                                    {/* <span>{row.product_name}<br />{row.product_sku}<br /> Qt. {row.product_qty}</span> */}
                                                    {/* </span> */}
                                                </p>
                                                <p className='ws-no-wrap d-flex align-items-center'>
                                                    {/* {formatDate(row.inserted)} */}
                                                    <DateFormatter dateTimeString={row.inserted} />
                                                    <img src={ForwardIcon} className={`ms-2 ${row.o_type === 'forward' ? '' : 'icon-rotate'}`} alt="Forward/Reverse" width={24} />
                                                </p>
                                                {/* <p>{row.channel}</p> */}
                                                {/* <img src={ForwardIcon} className={`${row.o_type === 'forward' ? '' : 'icon-rotate'}`} alt="Forward/Reverse" width={24} /> */}
                                                {/* <p>W {row.p_warehouse_name}</p> */}
                                            </div>
                                        </td>
                                        <td>
                                            {/* customer detail */}
                                            <div className='cell-inside-box'>
                                                <p>{row.s_customer_name}</p>
                                                <p>{row.s_contact}
                                                    <span className='details-on-hover ms-2'>
                                                        <InfoIcon />
                                                        <span style={{ width: '150px' }}>
                                                            {row.s_city}, {row.s_state}, {row.s_pincode}
                                                        </span>
                                                    </span>
                                                </p>
                                                {/* <p>{row.s_city}</p>
                                                <p>{row.s_pincode}</p>
                                                <p>{row.s_state}</p> */}
                                            </div>
                                        </td>
                                        <td>
                                            {/* package  details */}
                                            <div className='cell-inside-box'>
                                                <p>2000</p>
                                            </div>
                                        </td>
                                        <td>
                                            {/* shiping section here */}
                                            <div className='cell-inside-box'>
                                                <p className='details-on-hover anchor-awb'>{row.awb_number}
                                                    {/* <span style={{right:'23px', width:'100px'}}>AWB Number</span> */}
                                                </p>
                                                <p className='mt-1'><img src='https://ekartlogistics.com/assets/images/ekblueLogo.png' height={10} className='me-2' />{row.courier_partner}</p>
                                            </div>
                                        </td>
                                        <td className='align-middle'>
                                            {/* Entered Weight & Dimensions (CM) */}
                                            <div className='cell-inside-box'>
                                                <p>Wt:  {row.weight} kg</p>
                                                <p>LBH: {row.length}x{row.breadth}x{row.height}</p>
                                            </div>
                                        </td>
                                        <td className='align-middle'>
                                            {/* Charged Weight & Dimensions (CM) */}
                                            <div className='cell-inside-box'>
                                                <p>Wt:  {row.weight} kg</p>
                                                <p>LBH: {row.length}x{row.breadth}x{row.height}</p>
                                            </div>
                                        </td>
                                        <td className='align-middle'>
                                            {/* Settled Weight & Dimensions (CM) */}
                                            <div className='cell-inside-box'>
                                                <p>Wt:  {row.weight} kg</p>
                                                <p>LBH: {row.length}x{row.breadth}x{row.height}</p>
                                            </div>
                                        </td>
                                        <td className='align-middle'>
                                            {/*  Status section  */}
                                            <p className='order-Status-box'>{row.status}</p>
                                        </td>
                                        <td className='align-middle'>
                                            {/* {row.ndr_action}
                                             {row.ndr_status} */}
                                            <div className='d-flex align-items-center gap-3'>
                                                <button className='btn main-button'>Ship Now</button>
                                                <div className='action-options'>
                                                    <div className='threedots-img'>
                                                        <img src={ThreeDots} alt="ThreeDots" width={24} />
                                                    </div>
                                                    <div className='action-list'>
                                                        <ul>
                                                            <li>Download Invoice</li>
                                                            <li>Edit Order</li>
                                                            <li>Verify Order</li>
                                                            <li><hr /></li>
                                                            <li>Call Buyer</li>
                                                            <li>Marl As Verified</li>
                                                            <li>Clone Order</li>
                                                            <li><hr /></li>
                                                            <li>Cancel Order</li>
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
                </div>
                <SidePanel CloseSidePanel={CloseSidePanel} />

                {/* <div id='sidePanel' className="side-panel">
                    <div className='sidepanel-closer'>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </div>
                </div> */}

                <div className={`backdrop ${backDrop ? 'd-block' : 'd-none'}`}></div>

            </div>
        </section >
    );
};

export default OnHoldReco;
