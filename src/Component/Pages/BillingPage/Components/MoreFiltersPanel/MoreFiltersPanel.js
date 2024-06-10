import { faCalendarAlt, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

const MoreFiltersPanel = React.memo(({ activeTab, MoreFilters, setMoreFilters, handleMoreFilter, billingRemitanceExportCard }) => {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});
    const [SidePanelOption, setSidePanelOption] = useState('Filter');
    const [courierPartners, setCourierPartners] = useState([]);
    const [awbNumbers, setAwbNumbers] = useState('');
    const [selectedCourierPartners, setSelectedCourierPartners] = useState([]);
    const [exportButtonClick, setExportButtonClick] = useState(false)

    const [filterParams, setFilterParams] = useState({
        start_date: "",
        end_date: "",
        utr_number: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const encodedParams = Object.entries(filterParams)
            .filter(([key, value]) => value !== null && value !== '')
            .map(([key, value]) => {
                if (key === 'start_date' || key === 'end_date') {
                    const formattedDate = moment(value).format('YYYY-MM-DD');
                    return `${key}=${formattedDate}`;
                } else {
                    const trimmedValue = value.replace(/,+$/, '');
                    return `${key}=${trimmedValue}`;
                }
            })
            .join('&');

        if ((!filterParams.start_date && filterParams.end_date) || (filterParams.start_date && !filterParams.end_date)) {
            setErrors({ start_date: 'Please select both start and end dates', end_date: 'Please select both start and end dates' });
            return;
        } else {
            setErrors({});
        }

        handleMoreFilter(filterParams);
        setMoreFilters(false);
    };

    useEffect(() => {
        if (activeTab) {
            setFilterParams({
                start_date: null,
                end_date: null,
                utr_number: "",
            });
            setErrors({});
        }
    }, [activeTab]);

    const handleChange = (name, value) => {
        setFilterParams(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleReset = () => {
        setFilterParams({
            start_date: null,
            end_date: null,
            utr_number: "",
        });
        setErrors({});
    };

    const handleKeyDown = (e) => {
        const allowedCharacters = /[0-9/]/;
        if (e.key === 'Backspace' || e.key === 'Delete') {
            return;
        }
        if (!allowedCharacters.test(e.key)) {
            e.preventDefault();
        }
    };

    useEffect(() => {
        dispatch({ type: "COURIER_PARTNER_ACTION" });
    }, [dispatch]);

    const courierPartnerData = useSelector(state => state?.toolsSectionReducer?.courierPartnerData);
    useEffect(() => {
        if (courierPartnerData?.data?.length) {
            const formattedData = courierPartnerData?.data.map(item => ({
                value: item.keyword,
                label: item.title
            }));
            setCourierPartners(formattedData);
        } else {
            setCourierPartners([]);
        }
    }, [courierPartnerData]);

    const customStyles = {
        menuList: (provided) => ({
            ...provided,
            maxHeight: '150px',
            overflowY: 'auto',
        }),
    };

    const handleExportClick = () => {
        setExportButtonClick(true);
        const awbNumbersString = awbNumbers
            .split(',')
            .map(number => number.trim())
            .filter(Boolean)
            .join(',');

        const selectedCourierPartnerKeywords = selectedCourierPartners
            .map(partner => partner.value)
            .join(',');

        const payload = {
            awb_number: awbNumbersString,
            courier_partner: selectedCourierPartnerKeywords
        };

        dispatch({
            type: "BILLING_REMITANCE_EXPORT_DATA_ACTION",
            payload: payload
        });
    };

    useEffect(() => {
        if (billingRemitanceExportCard) {
            var FileSaver = require('file-saver');
            var blob = new Blob([billingRemitanceExportCard], { type: 'application/ms-excel' });
            FileSaver.saveAs(blob, `${activeTab}.xlsx`);
            setExportButtonClick(false);
        }
    }, [billingRemitanceExportCard]);

    return (
        <div id='sidePanel' className={`side-panel morefilters-panel remitance-logs-filter ${MoreFilters ? 'open' : ''}`}>
            <div id='sidepanel-closer' onClick={() => setMoreFilters(false)}>
                <FontAwesomeIcon icon={faChevronRight} />
            </div>
            <section className='sidepanel-header'>
                <h4>Explore Additional Filters</h4>
                <p>Fine-Tune Your Search</p>
            </section>
            <section className='sidepanel-tabs'>
                <p onClick={() => setSidePanelOption('Filter')} className={`${SidePanelOption === 'Filter' && 'active'}`}>Filter</p>
                <p onClick={() => setSidePanelOption('Export')} className={`${SidePanelOption === 'Export' && 'active'}`}>Export</p>
            </section>
            <section className='sidepanel-body'>
                {SidePanelOption === 'Filter' &&
                    <form onSubmit={handleSubmit}>
                        <div className="form-input-fields">
                            <div className='filter-row'>
                                <label>
                                    Start Date
                                    <div className="date-picker-container">
                                        <FontAwesomeIcon icon={faCalendarAlt} className="calendar-icon" />
                                        <DatePicker
                                            className={`input-field ${errors.start_date ? 'input-field-error' : ''}`}
                                            maxDate={new Date()}
                                            selected={filterParams?.start_date}
                                            onKeyDown={handleKeyDown}
                                            onChange={e => handleChange("start_date", e)}
                                            placeholderText='Select Start Date'
                                            dateFormat="MM/dd/yyyy h:mm aa"
                                            isClearable
                                            closeOnScroll={e => e.target === document}
                                            showTimeInput
                                            showMonthDropdown
                                            showYearDropdown
                                        />
                                        {errors.start_date && <div className="custom-error">{errors.start_date}</div>}
                                    </div>
                                </label>
                                <label>
                                    End Date
                                    <div className="date-picker-container">
                                        <FontAwesomeIcon icon={faCalendarAlt} className="calendar-icon" />
                                        <DatePicker
                                            dateFormat="MM/dd/yyyy h:mm aa"
                                            className={`input-field ${errors.end_date ? 'input-field-error' : ''}`}
                                            maxDate={new Date()}
                                            selected={filterParams?.end_date}
                                            onKeyDown={handleKeyDown}
                                            onChange={e => handleChange("end_date", e)}
                                            placeholderText='Select End Date'
                                            isClearable
                                            closeOnScroll={e => e.target === document}
                                            showTimeInput
                                            showMonthDropdown
                                            showYearDropdown
                                        />
                                        {errors.end_date && <div className="custom-error">{errors.end_date}</div>}
                                    </div>
                                </label>
                            </div>
                            <div className='filter-row'>
                                <label>UTR Number
                                    <input
                                        className='input-field'
                                        type="text"
                                        value={filterParams?.utr_number}
                                        onChange={e => handleChange("utr_number", e.target.value)}
                                        placeholder="Enter UTR Number"
                                    />
                                </label>
                            </div>
                        </div>
                        <div className='more-filters-footer justify-content-end'>
                            <div>
                                <button className='btn secondary-button' type="button" onClick={handleReset}>
                                    Reset
                                </button>
                                <button className='btn main-button ms-3' type="submit">Submit</button>
                            </div>
                        </div>
                    </form>
                }
                {SidePanelOption === 'Export' &&
                    <>
                        <div className="form-input-fields">
                            <div className='filter-row'>
                                <label>
                                    Enter AWB Number(s)
                                    <input
                                        className='input-field'
                                        type="text"
                                        placeholder='Enter AWB numbers (comma separated)'
                                        value={awbNumbers}
                                        onChange={e => setAwbNumbers(e.target.value)}
                                    />
                                </label>
                            </div>
                            <div className='d-flex justify-content-end'>
                                <button className='btn main-button' onClick={handleExportClick}>Export</button>
                            </div>
                            <div className='section-divider invisible'>
                                <hr />
                                <span>OR</span>
                            </div>
                            <div className='filter-row'>
                                <label>
                                    Courier Partner(s)
                                    <Select
                                        options={courierPartners}
                                        onChange={setSelectedCourierPartners}
                                        isMulti
                                        isSearchable
                                        value={selectedCourierPartners}
                                        placeholder="Select Courier Partner(s)"
                                        styles={customStyles}
                                    />
                                </label>
                            </div>
                            <div className='d-flex justify-content-end'>
                                <button className='btn main-button' onClick={handleExportClick}>Export</button>
                            </div>
                        </div>
                    </>
                }
            </section>
        </div>
    );
});

export default MoreFiltersPanel;
