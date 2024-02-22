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
      variant="light"
      id="shipEaseNavTabs"
    >
      <Navbar.Toggle aria-controls="navTabs" />
      <Navbar.Collapse id="navTabs">
        <Nav className="ml-auto w-100 alignContent">
          <div className="alignContent">
            <Nav.Link className={`${props.activeTab === "Shipping Charges" ? "active" : ""}`}
              onClick={() => {
                props.setActiveTab("Shipping Charges");
              }}
            >
              <div className="navItemsContainer">
                {/* <FontAwesomeIcon icon={faBinoculars} /> */}
                Shipping Charges
              </div>
            </Nav.Link>
            <Nav.Link className={`${props.activeTab === "Remittance Logs" ? "active" : ""}`}
              onClick={() => {
                props.setActiveTab("Remittance Logs");
              }}
            >
              {" "}
              <div className="navItemsContainer">
                {/* <FontAwesomeIcon icon={faCube} /> */}
                Remittance Logs
              </div>
            </Nav.Link>
            <Nav.Link className={`${props.activeTab === "Recharge Logs" ? "active" : ""}`}
              onClick={() => {
                props.setActiveTab("Recharge Logs");
              }}
            >
              {" "}
              <div className="navItemsContainer">
                {/* <FontAwesomeIcon icon={faCartFlatbed} /> */}
                Recharge Logs
              </div>
            </Nav.Link>
            <Nav.Link className={`${props.activeTab === "Invoices" ? "active" : ""}`}
              onClick={() => {
                props.setActiveTab("Invoices");
              }}
            >
              {" "}
              <div className="navItemsContainer">
                {/* <FontAwesomeIcon icon={faCube} /> */}
                Invoices
              </div>
            </Nav.Link>
            <Nav.Link className={`${props.activeTab === "Passbook" ? "active" : ""}`}
              onClick={() => {
                props.setActiveTab("Passbook");
              }}
            >
              {" "}
              <div className="navItemsContainer">
                {/* <FontAwesomeIcon icon={faCube} /> */}
                Passbook
              </div>
            </Nav.Link>
            <Nav.Link className={`${props.activeTab === "Credit Receipt" ? "active" : ""}`}
              onClick={() => {
                props.setActiveTab("Credit Receipt");
              }}
            >
              {" "}
              <div className="navItemsContainer">
                Credit Receipt
              </div>
            </Nav.Link>
          </div>
        </Nav>
      </Navbar.Collapse>
      
      <div className="d-flex gap-10 align-items-center">
        <button className="btn main-button">Export CSV</button>
      </div>
    </Navbar>
  );
}
