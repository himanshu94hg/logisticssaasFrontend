import moment from 'moment';
import React, { useState, useEffect } from 'react';
import NoData from '../../../../common/noData';

const RechargeLogs = ({ billingCard, selectedRows, selectAll, setSelectAll, setSelectedRows, setBulkActionShow, billingRechargeCounterCard }) => {

    const [data, setData] = useState([]);

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

        if (selectedRows.length === data.length - 1 && isSelected) {
            setSelectAll(false);
        } else {
            setSelectAll(false);
        }
    };

    const calculateTotalAmount = (billingCard) => {
        const totalAmount = billingCard.reduce((total, item) => total + parseFloat(item.amount), 0);
        return totalAmount.toFixed(2);
    };

    return (
        <section className='position-relative'>
            <div className="position-relative">
                <div className="mb-3 billing-count-container">
                    <div className='box-shadow shadow-sm count-card'>
                        <p>Successful Recharge: <span>&#8377; {billingRechargeCounterCard?.successful_recharge || 0}</span></p>
                    </div>
                    <div className='box-shadow shadow-sm count-card'>
                        <p>Total Credit: <span>&#8377; {billingRechargeCounterCard?.total_credit || 0}</span></p>
                    </div>
                    <div className='box-shadow shadow-sm count-card'>
                        <p>Total Debit: <span>&#8377; {billingRechargeCounterCard?.total_debit || 0}</span></p>
                    </div>
                    <div className='box-shadow shadow-sm count-card'>
                        <p>Cashback: <span>&#8377; {billingRechargeCounterCard?.cashback || 0}</span> </p>
                    </div>
                    <div className='box-shadow shadow-sm count-card'>
                        <p>Referral: <span>&#8377; {billingRechargeCounterCard?.referral || 0}</span></p>
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
                                <th>Transaction Id</th>
                                <th>Amount</th>
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
                                            {/* Courier detail */}
                                            <div className='cell-inside-box'>
                                                <p className=''>
                                                    <span className=''>{`${moment(row?.datetime).format('DD MMM YYYY')} || ${moment(row?.datetime).format('h:mm A')}`}</span>
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            {/* AWB Assigned Date */}
                                            <div className='cell-inside-box'>
                                                <p className=''>
                                                    {row?.payment_gateway_order_id ?? "-"}
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            {/* Shipment Status */}
                                            <div className='cell-inside-box'>
                                                <p className=''>
                                                    ₹  {row?.amount}
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            {/* Applied Weight Charges */}
                                            <div className='cell-inside-box'>
                                                <p className=''>
                                                    {row?.description}
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

export default RechargeLogs;
