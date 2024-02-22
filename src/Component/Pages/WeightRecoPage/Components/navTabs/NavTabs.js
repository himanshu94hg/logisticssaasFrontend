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
            <Nav.Link className={`${props.activeTab === "Weight Reconciliation" ? "active" : ""}`}
              onClick={() => {
                props.setActiveTab("Weight Reconciliation");
              }}
            >
              <div className="navItemsContainer">
                {/* <FontAwesomeIcon icon={faBinoculars} /> */}
                Weight Reconciliation
              </div>
            </Nav.Link>
            <Nav.Link className={`${props.activeTab === "On Hold Reconciliation" ? "active" : ""}`}
              onClick={() => {
                props.setActiveTab("On Hold Reconciliation");
              }}
            >
              {" "}
              <div className="navItemsContainer">
                {/* <FontAwesomeIcon icon={faCube} /> */}
                On-Hold Reconciliation
              </div>
            </Nav.Link>
            <Nav.Link className={`${props.activeTab === "Settled Reconciliation" ? "active" : ""}`}
              onClick={() => {
                props.setActiveTab("Settled Reconciliation");
              }}
            >
              {" "}
              <div className="navItemsContainer">
                {/* <FontAwesomeIcon icon={faCartFlatbed} /> */}
                Settled Reconciliation
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
        <button className="btn main-button">Sync Orders</button>
        <button className="btn main-button">Import CSV</button>
        <Link to="/create-order" className="btn main-button"><FontAwesomeIcon icon={faPlus} /> Create Order</Link>
      </div>
    </Navbar>
  );
}
