import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import NavTabs from "./navTabs/NavTabs";
import "./Dashboard.css";
import ShipmentDashboard from "./DashboardTabs/ShipmentDashboard";
import NDRDashboard from "./DashboardTabs/NDRDashboard";
import RTODashboard from "./DashboardTabs/RTODashboard";
import CourierDelays from "./DashboardTabs/CourierDelays";
import Overview from "./DashboardTabs/Overview";
import OrdersDashboard from "./DashboardTabs/OrdersDashboard";
import WhatsappComm from "./DashboardTabs/WhatsappComm";
import SubAccounts from "./DashboardTabs/SubAccounts";
import EmployeeDash from "./DashboardTabs/EmployeeDash";
import PnL from "./DashboardTabs/PnL";
import { useDispatch } from "react-redux";


function Dashboard() {
  const [activeTab, setActiveTab] = useState("Overview");

console.log(activeTab,"activeTav");


  return (
    <>
      <NavTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {/* overview */}
      <div className={`${activeTab === "Overview" ? "d-block" : "d-none"}`}>
        <Overview activeTab={activeTab} />
      </div>

      {/* Orders */}
      <div className={`${activeTab === "Orders" ? "d-block" : "d-none"}`}>
        <OrdersDashboard  activeTab={activeTab}/>
      </div>

      {/* Shipment */}
      <div className={`${activeTab === "Shipment" ? "d-block" : "d-none"}`}>
        <ShipmentDashboard  activeTab={activeTab}/>
      </div>

      {/* NDR */}
      <div className={`${activeTab === "NDR" ? "d-block" : "d-none"}`}>
        <NDRDashboard  activeTab={activeTab}/>
      </div>


      {/* RTO */}
      <div className={`${activeTab === "RTO" ? "d-block" : "d-none"}`}>
        <RTODashboard  activeTab={activeTab}/>
      </div>

      {/* Courier Delays */}
      <div className={`${activeTab === "Courier Delays" ? "d-block" : "d-none"}`}>
        <CourierDelays  activeTab={activeTab}/>
      </div>

      {/* Whatsapp Comm */}
      <div className={`${activeTab === "Whatsapp Comm" ? "d-block" : "d-none"}`}>
        <WhatsappComm  activeTab={activeTab}/>
      </div>

      {/* SubAccounts*/}
      <div className={`${activeTab === "Sub Accounts" ? "d-block" : "d-none"}`}>
        <SubAccounts  activeTab={activeTab}/>
      </div>

      {/* Employees*/}
      <div className={`${activeTab === "Employees" ? "d-block" : "d-none"}`}>
        <EmployeeDash activeTab={activeTab} />
      </div>

      {/* Employees*/}
      <div className={`${activeTab === "P & L" ? "d-block" : "d-none"}`}>
        <PnL activeTab={activeTab}/>
      </div>

    </>
  );
}

export default Dashboard;
