import React, { useState, useEffect } from "react";
import axios from "axios";
import {HiMiniArrowTrendingUp} from 'react-icons/hi2';

const TopRTOCourier = () => {
    const [courierAllocation, setCourierAllocation] = useState([]);

    const requestData = {
        sellerId: "16",
        start: "2023-09-01",
        end: "2023-10-30",
    };

    useEffect(() => {
        axios
            .post(
                "https://www.shipease.in/api/microservices/dashboard/overview/courier-wise-allocation",
                requestData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((response) => {
                setCourierAllocation(response.data.data);
                if (response.data.data) {
                    console.log(response.data.data);
                }
            })
            .catch((error) => {
                console.error(error);
                setCourierAllocation([]);
            });
    }, []);
    const totalValue = courierAllocation.reduce((total, courier) => total + courier.value, 0);

    return (

        <div className="box-shadow shadow-sm p10">
            <h4 className="title">Top RTO - Courier</h4>
            <ul className="list-ui list-ui-point mt20">
                {courierAllocation.map((courier) => (
                    <li className="">
                        <p className="font12 bold-600 mb-10">
                            <img src={`https://shipease.in/${courier.courier_partner.image}`} className="inline-block" alt={courier.courier_partner.title} style={{ width: '35px', height: '35px', borderRadius: '50%' }} />
                            &nbsp;&nbsp;&nbsp;{courier.courier_partner.title}
                        </p>
                        <img src="graph-red.png" className="inline-block" style={{ width: '60px' }} />

                        <p className="font12 bold-600 mb-10"><HiMiniArrowTrendingUp className=" font15 text-green" /> {courier.value}

                            <span className="text-gray-light ">({((courier.value / totalValue) * 100).toFixed(2)}%)</span>
                        </p>
                    </li>
                ))}
            </ul>
        </div>

    );
}

export default TopRTOCourier