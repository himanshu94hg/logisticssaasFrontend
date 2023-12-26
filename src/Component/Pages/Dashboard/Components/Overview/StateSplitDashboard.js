import React, { useState, useEffect } from "react";
import axios from "axios";

function StateSplitDashboard() {
    const [stateAllocation, setStateAllocation] = useState([]);

    const requestData = {
        sellerId: "16",
        start: "2023-09-01",
        end: "2023-10-30",
    };

    useEffect(() => {
        axios
            .post(
                "https://www.shipease.in/api/microservices/dashboard/overview/state-split-wise",
                requestData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((response) => {
                setStateAllocation(response.data.data);
                if (response.data.data) {
                    console.log(response.data.data);
                }
            })
            .catch((error) => {
                console.error(error);
                setStateAllocation([]);
            });
    }, []);

    const totalCount = stateAllocation.reduce((total, state) => total + state.total, 0);

    return (

        <div className="box-shadow shadow-sm p10 state-wise-card">
            <div className="card-heading">
                <h4 className="title">State Wise Split</h4>
                <p className="export-report">Export Report</p>
            </div>
            <div className="card-count">
                <h5 className="total-count">{totalCount} <span className="font12 text-gray">Sales</span></h5>
                <p className="font12 text-gray">Compared To Last Month</p>
            </div>
            <div className="d-flex justify-content-end">
                <p></p>
            <ul className="list-ui">
                {stateAllocation.map((state) => (
                    <li className="">
                        <p className="font12 bold-600 mb-10">
                        </p>
                        <p className="font12 bold-600 mb-10">
                            {state.s_state}&nbsp;&nbsp;&nbsp;&nbsp;
                            {state.total}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
        </div>

    );
}

export default StateSplitDashboard;