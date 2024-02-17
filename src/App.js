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
import ChannelsIntegration from './Component/Pages/IntegrationsPage/Components/ChannelsIntegration/ChannelsIntegration';
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
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import WalletRechargeComponent from './Component/Pages/WalletRechargeComponent/WalletRechargeComponent';
import ShopifyIntegrationForm from './Component/Pages/IntegrationsPage/Components/ChannelsIntegration/ShopifyIntegrationForm';
import WooCommerceIntegrationForm from './Component/Pages/IntegrationsPage/Components/ChannelsIntegration/WooCommerceIntegrationForm';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { channelsIntegrationPattern, couriersIntegrationPattern, dailyPrefrencesPattern, generateApiKeyPattern, indexPattern, loginPattern, mergeOrdersPattern, omsIntegrationPattern, ordersPattern, reassignOrdersPattern, shipmentsPattern, socailPagePattern, splitOrdersPattern } from "./Routes";
import Cookies from "js-cookie";
import axios from "axios";
import StoreHippoIntegrationForm from "./Component/Pages/IntegrationsPage/Components/ChannelsIntegration/StoreHippoIntegrationForm";
import MagentoIntegrationForm from "./Component/Pages/IntegrationsPage/Components/ChannelsIntegration/MagentoIntegrationForm";
import AmazonDirectIntegrationForm from "./Component/Pages/IntegrationsPage/Components/ChannelsIntegration/AmazonDirectIntegrationForm";
import OMSIntegration from "./Component/Pages/IntegrationsPage/Components/OMSIntegraion/OMSIntegration";import EasyShipIntegrationForm from "./Component/Pages/IntegrationsPage/Components/OMSIntegraion/EasyShipIntegrationForm";
import EasyEcomIntegrationForm from "./Component/Pages/IntegrationsPage/Components/OMSIntegraion/EasyEcomIntegrationForm";
import VineRetailIntegrationForm from "./Component/Pages/IntegrationsPage/Components/OMSIntegraion/VineRetailIntegrationForm";
import UnicommerceIntegrationForm from "./Component/Pages/IntegrationsPage/Components/OMSIntegraion/UnicommerceIntegrationForm";
import OMSGuruIntegrationForm from "./Component/Pages/IntegrationsPage/Components/OMSIntegraion/OMSGuruIntegrationForm";
import ClickPostIntegrationForm from "./Component/Pages/IntegrationsPage/Components/OMSIntegraion/ClickPostIntegrationForm";


function App() {

  const [WalletRecharge, setWalletRecharge] = useState(false)
  // const navigate = useNavigate();
  // const [tokenExists, setTokenExists] = useState(false); // State to store token existence


  // useEffect(() => {
  //   const token = Cookies.get('access_token');
  //   setTokenExists(!!token);
  // }, [tokenExists, navigate]);

  // useEffect(() => {
  //   if (!tokenExists) {
  //     navigate(loginPattern);
  //   } else {
  //     navigate(indexPattern);
  //   }
  // }, [tokenExists, navigate]);


  // console.log(tokenExists, "tokenExists");

  return (
    <>

      <div className="container p-0 m-0" style={{ display: "flex" }}>
        <div className="rightContainer">

          {/* {tokenExists && <> */}
          <Header WalletRecharge={WalletRecharge} setWalletRecharge={setWalletRecharge} />
          <Sidebar />
          {/* </>} */}
          {/* <Router> */}
          <Routes>
            <Route path={indexPattern} element={<Dashboard />} />
            <Route path={loginPattern} element={<LoginPage />} />
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
            <Route path="/channels-integration" element={<ChannelsIntegration />} />
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
            <Route path="/shopify-integration" element={<ShopifyIntegrationForm />} />
            <Route path="/woocommerce-integration" element={<WooCommerceIntegrationForm />} />
            <Route path="/magento-integration" element={<MagentoIntegrationForm />} />
            <Route path="/storehippo-integration" element={<StoreHippoIntegrationForm />} />
            <Route path="/amazon-direct-integration" element={<AmazonDirectIntegrationForm />} />
            <Route path="/easyship-integration" element={<EasyShipIntegrationForm />} />
            <Route path="/easyecom-integration" element={<EasyEcomIntegrationForm />} />
            <Route path="/vine-retail-integration" element={<VineRetailIntegrationForm />} />
            <Route path="/unicommerce-integration" element={<UnicommerceIntegrationForm />} />
            <Route path="/omsguru-integration" element={<OMSGuruIntegrationForm />} />
            <Route path="/clickpost-integration" element={<ClickPostIntegrationForm />} />
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
