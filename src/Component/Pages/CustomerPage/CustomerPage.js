import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './CustomerPage.css';
import NavTabs from './Components/navTabs/NavTabs';
import BasicInfo from './Components/BasicInfo';
import KYCInfo from './Components/KYCInfo';
import AgreementInfo from './Components/AgreementInfo';
import AccountInfo from './Components/AccountInfo';
import LoaderScreen from '../../LoaderScreen/LoaderScreen';
import VerifiedCustomer from './VerifiedCustomer/VerifiedCustomer';
import { useSelector } from 'react-redux';

const CustomerPage = () => {
  const location = useLocation();
  const defaultTab = location.state?.activeTab || "Basic Information";
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [loader, setLoader] = useState(false)
  const [DetailsView, setDetailsView] = useState(false)
  const userData = useSelector(state => state?.paymentSectionReducer.sellerProfileCard);

  useEffect(() => {
    if (userData?.is_basic_info_verified && userData?.is_acc_info_verified && userData?.is_kyc_info_verified && userData?.is_agreement_info_verified) {
      setDetailsView(true)
    }
  }, [userData])


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


  console.log(activeTab, "activeTabactiveTab")


  return (
    <>
      <NavTabs DetailsView={DetailsView} activeTab={activeTab} setActiveTab={setActiveTab} />

      {
        DetailsView ?
          <VerifiedCustomer /> :
          <>
            <div className={`${activeTab === "Basic Information" ? "d-block" : "d-none"}`}>
              <BasicInfo activeTab={activeTab} />
            </div>

            <div className={`${activeTab === "Account Information" ? "d-block" : "d-none"}`}>
              <AccountInfo activeTab={activeTab} />
            </div>

            <div className={`${activeTab === "KYC Information" ? "d-block" : "d-none"}`}>
              <KYCInfo activeTab={activeTab} />
            </div>

            <div className={`${activeTab === "Agreement" ? "d-block" : "d-none"}`}>
              <AgreementInfo activeTab={activeTab} DetailsView={DetailsView} setDetailsView={setDetailsView} />
            </div>
          </>
      }

      <LoaderScreen loading={loader} />
    </>
  );
};

export default CustomerPage;
