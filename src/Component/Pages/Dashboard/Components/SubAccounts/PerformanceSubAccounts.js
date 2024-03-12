import React, { useState } from "react";

const PerformanceSubAccounts = () => {

    const courierPartner = [
        { counter_itme: 'Booked', one: 'X (Y%)' },
        { counter_itme: 'NDR', one: 'X (Y%)' },
        { counter_itme: 'RTO', one: 'X (Y%)' },
    ]

    const [selectedOption, setSelectedOption] = useState('Child One');

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <>
            <div className="box-shadow shadow-sm p10 subaccount-perf dashboard-table">
                <div className="d-flex justify-content-between align-items-center">
                    <h4 className="title">Performance Sub Accounts</h4>
                    <div>
                        <label className="d-flex flex-row align-items-center gap-2 font12" htmlFor="selectOption">Account
                            <select className="select-field font12" id="selectOption" value={selectedOption} onChange={handleSelectChange}>
                                <option value="Child One">Child One</option>
                                <option value="Child Two">Child Two</option>
                                <option value="Child Three">Child Three</option>
                            </select>
                        </label>
                    </div>
                </div>
                <div className="table-responsive">
                    <table className="custom-table w-100">
                        <thead>
                            <tr>
                                <th scope="col">{selectedOption}</th>
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
                    </table>
                </div>
            </div>
        </>
    )
}

export default PerformanceSubAccounts;
