import React, { useState } from "react";
import {
  Navbar,
  Nav
} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
// import "./navTabs.css";

export default function NavTabs(props) {
  const [selectedOption, setSelectedOption] = useState("Parent Account");
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
      variant="light"
      id="shipEaseNavTabs"
    >
      <Navbar.Toggle aria-controls="navTabs" />
      <Navbar.Collapse id="navTabs">
        <Nav className="ml-auto w-100 alignContent">
          <div className="alignContent">
            <Nav.Link className={`${props.activeTab === "Basic Information" ? "active" : ""}`}
              onClick={() => {
                props.setActiveTab("Basic Information");
              }}
            >
              <div className="navItemsContainer">
                {/* <FontAwesomeIcon icon={faBinoculars} /> */}
                Basic Information
              </div>
            </Nav.Link>
            <Nav.Link className={`${props.activeTab === "Account Information" ? "active" : ""}`}
              onClick={() => {
                props.setActiveTab("Account Information");
              }}
            >
              {" "}
              <div className="navItemsContainer">
                {/* <FontAwesomeIcon icon={faCube} /> */}
                Account Information
              </div>
            </Nav.Link>
            <Nav.Link className={`${props.activeTab === "KYC Information" ? "active" : ""}`}
              onClick={() => {
                props.setActiveTab("KYC Information");
              }}
            >
              {" "}
              <div className="navItemsContainer">
                {/* <FontAwesomeIcon icon={faCartFlatbed} /> */}
                KYC Information
              </div>
            </Nav.Link>
            <Nav.Link className={`${props.activeTab === "Agreement" ? "active" : ""}`}
              onClick={() => {
                props.setActiveTab("Agreement");
              }}
            >
              {" "}
              <div className="navItemsContainer">
                {/* <FontAwesomeIcon icon={faCube} /> */}
                Agreement
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
            className={`option ${selectedOption === "Parent Account" ? "selected" : ""}`}
            onClick={() => handleOptionSelect("Parent Account")}
          >
            Parent Account
          </div>
          <div
            className={`option ${selectedOption === "Sub Acount One" ? "selected" : ""}`}
            onClick={() => handleOptionSelect("Sub Acount One")}
          >
            Sub Acount One
          </div>
          <div
            className={`option ${selectedOption === "Sub Acount Two" ? "selected" : ""}`}
            onClick={() => handleOptionSelect("Sub Acount Two")}
          >
            Sub Acount Two
          </div>
        </div>

      </div>
      <div className="d-flex gap-10 align-items-center">
        <button className="btn main-button-outline">Sub Acount: <strong>2</strong></button>
      </div>
    </Navbar>
  );
}
