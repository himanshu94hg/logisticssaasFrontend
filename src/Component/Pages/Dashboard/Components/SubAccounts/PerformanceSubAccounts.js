import React, { useEffect, useState } from "react";
import { BASE_URL_ORDER } from "../../../../../axios/config";
import { globalGetApiCallFunction } from "../../../../../customFunction/apicall";
import { customErrorFunction } from "../../../../../customFunction/errorHandling";

const PerformanceSubAccounts = ({ labeldata, activeTab }) => {
    const orderEndPoint = BASE_URL_ORDER
    const [selectedOption, setSelectedOption] = useState('0');
    const [data, setData] = useState([
        { status: "Booked", week1: 0, week2: 0, week3: 0, week4: 0, week5: 0 },
        { status: "NDR", week1: 0, week2: 0, week3: 0, week4: 0, week5: 0 },
        { status: "RTO", week1: 0, week2: 0, week3: 0, week4: 0, week5: 0 },
        { status: "Delivered", week1: 0, week2: 0, week3: 0, week4: 0, week5: 0 },
    ]);

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };

    useEffect(() => {
        let urlParams = `${orderEndPoint}/orders-api/dashboard/performance-sub-account/?sub_account_id=${selectedOption}`;
        const fetchData = async () => {
            try {
                const response = await globalGetApiCallFunction(urlParams);
                setData(response)
            } catch (error) {
                customErrorFunction(error)
            }
        };
        if (activeTab === "Sub Accounts") {
            fetchData();
        }
    }, [selectedOption]);


    return (
        <>
            <div className="box-shadow shadow-sm p10 subaccount-perf dashboard-table">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="title mb-0">Performance Sub Accounts</h4>
                    <div>
                        <label className="d-flex flex-row align-items-center gap-2 font12" htmlFor="selectOption">Account
                            <select className="select-field font12" id="selectOption" value={selectedOption} onChange={handleSelectChange}>
                                <option value="0">Select</option>
                                {labeldata && labeldata?.map((item) =>
                                    <option value={item?.value}>{item.label}</option>
                                )}
                            </select>
                        </label>
                    </div>
                </div>
                <div className="table-responsive">
                    <table className="custom-table w-100">
                        <thead>
                            <tr>
                                <th scope="col">Status</th>
                                <th scope="col">Week 1</th>
                                <th scope="col">Week 2</th>
                                <th scope="col">Week 3</th>
                                <th scope="col">Week 4</th>
                                <th scope="col">Week 5</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((item, index) => (
                                <tr className="text-nowrap" key={index}>
                                    <td>{item?.status}</td>
                                    <td>{item?.week1}</td>
                                    <td>{item?.week2}</td>
                                    <td>{item?.week3}</td>
                                    <td>{item?.week4}</td>
                                    <td>{item?.week5}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default PerformanceSubAccounts;
