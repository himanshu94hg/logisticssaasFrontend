import React, { useState } from 'react'
import './CustomerSupportPage.css'

const CustomerSupportPage = () => {

  const [CardActive, setCardActive] = useState(true)



  return (
    <>
      <div className='box-shadow shadow-sm p10 support-page'>
        <h4>Support</h4>
        <p className='text-blue fw-700'>Seek assistance by either generating a support ticket or perusing through informative help articles.</p>
        <div className="d-flex mt-5 gap-4">
          <div
            onClick={() => setCardActive(!CardActive)}
            className={`support-choice-card ${CardActive ? 'active' : ''}`}>
            <span>Raise a Ticket</span>
          </div>
          <div
            onClick={() => setCardActive(!CardActive)}
            className={`support-choice-card ${!CardActive ? 'active' : ''}`}>
            <span>Help Articles</span>
          </div>
        </div>

        <div>
          <div class="search-container mt-5">
            <input required="" type="text" name="text" class="input-field" />
            <label class="label">Search by Ticket ID, AWB, Pickup ID</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default CustomerSupportPage