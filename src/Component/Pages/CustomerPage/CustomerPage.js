import React, { useState } from 'react'
import './CustomerPage.css'
import NavTabs from './Components/navTabs/NavTabs';
import BasicInfo from './Components/BasicInfo';
import KYCInfo from './Components/KYCInfo';
import AgreementInfo from './Components/AgreementInfo';
import AccountInfo from './Components/AccountInfo';

const CustomerPage = () => {
  const [activeTab, setActiveTab] = useState("Basic Information");

    return (
        <>
            <NavTabs activeTab={activeTab} setActiveTab={setActiveTab} />


            {/* Basic Information */}
            <div className={`${activeTab === "Basic Information" ? "d-block" : "d-none"}`}>
                <BasicInfo activeTab={activeTab}/>
            </div>
            
            {/* Account Information */}
            <div className={`${activeTab === "Account Information" ? "d-block" : "d-none"}`}>
                <AccountInfo activeTab={activeTab}/>
            </div>
            
            {/* KYC Information */}
            <div className={`${activeTab === "KYC Information" ? "d-block" : "d-none"}`}>
                <KYCInfo activeTab={activeTab}/>
            </div>
            
            {/* Agreement */}
            <div className={`${activeTab === "Agreement" ? "d-block" : "d-none"}`}>
                <AgreementInfo />
            </div>

           
        </>
    )
}

export default CustomerPage