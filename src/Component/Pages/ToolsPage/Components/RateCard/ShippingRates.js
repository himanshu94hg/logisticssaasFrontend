import Select from 'react-select';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Toggle from 'react-toggle';
import '../../ToolsPage.css';
import NavTabs from './NavTabs/NavTabs';
import { DUMMY_RATING_CARD } from '../../../../../mockData/dashboardDummyData';
import { GET_RATE_CARD_DATA } from '../../../../../redux/constants/tools';

const ShippingRates = () => {
    const dispatch = useDispatch();
    const [selectedCourier, setSelectedCourier] = useState(null);
    const { ratingCardData } = useSelector(state => state?.toolsSectionReducer);
    const [isChecked, setIsChecked] = useState(false);
    const isLocalBypass = process.env.REACT_APP_BYPASS_LOGIN === 'true';

    const handleToggle = () => {
        setIsChecked(!isChecked);
    };

    useEffect(() => {
        if (isLocalBypass) {
            dispatch({ type: GET_RATE_CARD_DATA, payload: { data: DUMMY_RATING_CARD } });
        } else {
            dispatch({ type: "RATE_CARD_ACTION" });
        }
    }, [dispatch, isLocalBypass]);

    const handleCourierChange = selectedOption => {
        setSelectedCourier(selectedOption);
    };

    const shippingSelectData = ratingCardData?.map(item => ({
        value: item?.partner,
        label: item?.partner
    }));
    shippingSelectData?.unshift({ value: 'all', label: 'All Couriers' });
    const renderRows = data => {
        let filteredData = [...data];

        if (selectedCourier && selectedCourier.length > 0 && selectedCourier[0].value !== 'all') {
            const selectedValues = selectedCourier.map(option => option.value);
            filteredData = data.filter(item => selectedValues.includes(item?.partner));
        }

        return filteredData?.map((item, index) => (
            <React.Fragment key={item?.partner + index}>
                <tr className='blank-row' key={`empty-${item?.partner}-${index}`}><td></td></tr>
                <tr className='table-row nested-tr box-shadow'>
                    <td rowSpan={3} className=''>
                        <img
                            width={"40px"}
                            height={"40px"}
                            style={{ borderRadius: 30, border: "1px solid lightgray", padding: 2 }}
                            src={item?.partner_image} alt="" />
                        <p className='fw-bold'>  {item?.partner}</p>
                    </td>
                    <td>Forward</td>
                    <td>₹ {(isChecked ? (item?.zone_a * 1.18).toFixed(2) : item?.zone_a)}</td>
                    <td>₹ {(isChecked ? (item?.zone_b * 1.18).toFixed(2) : item?.zone_b)}</td>
                    <td>₹ {(isChecked ? (item?.zone_c * 1.18).toFixed(2) : item?.zone_c)}</td>
                    <td>₹ {(isChecked ? (item?.zone_d * 1.18).toFixed(2) : item?.zone_d)}</td>
                    <td>₹ {(isChecked ? (item?.zone_e * 1.18).toFixed(2) : item?.zone_e)}</td>
                    <td className='rowfull3' rowSpan={3}>₹ {(isChecked ? (item?.cod_charge * 1.18).toFixed(2) : item?.cod_charge)}</td>
                    <td className='rowfull3' rowSpan={3}>{item?.cod_maintenance} %</td>
                </tr>
                <tr className='nested-tr box-shadow'>
                    <td>Additional Weight</td>
                    <td>₹ {(isChecked ? (item?.extra_charge_a * 1.18).toFixed(2) : item?.extra_charge_a)}</td>
                    <td>₹ {(isChecked ? (item?.extra_charge_b * 1.18).toFixed(2) : item?.extra_charge_b)}</td>
                    <td>₹ {(isChecked ? (item?.extra_charge_c * 1.18).toFixed(2) : item?.extra_charge_c)}</td>
                    <td>₹ {(isChecked ? (item?.extra_charge_d * 1.18).toFixed(2) : item?.extra_charge_d)}</td>
                    <td>₹ {(isChecked ? (item?.extra_charge_e * 1.18).toFixed(2) : item?.extra_charge_e)}</td>
                </tr>
                <tr className='nested-tr box-shadow'>
                    <td>RTO</td>
                    <td>₹ {(isChecked ? (item?.rto_charge_a * 1.18).toFixed(2) : item?.rto_charge_a)}</td>
                    <td>₹ {(isChecked ? (item?.rto_charge_b * 1.18).toFixed(2) : item?.rto_charge_b)}</td>
                    <td>₹ {(isChecked ? (item?.rto_charge_c * 1.18).toFixed(2) : item?.rto_charge_c)}</td>
                    <td>₹ {(isChecked ? (item?.rto_charge_d * 1.18).toFixed(2) : item?.rto_charge_d)}</td>
                    <td>₹ {(isChecked ? (item?.rto_charge_e * 1.18).toFixed(2) : item?.rto_charge_e)}</td>
                </tr>
            </React.Fragment>
        ));
    };

    return (
        <>
            <section className='position-relative rate-card-page'>
                <div className="position-relative">
                    <div className="box-shadow shadow-sm p7 mb-3 filter-container align-items-center">
                        <div className="search-container d-flex gap-2">
                            <label>
                                <Select
                                    value={selectedCourier}
                                    onChange={handleCourierChange}
                                    closeMenuOnSelect={false}
                                    options={shippingSelectData}
                                    placeholder="Select Courier"
                                    isSearchable
                                    isMulti
                                />
                            </label>
                        </div>
                        <div className='button-container d-flex align-items-center gap-2'>
                            {!isChecked ? 'Include GST' : 'Exclude GST'}
                            <Toggle
                                checked={isChecked}
                                onChange={handleToggle}
                            />
                        </div>
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
                                    <th style={{ width: '10%' }}>COD Charges </th>
                                    <th style={{ width: '10%' }}>COD <br /> Maintenance</th>
                                </tr>
                                {/* <tr className="blank-row"><td></td></tr> */}
                            </thead>
                            <tbody>
                                {renderRows(ratingCardData)}
                            </tbody>
                        </table>
                    </div>
                    {/* <div className='box-shadow shadow-sm p10 my-3'>
                    <p className='mb-0 font12 text-red'>** Gati Rates include INR 100 docket charges and INR 100 ROV charges</p>
                </div> */}
                </div>
            </section>
        </>
    );
};

export default ShippingRates;
