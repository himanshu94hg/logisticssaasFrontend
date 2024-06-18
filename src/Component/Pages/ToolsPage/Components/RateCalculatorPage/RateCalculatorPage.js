import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PieChart from '../../../OrdersPage/Components/Processing/SingleShipPop/PieChart';
import StarRating from '../../../OrdersPage/Components/Processing/SingleShipPop/StarRating';
import { debounce } from 'lodash';
import Toggle from 'react-toggle';
import globalDebouncedClick from '../../../../../debounce';

const RateCalculatorPage = () => {
  const sellerDataRef = useRef()
  const dispatch = useDispatch();
  const [length, setLength] = useState(null);
  const [height, setHeight] = useState(null);
  const [breadth, setBreadth] = useState(null);
  const [volWeight, setVolWeight] = useState(0);
  const [RateTable, setRateTable] = useState(false);
  const [invoiceField, setInvoiceField] = useState(false);
  const [orderField, setOrderField] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [chargedWeight, setChargedWeight] = useState(0);
  const [errors, setErrors] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [shipData, setShipData] = useState([])

  const handleToggle = () => {
    setIsChecked(!isChecked);

  };

  console.log(isChecked, "this is ischekced data")

  const [formData, setFormData] = useState({
    shipment_type: "Forward",
    source_pincode: null,
    destination_pincode: null,
    weight: null,
    volmetric_weight: volWeight,
    is_cod: "No",

  });

  const { sellerData, reportSchedulerRes, ratePrefilledData, ratingCardData } = useSelector(state => state?.toolsSectionReducer)
  const { zonePathName } = useSelector(state => state?.authDataReducer)


  useEffect(() => {
    if (sellerData) {
      setShipData(sellerData)
    }
  }, [sellerData])

  useEffect(() => {
    if (zonePathName) {
      setShipData([])
      setFormData({
        shipment_type: "Forward",
        source_pincode: null,
        destination_pincode: null,
        weight: null,
        volmetric_weight: 0,
        is_cod: "No",
      });
    }
  }, [zonePathName])


  useEffect(() => {
    if (ratePrefilledData) {
      setFormData(prev => ({
        ...prev,
        shipment_type: ratePrefilledData?.shipment_type,
        source_pincode:ratePrefilledData?.source_pincode,
        destination_pincode: ratePrefilledData?.destination_pincode,
        weight: ratePrefilledData?.weight/1000,
        volmetric_weight: ratePrefilledData?.volmetric_weight,
        is_cod: ratePrefilledData?.is_cod,
        invoice_amount:ratePrefilledData?.invoice_amount,
      }))
    } 
  }, [ratePrefilledData]);

  console.log(ratePrefilledData, "ratePrefilledDataratePrefilledData")

  useEffect(() => {
    if (reportSchedulerRes) {
      setRateTable(true);
    }
  }, [reportSchedulerRes])

  useEffect(() => {
    scrollToBottom();
  }, [sellerData]);

  const scrollToBottom = () => {
    if (sellerDataRef.current) {
      sellerDataRef.current.scrollTop = sellerDataRef.current.scrollHeight;
    }
  };

  const handleSubmit = () => {
    const newErrors = Object.keys(formData).reduce((errors, key) => {
      if (!formData[key]) {
        errors[key] = `${key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} is required !`;
      } else if (key === 'source_pincode' && formData[key].length !== 6) {
        errors[key] = " Pincode must consist of 6 characters.";
      } else if (key === 'destination_pincode' && formData[key].length !== 6) {
        errors[key] = "Pincode must consist of 6 characters.";
      }
      return errors;
    }, {});
    setErrors(newErrors);

    dispatch({
      type: "RATE_CALCULATOR_ACTION",
      payload: formData
    })
  }

  const handleReset = () => {
    setFormData({
      shipment_type: "Forward",
      source_pincode: null,
      destination_pincode: null,
      weight: null,
      volmetric_weight: 0,
      is_cod: "No",
    });
    setLength(null);
    setHeight(null);
    setBreadth(null);
    setRateTable(false);
    setInvoiceField(false);
    setOrderField(false);
    setOrderId("");
    setChargedWeight(0);
    setErrors([]);
  };


  const handleSelect = (e, fieldName) => {
    let value = e.target.value;
    if (fieldName === "shipment_type" && value === "Reverse") {
      setFormData((prevData) => ({
        ...prevData,
        [fieldName]: value,
        is_cod: "No",
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [fieldName]: value,
      }));
    }
  };


  const handleChangeOrder = (e, value) => {
    if (e.target.value !== '') {
      // setOrderField(true)
      setOrderId(e.target.value)
    } else {
      // setOrderField(false);
      setOrderId('')
    }
  }

  const handleChange = (e) => {
    const scaleDataName = e.target.name;
    if (scaleDataName === "length" || scaleDataName === "breadth" || scaleDataName === "height") {
      const { name, value } = e.target;
      if (name === "length") {
        setLength(value);
      } else if (name === "breadth") {
        setBreadth(value);
      } else if (name === "height") {
        setHeight(value);
      }
    } else {
      const { name, value } = e.target;
      setFormData(prevData => ({
        ...prevData,
        [name]: value
      }));
      if (name === "is_cod" && value === "Yes") {
        setFormData(prevData => ({
          ...prevData,
          invoice_amount: parseInt(e.target.value)
        }));
      } else if (name === "is_cod" && value === "No") {
        setFormData(prevData => {
          const { invoice_amount, ...rest } = prevData;
          return rest;
        });
      }
    }
  };

  useEffect(() => {
    const volmetricWeight = length * breadth * height / 5000;
    setVolWeight(volmetricWeight);
    setFormData(prevData => ({
      ...prevData,
      volmetric_weight: volmetricWeight
    }));
    if (formData?.is_cod === "Yes") {
      setInvoiceField(true);
    } else {
      setInvoiceField(false);
    }
  }, [length, breadth, height, formData.is_cod]);

  useEffect(() => {
    const { weight, volmetric_weight } = formData;
    if (volmetric_weight !== null) {
      const newChargedWeight = Math.max(weight, volmetric_weight);
      setChargedWeight(newChargedWeight);
    }
  }, [formData.weight, formData.volmetric_weight]);

  const containerStyle = {
    opacity: isChecked ? 0.5 : 1,
    pointerEvents: isChecked ? 'none' : 'auto',
  };

  const orderIdApiCAll = () => {
    dispatch({
      type: "RATE_CALCULATOR_ACTION_ORDER_ID",
      payload: orderId
    });
  }

  useEffect(() => {
    setFormData({
      shipment_type: "Forward",
      source_pincode: null,
      destination_pincode: null,
      weight: null,
      volmetric_weight: 0,
      is_cod: "No",
    });
    setOrderId("");
  }, [])

  return (
    <>
      <div className='rate-calc-page'>
        <div ref={sellerDataRef}>
          <section className='box-shadow shadow-sm p10 rate-des'>
            <h4>Rate Calculator</h4>
            <div className='gap-4 d-flex align-items-center'>
              <div className='d-flex align-items-center gap-1'>
                <p>Calculate by giving Order ID</p>
                <Toggle
                  checked={isChecked}
                  onChange={handleToggle}
                />
              </div>
              <label className={`${!isChecked ? 'invisible' : ''}`}>
                <input
                  type="search"
                  className="input-field"
                  value={orderId ?? ""}
                  placeholder="Enter Order ID"
                  onChange={(e) => handleChangeOrder(e, "order_id")}
                />
              </label>
              <button className={`btn main-button ${!isChecked ? 'invisible' : ''}`} onClick={()=>globalDebouncedClick(() => orderIdApiCAll())}>Search</button>
            </div>
            <form>
              <div style={containerStyle}>
                <div className='mt-5 d-flex gap-3'>
                  <label className=''>
                    Shipment Type
                    <select
                      name="shipment_type"
                      required
                      value={formData.shipment_type}
                      className="select-field"
                      id="shipment_type"
                      onChange={(e) => handleSelect(e, "shipment_type")}
                    >
                      <option value="Forward">Forward</option>
                      <option value="Reverse">Reverse</option>
                    </select>
                  </label>
                  <label className=''>
                    Pickup Pincode
                    <input
                      type="text"
                      className={`input-field ${errors.source_pincode && "input-field-error"}`}
                      name={"source_pincode"}
                      value={formData.source_pincode}
                      placeholder="Enter Pickup Pincode"
                      onChange={(e) => handleChange(e)}
                      maxLength={6}
                      onKeyPress={(e) => {
                        if (!/\d/.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                    />
                    {errors.source_pincode && <span className="error-text">{errors.source_pincode}</span>}
                  </label>
                  <label className=''>
                    Delivery Pincode
                    <input
                      type="text"
                      className={`input-field ${errors.destination_pincode && "input-field-error"}`}
                      value={formData.destination_pincode}
                      name={"destination_pincode"}
                      placeholder="Enter Delivery Pincode"
                      onChange={(e) => handleChange(e)}
                      maxLength={6}
                      onKeyPress={(e) => {
                        if (!/\d/.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                    />
                    {errors.destination_pincode && <span className="error-text">{errors.destination_pincode}</span>}
                  </label>
                  <label className=''>
                    Payment Type
                    <select className="select-field" onChange={(e) => handleSelect(e, "is_cod")} value={formData.is_cod}>
                      <option value="No">Prepaid</option>
                      {formData.shipment_type !== "Reverse" && <option value="Yes">COD</option>}
                    </select>
                  </label>
                  <label className={`${!invoiceField ? 'invisible' : ''}`}>
                    Invoice Amount (₹)
                    <input
                      className="input-field"
                      type="text"
                      name="invoice_amount"
                      value={formData.invoice_amount}
                      onChange={(e) => handleChange(e)}
                      maxLength={6}
                      onKeyPress={(e) => {
                        if (!/\d/.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                    />
                  </label>
                </div>
                <div className='d-flex gap-3 mt-5'>
                  <label className=''>
                    <strong>Actual Weight</strong>
                    <input
                      type="text"
                      name={"weight"}
                      value={ formData.weight}
                      className='input-field'
                      onChange={(e) => handleChange(e)}
                      placeholder='e.g 0.9 for 900 gm'
                      onKeyPress={(e) => {
                        if (!/\d|\./.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                    />
                    <span className='unit'>KG</span>
                  </label>
                  {/* Length (cm) */}
                  <label className=''>
                    Length
                    <input
                      className='input-field'
                      type="text"
                      name="length"
                      value={formData.length}
                      onChange={(e) => handleChange(e)}
                      placeholder='Enter Length'
                      onKeyPress={(e) => {
                        if (!/\d/.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                    />
                    <span className='unit'>CM</span>
                  </label>
                  {/* Breadth (cm) */}
                  <label className=''>
                    Breadth
                    <input
                      className='input-field'
                      type="text"
                      name="breadth"
                      value={formData.breadth}
                      onChange={(e) => handleChange(e)}
                      placeholder='Enter Breadth'
                      onKeyPress={(e) => {
                        if (!/\d/.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                    />
                    <span className='unit'>CM</span>
                  </label>
                  {/* Height (cm) */}
                  <label className=''>
                    Height
                    <input
                      className='input-field'
                      type="text"
                      name="height"
                      value={formData.height}
                      onChange={(e) => handleChange(e)}
                      placeholder='Enter Height'
                      onKeyPress={(e) => {
                        if (!/\d/.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                    />
                    <span className='unit'>CM</span>
                  </label>
                </div>
                <div className='mt-4'>
                  <p className='font12'><span className='text-red'>*</span> Minimum chargeable weight is 0.5kg</p>
                  <p className='font12 fw-bold'><span className='text-red'>*</span> Volumetric Weight<span className='info-container'><span className='question-icon font12'><FontAwesomeIcon icon={faQuestion} /></span>
                    <span className='info-hover-show'> It is the overall size of shipment and is calculated by multiplying the shipments length, width and height by 5000.</span></span>
                  </p>
                </div>
                <div className=" d-flex gap-2 mt-3 charged-weight-sec">
                  <label>
                    <strong>Chargeable Weight:</strong>
                    <input type="text" className='input-field' value={ratePrefilledData ? parseFloat(ratePrefilledData?.volmetric_weight)?.toFixed(2) : parseFloat(chargedWeight)?.toFixed(2)} />
                    <span className='unit'>KG</span>
                  </label>
                  {/* <span>{chargedWeight}</span> */}
                </div>

              </div>
              <div className='d-flex w-100 justify-content-end mt-4'>
                <button type='reset' className="btn main-button-outline" onClick={handleReset}>Reset</button>
                <button onClick={() => globalDebouncedClick(() => handleSubmit())} type='button' className="ms-2 btn main-button">Calculate</button>
              </div>
            </form>
          </section>
          {shipData.length > 0 && <section className='mt-5'>  {shipData?.map((item) => {
            return (
              <div className={`mb-5 ${sellerData ? '' : 'd-none'}`}>
                <section className=''>
                  <div className='ship-container-row box-shadow shadow-sm' >
                    <div className='d-flex flex-column justify-content-center'>
                      <div className='d-flex justify-content-center flex-column '>
                        <img
                          className='ms-3'
                          style={{ border: "1px solid gray", borderRadius: "50%" }}
                          width={"50px"}
                          height={"50px"}
                          src={item?.partner_image} alt="" />
                        <p>{item?.courier_partner}</p>
                        <p>RTO Charges: ₹{item?.rate}</p>
                      </div>
                    </div>
                    <div className='d-flex align-items-center gap-2'>
                      <table className='performance-rating'>
                        <tbody>
                          <tr>
                            <td>Pickup Performance</td>
                            <td><StarRating rating={4.5} /></td>
                          </tr>
                          <tr>
                            <td>Delivery Performance</td>
                            <td><StarRating rating={4.5} /></td>
                          </tr>
                          <tr>
                            <td>NDR Performance</td>
                            <td><StarRating rating={4.5} /></td>
                          </tr>
                          <tr>
                            <td>RTO Performance</td>
                            <td><StarRating rating={4.5} /></td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="chart-container">
                        <PieChart rating={4.5} />
                        <p>Overall Rating</p>
                      </div>
                    </div>
                    <div className='ss-shipment-charges'>
                      <p><strong>₹{item?.total_charge} </strong> <span>(Inclusive of all taxes )</span><br />
                        <span>Freight Charges:{item?.rate} <strong>₹ </strong></span><br />
                        <span>+ COD Charges:{item?.cod_charge} <strong>₹ </strong></span><br />
                        <span>+ Early COD Charges: <strong>₹ 0</strong></span><br />
                      </p>
                    </div>
                    <div className='d-flex flex-column gap-2 align-items-end'>
                      <button className='btn main-button'>Ship Now</button>
                      <p><span>EDD: <strong>N/A</strong></span></p>
                    </div>
                    <span className={`${item?.is_recommended ? "recommended" : ""} ${true ? '' : 'd-none'}`}></span>
                  </div>
                </section>
              </div>
            )
          })}</section>}
        </div>
      </div>
    </>
  );
};

export default RateCalculatorPage;
