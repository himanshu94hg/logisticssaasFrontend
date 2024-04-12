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
          
            <Nav.Link className={`${props.activeTab === "ScheduledReportsMIS" ? "active" : ""}`}
              onClick={() => {
                props.setActiveTab("ScheduledReportsMIS");
              }}
            >
              <div className="navItemsContainer">
                {/* <FontAwesomeIcon icon={faCube} /> */}
                Schedules
              </div>
            </Nav.Link>
            <Nav.Link className={`${props.activeTab === "ReportsMIS" ? "active" : ""}`}
              onClick={() => {
                props.setActiveTab("ReportsMIS");
              }}
            >
              <div className="navItemsContainer">
                {/* <FontAwesomeIcon icon={faCartFlatbed} /> */}
                Reports
              </div>
            </Nav.Link>
            <Nav.Link className={`${props.activeTab === "DownloadMIS" ? "active" : ""}`}
              onClick={() => {
                props.setActiveTab("DownloadMIS");
              }}
            >
              <div className="navItemsContainer">
                {/* <FontAwesomeIcon icon={faCube} /> */}
                Downloads
              </div>
            </Nav.Link>
            <Nav.Link className={`${props.activeTab === "ActivityLogsMIS" ? "active" : ""}`}
              onClick={() => {
                props.setActiveTab("ActivityLogsMIS");
              }}
            >
              <div className="navItemsContainer">
                {/* <FontAwesomeIcon icon={faBinoculars} /> */}
                Activities
              </div>
            </Nav.Link>
          </div>
        </Nav>
      </Navbar.Collapse>

      {/* <div className="d-flex gap-10 align-items-center">
        <button className="btn main-button">Import CSV</button>
        <Link to="/create-order" className="btn main-button"><FontAwesomeIcon icon={faPlus} /> Create Order</Link>
      </div> */}
    </Navbar>
  );
}
