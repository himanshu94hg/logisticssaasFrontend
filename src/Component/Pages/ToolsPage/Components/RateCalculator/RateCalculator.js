import React from 'react'

const RateCalculator = () => {
  return (
    <>
      <section className='white-block box-shadow shadow-sm p10'>
        <h4>Rate Calculator</h4>
        <form>
          <div className="row bg-gray-300 p-t-20 m-b-10">
            <div className="form-group col-sm-6">
              <label htmlFor="inputPassword" className="col-form-label">
                Shipment Type
                <select
                  name="shipment_type"
                  required=""
                  className="select-field"
                  id="shipment_type"
                >
                  <option value="forward" selected="">
                    Forward
                  </option>
                  <option value="reverse">Reverse</option>
                </select>
              </label>
            </div>
          </div>
          <div className="row bg-gray-300 p-t-20 m-b-10">
            <div className="form-group col-sm-6">
              <label htmlFor="inputPassword" className="col-form-label">
                Pickup Pincode
                <input
                  type="number"
                  name="pickupPincode"
                  id="pickupPincode"
                  className="input-field"
                  placeholder="Enter Pickup Pincode"
                  maxLength={6}
                />
              </label>
            </div>
            <div className="form-group col-sm-6">
              <label htmlFor="inputPassword" className="col-form-label">
                Delivery Pincode
              </label>
              <input
                type="number"
                name="deliveryPincode"
                id="deliveryPincode"
                className="input-field"
                placeholder="Enter Delivery Pincode"
                maxLength={6}
              />
            </div>
          </div>
          <div className="row bg-gray-300 p-t-20 m-b-10">
            <div className="form-group col-sm-6">
              <label htmlFor="inputPassword" className="col-form-label">
                Weight (in kg)
              </label>
              <input
                type="text"
                name="weight"
                id="weight"
                className="input-field"
                placeholder="e.g 0.9 for 900 gm"
              />
            </div>
            <div className="form-group col-sm-6">
              <label htmlFor="inputPassword" className="col-form-label">
                Dimensions
              </label>
              <div className="row">
                <div className="col-md-2 text-center pt-2">
                  <label>CM</label>
                </div>
                <div className="col-md-3">
                  <input
                    type="text"
                    id="length"
                    placeholder="L"
                    className="input-field"
                  />
                </div>
                <div className="col-md-3">
                  <input
                    type="text"
                    id="height"
                    placeholder="H"
                    className="input-field"
                  />
                </div>
                <div className="col-md-3">
                  <input
                    type="text"
                    id="width"
                    placeholder="W"
                    className="input-field"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 mt-2">
                  <b>Volumetric Weight</b> : <span id="vol_weight">0.0</span> Kg
                </div>
              </div>
            </div>
          </div>
          <div className="row bg-gray-300 p-t-20 m-b-10 cod_row">
            <div className="form-group col-sm-6">
              <label htmlFor="cod" className="col-form-label">
                COD
              </label>
              <select name="cod" className="custom-select" id="cod">
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </div>
            <div
              className="form-group col-sm-6 invoice_value"
              style={{ display: "none" }}
            >
              <label htmlFor="invoice_value" className="col-form-label">
                Invoice Value
              </label>
              <input
                type="number"
                id="invoice_value"
                placeholder="Invoice Value"
                className="input-field"
              />
            </div>
          </div>
          <div className='d-flex w-100 justify-content-end mt-4'>
            <button className="btn main-button">Get Rates</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default RateCalculator