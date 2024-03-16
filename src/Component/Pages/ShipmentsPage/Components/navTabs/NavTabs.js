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
      variant="light"
      id="shipEaseNavTabs"
    >
      <Navbar.Toggle aria-controls="navTabs" />
      <Navbar.Collapse id="navTabs">
        <Nav className="ml-auto w-100 alignContent">
          <div className="alignContent">
            <Nav.Link className={`${props.activeTab === "Action Required" ? "active" : ""}`}
              onClick={() => {
                props.setActiveTab("Action Required");
              }}
            >
              <div className="navItemsContainer">
                {/* <FontAwesomeIcon icon={faBinoculars} /> */}
                Action Required
              </div>
            </Nav.Link>
            <Nav.Link className={`${props.activeTab === "Action Requested" ? "active" : ""}`}
              onClick={() => {
                props.setActiveTab("Action Requested");
              }}
            >
              {" "}
              <div className="navItemsContainer">
                {/* <FontAwesomeIcon icon={faCube} /> */}
                Action Requested
              </div>
            </Nav.Link>
            <Nav.Link className={`${props.activeTab === "Delivered" ? "active" : ""}`}
              onClick={() => {
                props.setActiveTab("Delivered");
              }}
            >
              {" "}
              <div className="navItemsContainer">
                {/* <FontAwesomeIcon icon={faCartFlatbed} /> */}
                Delivered
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
            
            
          </div>
        </Nav>
      </Navbar.Collapse>
      
      <div className="d-flex gap-10">
        {/* <button className="btn main-button">Sync Orders</button>
        <button className="btn main-button">Import CSV</button>
        <button className="btn main-button"><FontAwesomeIcon icon={faPlus} /> Create Order</button> */}
      </div>
    </Navbar>
  );
}
