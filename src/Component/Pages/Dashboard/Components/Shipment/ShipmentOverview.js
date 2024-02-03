import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";

const ShipmentOverview = () => {

    const [courierPartner, setCourierPartner] = useState([]);
    useEffect(() => {
        axios.get('http://65.2.38.87:8088/api/v1/shipment-overview/')
            .then(response => {
                setCourierPartner(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <>
            <div className="box-shadow shadow-sm p10 top-selling-page">
                <div className="d-flex justify-content-between align-items-center">
                    <h4 className="title">Shipment Overview by Courier</h4>
                </div>
                <div className="table-responsive">
                    <Table hover className="table-ui">
                        <thead>
                            <tr>
                                <th scope="col" style={{ width: '30%' }}>Courier Partner</th>
                                <th scope="col">Allocation Number</th>
                                <th scope="col" style={{ width: '20%' }}>Average TAT</th>
                                <th scope="col" style={{ width: '20%' }}>Average Shipment</th>
                                <th scope="col" style={{ width: '15%' }}>Total RTO %</th>
                                <th scope="col" style={{ width: '15%' }}>Total NDR %</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courierPartner.map((partner, index) => (
                                <tr className="text-nowrap" key={index}>
                                    <td>{partner.courier_partner}</td>
                                    <td>{partner.total_awb_count}</td>
                                    <td>Glossary</td>
                                    <td>
                                        <span className="text-green">
                                            In Stock
                                        </span>
                                    </td>
                                    <td>{/* Your RTO % value */}</td>
                                    <td>{/* Your NDR % value */}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </>
    )
}

export default ShipmentOverview;
