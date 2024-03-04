import axios from 'axios';
import Cookies from 'js-cookie';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

const FilterTicketsForm = (props) => {
  const [subcatList, setSubcategory] = useState([]);
  const [endDate, setEndDate] = useState(new Date());
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedCategories, setSelectedCategories] = useState(null);
  const [resolutionDate, setResolutionDate] = useState(new Date());

  const authToken = Cookies.get("access_token")

  useEffect(() => {
    if (props.filterClick) {
      axios.get('http://dev.shipease.in:8081/core-api/features/ticket-sub-category/', {
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

  const handleChange = (selectedOption) => {
    setSelectedCategories(selectedOption);
  };

  const handleStatusChange = (selectedOption) => {
    setSelectedStatus(selectedOption.value);
  };

  const handleResolutionDateChange = (date) => {
    setResolutionDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleApply = () => {
    props.handleFormSubmit(selectedCategories, selectedStatus, resolutionDate, endDate, "filter")
  };


  console.log(selectedCategories, selectedStatus, resolutionDate, endDate,"this is image daa")
  const StatusOptions = [
    { value: 'All', label: 'All' },
    { value: 'Open', label: 'Open' },
    { value: 'In-progess', label: 'In-progess' },
    { value: 'Closed', label: 'Closed' },
  ];


  return (
    <section className='ticket-slider-body'>
      <div className='ticket-filter-inputs'>
        <Select
          options={subcatList}
          onChange={handleChange}
          value={selectedCategories}
          placeholder='Choose a Subcategory'
        />
        <Select
          options={StatusOptions}
          onChange={handleStatusChange}
          placeholder='Select Status'
        />
      </div>

      <hr />

      <div className='ticket-filter-inputs'>
        <div>
          <h6>Resolution Due By</h6>
          <div className='date-picker-container'>
            <FontAwesomeIcon icon={faCalendarAlt} className='calendar-icon' />
            <DatePicker
              selected={resolutionDate}
              onChange={handleResolutionDateChange}
              dateFormat='dd/MM/yyyy'
              className='input-field'
            />
          </div>
        </div>
        <div>
          <h6>Last Updated</h6>
          <div className='date-picker-container'>
            <FontAwesomeIcon icon={faCalendarAlt} className='calendar-icon' />
            <DatePicker
              selected={endDate}
              onChange={handleEndDateChange}
              dateFormat='dd/MM/yyyy'
              className='input-field'
            />
          </div>
        </div>
      </div>

      <div className='mt-4 d-flex'>
        <button className='btn main-button-outline'>Resssset</button>
        <button className='btn main-button ms-3' onClick={handleApply}>
          Apply
        </button>
      </div>
    </section>
  );
};

export default FilterTicketsForm;