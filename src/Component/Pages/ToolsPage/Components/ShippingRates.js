import '../ToolsPage.css';
import Select from 'react-select';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ShippingRates = () => {
    const [selectedCourier, setSelectedCourier] = useState(null);
    const dispatch = useDispatch();
    const { ratingCardData } = useSelector(state => state?.toolsSectionReducer);

    useEffect(() => {
        dispatch({ type: "GET_RATE_CARD" });
    }, [dispatch]);

    const handleCourierChange = selectedOption => {
        setSelectedCourier(selectedOption);
    };

    const shippingSelectData = [
        { value: 'all', label: 'All Couriers' },
        { value: 'Shadowfax', label: 'Shadowfax' },
        { value: 'Delhivery', label: 'Delhivery' },
        { value: 'Xpressbees A', label: 'Xpressbees A' },
    ];

    const renderRows = data => {
        const filteredData = selectedCourier && selectedCourier.value !== 'all' ?
            data.filter(item => item.partner === selectedCourier.value) :
            data;

        return filteredData?.map((item, index) => (
            <React.Fragment key={item.partner + index}>
                <tr className='table-row nested-tr box-shadow'>
                    <td rowSpan={3}>{item.partner}</td>
                    <td>Forward</td>
                    <td>{item.zone_a}</td>
                    <td>{item.zone_b}</td>
                    <td>{item.zone_c}</td>
                    <td>{item.zone_d}</td>
                    <td>{item.zone_e}</td>
                    <td className='rowfull3' rowSpan={3}>{item.cod_charge}</td>
                    <td className='rowfull3' rowSpan={3}>{item.cod_maintenance}</td>
                </tr>
                <tr className='nested-tr box-shadow'>
                    <td>Additional Weight</td>
                    <td>{item?.extra_charge_a}</td>
                    <td>{item?.extra_charge_b}</td>
                    <td>{item?.extra_charge_c}</td>
                    <td>{item?.extra_charge_d}</td>
                    <td>{item?.extra_charge_e}</td>
                </tr>
                <tr className='nested-tr box-shadow'>
                    <td>RTO</td>
                    <td>{item.rto_charge_a}</td>
                    <td>{item.rto_charge_b}</td>
                    <td>{item.rto_charge_c}</td>
                    <td>{item.rto_charge_d}</td>
                    <td>{item.rto_charge_e}</td>
                </tr>
                <tr className='blank-row' key={`empty-${item.partner}-${index}`}><td></td></tr>
            </React.Fragment>
        ));
    };

    return (
        <section className='position-relative'>
            <div className="position-relative">
                <h3>Shipping Rates</h3>
                <div className="box-shadow shadow-sm p7 mb-3 filter-container">
                    <div className="search-container d-flex gap-2">
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
                            <tr className="table-header-row">
                                <th style={{ width: '18%' }}>Courier Partner</th>
                                <th style={{ width: '12.5%' }}>Type</th>
                                <th style={{ width: '12.5%' }}>ZONE A</th>
                                <th style={{ width: '12.5%' }}>ZONE B</th>
                                <th style={{ width: '12.5%' }}>ZONE C</th>
                                <th style={{ width: '12.5%' }}>ZONE D</th>
                                <th style={{ width: '12.5%' }}>ZONE E</th>
                                <th style={{ width: '10%' }}>COD Charges</th>
                                <th style={{ width: '10%' }}>COD <br /> Maintenance(%)</th>
                            </tr>
                            <tr className="blank-row"><td></td></tr>
                        </thead>
                        <tbody>
                            {renderRows(ratingCardData)}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default ShippingRates;
