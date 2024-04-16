import moment from 'moment';
import SidePanel from './SidePanel/SidePanel';
import React, { useState, useEffect } from 'react';

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

const PassbookTab = ({ billingCard, selectedRows, setSelectedRows, setBulkActionShow }) => {

    const [selectAll, setSelectAll] = useState(false);
    // const [selectedRows, setSelectedRows] = useState([]);
    const [backDrop, setBackDrop] = useState(false);
    const [data, setData] = useState([]);

    const reasons = [
        { count: 247483644, credit_blance: 0.0, dr_blance: 100, cr_pathner_name: 'bluedart_surface' },
        { count: 395645666, credit_blance: 3463, dr_blance: 200, cr_pathner_name: 'bluedart_surface' },
        { count: 746465788, credit_blance: 200, dr_blance: 6000, cr_pathner_name: 'bluedart_surface' },
        { count: 746465788, credit_blance: 700, dr_blance: 100, cr_pathner_name: 'bluedart_surface' },
    ];

    const awbcount = (reasons) => {
        const randomIndex = Math.floor(Math.random() * reasons.length);
        return reasons[randomIndex].count;
    };

    const creditData = (reasons) => {
        const randomIndex = Math.floor(Math.random() * reasons.length);
        return reasons[randomIndex].credit_blance;
    };
    const drData = (reasons) => {
        const randomIndex = Math.floor(Math.random() * reasons.length);
        return reasons[randomIndex].dr_blance;
    };
    const cr_pathner_name = (reasons) => {
        const randomIndex = Math.floor(Math.random() * reasons.length);
        return reasons[randomIndex].cr_pathner_name;
    };

    // Handler for "Select All" checkbox
    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        if (!selectAll) {
            setSelectedRows(billingCard.map(row => row.id));
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



    // useEffect(() => {
    //   first


    // }, [])


    return (
        <section className='position-relative'>
            <div className="position-relative">
                <div className="mb-3 billing-count-container">
                    <div className='box-shadow shadow-sm count-card'>
                        <p>Current Usable Balance:     <span>&#8377; {data?.current_unavailable_balance || 0}</span></p>
                    </div>
                    <div className='box-shadow shadow-sm count-card'>
                        <p>Balance On Hold:     <span>&#8377; {data?.corrent_on_hold_blance || 0}</span></p>
                    </div>
                    <div className='box-shadow shadow-sm count-card'>
                        <p>Total Balance:     <span>&#8377; {data?.corrent_blance || 0}</span></p>
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
                                <th>Date</th>
                                <th>AWB Number</th>
                                <th>Courier Partner</th>
                                <th>Credit</th>
                                <th>Debit</th>
                                <th>Balance</th>
                                <th>Description</th>
                            </tr>
                            <tr className="blank-row"><td></td></tr>
                        </thead>
                        <tbody>
                            {billingCard?.map((row, index) => (
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
                                                    {moment(row.datetime).format("YYYY-MM-DD")}
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            {/* Courier detail */}
                                            <div className='cell-inside-box'>
                                                <p className=''>
                                                    {row?.order_detail?.awb_number}
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            {/* AWB Assigned Date */}
                                            <div className='cell-inside-box'>
                                                <p className='text-capitalize'>
                                                    {row?.order_detail?.courier_partner}
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            {/* Shipment Status */}
                                            <div className='cell-inside-box'>
                                                <p className=''>
                                                    {row?.transaction_type == "c" ? "₹ " + row.amount : null}
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            {/* Applied Weight Charges */}
                                            <div classamount='cell-inside-box'>
                                                <p className=''>
                                                    {row?.transaction_type == "d" ? ("₹ " + row.amount) : null}
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            {/* Excess Weight Charges */}
                                            <div className='cell-inside-box'>
                                                <p className=''>
                                                    ₹ {row.balance}
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            {/* Entered Weight and dimensions */}
                                            <div className='cell-inside-box'>
                                                <p className=''>
                                                    {row.description}
                                                </p>
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

export default PassbookTab;
