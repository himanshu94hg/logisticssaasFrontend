import 'devextreme/dist/css/dx.light.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./Component/common/sidebar/SideNav";
import Header from "./Component/common/header/Header";
import "./App.css";
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

function App() {
  return (
     <Router>
       <div className="container p-0 m-0" style={{ display: "flex" }}>
        
           <Sidebar />
        
         <div className="rightContainer">
           <div>
             <Header />
           </div>
           <Routes>            
             <Route path="/Reassign-orders" element={<AllOrders/>} />
             <Route path="/merge-orders" element={<AllOrders/>} />
             <Route path="/split-orders" element={<AllOrders/>} />
             <Route path="/Orders" element={<OrdersPage/>} />
             <Route path="/Shipments" element={<ShipmentsPage/>} />
             <Route path="/dailyprefrences" element={<DailyPrefrences/>}/>
             <Route path="/channels-integration" element={<ChannelsIntegration />}/>
             <Route path="/OMS-integration" element={<OMSIntegration />}/>
             <Route path="/couriers-integration" element={<CouriersIntegration />}/>
             <Route path="/API-integration" element={<APIIntegration />}/>
             <Route path="/other-integration" element={<OtherIntegration />}/>
             <Route path="/IndiaMapp" element={<IndiaMapp />}/>
             <Route path="/create-order" element={<CreateOrderFlow />}/>
             <Route path="/billing" element={<BillingPage />}/>
             <Route path="/" element={<Dashboard/>} />
           </Routes>
         </div>
       </div>
     </Router>
  );
}

export default App;
