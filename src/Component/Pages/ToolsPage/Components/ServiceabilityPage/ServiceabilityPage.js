import React, { useState } from 'react'
import NavTabs from './navTabs/NavTabs';
import './ServiceabilityPage.css'
import CouriersList from './CouriersList';
import Select, { components } from "react-select";
import { useDispatch } from 'react-redux';


const Option = (props) => {
  return (
    <components.Option {...props}>
      <input
        type="checkbox"
        checked={props.isSelected}
        onChange={() => props.selectOption(props.data)}
      />{" "}
      <label>{props.label}</label>
    </components.Option>
  );
};

const courierOptions = [
  { value: "bluedart", label: "Blue Dart" },
  { value: "bluedart_surface", label: "Blue Dart Surface" },
  { value: "xpressbees", label: "Xpressbees" },
  { value: "xpressbees_surface", label: "Xpressbees Surface" },
  { value: "ekart", label: "Ekart" },
  { value: "delhivery", label: "Delhivery" },
  { value: "dtdc", label: "DTDC" },
  { value: "ecom_express", label: "Ecom Express" },
  { value: "shadowfax", label: "ShadowFax" }
];

const ServiceabilityPage = () => {
  const dispatch = useDispatch()
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [zipcode, setZipcode] = useState("");
  const [activeTab, setActiveTab] = useState("Check Serviceability");

  const handleChange = (selected) => {
    setSelectedOptions(selected);
  };

  const getCourierAvalibility = (value) => {
    dispatch({
      type: "SERVICE_ABILITY_ACTION", payload: {
        pincode_type: value,
        pincode: zipcode
      }
    })
  }

  return (
    <>
      <NavTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <section className={`ServiceabilityPage ${activeTab === "Check Serviceability" ? "d-block" : "d-none"}`}>
        <div className="box-shadow shadow-sm p10">
          <div className='row flex-row'>
            <div className='col d-flex align-items-center'>
              <div className='d-flex flex-column gap-4 p10 w-100'>
                <h5>Check Pickup to Delivery Serviceable Couriers</h5>
                <div className='d-flex w-100 gap-3 align-items-center'>
                  <label className='w-100'>
                    Pickup Pincode
                    <input className='input-field' type="text" placeholder='Enter your Pickup Pincode' />
                  </label>
                  <hr className='pair-hr' />
                  <label className='w-100'>
                    Delivery Pincode
                    <input className='input-field' type="text" placeholder='Enter your Delivery Pincode' />
                  </label>
                </div>
                <div className='d-flex justify-content-end'>
                  <button className='btn main-button'>Pair Serviceability</button>
                </div>
              </div>
            </div>
            <hr className='fm-lm-hr col-2' />
            <div className='col d-flex align-items-center'>
              <div className='d-flex flex-column gap-4 p10 w-100'>
                <h5>Check Serviceable Couriers</h5>
                <label>
                  Enter Pickup or Delivery Pincode
                  <input className='input-field' type="text" placeholder='Enter your Pincode' />
                </label>
                <div className='d-flex gap-2 justify-content-end'>
                  <button className='btn main-button'>FM Serviceability</button>
                  <button className='btn main-button'>LM Serviceability</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='mt-4'></div>
        <section className='courier-section mx-0 gap-3'>
          <CouriersList />
        </section>
      </section>

      <section className={`ServiceabilityPage ${activeTab === "Get serviceability" ? "d-block" : "d-none"}`}>
        <div className="box-shadow shadow-sm p10">
          <div className='row flex-row'>
            <div className='col d-flex align-items-center'>
              <div className='d-flex flex-column gap-4 p10 w-100'>
                <h5>Get Courier Serviceability</h5>
                <Select
                  options={courierOptions}
                  isMulti
                  closeMenuOnSelect={false}
                  components={{ Option }}
                  onChange={handleChange}
                  value={selectedOptions}
                />
                <div className='d-flex justify-content-start'>
                  <button className='btn main-button'>Export Courier Serviceability</button>
                </div>
              </div>
            </div>
            <hr className='fm-lm-hr col-2' />
            <div className='col d-flex align-items-center'>
              <div className='d-flex flex-column gap-4 p10 w-100'>
                <h5>Get Shipease Serviceability</h5>
                <div className='d-flex w-100 gap-3 align-items-center'>
                  <p className='w-100'>
                    <strong>Note:</strong>Check shipping availability and options for destinations, ensuring efficient delivery solutions.
                  </p>

                </div>
                <div className='d-flex justify-content-end'>
                  <button className='btn main-button'>Export Shipease Serviceability</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='box-shadow shadow-sm mt-3 p10 mb-3'>
          <h4>Instructions:</h4>
          <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </section>
    </>
  )
}


export default ServiceabilityPage