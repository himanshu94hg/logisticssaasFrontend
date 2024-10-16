import './SideNav.css';
import axios from 'axios';
import Cookies from "js-cookie";
import OMSIcon from "./Icons/OMSIcon";
import MISIcon from "./Icons/MISIcon";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import ToolsIcons from "./Icons/ToolsIcons";
import OrdersIcon from "./Icons/OrdersIcon";
import BillingIcon from "./Icons/BillingIcon";
import { useLocation } from 'react-router-dom';
import { indexPattern } from '../../../Routes';
import CustomerIcon from "./Icons/CustomerIcon";
import SettingsIcon from './Icons/SettingsIcon';
import ChannelsIcon from "./Icons/ChannelsIcon";
import DashboardIcon from "./Icons/DashboardIcon";
import ShipmentsIcon from "./Icons/ShipmentsIcon";
import React, { useEffect, useState } from 'react';
import { BASE_URL_CORE } from '../../../axios/config';
import pathAction from '../../../redux/action/pathname';
import MoreOnOrdersIcon from "./Icons/MoreOnOrdersIcon";
import { NavLink, useNavigate } from 'react-router-dom';
import WeightRecordsIcon from "./Icons/WeightRecordsIcon";
import FullLogo from '../../../assets/image/logo/logo.svg'
import CustomerSupportIcon from "./Icons/CustomerSupportIcon";
import mobileLogo from '../../../assets/image/logo/mobileLogo.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import zonePathClearAction from '../../../redux/action/pathname/zonePath';
import { customErrorFunction } from '../../../customFunction/errorHandling';

const Dropdown = ({ links, isOpen, setExpanded }) => {
  const dispatch = useDispatch();
  const { sellerProfileCard } = useSelector(state => state?.paymentSectionReducer);
  const [ZoneService, setZoneService] = useState(sellerProfileCard?.seller_admin?.zone_service);

  useEffect(() => {
    setZoneService(sellerProfileCard?.seller_admin?.zone_service);
  }, [sellerProfileCard]);

  return (
    <div className={`dropdown-content ${isOpen ? 'open' : ''}`}>
      {links.map((link, index) => {
        if (link.label === "Zone Mapping" && ZoneService === false) {
          return null;
        }
        return (
          <NavLink key={index} to={link.to}
            onClick={() => {
              dispatch(zonePathClearAction(link.label));
              dispatch(pathAction(link.label));
              setExpanded(false);
            }}
          >
            <span className="submenu-icon"><FontAwesomeIcon icon={faAnglesRight} /></span> {link.label}
          </NavLink>
        );
      })}
    </div>
  );
};

const MenuItem = ({ to, label, hasDropdown, dropdownLinks, isExpanded, openDropdown, onDropdownToggle, setExpanded }) => {
  const location = useLocation();
  const NavLinkComponent = hasDropdown ? 'div' : NavLink;
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen);
    onDropdownToggle(label);
  };

  const isActive = () => {
    if (!hasDropdown) {
      return location.pathname === to;
    }
    return (
      location.pathname === to || dropdownLinks.some((link) => location.pathname === link.to)
    );
  };

  const handleMenuItemClick = () => {
    if (!hasDropdown) {
      setExpanded(false)
    }
  }

  useEffect(() => {
    if (label !== openDropdown) {
      setDropdownOpen(false);
    }
  }, [openDropdown, label]);

  return (
    <div className="nav-link main" onClick={hasDropdown ? handleDropdownToggle : null}>
      <div className="sidebar-label-wrapper">
        <NavLinkComponent onClick={handleMenuItemClick} to={to} className={`nav-link ${isActive() ? 'active' : ''}`} activeclassName="active">
          {label === "Dashboard" && <DashboardIcon />}
          {label === "Orders" && <OrdersIcon />}
          {label === "More On Orders" && <MoreOnOrdersIcon />}
          {label === "Shipments" && <ShipmentsIcon />}
          {label === "Integration" && <ChannelsIcon />}
          {label === "OMS" && <OMSIcon />}
          {label === "Billing" && <BillingIcon />}
          {label === "Weight Reco." && <WeightRecordsIcon />}
          {label === "Onboarding" && <CustomerIcon />}
          {label === "Tools" && <ToolsIcons />}
          {label === "MIS" && <MISIcon />}
          {label === "Support" && <CustomerSupportIcon />}
          {label === "Settings" && <SettingsIcon />}
          {isExpanded && <span className="mx-2">{label}
            {hasDropdown && (
              <span className={`dropdown-arrow ms-2 ${isDropdownOpen ? 'open' : ''}`}>
                &#9662;
              </span>
            )}
          </span>}
        </NavLinkComponent>
      </div>
      {hasDropdown && <Dropdown setExpanded={setExpanded} links={dropdownLinks} isOpen={isDropdownOpen} />}
    </div>
  );
};

const SideNav = ({ ZoneMapping, setZoneMapping, isExpanded, setExpanded }) => {
  const navigate = useNavigate()
  const empId = Cookies.get("emp_id")
  let authToken = Cookies.get("access_token")
  const [Logo, setLogo] = useState(mobileLogo);
  const [routeData, setRouteData] = useState([])
  const [finalRoute, setFinalRoute] = useState([])
  const user_type = localStorage.getItem("user_type")
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    if (isExpanded === true) {
      setLogo(FullLogo)
    } else {
      setLogo(mobileLogo)
    }
  }, [isExpanded])

  useEffect(() => {
    if (user_type === "emp") {
      fetchData(empId);
    }
  }, [])

  useEffect(() => {
    if (user_type === "emp") {
      setFinalRoute(routeData)
    } else {
      setFinalRoute(menuItems)
    }
  }, [routeData])

  const handleMouseEnter = () => {
    setExpanded(true);
  };

  const handleMouseLeave = () => {
    setExpanded(false);
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
    setZoneMapping(!ZoneMapping);
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
    { to: "/customer-support", label: "Support" },
    { to: "/settings", label: "Settings" },
    { to: "/customer", label: "Onboarding" },

  ];

  const fetchData = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL_CORE}/core-api/seller/manage-employee-rights?id=${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      if (response.status === 200) {
        const temp = response?.data?.map((item) => ({
          to: item?.route_title === "Dashboard" ? "/" : "/" + item?.route_title,
          label: item?.route_title
        }))
        setRouteData(temp)
      }
    } catch (error) {
      customErrorFunction(error);
    }
  }

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
        />
      </div>
      <div className="menu-container">
        <>
          {finalRoute?.map((item, index) => (
            <MenuItem
              key={index}
              to={item.to}
              label={item.label}
              isExpanded={isExpanded}
              setExpanded={setExpanded}
              openDropdown={openDropdown}
              hasDropdown={item.hasDropdown}
              dropdownLinks={item.dropdownLinks}
              onDropdownToggle={handleDropdownToggle}
            />
          ))}
        </>
      </div>
    </div>
  );
};

export default SideNav;