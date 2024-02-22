import React, { useState } from 'react'
import NavTabs from './navTabs/NavTabs';

const ServiceabilityPage = () => {
  const [activeTab, setActiveTab] = useState("Check Serviceability");

  return (
    <>
      <NavTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <section className='box-shadow shadow-sm p10 white-block'>
        <div className={`${activeTab === "Check Serviceability" ? "d-block" : "d-none"}`}></div>
      </section>
    </>
  )
}

export default ServiceabilityPage