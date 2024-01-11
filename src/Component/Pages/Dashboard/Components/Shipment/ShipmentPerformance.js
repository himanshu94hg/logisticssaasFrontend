import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";

const ShipmentPerformance = () => {

    // const [courierPartner, setCourierPartner] = useState([]);
    // useEffect(() => {
    //     axios.get('http://35.154.133.143/api/v1/shipment-overview/')
    //         .then(response => {
    //             setCourierPartner(response.data);
    //         })
    //         .catch(error => {
    //             console.error('Error fetching data:', error);
    //         });
    // }, []);

    const courierPartner = [
        { counter_itme: 'FAT(First Attempt TAT)', one: 'X (Y%)' },
        { counter_itme: 'FAD(First Attempt Delivery)', one: 'X (Y%)' },
        { counter_itme: 'SAD(Second Attempt Delivery)', one: 'X (Y%)' },
        { counter_itme: 'TAD(Third Attempt Delivery)', one: 'X (Y%)' },
        { counter_itme: 'TD(Total Delivery)', one: 'X (Y%)' },
    ]

    return (
        <>
            <div className="box-shadow shadow-sm p10 top-selling-page">
                <div className="d-flex justify-content-between align-items-center">
                    <h4 className="title">Performance</h4>
                </div>
                <div className="table-responsive">
                    <Table hover className="table-ui">
                        <thead>
                            <tr>
                                <th scope="col"></th>
                                <th scope="col">Week 1</th>
                                <th scope="col">Week 2</th>
                                <th scope="col">Week 3</th>
                                <th scope="col">Week 4</th>
                                <th scope="col">Week 5</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courierPartner.map((item, index) => (
                                <tr className="text-nowrap" key={index}>
                                    <td>{item.counter_itme}</td>
                                    <td>{item.one}</td>
                                    <td>{item.one}</td>
                                    <td>{item.one}</td>
                                    <td>{item.one}</td>
                                    <td>{item.one}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </>
    )
}

export default ShipmentPerformance;
