import React from 'react'
import { LuUploadCloud } from "react-icons/lu";

const BulkCreateOrder = () => {

    const handleDownloadTemplate = () => {
        // Replace 'your_template_file_path' with the actual path to your template file
        const templateFilePath = './orders.csv';
        
        // Create an anchor element
        const downloadLink = document.createElement('a');
        
        // Set the href attribute to the file path
        downloadLink.href = templateFilePath;
        
        // Set the download attribute to specify the file name
        downloadLink.download = templateFilePath; // Change the file name as needed
        
        // Append the anchor element to the document
        document.body.appendChild(downloadLink);
        
        // Trigger a click event on the anchor element to initiate the download
        downloadLink.click();
        
        // Remove the anchor element from the document
        document.body.removeChild(downloadLink);
      };

    return (
        <>
            <div className=' box-shadow shadow-sm p10 w-100 bulk-orders-page'>
                <section className='bulk-orders-head'>
                    <div className='d-flex gap-2 align-items-center justify-content-between'>
                        <h3>Import Bulk Orders</h3>
                        <button className='btn main-button' onClick={handleDownloadTemplate}>Download Template</button>
                    </div>
                    <p>Download the sample file and replace its data with your order data. Make sure all mandatory fields are filled. Save the file and upload it back.</p>
                </section>
                <section className='inputs-container mx-auto mb-3 bulk-import-input'>
                    <input type="file" />
                    <div className='mid-text-container'>
                        <LuUploadCloud className='font30 mb-3'/>
                        <p>Drag And Drop to upload the files here.</p>
                        <h4 className='mx-4'>OR</h4>
                        <button className='btn main-button'>Browse and Upload</button>
                        <p className='mt-3'>Only csv, xls & xlsx file formal will be accepted.</p>
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
                                <th>Successfull Orders</th>
                                <th>Error Orders</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </section>

            </div>
        </>
    )
}

export default BulkCreateOrder
