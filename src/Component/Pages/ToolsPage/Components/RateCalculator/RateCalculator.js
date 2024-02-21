import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion, faQuestion } from '@fortawesome/free-solid-svg-icons';
import StarRating from '../../../OrdersPage/Components/Processing/SingleShipPop/StarRating';
import PieChart from '../../../OrdersPage/Components/Processing/SingleShipPop/PieChart';


const marks = [
  { value: 0, label: '0' },
  { value: 0.5, label: '0.5' },
  { value: 1, label: '1' },
  { value: 1.5, label: '1.5' },
  { value: 2, label: '2' },
  { value: 2.5, label: '2.5' },
  { value: 3, label: '3' },
  { value: 10, label: '10' },
];

// const marks = [
//   { value: 0, label: '0' },
//   { value: 0.5, label: '0.5' },
//   { value: 1, label: '1' },
//   { value: 1.5, label: '1.5' },
//   { value: 2, label: '2' },
//   { value: 2.5, label: '2.5' },
//   { value: 3, label: '3' },
//   { value: 5, label: '5' },
//   { value: 10, label: '10' },
//   { value: 15, label: '15' },
//   { value: 20, label: '20' },
//   { value: 25, label: '25' },
//   { value: 50, label: '50' },
//   { value: 100, label: '100' },
// ];

// const marks = [
//   { value: 0, label: '0' },
//   { value: 1, label: '1' },
//   { value: 2, label: '2' },
//   { value: 3, label: '3' },
//   { value: 5, label: '5' },
//   { value: 10, label: '10' },
//   { value: 15, label: '15' },
//   { value: 20, label: '20' },
//   { value: 25, label: '25' },
//   { value: 50, label: '50' },
//   { value: 100, label: '100' },
// ];

function valuetext(value) {
  return value;
}

const RateCalculator = () => {
  const [weight, setWeight] = useState(1); // Initialize weight state with a default value of 1

  const [RateTable, setRateTable] = useState(false)

  const handleWeightChange = (event, newValue) => {
    setWeight(newValue);
  };

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
                >
                  <option value="forward">Forward</option>
                  <option value="reverse">Reverse</option>
                </select>
              </label>
              <label className='col'>
                Pickup Pincode
                <input
                  type="text"
                  className="input-field"
                  placeholder="Enter Pickup Pincode"
                />
              </label>
              <label className='col'>
                Delivery Pincode
                <input
                  type="text"
                  className="input-field"
                  placeholder="Enter Delivery Pincode"
                />
              </label>
            </div>


            <div className='mt-5 row align-items-center'>
              <label className='col-2'>Actual Weight in KG</label>
              <Box className="col" style={{ width: '100%' }}>
                <Slider
                  aria-label="Always visible"
                  value={weight}
                  onChange={handleWeightChange}
                  getAriaValueText={valuetext}
                  step={0.1}
                  marks={marks}
                  min={0}
                  max={10}
                  valueLabelDisplay="on"
                />
              </Box>

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
                  type="text" />
              </label>

              {/* Breadth (cm) */}
              <label className='col'>
                Breadth (cm)
                <input
                  className='input-field'
                  type="text" />
              </label>

              {/* Height (cm) */}
              <label className='col'>
                Height (cm)
                <input
                  className='input-field'
                  type="text" />
              </label>
            </div>

            <div className="mt-3">
              <p><strong>Estimated Volumetric Weight</strong>: <span>0.25 Kg</span></p>
            </div>

            <div className='mt-3'>
              <label style={{ width: '300px' }}>Payment Type
                <select className="select-field">
                  <option value="Prepaid">Prepaid</option>
                  <option value="COD">COD</option>
                </select>
              </label>
            </div>

            <div className='d-flex w-100 justify-content-end mt-4'>
              <button onClick={() => setRateTable(false)} type='button' className="btn main-button-outline">Reset</button>
              <button onClick={() => setRateTable(true)} type='button' className="ms-2 btn main-button">Calculate</button>
            </div>
          </form>
        </section>
        <section className='box-shadow shadow-sm p10 col-5'></section>
      </div>
      <div className={`${RateTable ? '' : 'd-none'}`}>
        <section className='box-shadow shadow-sm p10'>
          <div className='ship-container-row box-shadow shadow-sm' >
            <div className='d-flex gap-2'>
              <div className='img-container'>
                <img src="" alt="" />
              </div>
              <div className='d-flex flex-column justify-content-center'>
                <p>partner_title</p>
                <p>partner_title</p>
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
              <p><strong>₹ </strong> <span>(Inclusive of all taxes )</span><br />
                <span>Freight Charges: <strong>₹ </strong></span><br />
                <span>+ COD Charges: <strong>₹ </strong></span><br />
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
    </>
  );
};

export default RateCalculator;
