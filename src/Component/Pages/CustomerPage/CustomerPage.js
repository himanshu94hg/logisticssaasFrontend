import './CustomerPage.css';
import { useSelector } from 'react-redux';
import KYCInfo from './Components/KYCInfo';
import { useLocation } from 'react-router-dom';
import BasicInfo from './Components/BasicInfo';
import React, { useState, useEffect } from 'react';
import NavTabs from './Components/navTabs/NavTabs';
import AccountInfo from './Components/AccountInfo';
import AgreementInfo from './Components/AgreementInfo';
import LoaderScreen from '../../LoaderScreen/LoaderScreen';
import VerifiedCustomer from './VerifiedCustomer/VerifiedCustomer';
import { BASE_URL_CORE } from '../../../axios/config';
import axios from 'axios';
import { customErrorFunction } from '../../../customFunction/errorHandling';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';


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

  const [subAccount, setSubAccount] = useState(null)
  const [accountType, setAccountType] = useState("")
  const [subAccountCount, setSubAccountCount] = useState(null)
  let authToken = Cookies.get("access_token")


  useEffect(() => {
    const fetchSku = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL_CORE}/core-api/seller/sub-account/`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        if (response.status === 200) {
          const subAccounts = response?.data?.results?.map((item) => ({
            label: "Sub Account - " + item?.seller?.id,
            value: item.seller?.id
          }));
          setSubAccount(subAccounts);
          setSubAccountCount(response?.data?.results?.length)
        }
      } catch (error) {
        customErrorFunction(error);
      }
    };
    fetchSku();
  }, []);

  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch({ type: "SELLER_PROFILE_DATA_ACTION", payload: accountType });
  }, [accountType])

  console.log(accountType, "this is a account type data")


  return (
    <>
      <NavTabs
        activeTab={activeTab}
        subAccount={subAccount}
        DetailsView={DetailsView}
        setActiveTab={setActiveTab}
        setSubAccount={setSubAccount}
        setAccountType={setAccountType}
        subAccountCount={subAccountCount}
      />

      {
        DetailsView ?
          <VerifiedCustomer accountType={accountType} /> :
          <>
            <div className={`${activeTab === "Basic Information" ? "d-block" : "d-none"}`}>
              <BasicInfo activeTab={activeTab} accountType={accountType} />
            </div>

            <div className={`${activeTab === "Account Information" ? "d-block" : "d-none"}`}>
              <AccountInfo activeTab={activeTab} accountType={accountType} />
            </div>

            <div className={`${activeTab === "KYC Information" ? "d-block" : "d-none"}`}>
              <KYCInfo activeTab={activeTab} accountType={accountType} />
            </div>

            <div className={`${activeTab === "Agreement" ? "d-block" : "d-none"}`}>
              <AgreementInfo activeTab={activeTab} accountType={accountType} setDetailsView={setDetailsView} />
            </div>
          </>
      }

      <LoaderScreen loading={loader} />
    </>
  );
};

export default CustomerPage;
