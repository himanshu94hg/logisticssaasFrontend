import axios from 'axios';
import Cookies from 'js-cookie';
import Toggle from 'react-toggle';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useRef, useState } from 'react';
import globalDebouncedClick from '../../../../../debounce';
import { BASE_URL_CORE } from '../../../../../axios/config';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LoaderScreen from '../../../../LoaderScreen/LoaderScreen';
import { customErrorFunction } from '../../../../../customFunction/errorHandling';
import PieChart from '../../../OrdersPage/Components/Processing/SingleShipPop/PieChart';
import RatingStars from '../../../../common/RatingStars/RatingStars';


const RateCalculatorPage = () => {
  const sellerDataRef = useRef()
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [length, setLength] = useState(null);
  const [height, setHeight] = useState(null);
  const [orderId, setOrderId] = useState("");
  const [loader, setLoader] = useState(false)
  const [breadth, setBreadth] = useState(null);
  const [shipData, setShipData] = useState([])
  const [orderNum, setOrderNum] = useState("");
  const [volWeight, setVolWeight] = useState(0);
  const [RateTable, setRateTable] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [orderField, setOrderField] = useState(false);
  const [chargedWeight, setChargedWeight] = useState(0);
  const [invoiceField, setInvoiceField] = useState(false);
  const partnerList = JSON.parse(localStorage.getItem('partnerList'));
  const { zonePathName } = useSelector(state => state?.authDataReducer)
  const { sellerData, reportSchedulerRes, ratePrefilledData } = useSelector(state => state?.toolsSectionReducer)

  const [formData, setFormData] = useState({
    shipment_type: "Forward",
    source_pincode: null,
    destination_pincode: null,
    weight: null,
    volmetric_weight: volWeight,
    is_cod: "No",
    length: null,
    weight: null,
    height: null

  });

  const { screenWidthData } = useSelector(state => state?.authDataReducer)

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };


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
        length: null,
        weight: null,
        height: null
      });
    }
  }, [zonePathName])


  useEffect(() => {
    if (ratePrefilledData) {
      setFormData(prev => ({
        ...prev,
        shipment_type: ratePrefilledData?.shipment_type,
        source_pincode: ratePrefilledData?.source_pincode,
        destination_pincode: ratePrefilledData?.destination_pincode,
        weight: ratePrefilledData?.weight / 1000,
        volmetric_weight: ratePrefilledData?.volmetric_weight,
        is_cod: ratePrefilledData?.is_cod,
        invoice_amount: ratePrefilledData?.invoice_amount,
        length: ratePrefilledData?.length,
        breadth: ratePrefilledData?.breadth,
        height: ratePrefilledData?.height
      }))
      setLength(ratePrefilledData?.length)
      setHeight(ratePrefilledData?.height)
      setBreadth(ratePrefilledData?.breadth)
      setOrderNum(ratePrefilledData?.id)
    }
  }, [ratePrefilledData]);

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
    const newErrors = {};
    if (!formData.shipment_type) {
      newErrors.shipment_type = "Shipment Type is required!";
    }

    if (!formData.source_pincode) {
      newErrors.source_pincode = "Source Pincode is required!";
    } else if (formData.source_pincode.length !== 6) {
      newErrors.source_pincode = "Source Pincode must consist of 6 characters.";
    }

    if (!formData.destination_pincode) {
      newErrors.destination_pincode = "Destination Pincode is required!";
    } else if (formData.destination_pincode.length !== 6) {
      newErrors.destination_pincode = "Destination Pincode must consist of 6 characters.";
    }

    if (!formData.weight) {
      newErrors.weight = "Weight is required!";
    }

    if (!length) {
      newErrors.length1 = "Length is required!";
    }

    if (!breadth) {
      newErrors.breadth = "Breadth is required!";
    }

    if (!height) {
      newErrors.height = "Height is required!";
    }

    setErrors(newErrors);
    console.log(newErrors, "this is key data");

    if (Object.keys(newErrors).length === 0) {
      setLoader(true)
      setTimeout(() => {
        setLoader(false)
      }, 1000);
      dispatch({
        type: "RATE_CALCULATOR_ACTION",
        payload: formData
      });
    }
  };


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
    setShipData([])
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
      setOrderId(e.target.value)
    } else {
      setOrderId('')
    }
  }

  const handleChange = (e) => {
    const scaleDataName = e.target.name;
    if (scaleDataName === "length" || scaleDataName === "breadth" || scaleDataName === "height") {
      const { name, value } = e.target;
      const formattedValue = parseFloat(value).toFixed(2);
      if (name === "length") {
        setLength(formattedValue);
      } else if (name === "breadth") {
        setBreadth(formattedValue);
      } else if (name === "height") {
        setHeight(formattedValue);
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
    if (orderId !== "") {
      setLoader(true)
      setTimeout(() => {
        setLoader(false)
      }, 500);
      dispatch({
        type: "RATE_CALCULATOR_ACTION_ORDER_ID",
        payload: orderId
      });
    } else {
      toast.error("Please enter order id !")
    }
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
  let authToken = Cookies.get("access_token")

  const navigate = useNavigate()
  const handleShip = (option) => {
    if (orderId) {
      axios.get(`${BASE_URL_CORE}/core-api/shipping/ship-order/${orderNum}/?courier_partner=${option}`, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      })
        .then((response) => {
          if (response?.data?.status) {
            navigate('/Orders', { state: { data: "ratecalc" } });
            toast.success('Order Shipped Successfully!');
            dispatch({ type: "PAYMENT_DATA_ACTION" });
          }

        }).catch((error) => {
          customErrorFunction(error)
        });
    } else {
      navigate("/create-order")
    }
  }

  return (
    <>
      <div className='rate-calc-page'>
        <div ref={sellerDataRef}>
          <section className='box-shadow shadow-sm p10 rate-des'>
            <h4>Rate Calculator</h4>
            <div className={`gap-4 d-flex ${screenWidthData < 992 && 'mb-5'} align-items-lg-center flex-column flex-lg-row`}>
              <div className='d-flex align-items-center gap-1'>
                <p>Calculate by giving Order ID</p>
                <Toggle
                  checked={isChecked}
                  onChange={handleToggle}
                />
              </div>
              <div className='d-flex gap-2'>
                <label className={`${!isChecked ? 'invisible' : ''}`}>
                  <input
                    type="search"
                    className="input-field"
                    value={orderId ?? ""}
                    placeholder="Enter Order ID"
                    onChange={(e) => handleChangeOrder(e, "order_id")}
                  />
                </label>
                <button className={`btn main-button ${!isChecked ? 'invisible' : ''}`} onClick={() => globalDebouncedClick(() => orderIdApiCAll())}>Search</button>
              </div>
            </div>
            <form>
              <div style={containerStyle}>
                <div className='mt-lg-5 d-flex gap-3 flex-column flex-lg-row'>
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
                    {errors.source_pincode && <span className="custom-error">{errors.source_pincode}</span>}
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
                    {errors.destination_pincode && <span className="custom-error">{errors.destination_pincode}</span>}
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
                <div className='d-flex gap-3 mt-lg-5 flex-column flex-lg-row'>
                  <label className=''>
                    <strong>Actual Weight</strong>
                    <input
                      type="text"
                      name={"weight"}
                      value={formData.weight}
                      className='input-field'
                      onChange={(e) => handleChange(e)}
                      placeholder='e.g 0.9 for 900 gm'
                      onKeyPress={(e) => {
                        if (!/\d/.test(e.key) && e.key !== '.') {
                          e.preventDefault();
                        }
                        if (e.key === '.' && e.target.value.includes('.')) {
                          e.preventDefault();
                        }
                        if (e.target.value.includes('.') && e.target.value.split('.')[1].length >= 2) {
                          e.preventDefault();
                        }
                      }}
                    />
                    {errors.weight && <span className="custom-error">{errors.weight}</span>}
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
                        if (!/\d/.test(e.key) && e.key !== '.') {
                          e.preventDefault();
                        }
                        if (e.key === '.' && e.target.value.includes('.')) {
                          e.preventDefault();
                        }
                        if (e.target.value.includes('.') && e.target.value.split('.')[1].length >= 2) {
                          e.preventDefault();
                        }
                      }}
                    />
                    {errors.length1 && <span className="custom-error">{errors.length1}</span>}
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
                        if (!/\d/.test(e.key) && e.key !== '.') {
                          e.preventDefault();
                        }
                        if (e.key === '.' && e.target.value.includes('.')) {
                          e.preventDefault();
                        }
                        if (e.target.value.includes('.') && e.target.value.split('.')[1].length >= 2) {
                          e.preventDefault();
                        }
                      }}
                    />
                    {errors.breadth && <span className="custom-error">{errors.breadth}</span>}
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
                        if (!/\d/.test(e.key) && e.key !== '.') {
                          e.preventDefault();
                        }
                        if (e.key === '.' && e.target.value.includes('.')) {
                          e.preventDefault();
                        }
                        if (e.target.value.includes('.') && e.target.value.split('.')[1].length >= 2) {
                          e.preventDefault();
                        }
                      }}
                    />
                    {errors.height && <span className="custom-error">{errors.height}</span>}
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
          <LoaderScreen loading={loader} />
          {shipData.length > 0 && <section className='mt-5'>  {shipData?.map((item) => {
            return (
              <div className={`mb-5 ${sellerData ? '' : 'd-none'}`}>
                <section className=''>
                  <div className='ship-container-row box-shadow shadow-sm' >
                    <div className='d-flex flex-column justify-content-center'>
                      <div className='d-flex gap-2 '>
                        <div className='img-container'>
                          {item?.partner_keyword && <img src={partnerList[item?.partner_keyword]["image"]} alt='Partner' />}
                        </div>
                        <div className='d-flex flex-column justify-content-center'>
                          {item?.partner_keyword && partnerList[item?.partner_keyword]["title"]}
                          <p>{"Delivering Excellence, Every Mile"}</p>
                          <p>RTO Charges: ₹{item?.rto_charge.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                    <div className='d-flex align-items-center gap-2 ship-ratings'>
                      <table className='performance-rating'>
                        <tbody>
                          <tr>
                            <td>Pickup Performance</td>
                            <td><RatingStars rating={4.5} /></td>
                          </tr>
                          <tr>
                            <td>Delivery Performance</td>
                            <td><RatingStars rating={4.5} /></td>
                          </tr>
                          <tr>
                            <td>NDR Performance</td>
                            <td><RatingStars rating={4.5} /></td>
                          </tr>
                          <tr>
                            <td>RTO Performance</td>
                            <td><RatingStars rating={4.5} /></td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="chart-container">
                        <PieChart rating={4.5} />
                        <p>Overall Rating</p>
                      </div>
                    </div>
                    <div className='ss-shipment-charges'>
                      <p><strong>₹{(item?.rate + item?.cod_charge + item?.early_cod_charge).toFixed(2)} </strong> <span>(Inclusive of all taxes )</span><br />
                        <span>Freight Charges: <strong>₹ {(item?.rate).toFixed(2)}</strong></span><br />
                        <span>+ COD Charges: <strong>₹ {(item?.cod_charge).toFixed(2)}</strong></span><br />
                        <span>+Early COD Charges: <strong>₹ {(item?.early_cod_charge).toFixed(2)}</strong></span><br />
                      </p>
                    </div>
                    <div className='d-flex flex-column gap-2 align-items-end'>
                      <button className='btn main-button' onClick={() => handleShip(item?.partner_keyword)}>Ship Now</button>
                      <p><span>EDD: <strong>{item?.estimate_days} days</strong></span></p>
                    </div>
                    {item?.is_recommended && <span className="recommended"></span>}
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
