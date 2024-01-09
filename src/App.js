import 'devextreme/dist/css/dx.light.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./Component/common/sidebar/SideNav";
import Header from "./Component/common/header/Header";
import "./App.css";
import Dashboard from "./Component/Pages/Dashboard/Dashboard";
import DailyPrefrences from './Component/common/Graph/DailyPrefrence';
import IndiaMapp from './Component/common/Graph/IndiaMapp';
import Shipment from './Component/Pages/Dashboard/DashboardTabs/ShipmentDashboard';
import MoreOnOrders from './Component/Pages/MoreOnOrders/MoreOnOrders';
import OrdersPage from './Component/Pages/OrdersPage/OrdersPage';
import AllOrders from './Component/Pages/OrdersPage/Components/AllOrders/AllOrders';
import ShipmentsPage from './Component/Pages/ShipmentsPage/ShipmentsPage';
import ChannelsPage from './Component/Pages/ChannelsPage/ChannelsPage';

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
             <Route path="/channels" element={<ChannelsPage />}/>
             <Route path="/IndiaMapp" element={<IndiaMapp />}/>
             <Route path="/" element={<Dashboard/>} />
           </Routes>
         </div>
       </div>
     </Router>
  );
}

export default App;
