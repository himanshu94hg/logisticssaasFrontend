import { faEye, faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';

const WhatsAppNotification = () => {
    const [shipmentStatuses, setShipmentStatuses] = useState([
        { status: 'Packed', preview: 'This is the preview for Packed status.', edit: 'Edit packed status' },
        { status: 'Shipped', preview: 'This is the preview for Shipped status.', edit: 'Edit shipped status' },
        { status: 'Out For Delivery', preview: 'This is the preview for Out For Delivery status.', edit: 'Edit out for delivery status' },
        { status: 'Arriving Early', preview: 'This is the preview for Arriving Early status.', edit: 'Edit arriving early status' },
        { status: 'Delivery Delayed', preview: 'This is the preview for Delivery Delayed status.', edit: 'Edit delivery delayed status' },
        { status: 'Delivered', preview: 'This is the preview for Delivered status.', edit: 'Edit delivered status' },
        { status: 'Picked Up', preview: 'This is the preview for Picked Up status.', edit: 'Edit picked up status' }
    ]);

    const [showPreviewModal, setShowPreviewModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentPreview, setCurrentPreview] = useState({});
    const [currentEdit, setCurrentEdit] = useState({});

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

    const handleClosePreviewModal = () => setShowPreviewModal(false);
    const handleCloseEditModal = () => setShowEditModal(false);

    return (
        <>
            <div>
                <h4 className='my-3'>WhatsApp Communication for Status Updates</h4>
                <div className='table-container'>
                    <table className="w-100">
                        <thead>
                            <tr className='table-row box-shadow'>
                                <th>Shipment Status</th>
                                <th>Preview</th>
                                <th>Edit</th>
                                <th>Select</th>
                            </tr>
                            <tr className="blank-row"><td></td></tr>
                        </thead>
                        <tbody>
                            {shipmentStatuses.map((status, index) => (
                                <React.Fragment key={index}>
                                    {index > 0 && <tr className="blank-row"><td></td></tr>}
                                    <tr className='table-row box-shadow'>
                                        <td>{status.status}</td>
                                        <td>
                                            <button
                                                className='btn'
                                                title={status.preview}
                                                onClick={() => handlePreviewClick(status.status, status.preview)}
                                            >
                                                <FontAwesomeIcon icon={faEye} />
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                className='btn'
                                                title={status.edit}
                                                onClick={() => handleEditClick(status.status, status.edit, index)}
                                            >
                                                <FontAwesomeIcon icon={faPenToSquare} />
                                            </button>
                                        </td>
                                        <td>
                                            <Form.Check
                                                type="switch"
                                                id={`custom-switch-${index}`}
                                                title={`Enable ${status.status} status`}
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
