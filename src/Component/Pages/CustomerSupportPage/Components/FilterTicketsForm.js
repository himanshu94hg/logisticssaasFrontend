import axios from 'axios';
import Cookies from 'js-cookie';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { BASE_URL_CORE } from '../../../../axios/config';

const FilterTicketsForm = (props) => {
  const [subcatList, setSubcategory] = useState([]);
  const [endDate, setEndDate] = useState();
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [resolutionDate, setResolutionDate] = useState();
  const [createdDate, setCreatedDate] = useState();
  const [selectedSeverity, setSelectedSeverity] = useState('');
  const [severty, setSeverty] = useState([]);
  const [statusData, setStatusData] = useState([]);

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

  const handleChange = (selectedOption) => {
    setSelectedCategories(selectedOption);
  };

  const handleStatusChange = (selectedOption) => {
    setSelectedStatus(selectedOption);
  };

  const handleSeverityChange = (selectedOption) => {
    setSelectedSeverity(selectedOption);
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
    const severityValue = selectedSeverity ? selectedSeverity.value : '';
    const statusValue = selectedStatus ? selectedStatus.value : '';
    props.handleFormSubmit(selectedCategories, statusValue, resolutionDate, endDate, "filter", createdDate, severityValue);
  };



  const handleReset = () => {
    console.log("Reset button clicked");
    setSelectedCategories([]);
    setSelectedStatus('');
    setResolutionDate(null);
    setEndDate(null);
    setCreatedDate(null);
    setSelectedSeverity('');
  };

  useEffect(() => {
    StatusOptions.forEach((item) => {
      setStatusData((prev) => [...prev, { label: item.label, value: item.value }]);
    });
  }, []);

  const StatusOptions = [
    { value: 'All', label: 'All' },
    { value: 'Open', label: 'Open' },
    { value: 'In-progess', label: 'In-progess' },
    { value: 'Closed', label: 'Closed' },
  ];

  
  useEffect(() => {
    SeverityOptions.forEach((item) => {
      setSeverty((prev) => [...prev, { label: item.label, value: item.value }]);
    });
  }, []);

  const SeverityOptions = [
    { value: 'All', label: 'All' },
    { value: 'Critical', label: 'Critical' },
    { value: 'Medium', label: 'Medium' },
    { value: 'High', label: 'High' },
    { value: 'Low', label: 'Low' },
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
          options={statusData}
          onChange={handleStatusChange}
          value={selectedStatus}
          placeholder='Select Status'
          isClearable={true}
        />

        <Select
          options={severty}
          value={selectedSeverity}
          onChange={handleSeverityChange}
          placeholder='Select Severity'
          isClearable={true}
        />
      </div>

      <hr />

      <div className='ticket-filter-inputs'>
        <div>
          <h6>Created</h6>
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
          <h6>Due Date</h6>
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
          <h6>Updated</h6>
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