import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { Form, Card, Spinner, Col, Row } from 'react-bootstrap';
import { BASE_URL_CORE } from '../../../../../axios/config';
import { customErrorFunction } from '../../../../../customFunction/errorHandling';
import { toast } from 'react-toastify';
import { debounce } from 'lodash';
import './WhatsAppNotification.css';
import Manifested from '../../../../../assets/image/whatsapp/Manifested.png';
import Delivered from '../../../../../assets/image/whatsapp/Delivered.png';
import InTransit from '../../../../../assets/image/whatsapp/InTransit.png';
import PickedUp from '../../../../../assets/image/whatsapp/Pickedup.png';
import outForDelivery from '../../../../../assets/image/whatsapp/OutForDelivery.png';

// Static image mapping
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
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!authToken) {
                setError('Authorization token missing');
                return;
            }

            setLoading(true);
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
                    setShipmentStatuses(response?.data.map(status => ({
                        ...status,
                        status: Boolean(status.status) // Convert to boolean if necessary
                    })));
                }
            } catch (error) {
                customErrorFunction(error);
                setError('Failed to load shipment statuses');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [authToken]);

    const handleChangeStatus = async (e, id) => {
        const newStatus = e.target.checked;
        setShipmentStatuses(prevStatuses =>
            prevStatuses.map(item =>
                item.id === id ? { ...item, status: newStatus } : item
            )
        );
        const data = {
            id: id,
            is_enabled: newStatus,
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
                toast.success('Status updated successfully!');

                // Immutably update the state to ensure re-render
                setShipmentStatuses((prevStatuses) =>
                    prevStatuses.map((item) =>
                        item.id === id ? { ...item, status: newStatus } : item
                    )
                );
            }
        } catch (error) {
            customErrorFunction(error);
            setShipmentStatuses(prevStatuses =>
                prevStatuses.map(item =>
                    item.id === id ? { ...item, status: !newStatus } : item
                )
            );
        }
    }

    if (loading) {
        return <Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner>;
    }

    if (error) {
        return <div className="text-danger" role="alert">{error}</div>;
    }

    return (
        <div className="whatsapp-comm">
            <h4 className="my-3">WhatsApp Communication for Status Updates</h4>
            <Row>
                {shipmentStatuses?.map((item) => (
                    <Col key={item?.id} xs={12} md={6} lg={4} xl={3} className="mb-4">
                        <Card className="whatsapp-comm__card shadow-sm p-2">
                            {/* WhatsApp Chat Preview */}
                            <Card.Img
                                variant="top"
                                src={imageMap[item?.title]}
                                alt={`${item?.title} WhatsApp preview`}
                            />

                            <Card.Body>
                                <Card.Title>{item?.title}</Card.Title>
                                {/* Status Toggle */}
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
