import "./App.css";
import Cookies from "js-cookie";
import 'devextreme/dist/css/dx.light.css';
import { Bounce, ToastContainer, toast } from "react-toastify";
import React, { useEffect, useState, lazy } from "react";
import Sidebar from "./Component/common/sidebar/SideNav";
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from "./Component/common/header/Header";
import Dashboard from "./Component/Pages/Dashboard/Dashboard";
import DailyPrefrences from './Component/common/Graph/DailyPrefrence';
import IndiaMapp from './Component/common/Graph/IndiaMapp';
import OrdersPage from './Component/Pages/OrdersPage/OrdersPage';
import MoreOnOrders from './Component/Pages/MoreOnOrders/MoreOnOrders';
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
import OMSIntegration from "./Component/Pages/IntegrationsPage/Components/OMSIntegraion/OMSIntegration";
import EasyShipIntegrationForm from "./Component/Pages/IntegrationsPage/Components/OMSIntegraion/EasyShipIntegrationForm";
import EasyEcomIntegrationForm from "./Component/Pages/IntegrationsPage/Components/OMSIntegraion/EasyEcomIntegrationForm";
import VineRetailIntegrationForm from "./Component/Pages/IntegrationsPage/Components/OMSIntegraion/VineRetailIntegrationForm";
import UnicommerceIntegrationForm from "./Component/Pages/IntegrationsPage/Components/OMSIntegraion/UnicommerceIntegrationForm";
import OMSGuruIntegrationForm from "./Component/Pages/IntegrationsPage/Components/OMSIntegraion/OMSGuruIntegrationForm";
import ClickPostIntegrationForm from "./Component/Pages/IntegrationsPage/Components/OMSIntegraion/ClickPostIntegrationForm";
import ZoneMappingPop from "./Component/Pages/ToolsPage/Components/ZoneMappingPop/ZoneMappingPop";
import ServiceabilityPage from "./Component/Pages/ToolsPage/Components/ServiceabilityPage/ServiceabilityPage";
import ReportSchedulerPage from "./Component/Pages/ToolsPage/Components/ReportSchedulerPage/ReportSchedulerPage";
import CourierAllocationPage from "./Component/Pages/ToolsPage/Components/CourierAllocationPage/CourierAllocationPage";
import RateCalculatorPage from "./Component/Pages/ToolsPage/Components/RateCalculatorPage/RateCalculatorPage";
import { gstInvoicingPattern, ViewIntegrationsPattern, LabelCustomizationPattern, ReferAndEarnPattern, BusinessPlanPattern, AmazonDirectIntegrationPattern, EasyShipIntegrationPattern, MagentoIntegrationPattern, StoreHippoIntegrationPattern, WooCommerceIntegrationPattern, billingPattern, channelsIntegrationPattern, couriersIntegrationPattern, createOrderPattern, createOrderPattern1, customerPattern, customerSupportPattern, dailyPrefrencesPattern, generateApiKeyPattern, helpArticlesPattern, indexPattern, indiaMapPattern, loginPattern, manageWarehousesPattern, mergeOrdersPattern, misPattern, omsIntegrationPattern, ordersPattern, pickupAddressPattern, reassignOrdersPattern, settingsPattern, shipmentsPattern, shippingRatesPattern, shopifyIntegrationPattern, socailPagePattern, splitOrdersPattern, weightReconciliationPattern, EasyEcomIntegrationPattern, VineRetailIntegrationPattern, UnicommerceIntegrationPattern, OMSGuruIntegrationPattern, ClickPostIntegrationPattern, RateCalculatorPattern, ServiceabilityPattern, ZoneMappingPattern, ReportSchedulerPattern, CourierAllocationPattern, signUpPattern, apiIntegrationPattern, otherIntegrationPattern, orderdetailPattern, bypassPattern, BillingAddressPattern, ShipeaseBankDetailsPattern, ManageSubAccountPattern, ThemeCustomizationPattern, BuyerCommunicationPagePattern, SellerNotificationsPagePattern, PostpaidSettingsPagePattern, ProofOfDeliveryPattern, shopifyRedirect, shopifyRedirectIntegrationPattern, orderTrackingPattern } from "./Routes";
import { useDispatch } from "react-redux";
import SignUpPage from "./Component/Pages/SignupPage/SignUpPage";
import OrderDetail from "./Component/Pages/OrdersPage/Components/OrderDetail/OrderDetail";
import ReferAndEarnPage from "./Component/Pages/EarnAndGrowPages/ReferAndEarnPage/ReferAndEarnPage";
import BusinessPlanPage from "./Component/Pages/EarnAndGrowPages/BusinessPlanPage/BusinessPlanPage";
import axios from "axios";
import BypassPage from "./Component/Pages/bypass";
import LabelCustomization from "./Component/Pages/SettingsPage/components/LabelCustomization/LabelCustomization";
import NewComponent from "./Component/Pages/ToolsPage/Components/CourierAllocationPage/NewComponent/NewComponent";
import ViewIntegrations from "./Component/Pages/IntegrationsPage/Components/ViewIntegrations/ViewIntegrations";
import MigrationNewsPop from "./Component/Pages/MigrationNewsPop/MigrationNewsPop";
import GSTInvoicingPage from "./Component/Pages/SettingsPage/components/GSTInvoicingPage/GSTInvoicingPage";
import BillingAddressPage from "./Component/Pages/SettingsPage/components/BillingAddressPage/BillingAddressPage";
import ShipeaseBankDetails from "./Component/Pages/SettingsPage/components/ShipeaseBankDetails/ShipeaseBankDetails";
import ManageSubAccount from "./Component/Pages/SettingsPage/components/ManageSubAccount/ManageSubAccount";
import ThemeCustomization from "./Component/Pages/SettingsPage/components/ThemeCustomization/ThemeCustomization";
import BuyerCommunicationPage from "./Component/Pages/SettingsPage/components/BuyerCommunicationPage/BuyerCommunicationPage";
import SellerNotificationsPage from "./Component/Pages/SettingsPage/components/SellerNotificationsPage/SellerNotificationsPage";
import PostpaidSettingsPage from "./Component/Pages/SettingsPage/components/PostpaidSettingsPage/PostpaidSettingsPage";
import PODPage from "./Component/Pages/SettingsPage/components/PODPage/PODPage";
import "./responsive.css";
import ShopifyRedirect from "./Component/Pages/IntegrationsPage/Components/ChannelsIntegration/ShopifyRedirect";
import screenWidth from "./redux/action/screenWidth";
import { Audio, ColorRing } from 'react-loader-spinner'


function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [WalletRecharge, setWalletRecharge] = useState(false)
  const [ZoneMapping, setZoneMapping] = useState(false)
  const [tokenExists, setTokenExists] = useState(false);
  const [tokenChecked, setTokenChecked] = useState(false);
  const [userID, setUserID] = useState("")
  const [isExpanded, setExpanded] = useState(false);

  useEffect(() => {
    const token = Cookies.get('access_token');
    const user_id = Cookies.get('user_id');
    setUserID(user_id)
    setTokenExists(!!token);
    setTokenChecked(true);
  }, []);

  useEffect(() => {
    if (tokenChecked && !tokenExists && window.location.pathname != signUpPattern) {
      navigate(loginPattern);
    }
  }, [tokenChecked, tokenExists, navigate]);


  // useEffect(() => {
  //   dispatch({ type: "PATHNAME_ACTION", payload: window.location.pathname })
  //   Cookies.set('pathName', window.location.pathname);
  // }, [window.location.pathname])

  const [ScreenWidth, setScreenWidth] = useState(null);

  useEffect(() => {
    const updateWidth = () => {
      setScreenWidth(window.innerWidth);
      dispatch(screenWidth(window.innerWidth))
    };

    updateWidth(); // Set initial width

    window.addEventListener('resize', updateWidth);

    return () => window.removeEventListener('resize', updateWidth);
  }, []);


  return (
    <>
      <div className="container p-0 m-0" style={{}}>
        <div className="rightContainer">
          {tokenExists && <>
            <Header isExpanded={isExpanded} setExpanded={setExpanded} WalletRecharge={WalletRecharge} setWalletRecharge={setWalletRecharge} />
            <Sidebar isExpanded={isExpanded} setExpanded={setExpanded} ZoneMapping={ZoneMapping} setZoneMapping={setZoneMapping} />
          </>}
          <Routes>
            {
              tokenExists ?
                <Route path={indexPattern} element={<Dashboard />} /> :
                <Route path={loginPattern} element={<LoginPage tokenExists={tokenExists} setTokenExists={setTokenExists} />
                }
                />
            }
            <Route path={reassignOrdersPattern} element={<MoreOnOrders />} />
            {/* <Route path={mergeOrdersPattern} element={<MoreOnOrders />} />
            <Route path={splitOrdersPattern} element={<MoreOnOrders />} /> */}
            <Route path={ProofOfDeliveryPattern} element={<PODPage />} />
            <Route path={PostpaidSettingsPagePattern} element={<PostpaidSettingsPage />} />
            <Route path={SellerNotificationsPagePattern} element={<SellerNotificationsPage />} />
            <Route path={BuyerCommunicationPagePattern} element={<BuyerCommunicationPage />} />
            <Route path={ThemeCustomizationPattern} element={<ThemeCustomization />} />
            <Route path={ManageSubAccountPattern} element={<ManageSubAccount />} />
            <Route path={ShipeaseBankDetailsPattern} element={<ShipeaseBankDetails />} />
            <Route path={BillingAddressPattern} element={<BillingAddressPage />} />
            <Route path={gstInvoicingPattern} element={<GSTInvoicingPage />} />
            <Route path={ViewIntegrationsPattern} element={<ViewIntegrations />} />
            <Route path={LabelCustomizationPattern} element={<LabelCustomization />} />
            <Route path={BusinessPlanPattern} element={<BusinessPlanPage />} />
            <Route path={ReferAndEarnPattern} element={<ReferAndEarnPage />} />
            <Route path={ordersPattern} element={<OrdersPage />} />
            <Route path={shipmentsPattern} element={<ShipmentsPage />} />
            <Route path={dailyPrefrencesPattern} element={<DailyPrefrences />} />
            <Route path={channelsIntegrationPattern} element={<ChannelsIntegration />} />
            <Route path={omsIntegrationPattern} element={<OMSIntegration />} />
            <Route path={apiIntegrationPattern} element={<APIIntegration />} />
            <Route path={couriersIntegrationPattern} element={<CouriersIntegration />} />
            <Route path={generateApiKeyPattern} element={<APIIntegration />} />
            <Route path={otherIntegrationPattern} element={<OtherIntegration />} />
            <Route path={indiaMapPattern} element={<IndiaMapp />} />
            <Route path={createOrderPattern} element={<CreateOrderFlow />} />
            <Route path={createOrderPattern1} element={<CreateOrderFlow />} />
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
            <Route path={shopifyRedirectIntegrationPattern} element={<ShopifyRedirect />} />
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
            <Route path={RateCalculatorPattern} element={<RateCalculatorPage />} />
            <Route path={ServiceabilityPattern} element={<ServiceabilityPage />} />
            {/* <Route path={ZoneMappingPattern} element={<ZoneMapping />} /> */}
            <Route path={ReportSchedulerPattern} element={<ReportSchedulerPage />} />
            {/* <Route path={CourierAllocationPattern} element={<CourierAllocationPage />} /> */}
            <Route path={CourierAllocationPattern} element={<NewComponent />} />
            <Route path={signUpPattern} element={<SignUpPage />} />
            <Route path={orderdetailPattern} element={<OrderDetail />} />
            <Route path={bypassPattern} element={<BypassPage />} />
          </Routes>
        </div>
      </div>
      <WalletRechargeComponent WalletRecharge={WalletRecharge} setWalletRecharge={setWalletRecharge} />
      <section onClick={() => setWalletRecharge(!WalletRecharge)} className={`backdrop ${WalletRecharge ? 'd-block' : 'd-none'}`}></section>

      {/* <LowBalancePop setWalletRecharge={setWalletRecharge} /> */}

      <ZoneMappingPop ZoneMapping={ZoneMapping} setZoneMapping={setZoneMapping} />
      <section onClick={() => setZoneMapping(false)} className={`backdrop ${ZoneMapping ? 'd-block' : 'd-none'}`}></section>

      <ToastContainer
        position="top-right"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop={false}
        pauseOnFocusLoss={true}
        transition={Bounce}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover

      />

      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
      />

      {/* 
      <Audio
        height="80"
        width="80"
        radius="9"
        color="green"
        ariaLabel="loading"
        wrapperStyle
        wrapperClass
      /> */}

      {/* <MigrationNewsPop /> */}
      {/* Same as */}

    </>

  );
}

export default App;
