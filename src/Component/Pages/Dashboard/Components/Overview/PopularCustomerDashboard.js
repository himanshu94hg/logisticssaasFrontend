import React, { useState, useEffect } from "react";
import axios from "axios";
import {BiSolidBadgeCheck} from "react-icons/bi";

function PopularCustomerDashboard() {
    const [popularCustomer, setPopularCustomer] = useState([]);
    const requestData = {
        "sellerId" : "16",
        "start" : "2023-10-01",
        "end" : "2023-10-30"
    };
    useEffect(()=>{
        axios.post(
            "https://www.shipease.in/api/microservices/dashboard/overview/most-popular-customers",
            requestData,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        ).then((response)=>{
            console.log(response);
            setPopularCustomer(response.data.data.slice(0, 5));
        }).catch((error)=>{
            console.error(error);
        })
    },[])
    return (
        <div className="box-shadow shadow-sm p10">
            <h4 className="title">Most Popular Customers</h4>
            {popularCustomer.map((customer) => (
                <ul className="d-flex justify-content-between align-items-center p0 list-none">
                    <li>
                        <div className="d-flex align-items-top justify-content-center">
                            <div className="me-2">
                              <span className="avatar">
                                <img src="4.jpg" className="inline-block" />
                              </span>
                            </div>
                            <div>
                            <p className="mb-0 bold-600 font13 mr-5" style={{width:'150px'}}>{customer?.s_customer_name}</p>
                            <span className="font13 text-gray">
                                {customer?.total} Purchases{" "}
                                <BiSolidBadgeCheck className=" font15 text-purple" />{" "}
                            </span>
                            </div>
                        </div>
                    </li>
                    <li className="w50">
                        <div className="d-flex justify-content-between">
                            <p className="font12 bold-600 mb-10">5 Start</p>
                            <p className="font12 bold-600 mb-10">
                                <span className="text-gray-light ">(100%)</span>
                            </p>
                        </div>

                        <div className="progress mb-15">
                            <div
                                className="progress-bar bg-blue w50"
                                role="progressbar"
                                aria-valuenow="50"
                                aria-valuemin="0"
                                aria-valuemax="100"
                            ></div>
                        </div>
                    </li>
                </ul>
            ))}
        </div>
    );
}

export default PopularCustomerDashboard;