import React, { useEffect, useState } from 'react';
import './RtoPredictionModal.css';
import axios from "axios";
import RiskGauge from './RiskGauge';
import RiskListIcon from './RiskListIcon';


const RtoPredictionModal = ({ orderId, riskScore, token, rtoPop, setLoader }) => {

    const [riskData, setRiskData] = useState(null);
    const [error, setError] = useState(null);

    const [overlay, setoverlay] = useState(true)


    useEffect(() => {
        if (!orderId || !token) return;

        const fetchRtoRisk = async () => {
            setLoader(true);
            try {
                const response = await axios.get(
                    `https://app.shipease.in/core-api/shipping/get-rto-score/`,
                    {
                        params: { order_id: orderId },
                        headers: {
                            Authorization: `Bearer ${token}`, // ← Auth here
                        },
                    }
                );
                setRiskData(response.data);
                console.log(response.data, 'riskData')
            } catch (err) {
                setError("Failed to fetch risk data.");
            } finally {
                setLoader(false);
                setoverlay(false);
            }
        };

        fetchRtoRisk();
    }, [orderId, token]);


    const [showGauge, setShowGauge] = React.useState(false);

    useEffect(() => {
        if (rtoPop) {
            // Wait a short moment for modal to fully open, then show gauge
            const timer = setTimeout(() => setShowGauge(true), 100);
            return () => clearTimeout(timer);
        } else {
            setShowGauge(false);
        }
    }, [rtoPop]);

    return (
        <div className="rto-modal-overlay">
            <div className="rto-modal">
                <div className="rto-modal-header">
                    <h3>RTO Prediction Report for Order #{riskData?.customer_order_number || orderId}</h3>
                </div>
                {!overlay &&
                    <>
                        <div className="rto-risk-overview">
                            <div>
                                <p><strong>Risk Score:</strong> <span style={{ fontSize: '1.2rem' }}>{riskData?.order_score}%</span></p>
                                <p className={`rto-risk-level`}>
                                    Risk Level: <span className={`${riskData?.order_risk}`}>{riskData?.order_risk}</span>
                                </p>
                            </div>
                            {
                                showGauge &&
                                <RiskGauge riskLevel={riskData?.order_risk} percentage={riskData?.order_score} />
                            }
                        </div>
                        {
                            riskData?.mobile_number?.error &&
                            <div className="rto-risk-section">
                                <h4>Contact Number Quality</h4>
                                <p><strong>Contact Provided:</strong> {riskData?.mobile_number?.value}</p>
                                {
                                    riskData?.mobile_number?.required_error &&
                                    <p className='risk-point'><RiskListIcon /> {riskData?.mobile_number?.required_error}</p>
                                }
                                {
                                    riskData?.mobile_number?.length_error &&
                                    <p className='risk-point'><RiskListIcon /> {riskData?.mobile_number?.length_error}</p>
                                }
                                {
                                    riskData?.mobile_number?.startswith_error &&
                                    <p className='risk-point'><RiskListIcon /> {riskData?.mobile_number?.startswith_error}</p>
                                }
                                {
                                    riskData?.mobile_number?.pattern_error &&
                                    <p className='risk-point'><RiskListIcon /> {riskData?.mobile_number?.pattern_error}</p>
                                }
                            </div>
                        }

                        {riskData?.address?.error &&
                            <div className="rto-risk-section">
                                <h4>Address Validation</h4>
                                <p><strong>Address Provided:</strong> {riskData?.address?.value}</p>
                                {
                                    riskData?.address?.address_required_error &&
                                    <p className='risk-point'><RiskListIcon /> {riskData?.address?.address_required_error}</p>
                                }
                                {
                                    riskData?.address?.address_length_error &&
                                    <p className='risk-point'><RiskListIcon /> {riskData?.address?.address_length_error}</p>
                                }
                                {
                                    riskData?.address?.landmark_required_error &&
                                    <p className='risk-point'><RiskListIcon /> {riskData?.address?.landmark_required_error}</p>
                                }
                                {
                                    riskData?.address?.landmark_length_error &&
                                    <p className='risk-point'><RiskListIcon /> {riskData?.address?.landmark_length_error}</p>
                                }
                                {
                                    riskData?.address?.state_required_error &&
                                    <p className='risk-point'><RiskListIcon /> {riskData?.address?.state_required_error}</p>
                                }
                                {
                                    riskData?.address?.state_length_error &&
                                    <p className='risk-point'><RiskListIcon /> {riskData?.address?.state_length_error}</p>
                                }
                                {
                                    riskData?.address?.city_required_error &&
                                    <p className='risk-point'><RiskListIcon /> {riskData?.address?.city_required_error}</p>
                                }
                                {
                                    riskData?.address?.city_length_error &&
                                    <p className='risk-point'><RiskListIcon /> {riskData?.address?.city_length_error}</p>
                                }
                            </div>
                        }



                        <div className="rto-risk-section">
                            <h4>Pincode-Based Risk</h4>
                            {
                                !riskData?.pincode?.required_error &&
                                <p> <strong>Pincode:</strong> {riskData?.pincode?.value}</p>
                            }
                            <p><strong>Region Status:</strong> Marked <span className={`rto-risk-tag ${riskData?.pincode?.risk}`}>{riskData?.pincode?.risk}</span></p>
                            <p>Reason: {riskData?.pincode?.rto_percentage_error}</p>
                        </div>
                        {
                            riskData?.customer_previous_order?.error &&
                            <div className="rto-risk-section">
                                <h4>Customer History Based Risk</h4>
                                <p> <strong>Total Order(s):</strong> {riskData?.customer_previous_order?.value}</p>
                                <p> <strong>Delivered Order(s):</strong> {riskData?.customer_previous_order?.delivered_count}</p>
                                <p> <strong>RTO Order(s):</strong> {riskData?.customer_previous_order?.rto_count}</p>
                                <p><strong>Risk Status:</strong> Marked <span className={`rto-risk-tag ${riskData?.customer_previous_order?.risk}`}>{riskData?.customer_previous_order?.risk}</span></p>
                                <p>Reason: {riskData?.customer_previous_order?.rto_percentage_error}</p>
                            </div>
                        }

                        <div className="rto-risk-section">
                            <h4>Score Calculation</h4>
                            <table className="rto-score-table">
                                <thead>
                                    <tr>
                                        <th>Factor</th>
                                        <th>Weightage</th>
                                        <th>Status</th>
                                        <th>Score Impact</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Phone Number</td>
                                        <td>{riskData?.mobile_number?.weightage}%</td>
                                        <td>{riskData?.mobile_number?.risk}</td>
                                        <td>+ {riskData?.mobile_number?.weightage - riskData?.mobile_number?.score}%</td>
                                    </tr>
                                    <tr>
                                        <td>Address Quality</td>
                                        <td>{riskData?.address?.weightage}%</td>
                                        <td>{riskData?.address?.risk}</td>
                                        <td>+ {riskData?.address?.weightage - riskData?.address?.score}%</td>
                                    </tr>
                                    <tr>
                                        <td>Pincode RTO History</td>
                                        <td>{riskData?.pincode?.weightage}%</td>
                                        <td>{riskData?.pincode?.risk}</td>
                                        <td>+ {riskData?.pincode?.weightage - riskData?.pincode?.score}%</td>
                                    </tr>
                                    <tr>
                                        <td>Customer RTO History</td>
                                        <td>{riskData?.customer_previous_order?.weightage}%</td>
                                        <td>{riskData?.customer_previous_order?.risk}</td>
                                        <td>+ {riskData?.customer_previous_order?.weightage - riskData?.customer_previous_order?.score}%</td>
                                    </tr>

                                    <tr className="rto-total-row">
                                        <td colSpan="3"><strong>Total</strong></td>
                                        <td><strong>{100 - (riskData?.mobile_number?.score + riskData?.address?.score + riskData?.pincode?.score + riskData?.customer_previous_order?.score)}%</strong></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <p className="rto-note">
                            <b>Note:</b> The RTO risk is predicted using internal models trained on delivery data and return trends.
                        </p>
                    </>}
            </div>
        </div>
    );
};

export default RtoPredictionModal;
