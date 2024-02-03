import React, { useState } from "react";
import Table from "react-bootstrap/Table";

const PerformanceRefAccounts = () => {

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
            <div className="box-shadow shadow-sm p10 top-selling-page">
                <div className="d-flex justify-content-between align-items-center">
                    <h4 className="title">Performance Referral Accounts</h4>
                    <div>
                        <label className="me-2 font12" htmlFor="selectOption">Account</label>
                        <select className="font12" id="selectOption" value={selectedOption} onChange={handleSelectChange}>
                            <option value="Child One">Child One</option>
                            <option value="Child Two">Child Two</option>
                            <option value="Child Three">Child Three</option>
                        </select>
                    </div>
                </div>
                <div className="table-responsive">
                    <Table hover className="table-ui">
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
                    </Table>
                </div>
            </div>
        </>
    )
}

export default PerformanceRefAccounts;
