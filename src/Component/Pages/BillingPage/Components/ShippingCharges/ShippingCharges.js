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
import InfoIcon from '../../../../common/Icons/InfoIcon';

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

const ShippingCharges = () => {

    const [selectAll, setSelectAll] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [backDrop, setBackDrop] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        axios
            .get('http://35.154.133.143/billing/v1/shiping-charges/') // Replace with your API endpoint
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



    // useEffect(() => {
    //   first


    // }, [])


    return (
        <section className='position-relative'>
            <div className="position-relative">
                <div className="mb-3 billing-count-container">
                    <div className='box-shadow shadow-sm count-card'>
                        <p>Total Freight Charges: <span>&#8377; {data?.Total_freight_charges}</span></p>
                    </div>
                    <div className='box-shadow shadow-sm count-card'>
                        <p>Billed Freight Charges: <span>&#8377; 245</span></p>
                    </div>
                    <div className='box-shadow shadow-sm count-card'>
                        <p>Unbilled Freight Charges: <span>&#8377; 568</span></p>
                    </div>
                    <div className='box-shadow shadow-sm count-card'>
                        <p>Total On-Hold Amount: <span>&#8377; 565</span></p>
                    </div>
                    <div className='box-shadow shadow-sm count-card'>
                        <p>Invoice Due Amount: <span>&#8377; 565</span></p>
                    </div>
                </div>
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
                                <th>Order ID</th>
                                <th>Courier Details</th>
                                <th>AWB Assigned Date</th>
                                <th>Shipment Status</th>
                                <th>Applied Weight Charges</th>
                                <th>Excess Weight Charges</th>
                                <th>Entered Weight and dimensions</th>
                                <th>Charged Weight and Dimensions</th>
                                <th>View Transaction Details</th>
                            </tr>
                            <tr className="blank-row"><td></td></tr>
                        </thead>
                        <tbody>
                            {data?.shipment_data?.map((row, index) => (
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
                                                    {row.order_number}
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            {/* Courier detail */}
                                            <div className='cell-inside-box'>
                                                <p className=''>
                                                    {row.awb_number}
                                                </p>
                                                <p className='text-capitalize'>
                                                    {row.courier_partner}
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            {/* AWB Assigned Date */}
                                            <div className='cell-inside-box'>
                                                <p className=''>
                                                    <DateFormatter dateTimeString={row.awb_assigned_date} />
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            {/* Shipment Status */}
                                            <div className='cell-inside-box'>
                                                <p className='text-capitalize'>
                                                    {row.status}
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            {/* Applied Weight Charges */}
                                            <div className='cell-inside-box'>
                                                <p className=''>
                                                    ₹ {row.shipping_charges}
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            {/* Excess Weight Charges */}
                                            <div className='cell-inside-box'>
                                                <p className=''>
                                                    ₹ {row.excess_weight_charges || '0'}
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            {/* Entered Weight and dimensions */}
                                            <div className='cell-inside-box'>
                                                <p className=''>
                                                    {row?.weight}kg
                                                </p>
                                                <p>
                                                    LBH: {row?.length || '0'}cm x {row?.weight || '0'}cm x {row?.length || '0'}cm
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            {/* Charged Weight and Dimensions */}
                                            <div className='cell-inside-box'>
                                                <p className=''>
                                                    {row.vol_weight}kg
                                                </p>
                                                <p>
                                                    LBH: {row.c_length || '0'}cm x {row.c_weight || '0'}cm x {row.c_length || '0'}cm
                                                </p>
                                            </div>

                                        </td>
                                        <td>
                                            {/* View Transaction Details */}
                                            <div className='cell-inside-box'>
                                               <button className='btn main-button'>View</button>
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

export default ShippingCharges;
