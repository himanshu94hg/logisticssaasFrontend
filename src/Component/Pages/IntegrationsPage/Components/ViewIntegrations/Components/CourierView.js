import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const CourierView = () => {
    const [integrations, setIntegrations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    let navigate = useNavigate();

    const courierRoutes = {
        bluedart: '/couriers-integration/bluedart-integration',
        dtdc: '/couriers-integration/dtdc-integration',
        ekart: '/couriers-integration/ekart-integration',
        shadowfax: '/couriers-integration/shadowfax-integration',
        xpressbees: '/couriers-integration/xpressbees-integration',
        delhivery: '/couriers-integration/delhivery-integration',
    };


    useEffect(() => {
        const fetchCourierIntegrations = async () => {
            try {
                setLoading(true);
                setError('');

                const token = Cookies.get('access_token'); // Adjust as per your actual cookie name

                const res = await axios.get('https://app.shipease.in/core-api/courier/get-courier/', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                setIntegrations(res.data?.results || []);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch courier integrations.');
            } finally {
                setLoading(false);
            }
        };

        fetchCourierIntegrations();
    }, []);

    const handleEdit = (courierPartner, courierId) => {
        const route = courierRoutes[courierPartner.toLowerCase()];
        if (route) {
            navigate(`${route}?courier_id=${courierId}`);
        } else {
            alert('Integration page not defined for this courier.');
        }
    };

    return (
        <div className='view-integration-page'>
            {loading && <p className='position-absolute'></p>}
            {error && <p className="form-message error">{error}</p>}

            <div className="position-relative">
                <div className='table-container'>
                    <table className="w-100">
                        <thead className="sticky-header">
                            <tr className="table-row box-shadow">
                                <th>Courier Name</th>
                                <th>Key 1</th>
                                <th>Key 2</th>
                                <th>Key 3</th>
                                <th>Status</th>
                                <th>Activation Date</th>
                                <th>Action</th>
                            </tr>
                            <tr className="blank-row"><td></td></tr>
                        </thead>
                        <tbody>
                            {integrations.map((row, index) => (
                                <React.Fragment key={`${row.courier_partner}-${index}`}>
                                    {index > 0 && <tr className="blank-row"><td colSpan="8"></td></tr>}
                                    <tr className='table-row box-shadow'>
                                        <td>{row?.courier_partner}</td>
                                        <td>{row?.key1}</td>
                                        <td>{row?.key2}</td>
                                        <td>{row?.key3}</td>
                                        <td>{row?.is_active ? 'Active' : 'Inactive'}</td>
                                        <td>{row?.created_at}</td>
                                        <td>
                                            <button
                                                onClick={() => handleEdit(row.courier_partner, row.id)}
                                                className='btn main-button'
                                            >
                                                Edit
                                            </button>
                                        </td>
                                    </tr>
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CourierView;
