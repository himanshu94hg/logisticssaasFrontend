// Import necessary modules and components
import React, { useEffect, useState } from 'react';
import './SideNav.css'; // Import your CSS file for styling
import { Link } from 'react-router-dom';
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
import { NavLink } from 'react-router-dom';

const Dropdown = ({ links }) => {
  return (
    <div className="dropdown-content">
      {links.map((link, index) => (
        <NavLink key={index} to={link.to}>
          {link.label}
        </NavLink>
      ))}
    </div>
  );
};

const MenuItem = ({ to, label, hasDropdown, dropdownLinks, isExpanded }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [navItemCon, setNavItemCon] = useState();

  const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    if (!isExpanded) {
      setDropdownOpen(false);
    }
  }, [isExpanded]);

  useEffect(() => {
    if (hasDropdown === true) {
      setNavItemCon("div");
    }
    else{
      setNavItemCon("NavLink");
    }
  }, );

  return (
    <div className="nav-link" onClick={hasDropdown ? handleDropdownToggle : null}>
      <div className="sidebar-label-wrapper">
        
        <navItemCon to={to} activeclassName="active">
          {label === "Dashboard" && <DashboardIcon />}
          {label === "Orders" && <OrdersIcon />}
          {label === "More On Orders" && <MoreOnOrdersIcon />}
          {label === "Shipments" && <ShipmentsIcon />}
          {label === "Channels" && <ChannelsIcon />}
          {label === "OMS" && <OMSIcon />}
          {label === "Billing" && <BillingIcon />}
          {label === "Weight Reco." && <WeightRecordsIcon />}
          {label === "Customer" && <CustomerIcon />}
          {label === "Tools" && <ToolsIcons />}
          {label === "MIS" && <MISIcon />}
          {label === "Support" && <CustomerSupportIcon />}
          {/* Add other icons based on the menu item */}


          {isExpanded && <span className="mx-2">{label}
            {hasDropdown && (
              <span className={`dropdown-arrow ${isDropdownOpen ? 'open' : ''}`}>
                &#9662;
              </span>
            )}
          </span>}
        </navItemCon>
      </div>

      {isDropdownOpen && hasDropdown && <Dropdown links={dropdownLinks} />}
    </div>
  );
};

const SideNav = () => {
  const [isExpanded, setExpanded] = useState(true);

  const handleMouseEnter = () => {
    setExpanded(true);
  };

  const handleMouseLeave = () => {
    setExpanded(false);
  };

  const menuItems = [
    { to: "/", label: "Dashboard" },
    { to: "/Orders", label: "Orders" },
    {
      to: "MoreOnOrders", label: "More On Orders", hasDropdown: true, dropdownLinks: [
        { to: "/dashboard-details", label: "Details 1" },
        { to: "/dashboard-summary", label: "Summary" },
      ],
    },
    { to: "/Shipments", label: "Shipments" },
    { to: "/Channels", label: "Channels" },
    { to: "/OMS", label: "OMS" },
    { to: "/billing", label: "Billing" },
    { to: "/WeightReconciliation", label: "Weight Reco." },
    { to: "/Customer", label: "Customer" },
    { to: "/Tools", label: "Tools" },
    { to: "/MIS", label: "MIS" },
    { to: "/CustomerSupport", label: "Support" },
  ];

  return (
    <div
      id="sidenav"
      className={`SideNav ${isExpanded ? 'expanded' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="logo-container">
        <img
          src={isExpanded ? Logo : mobileLogo}
          alt="Logo"
          className={`${isExpanded ? 'full-logo' : 'mobile-logo'}`}
        />
      </div>
      <div className="menu-container">
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            to={item.to}
            label={item.label}
            hasDropdown={item.hasDropdown}
            dropdownLinks={item.dropdownLinks}
            isExpanded={isExpanded} />
        ))}
      </div>
    </div>
  );
};

export default SideNav;