import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MoreFiltersPanel from '../MoreFiltersPanel/MoreFiltersPanel';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import SearchIcon from '../../../../../assets/image/icons/search-icon.png'


const Manifest = ({ orders, handleSearch, setBulkActionShow }) => {
    const dispatch = useDispatch();
    const [selectAll, setSelectAll] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [MoreFilters, setMoreFilters] = useState(false);
    const [backDrop, setBackDrop] = useState(false);
    const [BulkActions, setBulkActions] = useState(false)
    const [exportButtonClick, setExportButtonClick] = useState(false)
    const exportCard = useSelector(state => state?.exportSectionReducer?.exportCard)


    const handleExport = () => {
        setExportButtonClick(true);
        const requestData = {
            "order_tab": {
                "type": "manifest",
                "subtype": ""
            },
            "order_id": `${selectedRows.join(',')}`,
            "courier": "",
            "awb_number": "",
            "min_awb_assign_date": "",
            "max_awb_assign_date": "",
            "status": "",
            "order_type": "",
            "customer_order_number": "",
            "channel": "",
            "min_invoice_amount": "",
            "max_invoice_amount": "",
            "warehouse_id": "",
            "product_name": "",
            "delivery_address": "",
            "min_weight": "",
            "max_weight": "",
            "min_product_qty": "",
            "max_product_qty": "",
            "rto_status": false,
            "global_type": "",
            "payment_type": ""
        };
        dispatch({ type: "EXPORT_DATA_ACTION", payload: requestData });
    };

    useEffect(() => {
        if (exportButtonClick) {
            var FileSaver = require('file-saver');
            var blob = new Blob([exportCard], { type: 'application/ms-excel' });
            FileSaver.saveAs(blob, `${"Manifest"}.xlsx`);
            setExportButtonClick(false);
        }
    }, [exportCard]);

    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        if (!selectAll) {
            setSelectedRows(orders.map(row => row?.id));
        } else {
            setSelectedRows([]);
        }
    };
    const handleSelectRow = (orderId) => {
        const isSelected = selectedRows.includes(orderId);
        setBulkActions(true)
        console.log(BulkActions)
        if (isSelected) {
            setSelectedRows(selectedRows.filter(id => id !== orderId));
        } else {
            setSelectedRows([...selectedRows, orderId]);
        }
        if (selectedRows.length === orders.length - 1 && isSelected) {
            setSelectAll(false);
        } else {
            setSelectAll(false);
        }
    };

    const handleSidePanel = () => {
        setMoreFilters(true);
        setBackDrop(true)
    }

    const CloseSidePanel = () => {
        setMoreFilters(false);
        setBackDrop(false)
    }

    return (
        <section className='position-relative'>
            <div className="position-relative">
                <div className="box-shadow shadow-sm p7 mb-3 filter-container">
                    <div className="search-container">
                        <div className='d-flex'>
                            <label>
                                <input type="search" placeholder="Search for AWB | Order ID | Mobile Number | Email | SKU | Pickup ID" onChange={(e) => handleSearch(e.target.value)} />
                                <button>
                                    <img src={SearchIcon} alt="Search" />
                                </button>
                            </label>
                            <button className='btn main-button ms-2' onClick={handleSidePanel}>More Filters</button>
                        </div>
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
                        <button className='btn main-button' onClick={() => handleExport()}>Export</button>
                        <div className='action-options bulk-actions ms-2'>
                            <div className='btn main-button'>
                                <span className='me-2'>Bulk Actions</span><FontAwesomeIcon icon={faEllipsisVertical} />
                            </div>
                            <div className='action-list'>
                                <ul>
                                    <li>Download Label</li>
                                    <li>Download invoice</li>
                                    <li>Reassign</li>
                                    <li><hr /></li>
                                    <li>Bulk Cancel</li>
                                </ul>
                            </div>
                        </div>
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
                                <th style={{ width: '24%' }}>Manifest Id</th>
                                <th style={{ width: '12.5%' }}>Created</th>
                                <th style={{ width: '16%' }}>Created By</th>
                                <th style={{ width: '8%' }}>Courier</th>
                                <th style={{ width: '12.5%' }}>Number of Order</th>
                                <th style={{ width: '10.5%' }}>Pickup Reference Number</th>
                                <th style={{ width: '6%' }}>Status</th>
                                <th style={{ width: '6%' }}>Download</th>

                            </tr>
                            <tr className="blank-row"><td></td></tr>
                        </thead>
                        <tbody>
                            {orders?.map((row, index) => (
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
                                            <div className='cell-inside-box'>
                                                <p>{row?.awb_number}</p>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='cell-inside-box'>
                                                <p>{moment(row?.created_at).format("YYYY-MM-DD")}</p>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='cell-inside-box'>
                                                <p className='width-eclipse'>{row?.courier_partner}</p>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='cell-inside-box'>
                                                <p className='order-Status-box mt-1'>{row.courier_partner}</p>
                                            </div>
                                        </td>
                                        <td className='align-middle'>
                                            <td className='align-middle'>
                                                <div className='cell-inside-box'>
                                                    <p>{row?.id}</p>
                                                </div>
                                            </td>
                                        </td>
                                        <td>
                                            <div className='cell-inside-box'>
                                                <p className=''>{row.awb_number} </p>
                                            </div>
                                        </td>
                                        <td className='align-middle'>
                                            <p className='order-Status-box'>{row?.status}</p>
                                        </td>
                                        <td className='align-middle'>
                                            <div className='d-flex align-items-center gap-3'>
                                                <button className='btn main-button'> Invoice</button>
                                                <button className='btn main-button'> Label</button>
                                                <button className='btn main-button'> Manifest</button>
                                            </div>
                                        </td>
                                    </tr>
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
                <MoreFiltersPanel MoreFilters={MoreFilters} CloseSidePanel={CloseSidePanel} />
                <div className={`backdrop ${backDrop ? 'd-block' : 'd-none'}`}></div>
            </div>
        </section>
    );
};

export default Manifest;