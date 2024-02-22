import { AmazonDirectIntegrationPattern, EasyShipIntegrationPattern, MagentoIntegrationPattern, StoreHippoIntegrationPattern, WooCommerceIntegrationPattern, billingPattern, channelsIntegrationPattern, couriersIntegrationPattern, createOrderPattern, customerPattern, customerSupportPattern, dailyPrefrencesPattern, generateApiKeyPattern, helpArticlesPattern, indexPattern, indiaMapPattern, loginPattern, manageWarehousesPattern, mergeOrdersPattern, misPattern, omsIntegrationPattern, ordersPattern, pickupAddressPattern, reassignOrdersPattern, settingsPattern, shipmentsPattern, shippingRatesPattern, shopifyIntegrationPattern, socailPagePattern, splitOrdersPattern, weightReconciliationPattern, EasyEcomIntegrationPattern, VineRetailIntegrationPattern, UnicommerceIntegrationPattern, OMSGuruIntegrationPattern, ClickPostIntegrationPattern, RateCalculatorPattern, ServiceabilityPattern, ZoneMappingPattern, ReportSchedulerPattern, CourierAllocationPattern } from "./Routes";
import "./App.css";
import axios from "axios";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import 'devextreme/dist/css/dx.light.css';
import React, { useEffect, useState, lazy } from "react";
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Sidebar from "./Component/common/sidebar/SideNav";
import { Routes, Route, useNavigate } from 'react-router-dom';
import Loading from "./Component/loader";
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
import WalletRechargeComponent from './Component/Pages/WalletRechargeComponent/WalletRechargeComponent';
import ShopifyIntegrationForm from './Component/Pages/IntegrationsPage/Components/ChannelsIntegration/ShopifyIntegrationForm';
import WooCommerceIntegrationForm from './Component/Pages/IntegrationsPage/Components/ChannelsIntegration/WooCommerceIntegrationForm';
import StoreHippoIntegrationForm from "./Component/Pages/IntegrationsPage/Components/ChannelsIntegration/StoreHippoIntegrationForm";
import MagentoIntegrationForm from "./Component/Pages/IntegrationsPage/Components/ChannelsIntegration/MagentoIntegrationForm";
import AmazonDirectIntegrationForm from "./Component/Pages/IntegrationsPage/Components/ChannelsIntegration/AmazonDirectIntegrationForm";
import OMSIntegration from "./Component/Pages/IntegrationsPage/Components/OMSIntegraion/OMSIntegration"; import EasyShipIntegrationForm from "./Component/Pages/IntegrationsPage/Components/OMSIntegraion/EasyShipIntegrationForm";
import EasyEcomIntegrationForm from "./Component/Pages/IntegrationsPage/Components/OMSIntegraion/EasyEcomIntegrationForm";
import VineRetailIntegrationForm from "./Component/Pages/IntegrationsPage/Components/OMSIntegraion/VineRetailIntegrationForm";
import UnicommerceIntegrationForm from "./Component/Pages/IntegrationsPage/Components/OMSIntegraion/UnicommerceIntegrationForm";
import OMSGuruIntegrationForm from "./Component/Pages/IntegrationsPage/Components/OMSIntegraion/OMSGuruIntegrationForm";
import ClickPostIntegrationForm from "./Component/Pages/IntegrationsPage/Components/OMSIntegraion/ClickPostIntegrationForm";
import RateCalculator from "./Component/Pages/ToolsPage/Components/RateCalculator/RateCalculator";
import Serviceability from "./Component/Pages/ToolsPage/Components/Serviceability/Serviceability";
import ZoneMapping from "./Component/Pages/ToolsPage/Components/ZoneMapping/ZoneMapping";
import ReportScheduler from "./Component/Pages/ToolsPage/Components/ReportScheduler/ReportScheduler";
import CourierAllocation from "./Component/Pages/ToolsPage/Components/CourierAllocation/CourierAllocation";


function App() {

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [WalletRecharge, setWalletRecharge] = useState(false)
  const [tokenExists, setTokenExists] = useState(false); // State to store token existence
  const [tokenChecked, setTokenChecked] = useState(false);
  const [userID, setUserID] = useState("")

  useEffect(() => {
    const token = Cookies.get('access_token');
    const user_id = Cookies.get('user_id');
    setUserID(user_id)
    setTokenExists(!!token);
    setTokenChecked(true);
  }, []);

  console.log(userID, "I am user id data")

  useEffect(() => {
    if (tokenChecked && !tokenExists) {
      navigate(loginPattern);
    }
  }, [tokenChecked, tokenExists, navigate]);

  const handleClick = () => {
   dispatch({type:""})
  }
  return (
    <>
      <div className="container p-0 m-0" style={{ display: "flex" }}>
        <div className="rightContainer">
          <button onClick={handleClick}>Clcikss</button>

          {tokenExists && <>
            <Header WalletRecharge={WalletRecharge} setWalletRecharge={setWalletRecharge} />
            <Sidebar />
          </>}
          <Routes>
            {
              tokenExists ?
                <Route path={indexPattern} element={<Dashboard />} /> :
                <Route path={loginPattern} element={<LoginPage tokenExists={tokenExists} setTokenExists={setTokenExists} />} />
            }
            <Route path={reassignOrdersPattern} element={<AllOrders userID={userID} />} />
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
            <Route path={indiaMapPattern} element={<IndiaMapp />} />
            <Route path={createOrderPattern} element={<CreateOrderFlow />} />
            <Route path={billingPattern} element={<BillingPage />} />
            <Route path={weightReconciliationPattern} element={<WeightRecoPage />} />
            <Route path={misPattern} element={<MISPage />} />
            <Route path={customerPattern} element={<CustomerPage />} />
            <Route path={customerSupportPattern} element={<CustomerSupportPage />} />
            <Route path={settingsPattern} element={<SettingsPage />} />
            <Route path={helpArticlesPattern} element={<HelpArticles />} />
            <Route path={manageWarehousesPattern} element={<ManageWarehouse />} />
            <Route path={pickupAddressPattern} element={<AddWarehouse />} />
            <Route path={shippingRatesPattern} element={<ShippingRates />} />
            <Route path={channelsIntegrationPattern} element={<ChannelsIntegration />} />
            <Route path={shopifyIntegrationPattern} element={<ShopifyIntegrationForm />} />
            <Route path={WooCommerceIntegrationPattern} element={<WooCommerceIntegrationForm />} />
            <Route path={MagentoIntegrationPattern} element={<MagentoIntegrationForm />} />
            <Route path={StoreHippoIntegrationPattern} element={<StoreHippoIntegrationForm />} />
            <Route path={AmazonDirectIntegrationPattern} element={<AmazonDirectIntegrationForm />} />
            <Route path={EasyShipIntegrationPattern} element={<EasyShipIntegrationForm />} />
            <Route path={EasyEcomIntegrationPattern} element={<EasyEcomIntegrationForm />} />
            <Route path={VineRetailIntegrationPattern} element={<VineRetailIntegrationForm />} />
            <Route path={UnicommerceIntegrationPattern} element={<UnicommerceIntegrationForm />} />
            <Route path={OMSGuruIntegrationPattern} element={<OMSGuruIntegrationForm />} />
            <Route path={ClickPostIntegrationPattern} element={<ClickPostIntegrationForm />} />
            <Route path={RateCalculatorPattern} element={<RateCalculator />} />
            <Route path={ServiceabilityPattern} element={<Serviceability />} />
            <Route path={ZoneMappingPattern} element={<ZoneMapping />} />
            <Route path={ReportSchedulerPattern} element={<ReportScheduler />} />
            <Route path={CourierAllocationPattern} element={<CourierAllocation />} />
          </Routes>
        </div>
      </div>
      <WalletRechargeComponent WalletRecharge={WalletRecharge} setWalletRecharge={setWalletRecharge} />
      <section onClick={() => setWalletRecharge(!WalletRecharge)} className={`backdrop ${WalletRecharge ? 'd-block' : 'd-none'}`}></section>
    </>

  );
}

export default App;
