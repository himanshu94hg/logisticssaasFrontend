import './SideNav.css';
import OMSIcon from "./Icons/OMSIcon";
import MISIcon from "./Icons/MISIcon";
import { NavLink, Navigate, useNavigate } from 'react-router-dom';
import ToolsIcons from "./Icons/ToolsIcons";
import OrdersIcon from "./Icons/OrdersIcon";
import BillingIcon from "./Icons/BillingIcon";
import { useLocation } from 'react-router-dom';
import CustomerIcon from "./Icons/CustomerIcon";
import SettingsIcon from './Icons/SettingsIcon';
import ChannelsIcon from "./Icons/ChannelsIcon";
import DashboardIcon from "./Icons/DashboardIcon";
import ShipmentsIcon from "./Icons/ShipmentsIcon";
import React, { useEffect, useState } from 'react';
import MoreOnOrdersIcon from "./Icons/MoreOnOrdersIcon";
import WeightRecordsIcon from "./Icons/WeightRecordsIcon";
import FullLogo from '../../../assets/image/logo/logo.svg'
import CustomerSupportIcon from "./Icons/CustomerSupportIcon";
import mobileLogo from '../../../assets/image/logo/mobileLogo.svg'
import { useDispatch } from 'react-redux';
import pathAction from '../../../redux/action/pathname';
import { indexPattern } from '../../../Routes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import zonePathClearAction from '../../../redux/action/pathname/zonePath';



const Dropdown = ({ links, isOpen }) => {
  const dispatch = useDispatch()

  return (
    <div className={`dropdown-content ${isOpen ? 'open' : ''}`}>
      {links.map((link, index) => (
        <NavLink key={index} to={link.to}
        onClick={(e) => {
          dispatch(zonePathClearAction(link.label));
          dispatch(pathAction(link.label));
        }}
        >
        <span className='submenu-icon'><FontAwesomeIcon icon={faAnglesRight} /></span> {link.label}
        </NavLink>
      ))}
    </div>
  );
};

// dispatch({type:"PATHNAME_ACTION",payload: window.location.pathname})


const MenuItem = ({ to, label, hasDropdown, dropdownLinks, isExpanded, openDropdown, onDropdownToggle }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  // const [isDropdownOpen, setDropdownOpen] = useState(true);
  const location = useLocation();

  const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen);
    onDropdownToggle(label);
  };



  useEffect(() => {
    // Close the dropdown when another dropdown is opened
    if (label !== openDropdown) {
      setDropdownOpen(false);
    }
  }, [openDropdown, label]);

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

        <NavLinkComponent to={to} className={`nav-link ${isActive() ? 'active' : ''}`} activeclassName="active">
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

      {/* {isDropdownOpen && hasDropdown && <Dropdown links={dropdownLinks} />} */}
      {hasDropdown && <Dropdown links={dropdownLinks} isOpen={isDropdownOpen} />}
    </div>
  );
};

const SideNav = (props) => {
  const navigate = useNavigate()
  // const [isExpanded, setExpanded] = useState(false);
  const [isExpanded, setExpanded] = useState(true);
  const [Logo, setLogo] = useState(mobileLogo);
  const [openDropdown, setOpenDropdown] = useState(null);



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
    // Close all dropdowns when slider is closed
    setOpenDropdown(null);
  };

  const handleDropdownToggle = (label) => {
    if (openDropdown === label) {
      setOpenDropdown(null); // Close the dropdown if already open
    } else {
      setOpenDropdown(label); // Open the dropdown
    }
  };

  const handleMappingShow = () => {
    props.setZoneMapping(!props.ZoneMapping);
    setExpanded(false);
  }

  const menuItems = [
    { to: "/", label: "Dashboard" },
    { to: "/Orders", label: "Orders" },
    {
      to: "MoreOnOrders", label: "More On Orders", hasDropdown: true, dropdownLinks: [
        { to: "/create-orders", label: "Quick Order" },
        { to: "/more-on-orders", label: "Reassign Orders" },
        { to: "/more-on-orders", label: "Merge Orders" },
        { to: "/more-on-orders", label: "Split Orders" },
        { to: "/create-orders", label: "Reverse Order" },
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
    {
      to: "/Tools", label: "Tools", hasDropdown: true, dropdownLinks: [
        { to: "/shipping-rates", label: "Rate Card" },
        { to: "/rate-calculator", label: "Rate Calculator" },
        { to: "/serviceability", label: "Serviceability" },
        { label: "Zone Mapping", onClick: handleMappingShow },
        { to: "/report-scheduler", label: "Report Scheduler" },
        { to: "/courier-allocation", label: "Courier Allocation" },
      ],
    },
    { to: "/MIS", label: "MIS" },
    { to: "/customer-support", label: "Customer Support" },
    { to: "/settings", label: "Settings" },
  ];

  const handleMenuItemClick = () => {
    setExpanded(false);
    setOpenDropdown(null);
  };

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
          onClick={() => navigate(indexPattern)}
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
            isExpanded={isExpanded}
            openDropdown={openDropdown}
            onDropdownToggle={handleDropdownToggle}
          />
        ))}
      </div>
    </div>
  );
};

export default SideNav;