import "./Dashboard.css";
import PnL from "./DashboardTabs/PnL";
import Row from "react-bootstrap/Row";
import React, { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { loginPattern } from "../../../Routes";


export function clearAllCookies() {
  const cookies = document.cookie.split(";");
  for (let cookie of cookies) {
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
  }
}


function Dashboard({ ScreenWidth }) {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("Overview");
  const { checkAuthIsValid } = useSelector(state => state?.authDataReducer)


  return (
    <>
      <NavTabs activeTab={activeTab} ScreenWidth={ScreenWidth} setActiveTab={setActiveTab} />
      {/* overview */}
      <div className={`${activeTab === "Overview" ? "d-block" : "d-none"}`}>
        <Overview activeTab={activeTab} ScreenWidth={ScreenWidth} />
      </div>

      {/* Orders */}
      <div className={`${activeTab === "Orders" ? "d-block" : "d-none"}`}>
        <OrdersDashboard activeTab={activeTab} ScreenWidth={ScreenWidth} />
      </div>

      {/* Shipment */}
      <div className={`${activeTab === "Shipment" ? "d-block" : "d-none"}`}>
        <ShipmentDashboard activeTab={activeTab} ScreenWidth={ScreenWidth} />
      </div>

      {/* NDR */}
      <div className={`${activeTab === "NDR" ? "d-block" : "d-none"}`}>
        <NDRDashboard activeTab={activeTab} ScreenWidth={ScreenWidth} />
      </div>


      {/* RTO */}
      <div className={`${activeTab === "RTO" ? "d-block" : "d-none"}`}>
        <RTODashboard activeTab={activeTab} ScreenWidth={ScreenWidth} />
      </div>

      {/* Courier Delays */}
      <div className={`${activeTab === "Courier Delays" ? "d-block" : "d-none"}`}>
        <CourierDashboard activeTab={activeTab} ScreenWidth={ScreenWidth} />
      </div>

      {/* Whatsapp Comm */}
      <div className={`${activeTab === "Whatsapp Comm" ? "d-block" : "d-none"}`}>
        <WhatsappComm activeTab={activeTab} ScreenWidth={ScreenWidth} />
      </div>

      {/* SubAccounts*/}
      <div className={`${activeTab === "Sub Accounts" ? "d-block" : "d-none"}`}>
        <SubAccounts activeTab={activeTab} ScreenWidth={ScreenWidth} />
      </div>

      {/* Employees*/}
      <div className={`${activeTab === "Employees" ? "d-block" : "d-none"}`}>
        <EmployeeDash activeTab={activeTab} ScreenWidth={ScreenWidth} />
      </div>

      {/* Employees*/}
      <div className={`${activeTab === "P & L" ? "d-block" : "d-none"}`}>
        <PnL activeTab={activeTab} ScreenWidth={ScreenWidth} />
      </div>

    </>
  );
}

export default Dashboard;
