import React, { useState, useEffect } from 'react';
import SearchIcon from '../../../../../assets/image/icons/search-icon.png'
import axios from "axios";

const ActivityLogsMIS = () => {

    const [selectAll, setSelectAll] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [orders, setAllOrders] = useState([]);

    useEffect(() => {
        axios
            .get('http://dev.shipease.in:8088/order/v1/allorderdetail/') // Replace with your API endpoint
            .then(response => {
                console.log('Data is data:', response.data);
                setAllOrders(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);


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

    return (
        <section className='position-relative'>
            <div className="position-relative">
                <div className="box-shadow shadow-sm p7 mb-3 filter-container">
                    <div className="search-container">
                        <label>
                            <input type="text" placeholder="" />
                            <button>
                                <img src={SearchIcon} alt="Search" />
                            </button>
                        </label>

                    </div>
                    <div className='button-container'>

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
                                <th style={{ width: '25%' }}>Order Details</th>
                                <th>Customer details</th>
                                <th>Package Details</th>
                                <th>Payment</th>
                                <th>Pickup Address</th>
                                <th>Shipping Details</th>
                                <th>Status</th>
                                <th>Action</th>

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
                                            </div>
                                        </td>
                                        <td>
                                            {/* customer detail */}
                                            <div className='cell-inside-box'>

                                            </div>
                                        </td>
                                        <td>
                                            {/* package  details */}
                                            <div className='cell-inside-box'>

                                            </div>
                                        </td>
                                        <td>
                                            {/* payment section here */}
                                            <div className='cell-inside-box'>
                                            </div>
                                        </td>
                                        <td className='align-middle'>
                                            {/* pickup adress */}
                                            <div className='cell-inside-box'>

                                            </div>
                                        </td>
                                        <td>
                                            {/* shiping section here */}
                                            <div className='cell-inside-box'>
                                            </div>
                                        </td>
                                    </tr>
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default ActivityLogsMIS;
