import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Table from "react-bootstrap/Table";

const ShipmentOverview = () => {
   const { overviewCourier  } = useSelector(state => state?.dashboardShipmentReducer)
   const [courierPartner, setCourierPartner] = useState([]);
    

   useEffect(() => {
    if (overviewCourier) {
        setCourierPartner(overviewCourier);
    }
}, [overviewCourier]);


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
                            { courierPartner.map((Partner ,index) => (
                                <tr key={index}>
                                    <td style={{ maxWidth: '2rem', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{Partner.courier_partner}</td>
                                    <td>{Partner.allocation_number}</td>
                                    <td>{Partner.average_tat}</td>
                                    <td>{Partner.average_shipment}</td>
                                    <td>{Partner.total_rto}</td>
                                    <td>{Partner.total_ndr}</td>

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
