import { Modal, Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import shopify from "../../../../../../assets/image/integration/shopify.jpg"
import WCLogo from '../../../../../../assets/image/integration/WCLogo.png'
import Magento from '../../../../../../assets/image/integration/magento.png'
import OpenCart from '../../../../../../assets/image/integration/OpenCart.png'
import Amazon from '../../../../../../assets/image/integration/AmazonLogo.png'
import Flipkart from '../../../../../../assets/image/integration/Flipkart.png'
import Manual from '../../../../../../assets/image/integration/Manual.png'
import moment from 'moment';
import { faEye, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { customErrorFunction } from '../../../../../../customFunction/errorHandling';
import { BASE_URL_CORE } from '../../../../../../axios/config';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';


const ChannelsView = ({ channelData,setReset }) => {
    const [show, setShow] = useState(false);
    const [backDrop, setBackDrop] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const handleClose = () => setShow(false);
    let authToken = Cookies.get("access_token")


    const handleShow = (row) => {
        setSelectedRow(row);
        setShow(true);
    };



    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`${BASE_URL_CORE}/core-api/channel/delete-channel/${id}/`, {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                },
            });
            if (response.status === 200 || response.status === 201) {
                // setEmployeeUser(response?.data)
                setReset(new Date())
                toast.success("Channel deleted successfully!")
            }

        } catch (error) {
            customErrorFunction(error)
        }
    }
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
                                                    row?.channel === "shopify" ? shopify : row?.channel === "amazon_direct" ? Amazon : row?.channel === "amazon" ? Amazon : row?.channel === "woocommerce" ? WCLogo : Manual
                                                }
                                                    alt={`${row?.channel_name} logo`} width={50} height={50} className='integration-logo me-2' />
                                                <span className='text-capitalize'>{row?.channel.split("_").join(" ")}</span>
                                            </td>
                                            <td>
                                                {`${moment(row?.last_executed).format('DD MMM YYYY')} || ${moment(row?.last_executed).format('h:mm:ss A')}`}
                                            </td>
                                            <td>
                                                {"Active"}
                                            </td>
                                            <td>
                                                {"Active"}
                                            </td>
                                            <td>
                                                <div className='d-flex gap-2 align-items-center flex-row'>
                                                    <button title='Delete Integration' className='btn action-delete' onClick={() => handleDelete(row?.id)}><FontAwesomeIcon icon={faTrashCan} /></button>
                                                    <button className='btn action-edit' onClick={() => handleShow(row)}><FontAwesomeIcon icon={faEye} /></button>
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
        <Modal show={show} onHide={handleClose} size="md" className='confirmation-modal view-integration-modal'>
            <Modal.Header closeButton>
                <Modal.Title>Channel Information</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <table className="table table-striped">
                    <tbody>
                        <tr>
                            <th>Store Name</th>
                            <td>{selectedRow?.channel_name ? selectedRow?.channel_name : "NA"}</td>
                        </tr>
                        <tr>
                            <th>Store URL</th>
                            <td>{selectedRow?.channel_configuration?.store_url ? selectedRow?.channel_configuration?.store_url : "NA"}</td>
                        </tr>
                        {selectedRow?.channel === "woocommerce" &&
                            <tr>
                                <th>API Key</th>
                                <td>{selectedRow?.channel_configuration?.woo_consumer_key ? selectedRow?.channel_configuration?.woo_consumer_key : "NA"}</td>
                            </tr>
                        }
                        {
                            selectedRow?.channel === "shopify" &&
                            <tr>
                                <th>{selectedRow?.channel_name} Password</th>
                                <td>{selectedRow?.channel_configuration?.password ? selectedRow?.channel_configuration?.password : "NA"}</td>
                            </tr>
                        }
                        {
                            selectedRow?.channel === "amazon" &&
                            <tr>
                                <th>{selectedRow?.channel} Refresh Token</th>
                                <td>{selectedRow?.channel_configuration?.amazon_refresh_token ? selectedRow?.channel_configuration?.amazon_refresh_token : "NA"}</td>
                            </tr>
                        }

                        {selectedRow?.channel === "woocommerce" &&
                            <tr>
                                <th> Shared Secret</th>
                                <td>{selectedRow?.channel_configuration?.woo_consumer_secret ? selectedRow?.channel_configuration?.woo_consumer_secret : "NA"}</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </Modal.Body>
            <Modal.Footer>
                <div className='d-flex gap-2'>
                    <button className="btn cancel-button" onClick={handleClose}>
                        Close
                    </button>
                </div>
            </Modal.Footer>
        </Modal>
    );
};
