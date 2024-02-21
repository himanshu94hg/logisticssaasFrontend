import React from 'react'
import './ZoneMappingPop.css'

const ZoneMappingPop = (props) => {
  return (
    <>
      <section className={`zone-mapping-container ${props.ZoneMapping ? '' : 'd-none'}`}>
        <h4>Zone Mapping</h4>
        <input type="text" />
      </section>
    </>
  )
}

export default ZoneMappingPop