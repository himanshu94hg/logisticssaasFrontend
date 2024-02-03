import React, { useEffect, useState } from 'react'
import SuccessZoneGraph from '../../../../../assets/image/SuccessZoneGraph.png'
import axios from 'axios';
import { Table } from 'react-bootstrap';

const MostViewedStatus = () => {
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
            <div className="box-shadow shadow-sm p10">
                <div className="row">
                    <div className="col">
                        <h4 className="title">Top 5 most viewed status</h4>
                    </div>
                    <div className="table-responsive">
                    {/* <Table hover className="table-ui">
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
                                    <td></td>
                                    <td></td>
                                </tr>
                            ))}
                        </tbody>
                    </Table> */}
                    <div class="p-18px">
                           <div class="text-center" style={{padding: "6rem"}}>
                              <p class="noDataHeader">No Data Available</p>
                              <img width="62" height="67" src="https://app.shiprocket.in/app/img/trackingpage/noData.png" alt=""/>
                           </div>
                        </div>
                </div>
                </div>
            </div>
        </>
    )
}

export default MostViewedStatus