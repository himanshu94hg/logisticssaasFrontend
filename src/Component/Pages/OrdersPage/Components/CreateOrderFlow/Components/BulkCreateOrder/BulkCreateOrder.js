import axios from 'axios';
import moment from 'moment';
import Cookies from 'js-cookie';
import {  toast } from 'react-toastify';
import { LuUploadCloud } from "react-icons/lu";
import React, { useEffect, useState } from 'react';

const BulkCreateOrder = () => {
    const [bulkOrders, setBulkOrders] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [bulkOrdersStatus, setBulkOrdersStatus] = useState(false);


    const authToken = Cookies.get("access_token");
    const sellerId = Cookies.get("user_id");

    const handleFileUpload = async (event) => {
        const formData = new FormData();
        formData.append('order_file', event.target.files[0]);
        formData.append('seller_id', sellerId);
        try {
            const response = await axios.post('http://65.2.38.87:8083/orders-api/orders/order-bulk-upload/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${authToken}`
                }
            });
            console.log(response.status,'This is response data status')
            if (response.status === 200) {
                const responseData = response.data;
                toast.success('Order creteed Successfully');
                setBulkOrdersStatus(true);
            } else {
                const errorData = response.data;
                console.error('API Error:', errorData);
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    useEffect(() => {
        axios
            .get(`http://65.2.38.87:8083/orders-api/orders/order-bulk-upload/`, {
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
        const templateUrl = 'public/shipease_bulk_order.xlsx';
        const tempAnchor = document.createElement('a');
        tempAnchor.setAttribute('download', 'shipease_bulk_order.xlsx');
        tempAnchor.setAttribute('href', templateUrl);
        tempAnchor.click();
        tempAnchor.remove();
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
                    <input type="file" onChange={handleFileUpload} />
                    <LuUploadCloud className='font30 mb-3' />
                    <p>Drag And Drop to upload the files here.</p>
                    <h4 className='mx-4'>OR</h4>
                    <button className='btn main-button-outline upload-click ml-5'>Click to Upload File</button>
                    <p className='mt-3'>Only csv, xls & xlsx file format will be accepted.</p>
                </div>
            </section>
            <section className='mt-5'>
                <h4>Recent Uploads</h4>
                <table>
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
                                    <td>{item?.file_name}</td>
                                    <td>{moment(item?.created_at).format("DD MMM YYYY")} || {moment(item?.created_at).format("hh:mm A")}</td>
                                    <td>{item?.total_orders}</td>
                                    <td>{item?.success_orders}</td>
                                    <td>{item?.failed_orders}</td>
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
