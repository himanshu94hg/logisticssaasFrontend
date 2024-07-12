import axios from "axios";
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import React, { useCallback, useState } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from "react-router-dom";
import { createOrderPattern } from "../../../../../Routes";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown, faPlus } from '@fortawesome/free-solid-svg-icons';
import { AiOutlineImport } from "react-icons/ai";
import { IoMdSync } from "react-icons/io";
import { BASE_URL_CORE } from "../../../../../axios/config";
import { debounce } from "lodash";
import { useSelector } from "react-redux";
import ThreeDots from '../../../../../assets/image/icons/ThreeDots.png'
// import "./navTabs.css";

export default function NavTabs(props) {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("Domestic");
  const [isOpen, setIsOpen] = useState(false);
  const sellerData = Cookies.get("user_id");

  const handleClick = () => {
    const response = axios.get(`${BASE_URL_CORE}/core-api/channel/channel/?seller_id=${sellerData}&channel=shopify`)
      .then((response) => {
        toast.success('Order fetch successfully');
      }).catch((error) => {
        toast.error('Order Fetch Failed!');
      });
    console.log("Data", response);
  };

  const debouncedHandleClick = useCallback(
    debounce((param) => handleClick(param), 1000),
    []
  );
  const handleSubmit = () => {
    debouncedHandleClick();
  }

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const toggleOptions = () => {
    setIsOpen(!isOpen);
  };

  const navItems = ["All", "Unprocessable", "Processing", "Ready to Ship", "Pickup", "Manifest", "Returns"];

  const handleSelect = (selectedKey) => {
    props.setActiveTab(selectedKey);
  };

  const { screenWidthData } = useSelector(state => state?.authDataReducer)

  return (
    <Navbar
      className="w-100 box-shadow shadow-sm p7"
      variant="light"
      id="shipEaseNavTabs"
    >
      <Navbar.Toggle aria-controls="navTabs" />
      <Navbar.Collapse id="navTabs" className="d-none d-lg-block">
        <Nav className="ml-auto w-100 alignContent">
          {screenWidthData > 991 &&
            <div className="alignContent">
              {navItems.map((tab) => (
                <Nav.Link
                  key={tab}
                  className={`d-none d-lg-block ${props.activeTab === tab ? "active" : ""}`}
                  onClick={() => props.setActiveTab(tab)}
                >
                  <div className="navItemsContainer">{tab}</div>
                </Nav.Link>
              ))}
            </div>
          }

          {screenWidthData < 992 &&
            <NavDropdown
              title={props.activeTab || "Select Option"}
              id="nav-dropdown"
              onSelect={handleSelect}
              drop="left"
            >
              {navItems.map((item) => (
                <NavDropdown.Item
                  key={item}
                  eventKey={item}
                  active={props.activeTab === item}
                >
                  {item}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          }

          <div className="d-flex gap-2">
            {screenWidthData > 991 &&
              <div className={`down-sliding-select ${isOpen ? "open" : ""}`} onMouseEnter={() => { setIsOpen(true); }} onMouseLeave={() => { setIsOpen(false); }}>
                <div className="selected-option">
                  {selectedOption || "Select an option"}
                  <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />

                </div>

                <div className={`options-container ${isOpen ? "open" : ""}`}>
                  <div
                    className={`option ${selectedOption === "Domestic" ? "selected" : ""}`}
                    onClick={() => handleOptionSelect("Domestic")}
                  >
                    Domestic
                  </div>
                  <div
                    title="Disabled"
                    // className={`option ${selectedOption === "International" ? "selected" : ""}`}
                    className={`option`}
                  // onClick={() => handleOptionSelect("International")}
                  >
                    International <br />(Will be activated on Request)
                  </div>
                </div>

              </div>
            }
            {screenWidthData > 991 &&
              <div className="d-flex gap-10 align-items-center">
                <button
                  className="btn main-button-outline"
                  onClick={() => navigate(createOrderPattern, { state: { orderType: "BulkCreateOrder" } })}
                >
                  <AiOutlineImport className="align-text-bottom" /> Import
                </button>
                <button className="btn main-button-outline" onClick={handleSubmit}><IoMdSync /> Sync</button>
                <button onClick={() => navigate(createOrderPattern, { state: { orderType: "normalOrder" } })} className="btn main-button"><FontAwesomeIcon icon={faPlus} /> Create</button>
              </div>
            }

            {screenWidthData < 992 &&
              <div className="nav-actions-container">
                <div className="nav-action-dots">
                  <img src={ThreeDots} alt="ThreeDots" width={24} />
                </div>
                <div className="nav-actions-list">
                  <ul>
                    <li
                      className=""
                      onClick={() => navigate(createOrderPattern, { state: { orderType: "BulkCreateOrder" } })}
                    >
                      <AiOutlineImport className="align-text-bottom" /> Import
                    </li>
                    <li className="" onClick={handleSubmit}><IoMdSync /> Sync</li>
                    <li onClick={() => navigate(createOrderPattern, { state: { orderType: "normalOrder" } })} className="">
                      <FontAwesomeIcon icon={faPlus} /> Create
                    </li>
                  </ul>
                </div>
              </div>
            }
          </div>
        </Nav>
      </Navbar.Collapse>

    </Navbar>
  );
}
