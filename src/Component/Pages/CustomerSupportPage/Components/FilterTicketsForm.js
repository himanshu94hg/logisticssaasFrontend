import axios from 'axios';
import Cookies from 'js-cookie';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

const FilterTicketsForm = (props) => {
  const [subcatList, setSubcategory] = useState([]);
  const [endDate, setEndDate] = useState();
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [resolutionDate, setResolutionDate] = useState();
  const [createdDate, setCreatedDate] = useState();

  const authToken = Cookies.get("access_token")

  useEffect(() => {
    if (props?.clearTicket) {
      setSelectedCategories([]);
      setSelectedStatus('');
      setResolutionDate(null);
      setEndDate(null);
      setCreatedDate(null)
    }
    props?.setClearTicket(false)
  }, [props?.clearTicket])

  useEffect(() => {
    if (props.filterClick) {
      axios.get('https://dev.shipease.in/core-api/features/ticket-sub-category/', {
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


  const handleCreatedChange = (date) => {
    setCreatedDate(date);
  };
  const handleResolutionDateChange = (date) => {
    setResolutionDate(date);
  };
  const handleEndDateChange = (date) => {
    setEndDate(date);
  };


  const handleApply = () => {
    props.handleFormSubmit(selectedCategories, selectedStatus, resolutionDate, endDate, "filter", createdDate)
  };

  const handleReset = () => {
    setSelectedCategories([]);
    setSelectedStatus('');
    setResolutionDate(null);
    setEndDate(null);
    setCreatedDate(null)
    // props.handleFormSubmit(selectedCategories, selectedStatus, resolutionDate, endDate, "filter")
  };
  const StatusOptions = [
    { value: 'All', label: 'All' },
    { value: 'Open', label: 'Open' },
    { value: 'In-progess', label: 'In-progess' },
    { value: 'Closed', label: 'Closed' },
  ];

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
          <h6>Created At</h6>
          <div className='date-picker-container'>
            <FontAwesomeIcon
              icon={faCalendarAlt}
              className='calendar-icon'
              onClick={() => document.getElementById("createdDate").focus()}
            />
            <DatePicker
              id="createdDate"
              selected={createdDate}
              onChange={handleCreatedChange}
              dateFormat='dd/MM/yyyy'
              className='input-field'
              strictParsing={true} 
              onKeyDown={(e) => handleKeyDown(e)}
            />
          </div>
        </div>
        <div>
          <h6>Resolution Due By</h6>
          <div className='date-picker-container'>
            <FontAwesomeIcon
              icon={faCalendarAlt}
              className='calendar-icon'
              onClick={() => document.getElementById("resolutionDate").focus()}
            />
            <DatePicker
              id="resolutionDate"
              selected={resolutionDate}
              onChange={handleResolutionDateChange}
              dateFormat='dd/MM/yyyy'
              className='input-field'
              maxDate={new Date()}
              strictParsing={true} 
              onKeyDown={(e) => handleKeyDown(e)}
            />
          </div>
        </div>
        <div>
          <h6>Last Updated</h6>
          <div className='date-picker-container'>
            <FontAwesomeIcon
              icon={faCalendarAlt}
              className='calendar-icon'
              onClick={() => document.getElementById("endDate").focus()}
            />
            <DatePicker
              id="endDate"
              selected={endDate}
              onChange={handleEndDateChange}
              dateFormat='dd/MM/yyyy'
              className='input-field'
              maxDate={new Date()}
              strictParsing={true} 
              onKeyDown={(e) => handleKeyDown(e)}
            />
          </div>
        </div>
      </div>
      <div className='mt-4 d-flex'>
        <button className='btn main-button-outline' onClick={handleReset}>Reset</button>
        <button className='btn main-button ms-3' onClick={handleApply}>
          Apply
        </button>
      </div>
    </section>
  );
};

export default FilterTicketsForm;