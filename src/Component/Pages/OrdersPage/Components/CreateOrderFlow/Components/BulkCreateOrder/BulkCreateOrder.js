import React, { useState } from 'react';
import { LuUploadCloud } from "react-icons/lu";
import axios from 'axios';
import Swal from "sweetalert2";

const BulkCreateOrder = () => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileUpload = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleImport = async () => {
        if (selectedFile) {
            const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA3OTkyNDk2LCJpYXQiOjE3MDczODc2OTYsImp0aSI6IjEzODE0YWE2ZjE2ZTQyNzk5NzhhNzAwZmY0MTM1YTZhIiwidXNlcl9pZCI6Mn0.neIQZnSs3vkyMxm0QrfIOpu_RTjDNz5j3vF-OPNNXTA";
            const formData = new FormData();
            formData.append('order_file', selectedFile);
            formData.append('seller_id', '1');

            try {
                const response = await axios.post('http://65.2.38.87:8080/orders-api/orders/order-bulk-upload/', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${authToken}`
                    }
                });
                if (response.status === 200) {
                    const responseData = response.data;
                    console.log('API Response:', responseData);
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Order Created  successfully!',
                        confirmButtonText: 'OK'
                    });
                } else {
                    const errorData = response.data;
                    console.error('API Error:', errorData);
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Failed to add Orders. Please try again later.',
                        confirmButtonText: 'OK'
                    });
                }
            } catch (error) {
                console.error('Error uploading file:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Failed to add Orders. Please try again later.',
                    confirmButtonText: 'OK'
                });
            }
        }
    };

    const handleDownloadTemplate = () => {
        console.log('Template download functionality goes here');
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
                    <LuUploadCloud className='font30 mb-3'/>
                    <p>Drag And Drop to upload the files here.</p>
                    <h4 className='mx-4'>OR</h4>
                    <p className='mt-3'>Only csv, xls & xlsx file format will be accepted.</p>
                </div>
            </section>
            <button className='btn main-button ml-5' onClick={handleImport}>Upload File</button>
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
                    <tbody>
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default BulkCreateOrder;
