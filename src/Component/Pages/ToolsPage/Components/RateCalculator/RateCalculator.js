import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';


const marks = [
  { value: 0, label: '0' },
  { value: 2, label: '2' },
  { value: 4, label: '4' },
  { value: 6, label: '6' },
  { value: 8, label: '8' },
  { value: 10, label: '10' },
];

function valuetext(value) {
  return value;
}

const RateCalculator = () => {
  const [weight, setWeight] = useState(1); // Initialize weight state with a default value of 1

  const handleWeightChange = (event, newValue) => {
    setWeight(newValue);
  };

  return (
    <>
      <div className='row m-0'>
        <section className='box-shadow shadow-sm col rate-calculator me-4 p-4'>
          <h4>Rate Calculator</h4>
          <form>
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

            <div className='row mt-4'>
              <label className='col'>Dimensions (CM)</label>
              <label className='col'>
                <input
                  type="text"
                  id="length"
                  placeholder="L"
                  className="input-field"
                />
              </label>
              <label className='col'>
                <input
                  type="text"
                  id="height"
                  placeholder="H"
                  className="input-field"
                />
              </label>
              <label className='col'>
                <input
                  type="text"
                  id="width"
                  placeholder="W"
                  className="input-field"
                />
              </label>
              <label className='col ws-nowrap'><b>Volumetric Weight</b> : <span id="vol_weight">0.0</span> Kg</label>
            </div>

            <label style={{ width: '300px' }}>Payment Type
              <select className="select-field">
                <option value="Prepaid">Prepaid</option>
                <option value="COD">COD</option>
              </select>
            </label>

            <div className='d-flex w-100 justify-content-end mt-4'>
              <button type='button' className="btn main-button-outline">Reset</button>
              <button type='button' className="ms-2 btn main-button">Calculate</button>
            </div>
          </form>
        </section>
        <section className='box-shadow shadow-sm p10 col-5'></section>
      </div>
    </>
  );
};

export default RateCalculator;
