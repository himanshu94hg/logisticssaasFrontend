import axios from 'axios';
import moment from 'moment';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { LuUploadCloud } from "react-icons/lu";
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL_ORDER } from '../../../../../../../axios/config';

const BulkCreateOrder = () => {
    const [bulkOrders, setBulkOrders] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [bulkOrdersStatus, setBulkOrdersStatus] = useState(false);
    const [inputKey, setInputKey] = useState(0); // Add input key state

    const authToken = Cookies.get("access_token");
    const sellerId = Cookies.get("user_id");

    const handleFileUpload = async (event) => {
        const formData = new FormData();
        formData.append('order_file', event.target.files[0]);
        formData.append('seller_id', sellerId);
        try {
            const response = await axios.post(`${BASE_URL_ORDER}/orders-api/orders/order-bulk-upload/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${authToken}`
                }
            });
            if (response.status === 200) {
                const responseData = response.data;
                toast.success('Bulk Order Created Successfully');
                setBulkOrdersStatus(true);
            } else {
                const errorData = response.data;
                // toast.error(error?.response?.data?.detail);
            }
        } catch (error) {
            toast.error(error?.response?.data?.detail);
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
                console.error('Error:', error);
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
                    <p>Drag And Drop to upload the files here.</p>
                    <p className='bo-or-text'>OR</p>
                    <p className='upload-click ml-5'>Click to Upload File</p>
                    <p className='accepted-note'>Only csv, xls & xlsx file format will be accepted.</p>
                </div>
            </section>
            <section className='bo-upload-data'>
                <div className='d-flex justify-content-between align-items-center'>
                    <h4>Recent Uploads</h4>
                    <p>Last 10 days activity</p>
                </div>
                <table className='w-100'>
                    <thead>
                        <tr>
                            <th>File Name</th>
                            <th>Date</th>
                            <th>No. Of Orders</th>
                            <th>Successful Orders</th>
                            <th>Error Orders</th>
                        </tr>
                    </thead>
                    <thead>
                        {bulkOrders?.slice(0, 10)?.map((item) => {
                            return (
                                <tr>
                                    <td><Link className='anchor-order' onClick={() => handleDownloadlinkTemplate(item?.original_file)}>{item?.file_name}</Link></td>
                                    <td>{moment(item?.created_at).format("DD MMM YYYY")} || {moment(item?.created_at).format("hh:mm A")}</td>
                                    <td>{item?.total_orders}</td>
                                    <td>{item?.success_orders}</td>
                                    <td><Link className='anchor-error' onClick={() => handleDownloadError(item?.failed_orders_file)}>{item?.failed_orders}</Link></td>
                                </tr>
                            )
                        })}
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default BulkCreateOrder;
