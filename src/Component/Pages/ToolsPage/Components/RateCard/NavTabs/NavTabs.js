import React, { useEffect, useState } from "react";
import {
  Navbar,
  Nav
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL_CORE } from "../../../../../../axios/config";
// import "./navTabs.css";

export default function NavTabs(props) {

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
            <Nav.Link className={`${props.activeTab === "Shipping Rates" ? "active" : ""}`}
              onClick={() => {
                props.setActiveTab("Shipping Rates");
              }}
            >
              <div className="navItemsContainer">
                Shipping Rates
              </div>
            </Nav.Link>
            <Nav.Link className={`${props.activeTab === "VAS Rates" ? "active" : ""}`}
              onClick={() => {
                props.setActiveTab("VAS Rates");
              }}
            >
              {" "}
              <div className="navItemsContainer">
                {/* <FontAwesomeIcon icon={faCube} /> */}
                VAS Rates
              </div>
            </Nav.Link>
          </div>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
