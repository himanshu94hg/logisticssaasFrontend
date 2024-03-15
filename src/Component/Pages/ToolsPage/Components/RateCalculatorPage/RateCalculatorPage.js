import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PieChart from '../../../OrdersPage/Components/Processing/SingleShipPop/PieChart';
import StarRating from '../../../OrdersPage/Components/Processing/SingleShipPop/StarRating';
import { debounce } from 'lodash';
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

  const [formData, setFormData] = useState({
    shipment_type: "Forward",
    source_pincode: null,
    destination_pincode: null,
    weight: null,
    volmetric_weight: volWeight,
    is_cod: "No",

  });

  const { sellerData, reportSchedulerRes, ratePrefilledData, ratingCardData } = useSelector(state => state?.toolsSectionReducer)


  useEffect(() => {
    if (ratePrefilledData) {
      setFormData(ratePrefilledData);
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
    console.log("Resetting form...");

  /*  setLength('');
    setHeight('');
    setBreadth('');
    setVolWeight(0);
    setInvoiceField(false);
    setOrderField('false');
    setOrderId("");
    setChargedWeight(0);
    setFormData({
      shipment_type: "Forward",
      source_pincode: null,
      destination_pincode: null,
      weight: null,
      volmetric_weight: 0, // assuming you want to reset it to 0 here
      is_cod: "No",
    });
    console.log("Form reset completed.");*/
}
  const handleSelect = (e, fieldName) => {
    const temp = e.target.value
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: temp,
    }))
  }

  const handleChangeOrder = (e, value) => {
    if (e.target.value !== '') {
      setOrderField(true)
      setOrderId(e.target.value)
    } else {
      setOrderField(false);
    }
  }
  // const handleChange = (e) => {
  //   const scaleDataName = e.target.name;
  //   if (scaleDataName === "length" || scaleDataName === "breadth" || scaleDataName === "height") {
  //     setLength(e.target.value);
  //     setHeight(e.target.value);
  //     setBreadth(e.target.value);
  //   } else {
  //     const { name, value } = e.target;
  //     setFormData(prevData => ({
  //       ...prevData,
  //       [name]: value
  //     }));
  //     if (name === "is_cod" && value === "Yes") {
  //       setFormData(prevData => ({
  //         ...prevData,
  //         invoice_amount: parseInt(e.target.value)
  //       }));
  //     } else if (name === "is_cod" && value === "No") {
  //       setFormData(prevData => {
  //         const { invoice_amount, ...rest } = prevData;
  //         return rest;
  //       });
  //     }
  //   }
  // };

  // useEffect(() => {
  //   const volmetricWeight = length * breadth * height / 5000
  //   setVolWeight(volmetricWeight)
  //   setFormData(prevData => ({
  //     ...prevData,
  //     volmetric_weight: volmetricWeight
  //   }));
  //   if (formData?.is_cod === "Yes") {
  //     setInvoiceField(true)
  //   } else {
  //     setInvoiceField(false)
  //   }
  // }, [length, breadth, height, formData.is_cod])

  
  // useEffect(() => {
  //   const { weight, volmetric_weight } = formData;
  //   if (weight > volmetric_weight) {
  //     setChargedWeight(weight)
  //   } else if (weight < volmetric_weight) {
  //     setChargedWeight(volmetric_weight)
  //   }
  // }, [formData.weight, formData.volmetric_weight])
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
    opacity: orderField ? 0.5 : 1,
    pointerEvents: orderField ? 'none' : 'auto',
  };

  const orderIdApiCAll = () => {
    dispatch({
      type: "RATE_CALCULATOR_ACTION_ORDER_ID",
      payload: orderId
    });
  }

  return (
    <>
      <div ref={sellerDataRef} style={{ overflowY: 'auto', overflowX: "hidden", }}>
        <div className='row mb-3'>
          <section className='box-shadow shadow-sm col rate-calculator me-4 p-4'>
            <div className='d-flex justify-content-between align-items-center'>
              <h4>Rate Calculator</h4>
              <label style={{ width: '400px' }} className=''>
                Order ID (Optional)
                <input
                  type="text"
                  className="input-field"
                  placeholder="Enter Order ID"
                  onChange={(e) => handleChangeOrder(e, "order_id")}
                />
              </label>
              <div className='d-flex justify-content-end mt-4'>
                <button className='btn main-button' onClick={orderIdApiCAll}>Search</button>
              </div>
            </div>
            <div style={containerStyle}>
              <div className='row mt-4'>
                <label className='col'>
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
                <label className='col'>
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
                <label className='col'>
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
              </div>
              <div className='mt-5 row flex-row align-items-end'>
                <label className='col-4'>
                  <span className='fw-bold'>Actual Weight</span>
                  <input
                    type="number"
                    name={"weight"}
                    value={formData.weight}
                    className='input-field'
                    onChange={(e) => handleChange(e)}
                    placeholder='e.g 0.9 for 900 gm'
                  />
                </label>
                <label className='col'>
                  <p><strong>Note:</strong> Minimum chargeable weight is 0.5kg</p>
                </label>
              </div>
              <div className='mt-4'>
                <p className='fw-bold lh-base'>Volumetric Weight <span className='info-container'><span className='question-icon'><FontAwesomeIcon icon={faQuestion} /></span>
                  <span className='info-hover-show'>It is the overall size of shipment and is calculated by multiplying the shipments length, width and height by 5000.</span></span>
                </p>
              </div>
              <div className="row">
                {/* Length (cm) */}
                <label className='col'>
                  Length (cm)
                  <input
                    className='input-field'
                    type="number"
                    name="length"
                    onChange={(e) => handleChange(e)}
                    placeholder='Enter Length in cm'
                    onKeyPress={(e) => {
                      if (!/\d/.test(e.key)) {
                          e.preventDefault();
                      }
                  }}
                  />
                </label>

                {/* Breadth (cm) */}
                <label className='col'>
                  Breadth (cm)
                  <input
                    className='input-field'
                    type="number"
                    name="breadth"
                    onChange={(e) => handleChange(e)}
                    placeholder='Enter Breadth in cm'
                    onKeyPress={(e) => {
                      if (!/\d/.test(e.key)) {
                          e.preventDefault();
                      }
                  }}
                  />
                </label>

                {/* Height (cm) */}
                <label className='col'>
                  Height (cm)
                  <input
                    className='input-field'
                    type="number"
                    name="height"
                    onChange={(e) => handleChange(e)}
                    placeholder='Enter Height in cm'
                    onKeyPress={(e) => {
                      if (!/\d/.test(e.key)) {
                          e.preventDefault();
                      }
                  }}
                  />
                </label>
              </div>
              <div className="mt-3">
                <p><strong>Charged Weight:</strong><span>{chargedWeight} Kg</span></p>
              </div>
              <div className='mt-3 row'>
                <label className='col-md-6' >Payment Type
                  <select className="select-field" onChange={(e) => handleSelect(e, "is_cod")}>
                    <option value="No">Prepaid</option>
                    <option value="Yes">COD</option>
                  </select>
                </label>
                {invoiceField && <label className='col-md-6'>
                  Invoice Amount
                  <input
                    className='input-field'
                    type="number"
                    name="invoice_amount"
                    value={formData.invoice_amount}
                    onChange={(e) => handleChange(e)}
                    onKeyPress={(e) => {
                      if (!/\d/.test(e.key)) {
                          e.preventDefault();
                      }
                  }}
                  />
                </label>}
              </div>
            </div>
            <div className='d-flex w-100 justify-content-end mt-4'>
            <button type='reset' className="btn main-button-outline" onClick={handleReset}>Reset</button>
              <button onClick={() => handleSubmit()} type='button' className="ms-2 btn main-button">Calculate</button>
            </div>
          </section>
          <section className='box-shadow shadow-sm p10 col-5'></section>
        </div>

        {sellerData && <>  {sellerData?.map((item) => {
          return (
            <div className={`${sellerData ? '' : 'd-none'}`}>
              <section className='box-shadow shadow-sm p10'>
                <div className='ship-container-row box-shadow shadow-sm' >
                  <div className='d-flex gap-2'>
                    <div className='img-container'>
                      <img src="" alt="" />
                    </div>
                    <div className='d-flex flex-column justify-content-center'>
                      <p>{item?.courier_partner}</p>
                      {/* <p>partner_title</p> */}
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
                    <p><span>EDD: <strong></strong></span></p>
                  </div>
                  <span className={`recommended ${true ? '' : 'd-none'}`}></span>
                </div>
              </section>
            </div>
          )
        })}</>}
      </div>
    </>
  );
};

export default RateCalculatorPage;
