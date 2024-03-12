import "./Dashboard.css";
import PnL from "./DashboardTabs/PnL";
import Row from "react-bootstrap/Row";
import React, { useState } from "react";
import NavTabs from "./navTabs/NavTabs";
import Overview from "./DashboardTabs/Overview";
import SubAccounts from "./DashboardTabs/SubAccounts";
import { useDispatch, useSelector } from "react-redux";
import NDRDashboard from "./DashboardTabs/NDRDashboard";
import RTODashboard from "./DashboardTabs/RTODashboard";
import WhatsappComm from "./DashboardTabs/WhatsappComm";
import EmployeeDash from "./DashboardTabs/EmployeeDash";
import CourierDelays from "./DashboardTabs/CourierDelays";
import OrdersDashboard from "./DashboardTabs/OrdersDashboard";
import ShipmentDashboard from "./DashboardTabs/ShipmentDashboard";
import CourierDashboard from "./DashboardTabs/CourierDashboard";


function Dashboard() {
  const [activeTab, setActiveTab] = useState("Overview");

  const { checkAuth } = useSelector(state => state?.authDataReducer)

  return (
    <>
      <NavTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {/* overview */}
      <div className={`${activeTab === "Overview" ? "d-block" : "d-none"}`}>
        <Overview activeTab={activeTab} />
      </div>

      {/* Orders */}
      <div className={`${activeTab === "Orders" ? "d-block" : "d-none"}`}>
        <OrdersDashboard activeTab={activeTab} />
      </div>

      {/* Shipment */}
      <div className={`${activeTab === "Shipment" ? "d-block" : "d-none"}`}>
        <ShipmentDashboard activeTab={activeTab} />
      </div>

      {/* NDR */}
      <div className={`${activeTab === "NDR" ? "d-block" : "d-none"}`}>
        <NDRDashboard activeTab={activeTab} />
      </div>


      {/* RTO */}
      <div className={`${activeTab === "RTO" ? "d-block" : "d-none"}`}>
        <RTODashboard activeTab={activeTab} />
      </div>

      {/* Courier Delays */}
      <div className={`${activeTab === "Courier Delays" ? "d-block" : "d-none"}`}>
        <CourierDashboard activeTab={activeTab} />
      </div>

      {/* Whatsapp Comm */}
      <div className={`${activeTab === "Whatsapp Comm" ? "d-block" : "d-none"}`}>
        <WhatsappComm activeTab={activeTab} />
      </div>

      {/* SubAccounts*/}
      <div className={`${activeTab === "Sub Accounts" ? "d-block" : "d-none"}`}>
        <SubAccounts activeTab={activeTab} />
      </div>

      {/* Employees*/}
      <div className={`${activeTab === "Employees" ? "d-block" : "d-none"}`}>
        <EmployeeDash activeTab={activeTab} />
      </div>

      {/* Employees*/}
      <div className={`${activeTab === "P & L" ? "d-block" : "d-none"}`}>
        <PnL activeTab={activeTab} />
      </div>

    </>
  );
}

export default Dashboard;
