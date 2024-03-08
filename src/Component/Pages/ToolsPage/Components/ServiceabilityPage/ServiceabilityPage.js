import React, { useEffect, useState } from 'react'
import NavTabs from './navTabs/NavTabs';
import './ServiceabilityPage.css'
import CouriersList from './CouriersList';
import Select, { components } from "react-select";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';


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
  const [zipcode, setZipcode] = useState("");
  const [pincodeError, setPincodeError] = useState("");
  const [pairPincodeError, setPairPincodeError] = useState({});
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [activeTab, setActiveTab] = useState("Check Serviceability");
  const [pairPincode, setPairPincode] = useState({
    pickup_pincode: '',
    delivery_pincode: ''
  });

  const handleChange = (selected) => {
    setSelectedOptions(selected);
  };


  const getCourierAvalibility = (value) => {
    if (!validatePincode(zipcode)) {
      setPincodeError("Please enter a valid 6-digit pincode.");
      return;
    }
    if (value === "FM" || value === "LM") {
      dispatch({
        type: "SERVICE_ABILITY_ACTION", payload: {
          pincode_type: value,
          pincode: zipcode
        }
      });
    }
  };

  const validatePincode = (input) => {
    const regex = /^\d{6}$/;
    return regex.test(input);
  };

  const handlePincodeChange = (e) => {
    const { value } = e.target;
    setZipcode(value);
    if (value && !validatePincode(value)) {
      setPincodeError("Pincode should be a 6-digit number");
    } else {
      setPincodeError("");
    }
  };

  const pairHandleChange = (e) => {
    const { name, value } = e.target;
    setPairPincode((prev) => ({
      ...prev,
      [name]: value
    }))
  }
  const pairHandleSubmit = () => {
    const errors = {};
    if (!validatePincode(pairPincode.pickup_pincode)) {
      errors.pickup_pincode = "Pickup pincode is required!";
    }
    if (!validatePincode(pairPincode.delivery_pincode)) {
      errors.delivery_pincode = "Delivery pincode is required!";
    }

    setPairPincodeError(errors);

    if (Object.keys(errors).length === 0) {
      dispatch({ type: "SERVICE_ABILITY_ACTION_PAIR", payload: pairPincode });
    }
  };

  const { shipeaseServicePincode } = useSelector(state => state?.toolsSectionReducer)

  useEffect(() => {
    if (shipeaseServicePincode!=null) {
      var FileSaver = require('file-saver');
      var blob = new Blob([shipeaseServicePincode], { type: 'application/ms-excel' });
      FileSaver.saveAs(blob, "shipease_serviceability-pincode.xlsx");
    }
  }, [shipeaseServicePincode])


  useEffect(()=>{
  dispatch({type:"GET_COURIER_SERVICE_ABILITY_ACTION"})
  },[])

const exportShipeaseServiceability=()=>{
  dispatch({ type: "GET_SHIPEASE_SERVICE_ABILITY_ACTION" })
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
                    <input className='input-field' name="pickup_pincode" type="text" placeholder='Enter your Pickup Pincode' onChange={pairHandleChange} />
                    {pairPincodeError.pickup_pincode && <p className="error-message">{pairPincodeError.pickup_pincode}</p>}
                  </label>
                  <hr className='pair-hr' />
                  <label className='w-100'>
                    Delivery Pincode
                    <input className='input-field' name="delivery_pincode" type="text" placeholder='Enter your Delivery Pincode' onChange={pairHandleChange} />
                    {pairPincodeError.delivery_pincode && <p className="error-message">{pairPincodeError.delivery_pincode}</p>}
                  </label>
                </div>
                <div className='d-flex justify-content-end'>
                  <button className='btn main-button' onClick={pairHandleSubmit}>Pair Serviceability</button>
                </div>
              </div>
            </div>
            <hr className='fm-lm-hr col-2' />
            <div className='col d-flex align-items-center'>
              <div className='d-flex flex-column gap-4 p10 w-100'>
                <h5>Check Serviceable Couriers</h5>
                <label>
                  Enter Pickup or Delivery Pincode
                  <input className='input-field' type="number" placeholder='Enter your Pincode' onChange={handlePincodeChange} />
                  {pincodeError && <p className="error-message">{pincodeError}</p>}
                </label>
                <div className='d-flex gap-2 justify-content-end'>
                  <button className='btn main-button' onClick={() => getCourierAvalibility("FM")}>FM Serviceability</button>
                  <button className='btn main-button' onClick={() => getCourierAvalibility("LM")}>LM Serviceability</button>
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
                  <button className='btn main-button' onClick={() => exportShipeaseServiceability()}>Export Shipease Serviceability</button>
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