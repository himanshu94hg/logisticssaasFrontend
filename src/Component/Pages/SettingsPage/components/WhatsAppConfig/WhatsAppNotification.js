import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { BASE_URL_CORE } from '../../../../../axios/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { customErrorFunction } from '../../../../../customFunction/errorHandling';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';


const WhatsAppNotification = () => {
    let authToken = Cookies.get("access_token")
    const [currentEdit, setCurrentEdit] = useState({});
    const [currentPreview, setCurrentPreview] = useState({});
    const [showEditModal, setShowEditModal] = useState(false);
    const handleCloseEditModal = () => setShowEditModal(false);
    const [shipmentStatuses, setShipmentStatuses] = useState([]);
    const [showPreviewModal, setShowPreviewModal] = useState(false);
    const handleClosePreviewModal = () => setShowPreviewModal(false);
    const [refresh, setRefresh] = useState(null)

    const handlePreviewClick = (status, preview) => {
        setCurrentPreview({
            title: status,
            message: preview
        });
        setShowPreviewModal(true);
    };

    const handleEditClick = (status, edit, index) => {
        setCurrentEdit({
            title: status,
            message: edit,
            index: index
        });
        setShowEditModal(true);
    };

    const handleEditChange = (e) => {
        setCurrentEdit({
            ...currentEdit,
            message: e.target.value
        });
    };

    const handleSaveEdit = () => {
        const updatedStatuses = [...shipmentStatuses];
        updatedStatuses[currentEdit.index].edit = currentEdit.message;
        setShipmentStatuses(updatedStatuses);
        setShowEditModal(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${BASE_URL_CORE}/core-api/shipease-admin/seller-whatsapp-message/`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${authToken}`,
                        },
                    }
                );
                if (response.status === 200) {
                    setShipmentStatuses(response?.data)
                }
            } catch (error) {
                customErrorFunction(error);
            }
        }
        fetchData()
    }, [refresh])


    const handleChangeStatus = async (e, id) => {
        const data = {
            id: id,
            is_enabled: e.target.checked
        };

        try {
            const response = await axios.post(
                `${BASE_URL_CORE}/core-api/shipease-admin/seller-whatsapp-message/`,
                data,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );
            if (response.status === 200) {
                toast.success("Status updated successfully!");
                setRefresh(new Date())
            }
        } catch (error) {
            customErrorFunction(error);
        }
    };



    return (
        <>
            <div className='whatsapp-comm'>
                <h4 className='my-3'>WhatsApp Communication for Status Updates</h4>
                <div className='table-container'>
                    <table className="w-100">
                        <thead>
                            <tr className='table-row box-shadow'>
                                <th>Title</th>
                                <th>Status</th>
                            </tr>
                            <tr className="blank-row"><td></td></tr>
                        </thead>
                        <tbody>
                            {shipmentStatuses?.map((item, index) => (
                                <React.Fragment key={index}>
                                    {index > 0 && <tr className="blank-row"><td></td></tr>}
                                    <tr className='table-row box-shadow'>
                                        <td>{item?.title} Status</td>

                                        <td>
                                            <Form.Check
                                                type="switch"
                                                title={item?.status}
                                                checked={item?.status}
                                                onChange={(e) => handleChangeStatus(e, item?.id)}
                                            />
                                        </td>
                                    </tr>
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Preview Modal */}
            <Modal show={showPreviewModal} onHide={handleClosePreviewModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Message Preview - {currentPreview.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {currentPreview.message}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClosePreviewModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Edit Modal */}
            <Modal show={showEditModal} onHide={handleCloseEditModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Message - {currentEdit.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Edit the message:</Form.Label>
                        <Form.Control
                            type="text"
                            value={currentEdit.message}
                            onChange={handleEditChange}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEditModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSaveEdit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default WhatsAppNotification;
