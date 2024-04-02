import axios from "axios";
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import React, { useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from "react-router-dom";
import { createOrderPattern } from "../../../../../Routes";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown, faPlus } from '@fortawesome/free-solid-svg-icons';
import { AiOutlineImport } from "react-icons/ai";
import { IoMdSync } from "react-icons/io";
// import "./navTabs.css";

export default function NavTabs(props) {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("Domestic");
  const [isOpen, setIsOpen] = useState(false);
  const sellerData = Cookies.get("user_id");

  const handleSubmit = () => {
    const response = axios.get(`https://dev.shipease.in/core-api/channel/channel/?seller_id=${sellerData}&channel=shopify`)
      .then((response) => {
        toast.success('Order Fetch Successfully');
      }).catch((error) => {
        toast.error('Order Fetch Failed!');
      });
    console.log("Data", response);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const toggleOptions = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Navbar
      className="w-100 box-shadow shadow-sm p7 gap-10"
      variant="light"
      id="shipEaseNavTabs"
    >
      <Navbar.Toggle aria-controls="navTabs" />
      <Navbar.Collapse id="navTabs">
        <Nav className="ml-auto w-100 alignContent">
          <div className="alignContent">
            <Nav.Link className={`${props.activeTab === "All Orders" ? "active" : ""}`}
              onClick={() => {
                props.setActiveTab("All Orders");
              }}
            >
              <div className="navItemsContainer">
                {/* <FontAwesomeIcon icon={faBinoculars} /> */}
                All Orders
              </div>
            </Nav.Link>
            <Nav.Link className={`${props.activeTab === "Unprocessable" ? "active" : ""}`}
              onClick={() => {
                props.setActiveTab("Unprocessable");
              }}
            >
              {" "}
              <div className="navItemsContainer">
                {/* <FontAwesomeIcon icon={faCube} /> */}
                Unprocessable
              </div>
            </Nav.Link>
            <Nav.Link className={`${props.activeTab === "Processing" ? "active" : ""}`}
              onClick={() => {
                props.setActiveTab("Processing");
              }}
            >
              {" "}
              <div className="navItemsContainer">
                {/* <FontAwesomeIcon icon={faCartFlatbed} /> */}
                Processing
              </div>
            </Nav.Link>
            <Nav.Link className={`${props.activeTab === "Ready to Ship" ? "active" : ""}`}
              onClick={() => {
                props.setActiveTab("Ready to Ship");
              }}
            >
              {" "}
              <div className="navItemsContainer">
                {/* <FontAwesomeIcon icon={faCube} /> */}
                Ready to Ship
              </div>
            </Nav.Link>
            <Nav.Link className={`${props.activeTab === "Pickup" ? "active" : ""}`}
              onClick={() => {
                props.setActiveTab("Pickup");
              }}
            >
              <div className="navItemsContainer">
                Pickups
              </div>
            </Nav.Link>
            <Nav.Link className={`${props.activeTab === "Manifest" ? "active" : ""}`}
              onClick={() => {
                props.setActiveTab("Manifest");
              }}
            >
              <div className="navItemsContainer">
                Manifest
              </div>
            </Nav.Link>
            <Nav.Link className={`${props.activeTab === "Returns" ? "active" : ""}`}
              onClick={() => {
                props.setActiveTab("Returns");
              }}
            >
              <div className="navItemsContainer">
                {/* <FontAwesomeIcon icon={faCube} /> */}
                Returns
              </div>
            </Nav.Link>
          </div>
        </Nav>
      </Navbar.Collapse>
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
            className={`option ${selectedOption === "International" ? "selected" : ""}`}
            onClick={() => handleOptionSelect("International")}
          >
            International
          </div>
        </div>

      </div>
      <div className="d-flex gap-10 align-items-center">
        <button
          className="btn main-button"
          onClick={() => navigate(createOrderPattern, { state: { orderType: "BulkCreateOrder" } })}
        >
          <AiOutlineImport className="align-text-bottom" /> Import
        </button>
        <button className="btn main-button" onClick={handleSubmit}><IoMdSync /> Sync</button>
        <button onClick={() => navigate(createOrderPattern, { state: { orderType: "normalOrder" } })} className="btn main-button"><FontAwesomeIcon icon={faPlus} /> Create</button>
      </div>
    </Navbar>
  );
}
