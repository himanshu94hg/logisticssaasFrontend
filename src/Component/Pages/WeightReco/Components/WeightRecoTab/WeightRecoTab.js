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

const WeightRecoTab = () => {

    const [selectAll, setSelectAll] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
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


    useEffect(() => {
        axios
            .get('http://35.154.133.143/weight/v1/weight-recancel-data/') // Replace with your API endpoint
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);



    // Handler for "Select All" checkbox
    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        if (!selectAll) {
            setSelectedRows(data.map(row => row.id));
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
                                <th style={{ width: '12%' }}>Order Details</th>
                                <th style={{ width: '12%' }}>Product Details</th>
                                <th style={{ width: '12%' }}>Order Total</th>
                                <th style={{ width: '12%' }}>Shipping Details</th>
                                <th style={{ width: '12%' }}>Entered Weight & Dimensions (CM)</th>
                                <th style={{ width: '12%' }}>Charged Weight & Dimensions (CM)</th>
                                <th style={{ width: '12%' }}>Settled Weight & Dimensions (CM)</th>
                                <th style={{ width: '12%' }}>Status</th>
                                <th style={{ width: '12%' }}>Action</th>
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
                            {data.map((row, index) => (
                                <React.Fragment key={row?.reconciliation_details?.id}>
                                    {index > 0 && <tr className="blank-row"><td></td></tr>}
                                    <tr className='table-row box-shadow'>
                                        <td className='checkbox-cell'>
                                            <input
                                                type="checkbox"
                                                checked={selectedRows.includes(row?.reconciliation_details?.id)}
                                                onChange={() => handleSelectRow(row?.reconciliation_details?.id)}
                                            />
                                        </td>
                                        <td>
                                            {/* order detail */}
                                            <div className='cell-inside-box'>
                                                <p className=''>
                                                    <img src={AmazonLogo} alt='AmazonLogo' width={24} className='me-2' /><span className='me-2 text-capitalize'>{row.channel}</span>
                                                    {row?.order_details?.order_number}
                                                </p>
                                                <p className='ws-no-wrap d-flex align-items-center'>
                                                    <DateFormatter dateTimeString={row?.reconciliation_details?.created} />
                                                    {/* <img src={ForwardIcon} className={`ms-2 ${row.o_type === 'forward' ? '' : 'icon-rotate'}`} alt="Forward/Reverse" width={24} /> */}
                                                </p>
                                                {/* <p>{row.channel}</p> */}
                                                {/* <img src={ForwardIcon} className={`${row.o_type === 'forward' ? '' : 'icon-rotate'}`} alt="Forward/Reverse" width={24} /> */}
                                                {/* <p>W {row.p_warehouse_name}</p> */}
                                            </div>
                                        </td>
                                        <td>
                                            {/* customer detail */}
                                            <div className='cell-inside-box'>
                                                <p>{row.order_details?.product_name}</p>
                                                {/* <p>{row.s_contact}
                                                    <span className='details-on-hover ms-2'>
                                                        <InfoIcon />
                                                        <span style={{ width: '150px' }}>
                                                            {row.s_city}, {row.s_state}, {row.s_pincode}
                                                        </span>
                                                    </span>
                                                </p> */}
                                                {/* <p>{row.s_city}</p>
                                                <p>{row.s_pincode}</p>
                                                <p>{row.s_state}</p> */}
                                            </div>
                                        </td>
                                        <td>
                                            {/* package  details */}
                                            <div className='cell-inside-box'>
                                                <p>₹{row?.reconciliation_details?.charged_amount}</p>
                                            </div>
                                        </td>
                                        <td>
                                            {/* shiping section here */}
                                            <div className='cell-inside-box'>
                                                <p className='details-on-hover anchor-awb'>{row?.order_details?.awb_number}
                                                    {/* <span style={{right:'23px', width:'100px'}}>AWB Number</span> */}
                                                </p>
                                                <p className='mt-1'>

                                                    <img src={`https://shipease.in/${row?.partner_details?.image}`} height={40} className='me-2' />
                                                    {/* {row.courier_partner} */}
                                                </p>
                                            </div>

                                        </td>
                                        <td className='align-middle'>
                                            {/* Entered Weight & Dimensions (CM) */}
                                            <div className='cell-inside-box'>
                                                <p>Wt:  {row?.reconciliation_details?.e_weight} kg</p>
                                                <p>LBH: {row?.reconciliation_details?.e_length}cm x {row?.reconciliation_details?.e_breadth}cm x {row?.reconciliation_details?.e_height}</p>
                                            </div>
                                        </td>
                                        <td className='align-middle'>
                                            {/* Charged Weight & Dimensions (CM) */}
                                            <div className='cell-inside-box'>
                                                <p>Wt:  {row?.reconciliation_details?.c_weight} kg</p>
                                                <p>LBH: {row?.reconciliation_details?.c_length}cm x {row?.reconciliation_details?.c_breadth}cm x {row?.reconciliation_details?.c_height}</p>
                                            </div>
                                        </td>
                                        <td className='align-middle'>
                                            {/* Settled Weight & Dimensions (CM) */}
                                            <div className='cell-inside-box'>
                                                <p>Wt:  {row?.reconciliation_details?.s_weight || '0'} kg</p>
                                                <p>LBH: {row?.reconciliation_details?.s_length || '0'}cm x {row?.reconciliation_details?.s_breadth || '0'}cm x {row?.reconciliation_details?.s_height || '0'}cm</p>
                                            </div>
                                        </td>
                                        <td className='align-middle'>
                                            {/*  Status section  */}
                                            <p className='order-Status-box'>{row?.reconciliation_details?.status}</p>
                                        </td>
                                        <td className='align-middle'>
                                            {/* {row.ndr_action}
                                             {row.ndr_status} */}
                                            <div className='d-flex align-items-center gap-3'>
                                                {/* <button className='btn main-button'>Ship Now</button> */}
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

export default WeightRecoTab;
