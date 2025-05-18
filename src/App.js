import "./App.css";
import axios from "axios";
import Cookies from "js-cookie";
// import 'devextreme/dist/css/dx.light.css';
import { useDispatch } from "react-redux";
import BypassPage from "./Component/Pages/bypass";
import screenWidth from "./redux/action/screenWidth";
import Header from "./Component/common/header/Header";
import MISPage from './Component/Pages/MISPage/MISPage';
import React, { useEffect, useState, lazy } from "react";
import Sidebar from "./Component/common/sidebar/SideNav";
import IndiaMapp from './Component/common/Graph/IndiaMapp';
import { Routes, Route, useNavigate, useParams, useLocation } from 'react-router-dom';
import Dashboard from "./Component/Pages/Dashboard/Dashboard";
import { Bounce, ToastContainer, toast } from "react-toastify";
import LoginPage from './Component/Pages/LoginPage/LoginPage';
import OrdersPage from './Component/Pages/OrdersPage/OrdersPage';
import SignUpPage from "./Component/Pages/SignupPage/SignUpPage";
import BillingPage from './Component/Pages/BillingPage/BillingPage'
import { customErrorFunction } from "./customFunction/errorHandling";
import MoreOnOrders from './Component/Pages/MoreOnOrders/MoreOnOrders';
import CustomerPage from './Component/Pages/CustomerPage/CustomerPage';
import SettingsPage from './Component/Pages/SettingsPage/SettingsPage';
import ShipmentsPage from './Component/Pages/ShipmentsPage/ShipmentsPage';
import WeightRecoPage from './Component/Pages/WeightRecoPage/WeightRecoPage';
import ManageWarehouse from './Component/Pages/ManageWarehouse/ManageWarehouse';
import AddWarehouse from './Component/Pages/ManageWarehouse/Components/AddWarehouse';
import APIIntegration from './Component/Pages/IntegrationsPage/Components/APIIntegration';
import OrderDetail from "./Component/Pages/OrdersPage/Components/OrderDetail/OrderDetail";
import CustomerSupportPage from './Component/Pages/CustomerSupportPage/CustomerSupportPage';
import OtherIntegration from './Component/Pages/IntegrationsPage/Components/OtherIntegration/OtherIntegration';
import ZoneMappingPop from "./Component/Pages/ToolsPage/Components/ZoneMappingPop/ZoneMappingPop";
import ReferAndEarnPage from "./Component/Pages/EarnAndGrowPages/ReferAndEarnPage/ReferAndEarnPage";
import BusinessPlanPage from "./Component/Pages/EarnAndGrowPages/BusinessPlanPage/BusinessPlanPage";
import CouriersIntegration from './Component/Pages/IntegrationsPage/Components/CouriersIntegration';
import HelpArticles from './Component/Pages/CustomerSupportPage/Components/HelpArticles/HelpArticles';
import CreateOrderFlow from './Component/Pages/OrdersPage/Components/CreateOrderFlow/CreateOrderFlow';
import WalletRechargeComponent from './Component/Pages/WalletRechargeComponent/WalletRechargeComponent';
import OMSIntegration from "./Component/Pages/IntegrationsPage/Components/OMSIntegraion/OMSIntegration";
import ManageSubAccount from "./Component/Pages/SettingsPage/components/ManageSubAccount/ManageSubAccount";
import GSTInvoicingPage from "./Component/Pages/SettingsPage/components/GSTInvoicingPage/GSTInvoicingPage";
import ViewIntegrations from "./Component/Pages/IntegrationsPage/Components/ViewIntegrations/ViewIntegrations";
import ServiceabilityPage from "./Component/Pages/ToolsPage/Components/ServiceabilityPage/ServiceabilityPage";
import RateCalculatorPage from "./Component/Pages/ToolsPage/Components/RateCalculatorPage/RateCalculatorPage";
import ReportSchedulerPage from "./Component/Pages/ToolsPage/Components/ReportSchedulerPage/ReportSchedulerPage";
import LabelCustomization from "./Component/Pages/SettingsPage/components/LabelCustomization/LabelCustomization";
import ShopifyRedirect from "./Component/Pages/IntegrationsPage/Components/ChannelsIntegration/ShopifyRedirect";
import BillingAddressPage from "./Component/Pages/SettingsPage/components/BillingAddressPage/BillingAddressPage";
import NewComponent from "./Component/Pages/ToolsPage/Components/CourierAllocationPage/NewComponent/NewComponent";
import ThemeCustomization from "./Component/Pages/SettingsPage/components/ThemeCustomization/ThemeCustomization";
import ShipeaseBankDetails from "./Component/Pages/SettingsPage/components/ShipeaseBankDetails/ShipeaseBankDetails";
import ChannelsIntegration from './Component/Pages/IntegrationsPage/Components/ChannelsIntegration/ChannelsIntegration';
import PostpaidSettingsPage from "./Component/Pages/SettingsPage/components/PostpaidSettingsPage/PostpaidSettingsPage";
import BuyerCommunicationPage from "./Component/Pages/SettingsPage/components/BuyerCommunicationPage/BuyerCommunicationPage";
import SellerNotificationsPage from "./Component/Pages/SettingsPage/components/SellerNotificationsPage/SellerNotificationsPage";
import ShopifyIntegrationForm from './Component/Pages/IntegrationsPage/Components/ChannelsIntegration/ShopifyIntegrationForm';
import WooCommerceIntegrationForm from './Component/Pages/IntegrationsPage/Components/ChannelsIntegration/WooCommerceIntegrationForm';
import StoreHippoIntegrationForm from "./Component/Pages/IntegrationsPage/Components/ChannelsIntegration/StoreHippoIntegrationForm";
import MagentoIntegrationForm from "./Component/Pages/IntegrationsPage/Components/ChannelsIntegration/MagentoIntegrationForm";
import AmazonDirectIntegrationForm from "./Component/Pages/IntegrationsPage/Components/ChannelsIntegration/AmazonDirectIntegrationForm";
import EasyShipIntegrationForm from "./Component/Pages/IntegrationsPage/Components/OMSIntegraion/EasyShipIntegrationForm";
import EasyEcomIntegrationForm from "./Component/Pages/IntegrationsPage/Components/OMSIntegraion/EasyEcomIntegrationForm";
import VineRetailIntegrationForm from "./Component/Pages/IntegrationsPage/Components/OMSIntegraion/VineRetailIntegrationForm";
import UnicommerceIntegrationForm from "./Component/Pages/IntegrationsPage/Components/OMSIntegraion/UnicommerceIntegrationForm";
import OMSGuruIntegrationForm from "./Component/Pages/IntegrationsPage/Components/OMSIntegraion/OMSGuruIntegrationForm";
import ClickPostIntegrationForm from "./Component/Pages/IntegrationsPage/Components/OMSIntegraion/ClickPostIntegrationForm";
import CourierAllocationPage from "./Component/Pages/ToolsPage/Components/CourierAllocationPage/CourierAllocationPage";
import PODPage from "./Component/Pages/SettingsPage/components/PODPage/PODPage";
import MigrationNewsPop from "./Component/Pages/MigrationNewsPop/MigrationNewsPop";
// import "./responsive.css";
import { ccavenueRedirectIntegrationPattern, gstInvoicingPattern, ViewIntegrationsPattern, LabelCustomizationPattern, ReferAndEarnPattern, BusinessPlanPattern, AmazonDirectIntegrationPattern, EasyShipIntegrationPattern, MagentoIntegrationPattern, StoreHippoIntegrationPattern, WooCommerceIntegrationPattern, billingPattern, channelsIntegrationPattern, couriersIntegrationPattern, createOrderPattern, createOrderPattern1, customerPattern, customerSupportPattern, dailyPrefrencesPattern, generateApiKeyPattern, helpArticlesPattern, indexPattern, indiaMapPattern, loginPattern, manageWarehousesPattern, mergeOrdersPattern, misPattern, omsIntegrationPattern, ordersPattern, pickupAddressPattern, reassignOrdersPattern, settingsPattern, shipmentsPattern, shippingRatesPattern, shopifyIntegrationPattern, socailPagePattern, splitOrdersPattern, weightReconciliationPattern, EasyEcomIntegrationPattern, VineRetailIntegrationPattern, UnicommerceIntegrationPattern, OMSGuruIntegrationPattern, ClickPostIntegrationPattern, RateCalculatorPattern, ServiceabilityPattern, ZoneMappingPattern, ReportSchedulerPattern, CourierAllocationPattern, signUpPattern, apiIntegrationPattern, otherIntegrationPattern, orderdetailPattern, bypassPattern, BillingAddressPattern, ShipeaseBankDetailsPattern, ManageSubAccountPattern, ThemeCustomizationPattern, BuyerCommunicationPagePattern, SellerNotificationsPagePattern, PostpaidSettingsPagePattern, ProofOfDeliveryPattern, shopifyRedirect, shopifyRedirectIntegrationPattern, orderTrackingPattern, WhatsAppIntegrationPattern, WhatsAppNotificationPattern, SkuUploadPattern, BrandedTrackingPattern, TrackingScriptPattern, UserManagementPattern, WhatsAppBotsPattern, BusinessPlanPatternNew, RtoPredictorPattern } from "./Routes";
import WhatsAppIntegration from "./Component/Pages/IntegrationsPage/Components/OtherIntegration/WhatsAppIntegration";
import { BASE_URL_CORE } from './axios/config';
import VerifiedCustomer from "./Component/Pages/CustomerPage/VerifiedCustomer/VerifiedCustomer";
import RateCard from "./Component/Pages/ToolsPage/Components/RateCard/RateCard";
import WhatsAppNotification from "./Component/Pages/SettingsPage/components/WhatsAppConfig/WhatsAppNotification";
import CCAvenueRedirect from "./Component/Pages/IntegrationsPage/Components/ChannelsIntegration/CCAvenueRedirect";
import SkuUpload from "./Component/Pages/SettingsPage/components/SkuUpload/SkuUpload";
import PageSettings from "./Component/Pages/SettingsPage/components/TrackingPage/PageSettings/PageSettings";
import UserRoleManage from "./Component/Pages/SettingsPage/components/UserRoleManage/UserRoleManage";
import WhatsAppBots from "./Component/Pages/SettingsPage/components/WhatsAppConfig/WhatsAppBots";
import TrackingScript from "./Component/Pages/SettingsPage/components/TrackingPage/TrackingScript/TrackingScript";
import BusinessPlanPageNew from "./Component/Pages/EarnAndGrowPages/BusinessPlanPage/BusinessPlanPageNew";
import { channelData } from "./Component/common/channellist";
import BusinessPlanPageNewBackup from "./Component/Pages/EarnAndGrowPages/BusinessPlanPage/BusinessPlanPageNewBackup";
import planAction from "./redux/action/plan";
import RtoPredictorForm from "./Component/Pages/SettingsPage/components/RtoPredictorForm/RtoPredictorForm";

function App() {
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(location?.search);
  const status = urlParams.get('status');
  const [userID, setUserID] = useState("")
  const token = Cookies.get('access_token');
  const [isExpanded, setExpanded] = useState(false);
  const [ZoneMapping, setZoneMapping] = useState(false)
  const [tokenExists, setTokenExists] = useState(false);
  const ccavenuestatus = urlParams.get('ccavenuestatus');
  const [tokenChecked, setTokenChecked] = useState(false);
  const [WalletRecharge, setWalletRecharge] = useState(false)

  useEffect(() => {
    const user_id = Cookies.get('user_id');
    setUserID(user_id)
    setTokenExists(!!token);
    setTokenChecked(true);
  }, []);

  useEffect(() => {
    const temp_data = channelData.reduce((acc, item) => {
      acc[item?.channel_name] = {
        image: item?.image,
        channel_name: item.channel_name
      };
      return acc;
    }, {});
    localStorage.setItem('channel_list', JSON.stringify(temp_data));
  }, [])

  useEffect(() => {
    if (tokenChecked && !tokenExists && window.location.pathname != signUpPattern) {
      navigate(loginPattern);
    }
  }, [tokenChecked, tokenExists, navigate]);

  useEffect(() => {
    if (status) {
      navigate('/channels-integration')
      toast.success("Amazon integrated successfully!")
    }
  }, [status])

  useEffect(() => {
    if (ccavenuestatus === "Success") {
      navigate('/')
    }
  }, [ccavenuestatus])

  useEffect(() => {
    if (token) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${BASE_URL_CORE}/core-api/features/all-partner-list/`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          const temp_data = response.data.reduce((acc, item) => {
            acc[item?.keyword] = {
              image: item?.image,
              title: item?.title,
              ndr_rating: item?.ndr_rating,
              rto_rating: item?.rto_rating,
              pickup_rating: item?.pickup_rating,
              delivery_rating: item?.delivery_rating,
            };
            return acc;
          }, {});
          localStorage.setItem('partnerList', JSON.stringify(temp_data));
        } catch (error) {
          customErrorFunction(error)
        }
      };
      fetchData();
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${BASE_URL_CORE}/core-api/seller/entitlements/`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          if (response?.status === 200) {
            dispatch(planAction(response?.data))
          }
        } catch (error) {
          customErrorFunction(error)
        }
      };
      fetchData();
    }
  }, [token]);

  useEffect(() => {
    const updateWidth = () => {
      dispatch(screenWidth(window.innerWidth))
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // useEffect(() => {
  //   dispatch({ type: "PATHNAME_ACTION", payload: window.location.pathname })
  //   Cookies.set('pathName', window.location.pathname);
  // }, [window.location.pathname])

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
            <Route path={BusinessPlanPatternNew} element={<BusinessPlanPageNew />} />
            <Route path="/backup" element={<BusinessPlanPageNewBackup />} />
            <Route path={ReferAndEarnPattern} element={<ReferAndEarnPage />} />
            <Route path={ordersPattern} element={<OrdersPage />} />
            <Route path={shipmentsPattern} element={<ShipmentsPage />} />
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
            <Route path={shippingRatesPattern} element={<RateCard />} />
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
            <Route path={WhatsAppIntegrationPattern} element={<WhatsAppIntegration />} />
            <Route path={WhatsAppNotificationPattern} element={<WhatsAppNotification />} />
            <Route path={WhatsAppBotsPattern} element={<WhatsAppBots />} />
            <Route path={SkuUploadPattern} element={<SkuUpload />} />
            <Route path={BrandedTrackingPattern} element={<PageSettings />} />
            <Route path={TrackingScriptPattern} element={<TrackingScript />} />
            <Route path={UserManagementPattern} element={<UserRoleManage />} />
            <Route path={RtoPredictorPattern} element={<RtoPredictorForm />} />

            <Route path={ccavenueRedirectIntegrationPattern} element={<CCAvenueRedirect />} />
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

    </>

  );
}

export default App;
