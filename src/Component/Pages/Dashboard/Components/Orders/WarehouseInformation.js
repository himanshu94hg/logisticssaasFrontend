import React, { useState, useEffect } from "react";
import axios from "axios";
import IndiaMap from '../../../../../assets/image/IndiaMap.png';

const WarehouseInformation = () => {
    const [stateAllocation, setStateAllocation] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/v1/state-wise-order/')
            .then(response => {
                setStateAllocation(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div className="box-shadow shadow-sm p10 state-wise-card">
            <div className="card-heading">
                <h4 className="title">Warehouse Information</h4>
                <p className="export-report">Export Report</p>
            </div>
            <div className="d-flex">
                <img src={IndiaMap} style={{ width: '60%' }} alt="India Map" />
                <ul className="list-ui">
                    {stateAllocation.map((state, index) => (
                        <li key={index} className="">
                            <p className="font12 bold-600 mb-10">
                                {state.p_state}&nbsp;&nbsp;&nbsp;&nbsp;
                                {state.total_orders}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default WarehouseInformation;
