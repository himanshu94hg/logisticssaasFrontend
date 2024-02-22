import React from 'react'
import './ZoneMappingPop.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { PiExport } from "react-icons/pi";

const ZoneMappingPop = (props) => {
  return (
    <>
      <section className={`zone-mapping-container ${props.ZoneMapping ? '' : 'd-none'}`}>
        <h4>Zone Mapping</h4>
        <form action="">
          <div className='d-flex mt-4 gap-4 align-items-end justify-content-between'>
            <label style={{ width: '100%' }}>
              Pick-up Pincode
              <input className='input-field' type="text" placeholder='6 Digits Pick-up Area Pincode' />
            </label>
            <button type='button' className='btn main-button'>
              <span className='rotate-180'><PiExport fontSize={25} /></span> Export
            </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default ZoneMappingPop