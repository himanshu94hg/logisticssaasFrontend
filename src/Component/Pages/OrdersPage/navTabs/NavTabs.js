import React, { useState } from "react";
import {
  Navbar,
  Nav
} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown, faPlus } from '@fortawesome/free-solid-svg-icons';
// import "./navTabs.css";

export default function NavTabs(props) {
  const [selectedOption, setSelectedOption] = useState("Domestic");
  const [isOpen, setIsOpen] = useState(false);

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
      bg="light"
      variant="light"
      id="shipEaseNavTabs"
    >
      <Navbar.Toggle aria-controls="navTabs" />
      <Navbar.Collapse id="navTabs">
        <Nav className="ml-auto w-100 alignContent">
          <div className="alignContent">
            <Nav.Link className={`${props.activeTab === "Overview" ? "active" : ""}`}
              onClick={() => {
                props.setActiveTab("Overview");
              }}
            >
              <div className="navItemsContainer">
                {/* <FontAwesomeIcon icon={faBinoculars} /> */}
                Overview
              </div>
            </Nav.Link>
            <Nav.Link className={`${props.activeTab === "Orders" ? "active" : ""}`}
              onClick={() => {
                props.setActiveTab("Orders");
              }}
            >
              {" "}
              <div className="navItemsContainer">
                {/* <FontAwesomeIcon icon={faCube} /> */}
                Orders
              </div>
            </Nav.Link>
            <Nav.Link className={`${props.activeTab === "Shipment" ? "active" : ""}`}
              onClick={() => {
                props.setActiveTab("Shipment");
              }}
            >
              {" "}
              <div className="navItemsContainer">
                {/* <FontAwesomeIcon icon={faCartFlatbed} /> */}
                Shipment
              </div>
            </Nav.Link>
            <Nav.Link className={`${props.activeTab === "NDR" ? "active" : ""}`}
              onClick={() => {
                props.setActiveTab("NDR");
              }}
            >
              {" "}
              <div className="navItemsContainer">
                {/* <FontAwesomeIcon icon={faCube} /> */}
                NDR
              </div>
            </Nav.Link>
            <Nav.Link className={`${props.activeTab === "RTO" ? "active" : ""}`}
              onClick={() => {
                props.setActiveTab("RTO");
              }}
            >
              {" "}
              <div className="navItemsContainer">
                {/* <FontAwesomeIcon icon={faCube} /> */}
                RTO
              </div>
            </Nav.Link>
            <Nav.Link className={`${props.activeTab === "Courier Delays" ? "active" : ""}`}
              onClick={() => {
                props.setActiveTab("Courier Delays");
              }}
            >
              {" "}
              <div className="navItemsContainer">
                {/* <FontAwesomeIcon icon={faCube} /> */}
                Courier Delays
              </div>
            </Nav.Link>
          </div>
        </Nav>
      </Navbar.Collapse>
      <div className={`down-sliding-select ${isOpen ? "open" : ""}`} onMouseEnter={()=>{setIsOpen(true);}} onMouseLeave={()=>{setIsOpen(false);}}>
        <div className="selected-option">
          {selectedOption || "Select an option"}
          <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />

        </div>
       
          <div className={`options-container ${isOpen?"open":""}`}>
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
      <div className="d-flex gap-10">
        <button className="btn main-button">Sync Orders</button>
        <button className="btn main-button">Import CSV</button>
        <button className="btn main-button"><FontAwesomeIcon icon={faPlus} /> Create Order</button>
      </div>
    </Navbar>
  );
}
