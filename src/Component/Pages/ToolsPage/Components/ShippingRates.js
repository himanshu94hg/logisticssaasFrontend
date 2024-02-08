import React, { useState } from 'react';
import Select from 'react-select';
import '../ToolsPage.css';

const ShippingRates = () => {
    const [selectedCourier, setSelectedCourier] = useState(null);

    const shippingData = [
        { value: 'Shadowfax', courierPartner: 'Shadowfax', zoneA: '$5', zoneB: '$6', zoneC: '$7', zoneD: '$8', zoneE: '$9', codCharges: '$10', codMaintenance: '2%' },
        { value: 'Delhivery', courierPartner: 'Delhivery', zoneA: '$6', zoneB: '$7', zoneC: '$8', zoneD: '$9', zoneE: '$10', codCharges: '$11', codMaintenance: '3%' },
        { value: 'Xpressbees A', courierPartner: 'Xpressbees A', zoneA: '$7', zoneB: '$8', zoneC: '$9', zoneD: '$10', zoneE: '$11', codCharges: '$12', codMaintenance: '4%' },
        // Add more data as needed
    ];

    const handleCourierChange = (selectedOption) => {
        setSelectedCourier(selectedOption);
    };

    const shippingSelectData = [
        { value: 'all', label: 'All Couriers' }, // Add an "All Couriers" option
        { value: 'Shadowfax', label: 'Shadowfax' },
        { value: 'Delhivery', label: 'Delhivery' },
        { value: 'Xpressbees A', label: 'Xpressbees A' },
        // Add more options as needed
    ];

    return (
        <section className='position-relative'>
            <div className="position-relative">
                <h3>Shipping Rates</h3>
                <div className="box-shadow shadow-sm p7 mb-3 filter-container">
                    <div className="search-container">
                        <label>
                            <Select
                                value={selectedCourier}
                                onChange={handleCourierChange}
                                options={shippingSelectData}
                                placeholder="Select Courier"
                                isSearchable
                            />
                        </label>
                    </div>
                    <div className='button-container'></div>
                </div>
                <div className='table-container'>
                    <table className="mt-0 w-100">
                        <thead className="sticky-header">
                            <tr className="table-row box-shadow">
                                <th style={{ width: '23%' }}>Courier Partner</th>
                                <th style={{ width: '11%' }}>ZONE A</th>
                                <th style={{ width: '11%' }}>ZONE B</th>
                                <th style={{ width: '11%' }}>ZONE C</th>
                                <th style={{ width: '11%' }}>ZONE D</th>
                                <th style={{ width: '11%' }}>ZONE E</th>
                                <th style={{ width: '11%' }}>COD Charges</th>
                                <th style={{ width: '11%' }}>COD Maintenance(%)</th>
                            </tr>
                            <tr className="blank-row"><td></td></tr>
                        </thead>
                        <tbody>
                            {selectedCourier && selectedCourier.value !== '' ? (
                                selectedCourier.value === 'all' ? (
                                    // Render data for all couriers
                                    shippingData.map((data, index) => (
                                        <React.Fragment key={index}>
                                            <tr className='table-row box-shadow'>
                                                <td>{data.courierPartner}</td>
                                                <td>{data.zoneA}</td>
                                                <td>{data.zoneB}</td>
                                                <td>{data.zoneC}</td>
                                                <td>{data.zoneD}</td>
                                                <td>{data.zoneE}</td>
                                                <td>{data.codCharges}</td>
                                                <td>{data.codMaintenance}</td>
                                            </tr>
                                        </React.Fragment>
                                    ))
                                ) : (
                                    // Render data for selected courier
                                    shippingData
                                        .filter(data => data.value === selectedCourier.value)
                                        .map((data, index) => (
                                            <React.Fragment key={index}>
                                                <tr className='table-row box-shadow'>
                                                    <td>{data.courierPartner}</td>
                                                    <td>{data.zoneA}</td>
                                                    <td>{data.zoneB}</td>
                                                    <td>{data.zoneC}</td>
                                                    <td>{data.zoneD}</td>
                                                    <td>{data.zoneE}</td>
                                                    <td>{data.codCharges}</td>
                                                    <td>{data.codMaintenance}</td>
                                                </tr>
                                            </React.Fragment>
                                        ))
                                )
                            ) : (
                                // Render data for selected courier
                                shippingData.map((data, index) => (
                                        <React.Fragment key={index}>
                                            <tr className='table-row box-shadow'>
                                                <td>{data.courierPartner}</td>
                                                <td>{data.zoneA}</td>
                                                <td>{data.zoneB}</td>
                                                <td>{data.zoneC}</td>
                                                <td>{data.zoneD}</td>
                                                <td>{data.zoneE}</td>
                                                <td>{data.codCharges}</td>
                                                <td>{data.codMaintenance}</td>
                                            </tr>
                                        </React.Fragment>
                                    ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </section >
    );
};

export default ShippingRates;
