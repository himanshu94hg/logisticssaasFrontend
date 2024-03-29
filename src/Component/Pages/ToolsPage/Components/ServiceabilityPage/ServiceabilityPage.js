import './ServiceabilityPage.css'
import NavTabs from './navTabs/NavTabs';
import CouriersList from './CouriersList';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react'
import Select, { components } from "react-select"


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


const ServiceabilityPage = () => {
  const dispatch = useDispatch()
  const [zipcode, setZipcode] = useState("");
  const [courierId, setCourierId] = useState(null)
  const [pincodeError, setPincodeError] = useState("");
  const [courierOptions, setCourierOptions] = useState([])
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [pairPincodeError, setPairPincodeError] = useState({});
  const [activeTab, setActiveTab] = useState("Check Serviceability");
  const [pairPincode, setPairPincode] = useState({
    pickup_pincode: '',
    delivery_pincode: ''
  });
  const { shipeaseServicePincode, courierPartnerName, serviceAbility, serviceCourierPincode } = useSelector(state => state?.toolsSectionReducer)
  console.log(serviceCourierPincode, "selectedOptionsselectedOptions")
  const handleChange = (selected) => {
    setSelectedOptions(selected);
  };

  const validatePincode = (input) => {
    const regex = /^\d{6}$/;
    return regex.test(input);
  };

  const handlePincodeChange = (e) => {
    const { value } = e.target;
    setZipcode(value);
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
    }if(!validatePincode()){

    }

    setPairPincodeError(errors);

    if (Object.keys(errors).length === 0) {
      dispatch({ type: "SERVICE_ABILITY_PAIR_ACTION", payload: pairPincode });
    }
  };

  console.log(pincodeError, "this is pincode error data")

  const getCourierAvalibility = (value) => {
    if (!validatePincode(zipcode)) {
      setPincodeError("Please enter a valid 6-digit pincode.");
      return;
    }
    if (value === "FM" || value === "LM") {
      dispatch({
        type: "SERVICE_ABILITY_SINGLE_ACTION", payload: {
          pincode_type: value,
          pincode: zipcode
        }
      });
      setPincodeError('')
    }
  };
  const getCourierServiceAvability = () => {
    dispatch({ type: "GET_COURIER_SERVICE_ABILITY_FILTER_ACTION", payload: courierId })
  }

  const exportShipeaseServiceability = () => {
    dispatch({ type: "GET_SHIPEASE_SERVICE_ABILITY_ACTION" })
  }

  useEffect(() => {
    dispatch({ type: "GET_COURIER_PATNER_NAME_ACTION" })
  }, [])

  useEffect(() => {
    if (shipeaseServicePincode!=null || serviceCourierPincode!=null) {
      var FileSaver = require('file-saver');
      var blob = new Blob([shipeaseServicePincode || serviceCourierPincode], { type: 'application/ms-excel' });
      FileSaver.saveAs(blob, shipeaseServicePincode? "shipease_serviceability-pincode.xlsx":"serviceable-pincode.xlsx");
    }
  }, [shipeaseServicePincode,serviceCourierPincode])

  useEffect(() => {
    if (courierPartnerName && Array.isArray(courierPartnerName)) {
      const transformedData = courierPartnerName?.map(item => ({
        value: item.id,
        label: item.title,
      }));
      setCourierOptions(transformedData);
    }
  }, [courierPartnerName]);

  useEffect(() => {
    const temp_data = selectedOptions?.map((item) => item.value);
    const commaSeparatedString = temp_data.join(',');
    setCourierId(commaSeparatedString)
  }, [selectedOptions])

  useEffect(() => {
    if (serviceAbility) {
      setPairPincode({
        pickup_pincode: '',
        delivery_pincode: ''
      })
      setZipcode('')
    }
  }, [serviceAbility])

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
                    <input 
                    className={`input-field ${pairPincodeError.pickup_pincode && "input-field-error"}`}
                    name="pickup_pincode" value={pairPincode.pickup_pincode}
                    type="text" placeholder='Enter your Pickup Pincode'
                    onChange={pairHandleChange}
                    maxLength={6}
                    onKeyPress={(e) => {
                      if (!/\d/.test(e.key)) {
                          e.preventDefault();
                      }
                  }} />
                    {pairPincodeError.pickup_pincode && <span className="error-text">{pairPincodeError.pickup_pincode}</span>}
                  </label>
                  <hr className='pair-hr' />
                  <label className='w-100'>
                    Delivery Pincode
                    <input 
                    className={`input-field ${pairPincodeError.delivery_pincode && "input-field-error"}`} 
                    name="delivery_pincode" 
                    value={pairPincode.delivery_pincode} 
                    type="text" placeholder='Enter your Delivery Pincode' 
                    onChange={pairHandleChange}
                    maxLength={6}  
                    onKeyPress={(e) => {
                      if (!/\d/.test(e.key)) {
                          e.preventDefault();
                      }
                  }} />
                    {pairPincodeError.delivery_pincode && <span className="error-text">{pairPincodeError.delivery_pincode}</span>}
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
                  <input 
                  className={`input-field ${pincodeError && "input-field-error"}`} 
                  type="text" value={zipcode} 
                  placeholder='Enter your Pincode' 
                  onChange={handlePincodeChange} 
                  maxLength={6}
                  onKeyPress={(e) => {
                    if (!/\d/.test(e.key)) {
                        e.preventDefault();
                    }
                }}/>
                  {pincodeError && <span className="error-text">{pincodeError}</span>}
                </label>
                <div className='d-flex gap-2 justify-content-end '>
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
                  <button className='btn main-button' disabled={selectedOptions.length === 0} onClick={() => getCourierServiceAvability()}>Export Courier Serviceability</button>
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

       {/* <div className='box-shadow shadow-sm mt-3 p10 mb-3'>
          <h4>Instructions:</h4>
          <ul>
            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, repellat?</li>
            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, repellat?</li>
            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, repellat?</li>
            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, repellat?</li>
            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, repellat?</li>
          </ul>
           </div>*/}
      </section>
    </>
  )
}


export default ServiceabilityPage