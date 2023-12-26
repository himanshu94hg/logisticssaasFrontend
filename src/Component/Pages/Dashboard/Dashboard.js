import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import NavTabs from "./navTabs/NavTabs";
import "./Dashboard.css";
import Shipment from "./DashboardTabs/Shipment";
import NDR from "./DashboardTabs/NDR";
import RTO from "./DashboardTabs/RTO";
import CourierDelays from "./DashboardTabs/CourierDelays";
import Overview from "./DashboardTabs/Overview";
import Orders from "./DashboardTabs/Orders";

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
        <Orders />
      </div>

      {/* Shipment */}
      <div className={`${activeTab === "Shipment" ? "d-block" : "d-none"}`}>
      <Shipment />
      </div>

      {/* NDR */}
      <div className={`${activeTab === "NDR" ? "d-block" : "d-none"}`}>
      <NDR />
      </div>


      {/* RTO */}
      <div className={`${activeTab === "RTO" ? "d-block" : "d-none"}`}>
      <RTO />
      </div>

      {/* Courier Delays */}
      <div className={`${activeTab === "Courier Delays" ? "d-block" : "d-none"}`}>
      <CourierDelays />
      </div>

    </>
  );
}

export default Dashboard;
