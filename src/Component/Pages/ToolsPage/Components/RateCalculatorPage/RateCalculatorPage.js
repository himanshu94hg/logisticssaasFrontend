import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PieChart from '../../../OrdersPage/Components/Processing/SingleShipPop/PieChart';
import StarRating from '../../../OrdersPage/Components/Processing/SingleShipPop/StarRating';

const RateCalculatorPage = () => {
  const dispatch = useDispatch();
  const [length, setLength] = useState(null);
  const [height, setHeight] = useState(null);
  const [breadth, setBreadth] = useState(null);
  const [volWeight, setVolWeight] = useState(0.0);
  const [RateTable, setRateTable] = useState(false);
  const [invoiceField, setInvoiceField] = useState(false);

  const [formData, setFormData] = useState({
    shipment_type: "Forward",
    source_pincode: null,
    destination_pincode: null,
    weight: null,
    volmetric_weight: volWeight,
    is_cod: "No",

  });

  const { sellerData } = useSelector(state => state?.toolsSectionReducer)

  const handleSubmit = () => {
    setRateTable(true);
    dispatch({
      type: "GET_RATE_CALCULATOR",
      payload: formData
    })
  }

  const handleSelect = (e, fieldName) => {
    const temp = e.target.value
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: temp,
    }))
  }

  // const handleChange = (e) => {
  //   const scaleDataName = e.target.name
  //   if (scaleDataName === "length" || scaleDataName === "breadth" || scaleDataName === "height") {
  //     setLength(e.target.value)
  //     setHeight(e.target.value)
  //     setBreadth(e.target.value)
  //   } else {
  //     setFormData(prevData => ({
  //       ...prevData,
  //       [e.target.name]: e.target.value
  //     }));
  //   }
  // };


  const handleChange = (e) => {
    const scaleDataName = e.target.name;
    if (scaleDataName === "length" || scaleDataName === "breadth" || scaleDataName === "height") {
      setLength(e.target.value);
      setHeight(e.target.value);
      setBreadth(e.target.value);
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
    const volmetricWeight = length * breadth * height / 50000
    setVolWeight(volmetricWeight)
    setFormData(prevData => ({
      ...prevData,
      volmetric_weight: volmetricWeight
    }));
    if (formData?.is_cod === "Yes") {
      setInvoiceField(true)
    } else {
      setInvoiceField(false)
    }
  }, [length, breadth, height, formData.is_cod])


  console.log(formData, "this is form data input ")

  return (
    <>
      <div className='row m-0'>
        <section className='box-shadow shadow-sm col rate-calculator me-4 p-4'>
          <form>
            <div className='d-flex justify-content-between align-items-center'>
              <h4>Rate Calculator</h4>

              <label style={{ width: '400px' }} className=''>
                Order ID (Optional)
                <input
                  type="text"
                  className="input-field"
                  placeholder="Enter Order ID"
                />
              </label>

            </div>

            <div className='row mt-4'>
              <label className='col'>
                Shipment Type
                <select
                  name="shipment_type"
                  required
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
                  className="input-field"
                  name={"source_pincode"}
                  placeholder="Enter Pickup Pincode"
                  onChange={(e) => handleChange(e)}
                />
              </label>
              <label className='col'>
                Delivery Pincode
                <input
                  type="text"
                  className="input-field"
                  name={"destination_pincode"}
                  placeholder="Enter Delivery Pincode"
                  onChange={(e) => handleChange(e)}
                />
              </label>
            </div>


            <div className='mt-5 row flex-row align-items-end'>
              <label className='col-4'>
                <span className='fw-bold'>Actual Weight</span>
                <input
                  type="text"
                  name={"weight"}
                  className='input-field'
                  onChange={(e) => handleChange(e)}
                />
              </label>
              <label className='col'>
                <p><strong>Note:</strong> Minimum chargeable weight is 0.5kg</p>
              </label>
            </div>


            <div className='mt-4'>
              <p className='fw-bold lh-base'>Volumetric Weight <span className='info-container'><span className='question-icon'><FontAwesomeIcon icon={faQuestion} /></span>
                <span className='info-hover-show'>It is the overall size of shipment and is calculated by multiplying the shipments length, width and height by 5000 or 4000.</span></span>
              </p>
            </div>
            <div className="row">
              {/* Length (cm) */}
              <label className='col'>
                Length (cm)
                <input
                  className='input-field'
                  type="text"
                  name="length"
                  onChange={(e) => handleChange(e)}
                />
              </label>

              {/* Breadth (cm) */}
              <label className='col'>
                Breadth (cm)
                <input
                  className='input-field'
                  type="text"
                  name="breadth"
                  onChange={(e) => handleChange(e)}
                />
              </label>

              {/* Height (cm) */}
              <label className='col'>
                Height (cm)
                <input
                  className='input-field'
                  type="text"
                  name="height"
                  onChange={(e) => handleChange(e)}
                />
              </label>
            </div>

            <div className="mt-3">
              <p><strong>Estimated Volumetric Weight</strong>: <span>{volWeight} Kg</span></p>
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
                  type="text"
                  name="invoice_amount"
                  onChange={(e) => handleChange(e)}
                />
              </label>}
            </div>

            <div className='d-flex w-100 justify-content-end mt-4'>
              <button onClick={() => setRateTable(false)} type='button' className="btn main-button-outline">Reset</button>
              <button onClick={() => handleSubmit()} type='button' className="ms-2 btn main-button">Calculate</button>
            </div>
          </form>
        </section>
        <section className='box-shadow shadow-sm p10 col-5'></section>
      </div>

      {sellerData?.map((item) => {
        return (
          <div className={`${RateTable ? '' : 'd-none'}`}>
            <section className='box-shadow shadow-sm p10'>
              <div className='ship-container-row box-shadow shadow-sm' >
                <div className='d-flex gap-2'>
                  <div className='img-container'>
                    <img src="" alt="" />
                  </div>
                  <div className='d-flex flex-column justify-content-center'>
                    <p>{item?.courier_partner}</p>
                    {/* <p>partner_title</p> */}
                    <p>RTO Charges: ₹0</p>
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
      })}

    </>
  );
};

export default RateCalculatorPage;
