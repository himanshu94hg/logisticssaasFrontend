import { AmazonDirectIntegrationPattern, EasyShipIntegrationPattern, MagentoIntegrationPattern, StoreHippoIntegrationPattern, WooCommerceIntegrationPattern, billingPattern, channelsIntegrationPattern, couriersIntegrationPattern, createOrderPattern, customerPattern, customerSupportPattern, dailyPrefrencesPattern, generateApiKeyPattern, helpArticlesPattern, indexPattern, indiaMapPattern, loginPattern, manageWarehousesPattern, mergeOrdersPattern, misPattern, omsIntegrationPattern, ordersPattern, pickupAddressPattern, reassignOrdersPattern, settingsPattern, shipmentsPattern, shippingRatesPattern, shopifyIntegrationPattern, socailPagePattern, splitOrdersPattern, weightReconciliationPattern, EasyEcomIntegrationPattern, VineRetailIntegrationPattern, UnicommerceIntegrationPattern, OMSGuruIntegrationPattern, ClickPostIntegrationPattern, RateCalculatorPattern, ServiceabilityPattern, ZoneMappingPattern, ReportSchedulerPattern, CourierAllocationPattern } from "./Routes";
import "./App.css";
import axios from "axios";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import 'devextreme/dist/css/dx.light.css';
import React, { useEffect, useState,lazy } from "react";
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Sidebar from "./Component/common/sidebar/SideNav";
import { Routes, Route, useNavigate } from 'react-router-dom';
import Loading from "./Component/loader";
const Header = lazy(() => import("./Component/common/header/Header"));
const Dashboard = lazy(() => import("./Component/Pages/Dashboard/Dashboard"));
const DailyPrefrences = lazy(() => import('./Component/common/Graph/DailyPrefrence'));
const IndiaMapp = lazy(() => import('./Component/common/Graph/IndiaMapp'));
const OrdersPage = lazy(() => import('./Component/Pages/OrdersPage/OrdersPage'));
const AllOrders = lazy(() => import('./Component/Pages/OrdersPage/Components/AllOrders/AllOrders'));
const ShipmentsPage = lazy(() => import('./Component/Pages/ShipmentsPage/ShipmentsPage'));
const ChannelsIntegration = lazy(() => import('./Component/Pages/IntegrationsPage/Components/ChannelsIntegration/ChannelsIntegration'));
const CouriersIntegration = lazy(() => import('./Component/Pages/IntegrationsPage/Components/CouriersIntegration'));
const APIIntegration = lazy(() => import('./Component/Pages/IntegrationsPage/Components/APIIntegration'));
const OtherIntegration = lazy(() => import('./Component/Pages/IntegrationsPage/Components/OtherIntegration'));
const CreateOrderFlow = lazy(() => import('./Component/Pages/OrdersPage/Components/CreateOrderFlow/CreateOrderFlow'));
const BillingPage = lazy(() => import('./Component/Pages/BillingPage/BillingPage'));
const WeightRecoPage = lazy(() => import('./Component/Pages/WeightRecoPage/WeightRecoPage'));
const MISPage = lazy(() => import('./Component/Pages/MISPage/MISPage'));
const CustomerPage = lazy(() => import('./Component/Pages/CustomerPage/CustomerPage'));
const CustomerSupportPage = lazy(() => import('./Component/Pages/CustomerSupportPage/CustomerSupportPage'));
const SettingsPage = lazy(() => import('./Component/Pages/SettingsPage/SettingsPage'));
const HelpArticles = lazy(() => import('./Component/Pages/CustomerSupportPage/Components/HelpArticles/HelpArticles'));
const LoginPage = lazy(() => import('./Component/Pages/LoginPage/LoginPage'));
const ManageWarehouse = lazy(() => import('./Component/Pages/ManageWarehouse/ManageWarehouse'));
const AddWarehouse = lazy(() => import('./Component/Pages/ManageWarehouse/Components/AddWarehouse'));
const ShippingRates = lazy(() => import('./Component/Pages/ToolsPage/Components/ShippingRates'));
const WalletRechargeComponent = lazy(() => import('./Component/Pages/WalletRechargeComponent/WalletRechargeComponent'));
const ShopifyIntegrationForm = lazy(() => import('./Component/Pages/IntegrationsPage/Components/ChannelsIntegration/ShopifyIntegrationForm'));
const WooCommerceIntegrationForm = lazy(() => import('./Component/Pages/IntegrationsPage/Components/ChannelsIntegration/WooCommerceIntegrationForm'));
const StoreHippoIntegrationForm = lazy(() => import('./Component/Pages/IntegrationsPage/Components/ChannelsIntegration/StoreHippoIntegrationForm'));
const MagentoIntegrationForm = lazy(() => import('./Component/Pages/IntegrationsPage/Components/ChannelsIntegration/MagentoIntegrationForm'));
const AmazonDirectIntegrationForm = lazy(() => import('./Component/Pages/IntegrationsPage/Components/ChannelsIntegration/AmazonDirectIntegrationForm'));
const OMSIntegration = lazy(() => import('./Component/Pages/IntegrationsPage/Components/OMSIntegraion/OMSIntegration'));
const EasyShipIntegrationForm = lazy(() => import('./Component/Pages/IntegrationsPage/Components/OMSIntegraion/EasyShipIntegrationForm'));
const EasyEcomIntegrationForm = lazy(() => import('./Component/Pages/IntegrationsPage/Components/OMSIntegraion/EasyEcomIntegrationForm'));
const VineRetailIntegrationForm = lazy(() => import('./Component/Pages/IntegrationsPage/Components/OMSIntegraion/VineRetailIntegrationForm'));
const UnicommerceIntegrationForm = lazy(() => import('./Component/Pages/IntegrationsPage/Components/OMSIntegraion/UnicommerceIntegrationForm'));
const OMSGuruIntegrationForm = lazy(() => import('./Component/Pages/IntegrationsPage/Components/OMSIntegraion/OMSGuruIntegrationForm'));
const ClickPostIntegrationForm = lazy(() => import('./Component/Pages/IntegrationsPage/Components/OMSIntegraion/ClickPostIntegrationForm'));
const RateCalculator = lazy(() => import('./Component/Pages/ToolsPage/Components/RateCalculator/RateCalculator'));
const Serviceability = lazy(() => import('./Component/Pages/ToolsPage/Components/Serviceability/Serviceability'));
const ZoneMapping = lazy(() => import('./Component/Pages/ToolsPage/Components/ZoneMapping/ZoneMapping'));
const ReportScheduler = lazy(() => import('./Component/Pages/ToolsPage/Components/ReportScheduler/ReportScheduler'));
const CourierAllocation = lazy(() => import('./Component/Pages/ToolsPage/Components/CourierAllocation/CourierAllocation'));



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


  console.log(tokenExists, "tokenExists")
  return (
    <>
      <div className="container p-0 m-0" style={{ display: "flex" }}>
        <div className="rightContainer">
          {/* <button onClick={handleClick}>Clcikss</button> */}
        
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
