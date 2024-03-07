import React, { useState } from "react";
import Table from "react-bootstrap/Table";

const ShipmentOverview = () => {
    const [courierPartner] = useState([
        {
            courier_partner: "Courier Partner 1",
            total_awb_count: 100,
            average_tat: 12,
            average_shipment: 25,
            total_rto: 5,
            total_ndr: 5,
        },
        {
            courier_partner: "Courier Partner 1",
            total_awb_count: 100,
            average_tat: 12,
            average_shipment: 25,
            total_rto: 5,
            total_ndr: 5,
        },
        {
            courier_partner: "Courier Partner 1",
            total_awb_count: 100,
            average_tat: 12,
            average_shipment: 25,
            total_rto: 5,
            total_ndr: 5,
        },
        {
            courier_partner: "Courier Partner 1",
            total_awb_count: 100,
            average_tat: 12,
            average_shipment: 25,
            total_rto: 5,
            total_ndr: 5,
        },

    ]);

    return (
        <>
            <div className="box-shadow shadow-sm p10 top-selling-page dashboard-table">
                <div className="d-flex justify-content-between align-items-center">
                    <h4 className="title">Shipment Overview by Courier</h4>
                </div>
                <div className="table-responsive">
                    <table className="custom-table w-100">
                        <thead>
                            <tr>
                                <th scope="col">Courier Partner</th>
                                <th scope="col">Allocation Number</th>
                                <th scope="col">Average TAT</th>
                                <th scope="col">Average Shipment</th>
                                <th scope="col">Total RTO %</th>
                                <th scope="col">Total NDR %</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courierPartner.map((partner, index) => (
                                <tr key={index}>
                                    <td style={{ maxWidth: '2rem', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{partner.courier_partner}</td>
                                    <td>{partner.total_awb_count}</td>
                                    <td>{partner.average_tat}</td>
                                    <td>{partner.average_shipment}</td>
                                    <td>{partner.total_rto}</td>
                                    <td>{partner.total_ndr}</td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default ShipmentOverview;
