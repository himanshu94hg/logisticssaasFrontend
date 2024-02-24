import SidePanel from './SidePanel/SidePanel';
import React, { useState, useEffect } from 'react';
import InfoIcon from '../../../../common/Icons/InfoIcon';
import ThreeDots from '../../../../../assets/image/icons/ThreeDots.png'
import SearchIcon from '../../../../../assets/image/icons/search-icon.png'
import ForwardIcon from '../../../../../assets/image/icons/ForwardIcon.png'

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

const ActionRequested = ({shipmentCard}) => {
    const [backDrop, setBackDrop] = useState(false);
    const [selectAll, setSelectAll] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);

    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        if (!selectAll) {
            // setSelectedRows(orders.map(row => row?.order_details?.id));
        } else {
            setSelectedRows([]);
        }
    };

    const handleSelectRow = (orderId) => {
        const isSelected = selectedRows.includes(orderId);

        if (isSelected) {
            setSelectedRows(selectedRows.filter(id => id !== orderId));
        } else {
            setSelectedRows([...selectedRows, orderId]);
        }

        // if (selectedRows.length === orders.length - 1 && isSelected) {
        //     setSelectAll(false);
        // } else {
        //     setSelectAll(false);
        // }
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
                <div className="box-shadow shadow-sm p7 mb-3 filter-container">
                    <div className="search-container">
                        <label>
                            <input type="text" placeholder="Search for AWB | Order ID | Mobile Number | Email | SKU | Pickup ID" />
                            <button>
                                <img src={SearchIcon} alt="Search" />
                            </button>
                        </label>
                        <p className='font10'>Most Popular Search by
                            <span>COD</span> |
                            <span>Prepaid</span> |
                            <span>Yesterday</span> |
                            <span>One Week</span> |
                            <span>Last Month</span> |
                            <span>Delivered</span> |
                            <span>Cancel order</span> </p>
                    </div>
                    <div className='button-container'>
                        <button className='btn main-button me-2' onClick={handleSidePanel}>Advanced Filters</button>
                        <button className='btn main-button'>Report</button>
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
                                <th>Date requested</th>
                                <th>NDR Reason</th>
                                <th>Package Details</th>
                                <th>Customer details</th>
                                <th>Tracking Detail</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                            <tr className="blank-row"><td></td></tr>
                        </thead>
                        <tbody>
                            {shipmentCard?.map((row, index) => (
                                <React.Fragment key={row?.order_details?.id}>
                                    {index > 0 && <tr className="blank-row"><td></td></tr>}
                                    <tr className='table-row box-shadow'>
                                        <td className='checkbox-cell'>
                                            <input
                                                type="checkbox"
                                                checked={selectedRows.includes(row?.order_details?.id)}
                                                onChange={() => handleSelectRow(row?.order_details?.id)}
                                            />
                                        </td>
                                        <td>
                                            <div className='cell-inside-box'>
                                                <p>{row?.name}</p>
                                                <div className='d-flex align-items-center'>
                                                    {/* <DateFormatter dateTimeString={row?.ndrdetail[row.ndrdetail.length - 1]?.raised_date} /> */}
                                                    <img src={ForwardIcon} className={`ms-2 ${row?.order_details?.o_type === 'forward' ? '' : 'icon-rotate'}`} alt="Forward/Reverse" width={24} />
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='cell-inside-box'>
                                                {/* {row?.ndrdetail?.length > 0 && (
                                                    <React.Fragment key={row?.ndrdetail[row.ndrdetail.length - 1].id}>
                                                        <p>{row?.ndrdetail[row.ndrdetail.length - 1]?.reason}</p>
                                                    </React.Fragment>
                                                )} */}
                                                {/* <p><strong>Attempts: </strong>{row?.name}</p> */}
                                                <p>{row?.name}</p>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='cell-inside-box'>
                                                <p className='width-eclipse'>{row?.name}</p>
                                                <p>Wt:  {row?.id} kg
                                                    <span className='details-on-hover ms-2 align-middle'>
                                                        <InfoIcon />
                                                        <span style={{ width: '250px' }}>
                                                            {row?.name}<br />{row?.name}<br /> Qt. {row?.name}
                                                        </span>
                                                    </span>
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='cell-inside-box'>
                                                <p>{row?.name}</p>
                                                <p>{row?.username}
                                                    <span className='details-on-hover ms-2'>
                                                        <InfoIcon />
                                                        <span style={{ width: '150px' }}>
                                                            {row?.name}, {row?.name}, {row?.name}
                                                        </span>
                                                    </span>
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='cell-inside-box'>
                                                <p className='details-on-hover anchor-awb'>{row?.address.zipcode}</p>
                                                {/* <img src={`https://shipease.in/${row?.partner_details?.image}`} height={40} className='me-2' /> */}
                                                <p className='mt-1'><img src="https://ekartlogistics.com/assets/images/ekblueLogo.png" height={10} className='me-2' />{row?.order_details?.courier_partner}</p>
                                            </div>
                                        </td>
                                        <td className='align-middle'>
                                            <p className='order-Status-box'>
                                                <p>{row?.username}</p>
                                                {/* {row?.ndr_attempts_data?.length > 0 && (
                                                    <React.Fragment key={row.ndr_attempts_data[row.ndr_attempts_data.length - 1].id}>
                                                    </React.Fragment>
                                                 )}  */}
                                            </p>
                                        </td>
                                        <td className='align-middle'>
                                            <div className='d-flex align-items-center gap-3'>
                                                <button className='btn main-button'>Attempt</button>
                                                <div className='action-options'>
                                                    <div className='threedots-img'>
                                                        <img src={ThreeDots} alt="ThreeDots" width={24} />
                                                    </div>
                                                    <div className='action-list'>
                                                        <ul>
                                                            <li>Re-attempt</li>
                                                            <li>RTO</li>
                                                            <li>Escalate</li>
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

                <div className={`backdrop ${backDrop ? 'd-block' : 'd-none'}`}></div>

            </div>
        </section>
    );
};

export default ActionRequested;
