import moment from 'moment'
import { useSelector } from 'react-redux';
import { FaRegCopy } from 'react-icons/fa';
import NoData from '../../../../../common/noData';
import React, { useEffect, useState } from 'react'
import InfoIcon from '../../../../../common/Icons/InfoIcon'
import CustomTooltip from '../../../../../common/CustomTooltip/CustomTooltip';

const ShippingTableMIS = ({ setTotalItems, selectedRows, setSelectedRows, setBulkActionShow, selectAll, setSelectAll, setAwbNo, setOrderTracking, orderStatus, partnerList }) => {
    const [shipmentData, setShipmentData] = useState([]);
    const [copyText, setcopyText] = useState("Tracking Link")
    const { reportShipmentsData } = useSelector(state => state?.misSectionReducer)

    const handleCopy = (awb) => {
        const temp_url = `https://shipease.in/order-tracking/${awb}`
        navigator.clipboard.writeText(temp_url)
            .then(() => {
            })
            .catch(err => {
                console.error('Failed to copy text: ', err);
            });
    };

    useEffect(() => {
        if (reportShipmentsData && reportShipmentsData?.results !== null) {
            setShipmentData(reportShipmentsData?.results);
            setTotalItems(reportShipmentsData?.count)
        }
    }, [reportShipmentsData])

    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        if (!selectAll) {
            setSelectedRows(shipmentData?.map(row => row?.id));
            setBulkActionShow(true)
        } else {
            setSelectedRows([]);
            setBulkActionShow(false)
        }
    };

    const handleSelectRow = (orderId) => {
        const isSelected = selectedRows.includes(orderId);
        let updatedSelectedRows;
        if (isSelected) {
            updatedSelectedRows = selectedRows.filter(id => id !== orderId);
        } else {
            updatedSelectedRows = [...selectedRows, orderId];
        }
        setSelectedRows(updatedSelectedRows);
        if (updatedSelectedRows.length > 0) {
            setBulkActionShow(true);
        } else {
            setBulkActionShow(false);

        }
        if (updatedSelectedRows.length === shipmentData?.length - 1 && isSelected) {
            setSelectAll(false);
        } else {
            setSelectAll(false);
        }
    };
    const handleClickAWB = (orders) => {
        setOrderTracking(true)
        setAwbNo(orders)
    };

    return (
        <>
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
                        <th>NDR Reason</th>
                        <th>Package Details</th>
                        <th>Customer details</th>
                        <th>Tracking Detail</th>
                        <th>Status</th>
                    </tr>
                    <tr className="blank-row"><td></td></tr>
                </thead>
                <tbody>
                    {shipmentData?.length > 0 && shipmentData?.map((row, index) => (
                        <React.Fragment key={row.id}>
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
                                        <span className='ms-2'>{`${moment(row?.ndr_details?.raised_date).format('DD MMM YYYY')}`}</span>
                                    </div>
                                </td>
                                <td>
                                    <div className='cell-inside-box'>
                                       
                                    </div>
                                </td>
                                <td>
                                    <div className='cell-inside-box'>
                                        <p className='width-eclipse'>{row?.order_products?.product_name}</p>
                                        <p>Wt:  {(row?.dimension_detail?.weight / 1000).toFixed(2)} kg
                                            <span className='details-on-hover ms-2 align-middle'>
                                                <InfoIcon />
                                                <span style={{ width: '250px' }}>
                                                    {row?.order_products?.map((product, index) => (
                                                        <React.Fragment key={index}>
                                                            <strong>Product:</strong> {product?.product_name}<br />
                                                            <strong>SKU:</strong> {product?.sku}<br />
                                                            <strong>Qt.:</strong> {product?.quantity}<br />
                                                        </React.Fragment>
                                                    ))}
                                                </span>
                                            </span>
                                            <br />
                                            <span>LBH(cm): {row?.dimension_detail?.length} x {row?.dimension_detail?.breadth} x {row?.dimension_detail?.height}</span>
                                        </p>
                                    </div>
                                </td>
                                <td>
                                    <div className='cell-inside-box'>
                                        <p>{row?.shipping_detail?.recipient_name}</p>
                                        <p>{row?.shipping_detail?.mobile_number ?? null}
                                            <span className='details-on-hover ms-2'>
                                                <InfoIcon />
                                                <span style={{ width: '250px' }}>
                                                    {row?.shipping_detail?.address}, {row?.shipping_detail?.landmark}, {row?.shipping_detail?.city},{row?.shipping_detail?.state}, {row?.shipping_detail?.pincode}
                                                </span>
                                            </span>
                                        </p>
                                    </div>
                                </td>
                                <td>
                                    <div className='cell-inside-box shipping-details'>
                                        {row?.courier_partner && <img src={partnerList[row?.courier_partner]["image"]} alt='Partner' />}
                                        <div>
                                            <p className='details-on-hover anchor-awb' onClick={() => handleClickAWB(row?.awb_number)} >{row?.awb_number ?? ""} </p>
                                            <p className='text-capitalize'>{row.courier_partner && partnerList[row.courier_partner]["title"]}</p>
                                        </div>
                                        <CustomTooltip
                                            triggerComponent={<button className='btn copy-button p-0 ps-1' onClick={() => handleCopy(row?.awb_number)}><FaRegCopy /></button>}
                                            tooltipComponent={copyText}
                                            addClassName='copytext-tooltip'
                                        />
                                    </div>
                                </td>
                                <td className='align-middle status-box'>
                                    <p className='order-Status-box'> {row && row?.status?.split("_").join(" ")}</p>
                                </td>
                            </tr>
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
            {shipmentData?.length === 0 && <NoData />}

        </>
    )
}

export default ShippingTableMIS