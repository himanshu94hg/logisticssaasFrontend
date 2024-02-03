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
      bg="light"
      variant="light"
      id="shipEaseNavTabs"
    >
      <Navbar.Toggle aria-controls="navTabs" />
      <Navbar.Collapse id="navTabs">
        <Nav className="ml-auto w-100 alignContent">
          <div className="alignContent">
            <Nav.Link className={`${props.activeTab === "DomesticCreateOrder" ? "active" : ""}`}
              onClick={() => {
                props.setActiveTab("DomesticCreateOrder");
              }}
            >
              <div className="navItemsContainer">
                {/* <FontAwesomeIcon icon={faBinoculars} /> */}
                Domestic Order
              </div>
            </Nav.Link>
            <Nav.Link className={`${props.activeTab === "InternationalCreateOrders" ? "active" : ""}`}
              onClick={() => {
                props.setActiveTab("InternationalCreateOrders");
              }}
            >
              {" "}
              <div className="navItemsContainer">
                {/* <FontAwesomeIcon icon={faCube} /> */}
                International Orders
              </div>
            </Nav.Link>
            <Nav.Link className={`${props.activeTab === "BulkCreateOrder" ? "active" : ""}`}
              onClick={() => {
                props.setActiveTab("BulkCreateOrder");
              }}
            >
              {" "}
              <div className="navItemsContainer">
                {/* <FontAwesomeIcon icon={faCartFlatbed} /> */}
                Bulk Orders
              </div>
            </Nav.Link>
            <Nav.Link className={`${props.activeTab === "QuickCreateOrder" ? "active" : ""}`}
              onClick={() => {
                props.setActiveTab("QuickCreateOrder");
              }}
            >
              {" "}
              <div className="navItemsContainer">
                {/* <FontAwesomeIcon icon={faCube} /> */}
                Quick Orders
              </div>
            </Nav.Link>
          </div>
        </Nav>
      </Navbar.Collapse>

    </Navbar>
  );
}
