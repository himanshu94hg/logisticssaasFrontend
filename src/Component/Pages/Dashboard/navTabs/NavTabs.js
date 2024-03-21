import React from "react";
import {
  Card,
  Navbar,
  Nav
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBinoculars,
  faCube,
  faCartFlatbed,
} from "@fortawesome/free-solid-svg-icons";
import "./navTabs.css";

export default function NavTabs(props) {
  return (
    <Navbar
      className="w-100 box-shadow shadow-sm p7"
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
              title="Non-Delivery Report"
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
              title="Return to Origin"
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
                Courier
              </div>
            </Nav.Link>
            <Nav.Link className={`${props.activeTab === "Whatsapp Comm" ? "active" : ""}`}
              onClick={() => {
                props.setActiveTab("Whatsapp Comm");
              }}
            >
              {" "}
              <div className="navItemsContainer">
                {/* <FontAwesomeIcon icon={faCube} /> */}
                WhatsApp Comm
              </div>
            </Nav.Link>
            <Nav.Link className={`${props.activeTab === "Sub Accounts" ? "active" : ""}`}
              onClick={() => {
                props.setActiveTab("Sub Accounts");
              }}
            >
              {" "}
              <div className="navItemsContainer">
                {/* <FontAwesomeIcon icon={faCube} /> */}
                Sub Accounts
              </div>
            </Nav.Link>
            <Nav.Link className={`${props.activeTab === "Employees" ? "active" : ""}`}
              onClick={() => {
                props.setActiveTab("Employees");
              }}
            >
              {" "}
              <div className="navItemsContainer">
                {/* <FontAwesomeIcon icon={faCube} /> */}
                Employees
              </div>
            </Nav.Link>
            <Nav.Link className={`${props.activeTab === "P & L" ? "active" : ""}`}
              onClick={() => {
                props.setActiveTab("P & L");
              }}
            >
              {" "}
              <div className="navItemsContainer">
                {/* <FontAwesomeIcon icon={faCube} /> */}
                Business Health
              </div>
            </Nav.Link>
          </div>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
