import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const FilterTicketsForm = (props) => {
  const [subcatList, setSubcategory] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [resolutionDate, setResolutionDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const hardcodedToken =
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA3NzM4NjMzLCJpYXQiOjE3MDcxMzM4MzMsImp0aSI6IjZhM2I5YWMwNDZjZjRkYjM4MWJlNGJjOWNmNWQ1NGQ1IiwidXNlcl9pZCI6Mn0.fHH4RQDMtVbC036iesCF9uX10Vmwc6VrAvpL2SSqgcY';
        const response = await axios.get(
          'http://65.2.38.87:8088/core-api/features/ticket-sub-category/',
          {
            headers: {
              Authorization: `Bearer ${hardcodedToken}`,
            },
          }
        );

        // Format the data to match the expected structure for Select options
        const formattedOptions = response.data.map((category) => ({
          value: category.id,
          label: category.name,
        }));

        setSubcategory(formattedOptions);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

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
    props.handleFormSubmit(selectedCategories,selectedStatus,resolutionDate,endDate,"filter")
    // Here you can perform further actions with the selected values, such as submitting the form data to an API
  };

  const StatusOptions = [
    { value: '', label: 'Select Status' },
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
          isMulti // Enables multi-select
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
              dateFormat='MM/dd/yyyy'
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
              dateFormat='MM/dd/yyyy'
              className='input-field'
            />
          </div>
        </div>
      </div>

      <div className='mt-4 d-flex'>
        <button className='btn main-button-outline'>Reset</button>
        <button className='btn main-button ms-3' onClick={handleApply}>
          Apply
        </button>
      </div>
    </section>
  );
};

export default FilterTicketsForm;