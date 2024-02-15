import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import BrowserRouter
import LoginPage from './Component/Pages/LoginPage/LoginPage';
import OrdersPage from './Component/Pages/OrdersPage/OrdersPage';
import AllOrders from './Component/Pages/OrdersPage/Components/AllOrders/AllOrders';
import ShipmentsPage from './Component/Pages/ShipmentsPage/ShipmentsPage';
import DailyPreferences from './Component/common/Graph/DailyPrefrence';
import OMSIntegration from './Component/Pages/IntegrationsPage/Components/OMSIntegration';
import CouriersIntegration from './Component/Pages/IntegrationsPage/Components/CouriersIntegration';
import APIIntegration from './Component/Pages/IntegrationsPage/Components/APIIntegration';
import OtherIntegration from './Component/Pages/IntegrationsPage/Components/OtherIntegration';
import IndiaMapp from './Component/common/Graph/IndiaMapp';
import CreateOrderFlow from './Component/Pages/OrdersPage/Components/CreateOrderFlow/CreateOrderFlow';
import BillingPage from './Component/Pages/BillingPage/BillingPage';
import WeightRecoPage from './Component/Pages/WeightRecoPage/WeightRecoPage';
import MISPage from './Component/Pages/MISPage/MISPage';
import CustomerPage from './Component/Pages/CustomerPage/CustomerPage';
import CustomerSupportPage from './Component/Pages/CustomerSupportPage/CustomerSupportPage';
import SettingsPage from './Component/Pages/SettingsPage/SettingsPage';
import HelpArticles from './Component/Pages/CustomerSupportPage/Components/HelpArticles/HelpArticles';
import Dashboard from './Component/Pages/Dashboard/Dashboard';
import ManageWarehouse from './Component/Pages/ManageWarehouse/ManageWarehouse';
import AddWarehouse from './Component/Pages/ManageWarehouse/Components/AddWarehouse';
import ShippingRates from './Component/Pages/ToolsPage/Components/ShippingRates';
import ChannelsIntegration from './Component/Pages/IntegrationsPage/Components/ChannelsIntegration/ChannelsIntegration';
import ShopifyIntegrationForm from './Component/Pages/IntegrationsPage/Components/ChannelsIntegration/ShopifyIntegrationForm';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/seller-login" element={<LoginPage />} />
        <Route path="/" element={<App />} >
          <Route path="/Reassign-orders" element={<AllOrders />} />
          <Route path="/merge-orders" element={<AllOrders />} />
          <Route path="/split-orders" element={<AllOrders />} />
          <Route path="/Orders" element={<OrdersPage />} />
          <Route path="/Shipments" element={<ShipmentsPage />} />
          <Route path="/dailyprefrences" element={<DailyPreferences />} />
          <Route path="/channels-integration" element={<ChannelsIntegration />} />
          <Route path="/OMS-integration" element={<OMSIntegration />} />
          <Route path="/couriers-integration" element={<CouriersIntegration />} />
          <Route path="/API-integration" element={<APIIntegration />} />
          <Route path="/other-integration" element={<OtherIntegration />} />
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
          <Route path="/shopify-integration" element={<ShopifyIntegrationForm />} />
          <Route path="/" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
