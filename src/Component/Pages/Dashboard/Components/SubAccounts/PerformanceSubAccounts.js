import React, { useEffect, useState } from "react";
import { globalGetApiCallFunction } from "../../../../../customFunction/apicall";
import { BASE_URL_ORDER } from "../../../../../axios/config";

const PerformanceSubAccounts = ({ labeldata, activeTab }) => {
    const orderEndPoint = BASE_URL_ORDER

    const courierPartner = [
        { counter_itme: 'Booked', one: 'X (Y%)' },
        { counter_itme: 'NDR', one: 'X (Y%)' },
        { counter_itme: 'RTO', one: 'X (Y%)' },
        { counter_itme: 'Delivered', one: 'X (Y%)' },
    ]

    const [data, setData] = useState([]);
    const [selectedOption, setSelectedOption] = useState('0');

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
                                <th scope="col">{selectedOption}</th>
                                {data?.labels?.map((item)=>
                                <th scope="col">{item}</th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {courierPartner.map((item, index) => (
                                <tr className="text-nowrap" key={index}>
                                    <td>{item?.counter_itme}</td>
                                    <td>{item?.one}</td>
                                    <td>{item?.one}</td>
                                    <td>{item?.one}</td>
                                    <td>{item?.one}</td>
                                    <td>{item?.one}</td>
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
