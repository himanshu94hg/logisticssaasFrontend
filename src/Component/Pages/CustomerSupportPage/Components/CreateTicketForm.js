import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Reusable FormInput component
const FormInput = ({ label, type, value, onChange, options }) => (
  <div className='ticket-form-row'>
    <label>{label}</label>
    {type === 'select' ? (
      <select className='select-field' value={value} onChange={onChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    ) : type === 'textarea' ? (
      <textarea className='input-field text-field' rows="4" value={value} onChange={onChange} />
    ) : type === 'file' ? (
      <input className='input-field choose-file-container' type={type} onChange={onChange} />
    ) : (
      <input className='input-field x' type={type} value={value} onChange={onChange} />
    )}
  </div>
);

const CreateTicketForm = () => {
  const [awbNumbers, setAwbNumbers] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [remarks, setRemarks] = useState('');
  const [attachments, setAttachments] = useState(null);
  const [allCatagery, setAllCatagery] = useState([]);
  const [allSubCatagry, setAllSubCatagry] = useState([]);
  
  const categoryOptions = allCatagery.map(category => ({
    value: category.id,  
    label: category.name,  
  }));

  const subcategoryOptions = allSubCatagry.map(subcategory => ({
    value: subcategory.id,  
    label: subcategory.name,  
  }));

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/core-api/features/ticket-category/')
      .then(response => {
        console.log('Data is data:', response.data);
        setAllCatagery(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  useEffect(() => {
    // Fetch subcategories based on the selected category
    if (category) {
      axios
        .get(`http://127.0.0.1:8000/core-api/features/ticket-sub-category/?category=${category}`)
        .then(response => {
          console.log('Subcategories:', response.data);
          setAllSubCatagry(response.data);
        })
        .catch(error => {
          console.error('Error fetching subcategories:', error);
        });
    } else {
      // If no category is selected, clear the subcategory options
      setAllSubCatagry([]);
    }
  }, [category]);

  const hardcodedToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA4ODYxNDk3LCJpYXQiOjE3MDY2MTUwOTcsImp0aSI6IjI0MTllNzg2NWY0NDRjNjM5OGYxZjAxMzlmM2Y2Y2M2IiwidXNlcl9pZCI6OX0.LNk9C0BFIgkIZpkYHNz2CvjzzcdwXkwYSOVpcK5A7Sw'

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('awb_number', awbNumbers);
    formData.append('category', category);
    formData.append('sub_category', subcategory);
    formData.append('description', remarks);
    formData.append('escalate_image', attachments);

    try {
      const response = await axios.post('http://127.0.0.1:8000/core-api/features/support-tickets/', formData, {
        headers: {
          'Authorization': `Bearer ${hardcodedToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        console.log('Form submitted successfully');
      } else {
        console.error('Form submission failed');
      }
    } catch (error) {
      console.error('API call error:', error);
    }

    // Clear form fields after submission
    setAwbNumbers('');
    setCategory('');
    setSubcategory('');
    setRemarks('');
    setAttachments(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAttachments(file);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormInput
        label="AWB Numbers (Comma Separated)"
        type="text"
        value={awbNumbers}
        onChange={(e) => setAwbNumbers(e.target.value)}
      />
      <FormInput
        label="Choose a Category"
        type="select"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        options={categoryOptions}
      />
      <FormInput
        label="Choose a Subcategory"
        type="select"
        value={subcategory}
        onChange={(e) => setSubcategory(e.target.value)}
        options={subcategoryOptions}
      />
      <FormInput
        label="Remarks"
        type="textarea"
        value={remarks}
        onChange={(e) => setRemarks(e.target.value)}
      />
      <FormInput
        label="Attachments (If any)"
        type="file"
        onChange={handleFileChange}
      />

      <div className='ticket-form-btn'>
        <button className='btn cancel-button' type="button" onClick={() => console.log('Cancelled')}>
          Cancel
        </button>
        <button className='btn main-button' type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default CreateTicketForm;
