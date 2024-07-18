import { Modal, Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import shopify from "../../../../../../assets/image/integration/shopify.jpg"
import WCLogo from '../../../../../../assets/image/integration/WCLogo.png'
import Magento from '../../../../../../assets/image/integration/magento.png'
import OpenCart from '../../../../../../assets/image/integration/OpenCart.png'
import Amazon from '../../../../../../assets/image/integration/Amazon.png'
import Flipkart from '../../../../../../assets/image/integration/Flipkart.png'
import Manual from '../../../../../../assets/image/integration/Manual.png'


const ChannelsView = ({ channelData }) => {
    const [show, setShow] = useState(false);
    const [backDrop, setBackDrop] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

    const handleShow = (row) => {
        setSelectedRow(row);
        setShow(true);
    };

    const handleClose = () => setShow(false);

    return (
        <>
            <div className='view-integration-page'>
                <div className="position-relative">
                    <div className='table-container'>
                        <table className="w-100">
                            <thead className="sticky-header">
                                <tr className="table-row box-shadow">
                                    <th>Store Name/Channel ID</th>
                                    <th>Sales Channel</th>
                                    <th>Last Sync</th>
                                    <th>Connection Status</th>
                                    <th>Channel Status</th>
                                    <th>Action</th>
                                </tr>
                                <tr className="blank-row"><td></td></tr>
                            </thead>
                            <tbody>
                                {channelData?.map((row, index) => (
                                    <React.Fragment key={row?.id}>
                                        {index > 0 && <tr className="blank-row"><td colSpan="6"></td></tr>}
                                        <tr className='table-row box-shadow'>
                                            <td>
                                                <strong>{row?.channel_name}</strong><br />
                                            </td>
                                            <td>
                                                <img src={
                                                    row?.channel === "shopify" ? shopify : row?.channel === "amazon_direct" ? Amazon : ""
                                                }
                                                    alt={`${row?.channel_name} logo`} width={50} height={50} className='integration-logo me-2' />
                                                {row?.channel}
                                            </td>
                                            <td>
                                                NA
                                            </td>
                                            <td>
                                                {"Active"}
                                            </td>
                                            <td>
                                                {"Active"}
                                            </td>
                                            <td>
                                                <div className='cell-inside-box'>
                                                    <button className='btn main-button' onClick={() => handleShow(row)}>View</button>
                                                </div>
                                            </td>
                                        </tr>
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className={`backdrop ${backDrop ? 'd-block' : 'd-none'}`}></div>
                    <Preview show={show} handleClose={handleClose} selectedRow={selectedRow} />
                </div>
            </div>
        </>
    );
}

export default ChannelsView;

const Preview = ({ show, handleClose, selectedRow }) => {
    return (
        <Modal show={show} onHide={handleClose} size="md">
            <Modal.Header closeButton>
                <Modal.Title>Channel Information</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <table className="table table-striped">
                    <tbody>
                        <tr>
                            <th>Store Name</th>
                            <td>{selectedRow?.channel_name}</td>
                        </tr>
                        <tr>
                            <th>Store URL</th>
                            <td>{selectedRow?.channel_configuration?.store_url}</td>
                        </tr>
                        <tr>
                            <th>API Key</th>
                            <td>{selectedRow?.channel_configuration?.api_key}</td>
                        </tr>
                        <tr>
                            <th>Shopify Password</th>
                            <td>{selectedRow?.channel_configuration?.password}</td>
                        </tr>
                        <tr>
                            <th>Shopify Shared Secret</th>
                            <td>{selectedRow?.channel_configuration?.shared_secret}</td>
                        </tr>
                    </tbody>
                </table>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};
