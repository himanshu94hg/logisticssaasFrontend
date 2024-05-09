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
  const navigation = useNavigate();
  const [selectedOption, setSelectedOption] = useState("Domestic");
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = () => {
    let sellerData = 3;

    const response = axios.get(`${BASE_URL_CORE}/core-api/channel/channel/?seller_id=${sellerData}&channel=shopify`);
    if (response.status === 200) {

    } else {
      const errorData = response.data;
      console.error('API Error:', errorData);
    }
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
            <Nav.Link className={`${props.activeTab === "Courier Preferences" ? "active" : ""}`}
              onClick={() => {
                props.setActiveTab("Courier Preferences");
              }}
            >
              <div className="navItemsContainer">
                {/* <FontAwesomeIcon icon={faBinoculars} /> */}
                Preferences
              </div>
            </Nav.Link>
            <Nav.Link className={`${props.activeTab === "Set preference Rules" ? "active" : ""}`}
              onClick={() => {
                props.setActiveTab("Set preference Rules");
              }}
            >
              {" "}
              <div className="navItemsContainer">
                {/* <FontAwesomeIcon icon={faCube} /> */}
                Rules
              </div>
            </Nav.Link>
          </div>
        </Nav>
      </Navbar.Collapse>
      {/* <div className="d-flex gap-10 align-items-center">
        <button className="btn main-button" onClick={handleSubmit}>Sync Orders</button>
        <button className="btn main-button">Import CSV</button>
        <Link to="/create-order" className="btn main-button"><FontAwesomeIcon icon={faPlus} /> Create Order</Link>
      </div> */}
    </Navbar>
  );
}
