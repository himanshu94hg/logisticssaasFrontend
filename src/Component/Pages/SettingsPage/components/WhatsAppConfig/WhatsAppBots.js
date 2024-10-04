import React, { useState } from 'react';
import { Form, Card, Col, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import './WhatsAppNotification.css';
import Manifested from '../../../../../assets/image/whatsapp/Manifested.png';
import Delivered from '../../../../../assets/image/whatsapp/Delivered.png';
import InTransit from '../../../../../assets/image/whatsapp/InTransit.png';
import PickedUp from '../../../../../assets/image/whatsapp/Pickedup.png';
import outForDelivery from '../../../../../assets/image/whatsapp/OutForDelivery.png';

// Static image mapping
const imageMap = {
    "Create Order": Manifested,
    "Book Order": PickedUp,
    "Track Order": InTransit,
    "NDR Flow": outForDelivery,
};

// Dummy data for shipment statuses
const dummyShipmentStatuses = [
    { id: 1, title: "Create Order", status: true },
    { id: 2, title: "Book Order", status: false },
    { id: 3, title: "Track Order", status: true },
    { id: 4, title: "NDR Flow", status: false },
];

const WhatsAppBots = () => {
    const [shipmentStatuses, setShipmentStatuses] = useState(dummyShipmentStatuses);

    const handleChangeStatus = (e, id) => {
        const newStatus = e.target.checked;
        setShipmentStatuses(prevStatuses =>
            prevStatuses.map(item =>
                item.id === id ? { ...item, status: newStatus } : item
            )
        );
        toast.success('Status updated successfully!');
    }

    return (
        <div className="whatsapp-comm">
            <h4 className="my-3">WhatsApp Bots</h4>
            <Row>
                {shipmentStatuses.map((item) => (
                    <Col key={item.id} xs={12} md={6} lg={4} xl={3} className="mb-4">
                        <Card className="whatsapp-comm__card shadow-sm p-2">
                            {/* WhatsApp Chat Preview */}
                            <Card.Img
                                variant="top"
                                src={imageMap[item.title]}
                                alt={`${item.title} WhatsApp preview`}
                            />
                            <Card.Body>
                                <Card.Title>{item.title}</Card.Title>
                                {/* Status Toggle */}
                                <Form.Check
                                    type="switch"
                                    aria-label={`${item.title} status toggle`}
                                    checked={Boolean(item.status)}
                                    onChange={(e) => handleChangeStatus(e, item.id)}
                                    label={item.status ? 'Enabled' : 'Disabled'}
                                />
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default WhatsAppBots;
