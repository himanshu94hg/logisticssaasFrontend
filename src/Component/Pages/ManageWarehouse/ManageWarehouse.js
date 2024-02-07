import React, { useEffect, useState } from 'react'
import SearchIcon from '../../../assets/image/icons/search-icon.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { AiOutlineCloudDownload, AiOutlineCloudUpload } from "react-icons/ai";
import './ManageWarehouse.css'

const BoxGrid = ({ boxData }) => {
  if (boxData.length === 0) {
    return <p>No data available</p>;
  }
  return (
    <div className="box-grid">
      {boxData.map((box, index) => (
        <div key={index} className={`box`}>
          <div className='box-card-outer'>
            <div className='warehouse-details'>
              <h3>{box.heading}</h3>
              <p>{box.registered_name}</p>
              <p>{box.gst_number}</p>
              <p>{box.contact_name}</p>
              <p>{box.contact_number}</p>
              <p>{box.address_line1}</p>
              <p>{box.address_line2}</p>
              <p>{box.city}, {box.state}, PIN:{box.pincode}</p>
              <p>{box.support_email}</p>
              <p>{box.support_phone}</p>
              <p>Show RTO Address</p>
              <label htmlFor="">
                <input type="checkbox" />
              </label>
            </div>
            <div className='rto-details'>
              <h3>{box.heading}</h3>
              <p>{box.registered_name}</p>
              <p>{box.gst_number}</p>
              <p>{box.contact_name}</p>
              <p>{box.contact_number}</p>
              <p>{box.address_line1}</p>
              <p>{box.address_line2}</p>
              <p>{box.city}, {box.state}, PIN:{box.pincode}</p>
              <p>{box.support_email}</p>
              <p>{box.support_phone}</p>
            </div>


          </div>
        </div>
      ))}
    </div>
  );
};


const ManageWarehouse = () => {
  const boxes = [
    { heading: 'PickNdel', registered_name: 'URAN Uttarpara test_SE-100188', gst_number: 'NA0000000000000', contact_name: 'URAN', contact_number: '8697616774', address_line1: 'Bhabani Apartment, Ground Floor', address_line2: '5 Dhrubesh Chatterjee Lane', city: 'UTTARPARA', state: 'West Bengal', pincode: '712258', support_email: 'biswas.durjoy123@gmail.com', support_phone: '8697616774' },
    { heading: 'PickNdel', registered_name: 'URAN Uttarpara test_SE-100188', gst_number: 'NA0000000000000', contact_name: 'URAN', contact_number: '8697616774', address_line1: 'Bhabani Apartment, Ground Floor', address_line2: '5 Dhrubesh Chatterjee Lane', city: 'UTTARPARA', state: 'West Bengal', pincode: '712258', support_email: 'biswas.durjoy123@gmail.com', support_phone: '8697616774' },
    { heading: 'PickNdel', registered_name: 'URAN Uttarpara test_SE-100188', gst_number: 'NA0000000000000', contact_name: 'URAN', contact_number: '8697616774', address_line1: 'Bhabani Apartment, Ground Floor', address_line2: '5 Dhrubesh Chatterjee Lane', city: 'UTTARPARA', state: 'West Bengal', pincode: '712258', support_email: 'biswas.durjoy123@gmail.com', support_phone: '8697616774' },
    { heading: 'PickNdel', registered_name: 'URAN Uttarpara test_SE-100188', gst_number: 'NA0000000000000', contact_name: 'URAN', contact_number: '8697616774', address_line1: 'Bhabani Apartment, Ground Floor', address_line2: '5 Dhrubesh Chatterjee Lane', city: 'UTTARPARA', state: 'West Bengal', pincode: '712258', support_email: 'biswas.durjoy123@gmail.com', support_phone: '8697616774' },
    { heading: 'PickNdel', registered_name: 'URAN Uttarpara test_SE-100188', gst_number: 'NA0000000000000', contact_name: 'URAN', contact_number: '8697616774', address_line1: 'Bhabani Apartment, Ground Floor', address_line2: '5 Dhrubesh Chatterjee Lane', city: 'UTTARPARA', state: 'West Bengal', pincode: '712258', support_email: 'biswas.durjoy123@gmail.com', support_phone: '8697616774' },

    // Add more box data as needed
  ];
  return (
    <>
      <div className="position-relative manage-warehouse">
        <section className="box-shadow shadow-sm p7 mb-3 filter-container">
          <div class="search-container">
            <label>
              <input type="text" placeholder="Search by Location || Address || City || State || Pincode" />
              <button>
                <img src={SearchIcon} alt="Search" />
              </button>
            </label>
          </div>
          <div className='button-container'>
            <button className='btn main-button me-2'><AiOutlineCloudUpload fontSize={25} /> Import</button>
            <button className='btn main-button me-2'><AiOutlineCloudDownload fontSize={25} /> Export</button>
            <button className='btn main-button'><FontAwesomeIcon icon={faPlus} /> Add Pickup Adress</button>
          </div>
        </section>

        <section className='warehouse-grid-container'>
          <div>
            <h4 className='mb-3'>Manage Pickup Addresses</h4>
            <BoxGrid boxData={boxes} />
          </div>

        </section>

      </div>
    </>
  )
}

export default ManageWarehouse