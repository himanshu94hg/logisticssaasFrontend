import axios from 'axios';
import Cookies from 'js-cookie';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import React, { useState, useEffect } from 'react';
import { BASE_URL_CORE } from '../../../../axios/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

const StatusOptions = [
  { value: 'All', label: 'All' },
  { value: 'Open', label: 'Open' },
  { value: 'In-progess', label: 'In-progess' },
  { value: 'Closed', label: 'Closed' },
];
const SeverityOptions = [
  { value: 'All', label: 'All' },
  { value: 'Critical', label: 'Critical' },
  { value: 'Medium', label: 'Medium' },
  { value: 'High', label: 'High' },
  { value: 'Low', label: 'Low' },
];

const FilterTicketsForm = (props) => {
  const [severty, setSeverty] = useState([]);
  const [endDate, setEndDate] = useState(null);
  const authToken = Cookies.get("access_token")
  const [statusData, setStatusData] = useState([]);
  const [subcatList, setSubcategory] = useState([]);
  const [filterData, setFilterData] = useState({
    sub_category: null,
    status: null,
    created: null,
    resolution_due_by: null,
    last_updated: null,
    Severity: null,
  })

  useEffect(() => {
    if (props.reset || endDate) {
      setFilterData({
        sub_category: "",
        status: "",
        created: "",
        resolution_due_by: "",
        last_updated: "",
        Severity: "",
      })
    }
  }, [props.reset, endDate])


  useEffect(() => {
    if (props.filterClick) {
      axios.get(`${BASE_URL_CORE}/core-api/features/ticket-sub-category/`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
      ).then((response => {
        const formattedOptions = response.data.map((category) => ({
          value: category.id,
          label: category.name,
        }))
        setSubcategory(formattedOptions);
      }
      ))
    }
  }, [props.filterClick]);

  const handleChange = (e, name) => {
    setFilterData((prev) => ({
      ...prev,
      [name]: e
    }))
  };

  const handleApply = () => {
    props.handleFormSubmit(filterData)
  };

  const handleReset = () => {
    setEndDate(new Date())
  };

  useEffect(() => {
    StatusOptions.forEach((item) => {
      setStatusData((prev) => [...prev, { label: item.label, value: item.value }]);
    });
  }, []);

  useEffect(() => {
    SeverityOptions.forEach((item) => {
      setSeverty((prev) => [...prev, { label: item.label, value: item.value }]);
    });
  }, []);


  const handleKeyDown = (e) => {
    const allowedCharacters = /[0-9/]/;
    if (e.key === 'Backspace' || e.key === 'Delete') {
      return;
    }
    if (!allowedCharacters.test(e.key)) {
      e.preventDefault();
    }
  }
  return (
    <section className='ticket-slider-body'>
      <div className='ticket-filter-inputs'>
        <Select
          options={subcatList}
          placeholder='Choose a Subcategory'
          onChange={(e) => handleChange(e.value, "sub_category")}
          value={subcatList.find(option => option.value === filterData?.sub_category) || null}
        />

        <Select
          isClearable={true}
          options={statusData}
          placeholder='Select Status'
          onChange={(e) => handleChange(e.value, "status")}
          value={statusData.find(option => option.value === filterData?.status) || null}
        />

        <Select
          options={severty}
          isClearable={true}
          placeholder='Select Severity'
          onChange={(e) => handleChange(e.value, "Severity")}
          value={severty.find(option => option.value === filterData?.Severity) || null}
        />
      </div>

      <hr />

      <div className='ticket-filter-inputs'>
        <div>
          <h6>Created</h6>
          <div className='date-picker-container'>
            <DatePicker
              showIcon
              placeholderText="Click to select a date"
              isClearable
              maxDate={new Date()}
              className='input-field'
              dateFormat='dd MMMM, yyyy'
              selected={filterData?.created}
              onKeyDown={(e) => handleKeyDown(e)}
              onChange={(e) => handleChange(e, "created")}
              icon={<FontAwesomeIcon icon={faCalendarAlt} className='calendar-icon' />}
            />
          </div>
        </div>
        <div>
          <h6>Due Date</h6>
          <div className='date-picker-container'>
            <DatePicker
              showIcon
              placeholderText="Click to select a date"
              isClearable
              maxDate={new Date()}
              strictParsing={true}
              className='input-field'
              dateFormat='dd MMMM, yyyy'
              onKeyDown={(e) => handleKeyDown(e)}
              selected={filterData?.resolution_due_by}
              onChange={(e) => handleChange(e, "resolution_due_by")}
              icon={<FontAwesomeIcon icon={faCalendarAlt} className='calendar-icon' />}
            />
          </div>
        </div>
        <div>
          <h6>Updated</h6>
          <div className='date-picker-container'>
            <DatePicker
              showIcon
              placeholderText="Click to select a date"
              isClearable
              maxDate={new Date()}
              strictParsing={true}
              className='input-field'
              dateFormat='dd MMMM, yyyy'
              selected={filterData?.last_updated}
              onKeyDown={(e) => handleKeyDown(e)}
              onChange={(e) => handleChange(e, "last_updated")}
              icon={<FontAwesomeIcon icon={faCalendarAlt} className='calendar-icon' />}
            />
          </div>
        </div>
      </div>
      <div className='mt-4 d-flex justify-content-end'>
        <button className='btn cancel-button' onClick={handleReset}>Reset</button>
        <button className='btn main-button ms-3' onClick={handleApply}>
          Apply
        </button>
      </div>
    </section>
  );
};

export default FilterTicketsForm;