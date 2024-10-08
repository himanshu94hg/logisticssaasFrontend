import axios from 'axios';
import Cookies from 'js-cookie';
import './WhatsAppNotification.css';
import { toast } from 'react-toastify';
import React, { useEffect, useState } from 'react';
import { Form, Card, Col, Row } from 'react-bootstrap';
import { BASE_URL_CORE } from '../../../../../axios/config';
import PickedUp from '../../../../../assets/image/whatsapp/Pickedup.png';
import Delivered from '../../../../../assets/image/whatsapp/Delivered.png';
import InTransit from '../../../../../assets/image/whatsapp/InTransit.png';
import Manifested from '../../../../../assets/image/whatsapp/Manifested.png';
import { customErrorFunction } from '../../../../../customFunction/errorHandling';
import outForDelivery from '../../../../../assets/image/whatsapp/OutForDelivery.png';

const imageMap = {
    "Manifest": Manifested,
    "Picked Up": PickedUp,
    "In Transit": InTransit,
    "Out For Delivery": outForDelivery,
    "Delivered": Delivered,
};

const WhatsAppNotification = () => {
    let authToken = Cookies.get("access_token");
    const [shipmentStatuses, setShipmentStatuses] = useState([]);

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
                    setShipmentStatuses(response?.data);
                }
            } catch (error) {
                customErrorFunction(error);
            }
        };
        fetchData();
    }, []);

    const handleChangeStatus = async (e, id) => {
        const newStatus = e.target.checked;
        setShipmentStatuses(prevStatuses =>
            prevStatuses.map(item =>
                item.id === id ? { ...item, status: newStatus } : item
            )
        );
        try {
            const response = await axios.post(`${BASE_URL_CORE}/core-api/shipease-admin/seller-whatsapp-message/`,
                {
                    id: id,
                    is_enabled: newStatus,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );
            if (response.status === 200) {
                toast.success('Status updated successfully!');
            }
        } catch (error) {
            customErrorFunction(error);
        }
    }

    return (
        <div className="whatsapp-comm">
            <h4 className="my-3">WhatsApp Communication for Status Updates</h4>
            <Row>
                {shipmentStatuses?.map((item) => (
                    <Col key={item?.id} xs={12} md={6} lg={4} xl={3} className="mb-4">
                        <Card className="whatsapp-comm__card shadow-sm p-2">
                            <Card.Img
                                variant="top"
                                src={imageMap[item?.title]}
                                alt={`${item?.title} WhatsApp preview`}
                            />
                            <Card.Body>
                                <Card.Title>{item?.title}</Card.Title>
                                <Form.Check
                                    type="switch"
                                    title={item?.status}
                                    aria-label={`${item?.title} status toggle`}
                                    checked={Boolean(item?.status)}
                                    onChange={(e) => handleChangeStatus(e, item?.id)}
                                    label={item?.status ? 'Enabled' : 'Disabled'}
                                />
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default WhatsAppNotification;
