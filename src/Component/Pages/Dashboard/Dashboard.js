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

function Dashboard() {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <>
      <NavTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* overview */}
      <div className={`${activeTab === "Overview" ? "d-block" : "d-none"}`}>
        <Overview />
      </div>

      {/* Orders */}
      <div className={`${activeTab === "Orders" ? "d-block" : "d-none"}`}>
        <OrdersDashboard />
      </div>

      {/* Shipment */}
      <div className={`${activeTab === "Shipment" ? "d-block" : "d-none"}`}>
        <ShipmentDashboard />
      </div>

      {/* NDR */}
      <div className={`${activeTab === "NDR" ? "d-block" : "d-none"}`}>
        <NDRDashboard />
      </div>


      {/* RTO */}
      <div className={`${activeTab === "RTO" ? "d-block" : "d-none"}`}>
        <RTODashboard />
      </div>

      {/* Courier Delays */}
      <div className={`${activeTab === "Courier Delays" ? "d-block" : "d-none"}`}>
        <CourierDelays />
      </div>

      {/* Whatsapp Comm */}
      <div className={`${activeTab === "Whatsapp Comm" ? "d-block" : "d-none"}`}>
        <WhatsappComm />
      </div>

      {/* SubAccounts*/}
      <div className={`${activeTab === "Sub Accounts" ? "d-block" : "d-none"}`}>
        <SubAccounts />
      </div>

      {/* Employees*/}
      <div className={`${activeTab === "Employees" ? "d-block" : "d-none"}`}>
        <EmployeeDash />
      </div>

      {/* Employees*/}
      <div className={`${activeTab === "P & L" ? "d-block" : "d-none"}`}>
        <PnL />
      </div>

    </>
  );
}

export default Dashboard;
