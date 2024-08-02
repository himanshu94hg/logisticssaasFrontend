import moment from 'moment';
import React, { useState } from 'react';
import { FaRegCopy } from 'react-icons/fa';
import NoData from '../../../../common/noData';
import CustomTooltip from '../../../../common/CustomTooltip/CustomTooltip';

const PassbookTab = ({ billingCard, selectedRows, setAwbNo, setOrderTracking, selectAll, setSelectAll, setSelectedRows, setBulkActionShow, billingPassbookCounterCard, partnerList }) => {
    const [copyText, setcopyText] = useState("Tracking Link")

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
        if (selectedRows.length === billingCard.length - 1 && isSelected) {
            setSelectAll(false);
        } else {
            setSelectAll(false);
        }
    };

    const handleClickAWB = (awb) => {
        setOrderTracking(true)
        setAwbNo(awb)
    };

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
                <div className="mb-3 billing-count-container">
                    <div className='box-shadow shadow-sm count-card'>
                        <p>Current Usable Balance:     <span>&#8377; {billingPassbookCounterCard?.usable_balance || 0}</span></p>
                    </div>
                    <div className='box-shadow shadow-sm count-card'>
                        <p>Balance On Hold:     <span>&#8377; {billingPassbookCounterCard?.on_hold || 0}</span></p>
                    </div>
                    <div className='box-shadow shadow-sm count-card'>
                        <p>Total Balance:     <span>&#8377; {billingPassbookCounterCard?.total_balance || 0}</span></p>
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
                                            <div className='cell-inside-box'>
                                                <p className=''>
                                                    <span>{`${moment(row?.datetime).format('DD MMM YYYY')}`}</span>
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="d-flex">
                                                <div className='cell-inside-box'>
                                                    <p className='details-on-hover anchor-awb' onClick={(e) => handleClickAWB(row?.order_detail?.awb_number)}>
                                                        {row?.order_detail?.awb_number}
                                                    </p>
                                                </div>
                                                {row?.order_detail?.awb_number &&
                                                    <CustomTooltip
                                                        triggerComponent={<button className='btn copy-button p-0 ps-1' onClick={() => handleCopy(row?.order_detail?.awb_number)}><FaRegCopy /></button>}
                                                        tooltipComponent={copyText}
                                                        addClassName='copytext-tooltip'
                                                    />
                                                }
                                            </div>
                                        </td>
                                        <td>
                                            <div className='cell-inside-box shipping-details'>
                                                {row?.order_detail?.courier_partner && <img src={partnerList[row?.order_detail?.courier_partner]["image"]} alt='Partner' />}
                                                <div>
                                                    <p className='mt-1 cursor-pointer text-capitalize'>
                                                        {row?.order_detail?.courier_partner && partnerList[row?.order_detail?.courier_partner]["title"]}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='cell-inside-box'>
                                                <p className=''>
                                                    {row?.transaction_type == "c" ? "₹ " + row.amount : null}
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            <div classamount='cell-inside-box'>
                                                <p className=''>
                                                    {row?.transaction_type == "d" ? ("₹ " + row.amount) : null}
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='cell-inside-box'>
                                                <p className=''>
                                                    ₹ {row.balance}
                                                </p>
                                            </div>
                                        </td>
                                        <td>
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
                    {billingCard?.length === 0 && <NoData />}
                </div>
            </div>
        </section>
    );
};

export default PassbookTab;
