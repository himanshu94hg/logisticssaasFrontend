import "./App.css";
import 'devextreme/dist/css/dx.light.css';
import React, { useEffect, useState } from "react";
import Sidebar from "./Component/common/sidebar/SideNav";
import Header from "./Component/common/header/Header";
import Dashboard from "./Component/Pages/Dashboard/Dashboard";
import DailyPrefrences from './Component/common/Graph/DailyPrefrence';
import IndiaMapp from './Component/common/Graph/IndiaMapp';
import OrdersPage from './Component/Pages/OrdersPage/OrdersPage';
import AllOrders from './Component/Pages/OrdersPage/Components/AllOrders/AllOrders';
import ShipmentsPage from './Component/Pages/ShipmentsPage/ShipmentsPage';
import ChannelsIntegration from './Component/Pages/IntegrationsPage/Components/ChannelsIntegration';
import OMSIntegration from './Component/Pages/IntegrationsPage/Components/OMSIntegration';
import CouriersIntegration from './Component/Pages/IntegrationsPage/Components/CouriersIntegration';
import APIIntegration from './Component/Pages/IntegrationsPage/Components/APIIntegration';
import OtherIntegration from './Component/Pages/IntegrationsPage/Components/OtherIntegration';
import CreateOrderFlow from './Component/Pages/OrdersPage/Components/CreateOrderFlow/CreateOrderFlow';
import BillingPage from './Component/Pages/BillingPage/BillingPage'
import WeightRecoPage from './Component/Pages/WeightRecoPage/WeightRecoPage';
import MISPage from './Component/Pages/MISPage/MISPage';
import CustomerPage from './Component/Pages/CustomerPage/CustomerPage';
import CustomerSupportPage from './Component/Pages/CustomerSupportPage/CustomerSupportPage';
import SettingsPage from './Component/Pages/SettingsPage/SettingsPage';
import HelpArticles from './Component/Pages/CustomerSupportPage/Components/HelpArticles/HelpArticles';
import LoginPage from './Component/Pages/LoginPage/LoginPage';
import ManageWarehouse from './Component/Pages/ManageWarehouse/ManageWarehouse';
import AddWarehouse from './Component/Pages/ManageWarehouse/Components/AddWarehouse';
import ShippingRates from './Component/Pages/ToolsPage/Components/ShippingRates';
import ChannelIntegrationForm from './Component/Pages/IntegrationsPage/Components/ChannelIntegrationForm';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import WalletRechargeComponent from './Component/Pages/WalletRechargeComponent/WalletRechargeComponent';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { channelsIntegrationPattern, couriersIntegrationPattern, dailyPrefrencesPattern, generateApiKeyPattern, indexPattern, loginPattern, mergeOrdersPattern, omsIntegrationPattern, ordersPattern, reassignOrdersPattern, shipmentsPattern, socailPagePattern, splitOrdersPattern } from "./Routes";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import ProtectedRoute from "./ProtectedRoute";


function App() {

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [WalletRecharge, setWalletRecharge] = useState(false)
  const [tokenExists, setTokenExists] = useState(false); // State to store token existence

  useEffect(() => {
    const token = Cookies.get('access_token');
    setTokenExists(!!token);
  }, [tokenExists, navigate]);

  useEffect(() => {
    if (!tokenExists) {
      navigate(loginPattern);
    }


  }, [tokenExists, navigate]);

  const token = Cookies.get('access_token');
  console.log(tokenExists, "tokenExists", token);

  const handleClick = () => {
    dispatch({ type: "USER_DATA_ACTION" })
  }



  return (
    <>
      <div className="container p-0 m-0" style={{ display: "flex" }}>
        <div className="rightContainer">

          {/* <button onClick={handleClick}>Clcikss</button> */}
          {tokenExists && <>
            <Header WalletRecharge={WalletRecharge} setWalletRecharge={setWalletRecharge} />
            <Sidebar />
            <Dashboard />
          </>}
          {/* <Router> */}
          <Routes>
           {!tokenExists && <Route path={loginPattern} element={<LoginPage  />}  /> }
            <Route path={indexPattern} element={<ProtectedRoute isAuth={tokenExists}>
              <Dashboard />
            </ProtectedRoute>} />
            <Route path={reassignOrdersPattern} element={<AllOrders />} />
            <Route path={mergeOrdersPattern} element={<AllOrders />} />
            <Route path={splitOrdersPattern} element={<AllOrders />} />
            <Route path={ordersPattern} element={<OrdersPage />} />
            <Route path={shipmentsPattern} element={<ShipmentsPage />} />
            <Route path={dailyPrefrencesPattern} element={<DailyPrefrences />} />
            <Route path={channelsIntegrationPattern} element={<ChannelsIntegration />} />
            <Route path={omsIntegrationPattern} element={<OMSIntegration />} />
            <Route path={couriersIntegrationPattern} element={<CouriersIntegration />} />
            <Route path={generateApiKeyPattern} element={<APIIntegration />} />
            <Route path={socailPagePattern} element={<OtherIntegration />} />
            <Route path="/IndiaMapp" element={<IndiaMapp />} />
            <Route path="/create-order" element={<CreateOrderFlow />} />
            <Route path="/billing" element={<BillingPage />} />
            <Route path="/weight-reconciliation" element={<WeightRecoPage />} />
            <Route path="/MIS" element={<MISPage />} />
            <Route path="/customer" element={<CustomerPage />} />
            <Route path="/customer-support" element={<CustomerSupportPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/help-articles" element={<HelpArticles />} />
            <Route path="/manage-warehouses" element={<ManageWarehouse />} />
            <Route path="/add-pickup-address" element={<AddWarehouse />} />
            <Route path="/shipping-rates" element={<ShippingRates />} />
            <Route path="/shopify-integration" element={<ChannelIntegrationForm />} />
          </Routes>
          {/* </Router> */}
        </div>
      </div>
      <WalletRechargeComponent WalletRecharge={WalletRecharge} setWalletRecharge={setWalletRecharge} />
      <section onClick={() => setWalletRecharge(!WalletRecharge)} className={`backdrop ${WalletRecharge ? 'd-block' : 'd-none'}`}></section>
    </>

  );
}

export default App;
