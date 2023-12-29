import React, { useState } from "react";
import "./sidebar.css";
import { Link } from "react-router-dom";
import DashboardIcon from "./Icons/DashboardIcon";
import OrdersIcon from "./Icons/OrdersIcon";
import BillingIcon from "./Icons/BillingIcon";
import ChannelsIcon from "./Icons/ChannelsIcon";
import CustomerSupportIcon from "./Icons/CustomerSupportIcon";
import MoreOnOrdersIcon from "./Icons/MoreOnOrdersIcon";
import ShipmentsIcon from "./Icons/ShipmentsIcon";
import OMSIcon from "./Icons/OMSIcon";
import WeightRecordsIcon from "./Icons/WeightRecordsIcon";
import ToolsIcons from "./Icons/ToolsIcons";
import CustomerIcon from "./Icons/CustomerIcon";
import MISIcon from "./Icons/MISIcon";
import Logo from '../../../assets/image/logo/logo.svg'
import mobileLogo from '../../../assets/image/logo/mobileLogo.svg'

const sidebarItems = [
  { icon: DashboardIcon, to: "/", label: "Dashboard" },
  { icon: OrdersIcon, to: "/Orders", label: "Orders" },
  { icon: MoreOnOrdersIcon, to: "/MoreOnOrders", label: "More On Orders" },
  { icon: ShipmentsIcon, to: "/Shipments", label: "Shipments" },
  { icon: ChannelsIcon, to: "/Channels", label: "Channels" },
  { icon: OMSIcon, to: "/OMS", label: "OMS" },
  { icon: BillingIcon, to: "/billing", label: "Billing" },
  { icon: WeightRecordsIcon, to: "/WeightReconciliation", label: "Weight Reco." },
  { icon: CustomerIcon, to: "/Customer", label: "Customer" },
  { icon: ToolsIcons, to: "/Tools", label: "Tools" },
  { icon: MISIcon, to: "/MIS", label: "MIS" },
  { icon: CustomerSupportIcon, to: "/CustomerSupport", label: "Customer Support" },
];

export default function Sidebar() {
  const [expanded, setExpanded] = useState(true);

  return (
    <div
      onMouseEnter={(e) => {
        console.log("move in");
        setExpanded(true);
      }}
      onMouseLeave={(e) => {
        console.log(e.target, "leave");
        setExpanded(false);
      }}
    >
      <div className={`${expanded ? "placeholder" : ""}`} />
      <div
        className={`${
          expanded ? "absolute-sidebar" : ""
        } side-navbar active-nav d-flex justify-content-between flex-wrap`}
        id="sidebar"
      >
        <ul className="nav flex-column text-white w-100">
          <div
            className={`m-2 ${
              expanded ? "large-img-wrapper" : "small-img-wrapper"
            } company-logo`}
          >
            {expanded ? (
              <img
                alt="company-logo"
                src={Logo}
                className="inline-block"
                width="100%"
                height="100%"
              />
            ) : (
              <img
                alt="company-logo"
                src={mobileLogo}
                className="inline-block"
                width="100%"
                height="100%"
              />
            )}
          </div>
     
          {sidebarItems.map((item, index) => (
            <Link
              key={`${item.label}_${index}`}
              to={item.to}
              className="nav-link"
              onClick={()=>{setExpanded(false)}}
            >
              <div className="sidebar-label-wrapper">
                <item.icon />
                {expanded && <span className="mx-2">{item.label}
                
                </span>}
              </div>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}
