import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './CustomerPage.css';
import NavTabs from './Components/navTabs/NavTabs';
import BasicInfo from './Components/BasicInfo';
import KYCInfo from './Components/KYCInfo';
import AgreementInfo from './Components/AgreementInfo';
import AccountInfo from './Components/AccountInfo';
import LoaderScreen from '../../LoaderScreen/LoaderScreen';

const CustomerPage = () => {
  const location = useLocation();
  const defaultTab = location.state?.activeTab || "Basic Information";
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state?.activeTab]);

  useEffect(() => {
    setLoader(true)
    if (activeTab) {
        setTimeout(() => {
            setLoader(false)
        }, 500);
    }
}, [activeTab])


console.log(activeTab,"activeTabactiveTab")


  return (
    <>
      <NavTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Basic Information */}
      <div className={`${activeTab === "Basic Information" ? "d-block" : "d-none"}`}>
        <BasicInfo  activeTab={activeTab} />
      </div>

      {/* Account Information */}
      <div className={`${activeTab === "Account Information" ? "d-block" : "d-none"}`}>
        <AccountInfo  activeTab={activeTab} />
      </div>

      {/* KYC Information */}
      <div className={`${activeTab === "KYC Information" ? "d-block" : "d-none"}`}>
        <KYCInfo  activeTab={activeTab} />
      </div>

      {/* Agreement */}
      <div className={`${activeTab === "Agreement" ? "d-block" : "d-none"}`}>
        <AgreementInfo />
      </div>
      <LoaderScreen loading={loader} />
    </>
  );
};

export default CustomerPage;
