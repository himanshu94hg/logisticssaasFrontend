import axios from 'axios';
import moment from 'moment';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LuUploadCloud } from "react-icons/lu";
import React, { useEffect, useState } from 'react';
import { BASE_URL_ORDER } from '../../../../../../../axios/config';
import LoaderScreen from '../../../../../../LoaderScreen/LoaderScreen';
import { customErrorFunction } from '../../../../../../../customFunction/errorHandling';

const BulkCreateOrder = () => {
    const [loader, setLoader] = useState(false)
    const [inputKey, setInputKey] = useState(0);
    const authToken = Cookies.get("access_token");
    const [bulkOrders, setBulkOrders] = useState([]);
    const [bulkOrdersStatus, setBulkOrdersStatus] = useState(false);
    const userData = useSelector(state => state?.paymentSectionReducer.sellerProfileCard);
    
    const handleFileUpload = async (event) => {
        setLoader(true)
        const formData = new FormData();
        formData.append('order_file', event.target.files[0]);
        formData.append('seller_id', userData?.id);
        try {
            const response = await axios.post(`${BASE_URL_ORDER}/orders-api/orders/order-bulk-upload/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${authToken}`
                }
            });
            if (response.status === 200) {
                const responseData = response.data;
                toast.success('Order file uploaded Successfully!');
                setBulkOrdersStatus(true);
                setLoader(false)
            }
        } catch (error) {
            customErrorFunction(error);
            setLoader(false)
        }
    };

    useEffect(() => {
        axios
            .get(`${BASE_URL_ORDER}/orders-api/orders/order-bulk-upload/`, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            })
            .then(response => {
                setBulkOrders(response.data.results);
            })
            .catch(error => {
                customErrorFunction(error);
            });
    }, [bulkOrdersStatus])

    const handleDownloadTemplate = () => {
        const templateUrl = 'shipease_bulk_order.xlsx';
        const tempAnchor = document.createElement('a');
        tempAnchor.setAttribute('download', 'shipease_bulk_order.xlsx');
        tempAnchor.setAttribute('href', templateUrl);
        tempAnchor.click();
        tempAnchor.remove();
    };

    const handleDownloadlinkTemplate = (fileLink) => {
        const templateUrl = fileLink;
        const tempAnchor = document.createElement('a');
        tempAnchor.setAttribute('download', 'shipease_bulk_order_uploaded.xlsx');
        tempAnchor.setAttribute('href', templateUrl);
        tempAnchor.click();
        tempAnchor.remove();
        console.log("hit")
    };

    const handleDownloadError = (fileLink) => {
        const templateUrl = fileLink;
        const tempAnchor = document.createElement('a');
        tempAnchor.setAttribute('download', 'shipease_bulk_order_error.xlsx');
        tempAnchor.setAttribute('href', templateUrl);
        tempAnchor.click();
        tempAnchor.remove();
        console.log("hit")
    };

    return (
        <>
            <div className='box-shadow shadow-sm p10 w-100 bulk-orders-page'>
                <section className='bulk-orders-head'>
                    <div className='d-flex gap-2 align-items-center justify-content-between'>
                        <h3>Import Bulk Orders</h3>
                        <button className='btn main-button' onClick={handleDownloadTemplate}>Download Template</button>
                    </div>
                    <p>Download the sample file and replace its data with your order data. Make sure all mandatory fields are filled. Save the file and upload it back.</p>
                </section>
                <section className='inputs-container mx-auto mb-3 bulk-import-input'>
                    <div className='mid-text-container'>
                        <input key={inputKey} type="file" accept=".xlsx,.csv" onChange={handleFileUpload} />
                        <LuUploadCloud className='font30 mb-3' />
                        <p>Drag And Drop to upload the file here.</p>
                        <p className='bo-or-text'>OR</p>
                        <p className='upload-click ml-5'>Click to Upload File</p>
                        {/* <p className='accepted-note'>Only csv, xls & xlsx file format will be accepted.</p> */}
                        <p className='accepted-note'>Only .xls & .xlsx file format will be accepted.</p>
                    </div>
                </section>
                <section className='bo-upload-data'>
                    <div className='d-flex justify-content-between align-items-center'>
                        <h4>Recent Uploads</h4>
                        <p>Last 10 days activity</p>
                    </div>
                    <div className="bulk-import-table">
                        <table className='w-100'>
                            <thead>
                                <tr>
                                    <th style={{ width: '40%' }}>File Name</th>
                                    <th style={{ width: '30%' }}>Date</th>
                                    <th style={{ width: '10%' }}>No. Of Orders</th>
                                    <th style={{ width: '10%' }}>Successful Orders</th>
                                    <th style={{ width: '10%' }}>Error Orders</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bulkOrders?.slice(0, 10)?.map((item) => {
                                    return (
                                        <tr>
                                            <td><Link className='anchor-order' title={item?.file_name} onClick={() => handleDownloadlinkTemplate(item?.original_file)}>{item?.file_name}</Link></td>
                                            <td>{moment(item?.created_at).format("DD MMM YYYY")} || {moment(item?.created_at).format("hh:mm A")}</td>
                                            <td>{item?.total_orders}</td>
                                            <td>{item?.success_orders}</td>
                                            <td><Link className='anchor-error' onClick={() => handleDownloadError(item?.failed_orders_file)}>{item?.failed_orders}</Link></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
            <LoaderScreen loading={loader} />
        </>
    );
};

export default BulkCreateOrder;
