// Import necessary modules and components
import React, { useEffect, useState } from 'react';
import './SideNav.css'; // Import your CSS file for styling
import { useLocation } from 'react-router-dom';
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
import FullLogo from '../../../assets/image/logo/logo.svg'
import mobileLogo from '../../../assets/image/logo/mobileLogo.svg'
import { NavLink } from 'react-router-dom';
import SettingsIcon from './Icons/SettingsIcon';

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
  const location = useLocation();

  const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    if (!isExpanded) {
      setDropdownOpen(false);
    }
  }, [isExpanded]);

  const NavLinkComponent = hasDropdown ? 'div' : NavLink;

  const isActive = () => {
    if (!hasDropdown) {
      // If there's no dropdown, check if the current route matches the main menu item
      return location.pathname === to;
    }

    // If there's a dropdown, check if the current route matches either the main menu item or any dropdown option
    return (
      location.pathname === to ||
      dropdownLinks.some((link) => location.pathname === link.to)
    );
  };

  return (
    <div className="nav-link main" onClick={hasDropdown ? handleDropdownToggle : null}>
      <div className="sidebar-label-wrapper">

        <NavLinkComponent to={to} className={`nav-link ${isActive() ? 'active' : ''}`} activeClassName="active">
          {label === "Dashboard" && <DashboardIcon />}
          {label === "Orders" && <OrdersIcon />}
          {label === "More On Orders" && <MoreOnOrdersIcon />}
          {label === "Shipments" && <ShipmentsIcon />}
          {label === "Integration" && <ChannelsIcon />}
          {label === "OMS" && <OMSIcon />}
          {label === "Billing" && <BillingIcon />}
          {label === "Weight Reco." && <WeightRecordsIcon />}
          {label === "Customer" && <CustomerIcon />}
          {label === "Tools" && <ToolsIcons />}
          {label === "MIS" && <MISIcon />}
          {label === "Customer Support" && <CustomerSupportIcon />}
          {label === "Settings" && <SettingsIcon />}
          {/* Add other icons based on the menu item */}


          {isExpanded && <span className="mx-2">{label}
            {hasDropdown && (
              <span className={`dropdown-arrow ms-2 ${isDropdownOpen ? 'open' : ''}`}>
                &#9662;
              </span>
            )}
          </span>}
        </NavLinkComponent>
      </div>

      {isDropdownOpen && hasDropdown && <Dropdown links={dropdownLinks} />}
    </div>
  );
};

const SideNav = () => {
  const [isExpanded, setExpanded] = useState(false);
  const [Logo, setLogo] = useState(mobileLogo);

  useEffect(() => {
    if (isExpanded === true) {
      setLogo(FullLogo)
    } else {
      setLogo(mobileLogo)
    }
  }, [isExpanded])


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
        { to: "/quick-order", label: "Quick Order" },
        { to: "/Reassign-orders", label: "Reassign Orders" },
        { to: "/merge-orders", label: "Merge Orders" },
        { to: "/split-orders", label: "Split Orders" },
        { to: "/reverse-order", label: "Reverse Order" },
      ],
    },
    { to: "/Shipments", label: "Shipments" },
    {
      to: "Integration", label: "Integration", hasDropdown: true, dropdownLinks: [
        { to: "/channels-integration", label: "Channels" },
        { to: "/OMS-integration", label: "OMS" },
        { to: "/couriers-integration", label: "Couriers" },
        { to: "/API-integration", label: "API Integration" },
        { to: "/other-integration", label: "Other Integration" },
      ],
    },
    { to: "/billing", label: "Billing" },
    { to: "/weight-reconciliation", label: "Weight Reco." },
    { to: "/customer", label: "Customer" },
    { to: "/Tools", label: "Tools" },
    { to: "/MIS", label: "MIS" },
    { to: "/customer-support", label: "Customer Support" },
    { to: "/settings", label: "Settings" },
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
          src={Logo}
          alt="Logo"
        // className={`${isExpanded===true ? 'full-logo' : 'mobile-logo'}`}
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