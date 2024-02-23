import React, { useState } from "react";
import {
  Navbar,
  Nav
} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import SearchIcon from '../../../../../assets/image/icons/search-icon.png'
import { RiFilterLine } from "react-icons/ri";
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
            <Nav.Link className={`${props.activeTab === "allTickets" ? "active" : ""}`}
              onClick={() => {
                props.setActiveTab("allTickets");
              }}
            >
              <div className="navItemsContainer">
                {/* <FontAwesomeIcon icon={faBinoculars} /> */}
                AllTickets
              </div>
            </Nav.Link>
            <Nav.Link className={`${props.activeTab === "openTickets" ? "active" : ""}`}
              onClick={() => {
                props.setActiveTab("openTickets");
              }}
            >
              {" "}
              <div className="navItemsContainer">
                {/* <FontAwesomeIcon icon={faCube} /> */}
                OpenTickets
              </div>
            </Nav.Link>
            <Nav.Link className={`${props.activeTab === "inProgressTickets" ? "active" : ""}`}
              onClick={() => {
                props.setActiveTab("inProgressTickets");
              }}
            >
              {" "}
              <div className="navItemsContainer">
                {/* <FontAwesomeIcon icon={faCartFlatbed} /> */}
                InProgressTickets
              </div>
            </Nav.Link>
            <Nav.Link className={`${props.activeTab === "closedTickets" ? "active" : ""}`}
              onClick={() => {
                props.setActiveTab("closedTickets");
              }}
            >
              {" "}
              <div className="navItemsContainer">
                {/* <FontAwesomeIcon icon={faCube} /> */}
                ClosedTickets
              </div>
            </Nav.Link>
          </div>
        </Nav>
      </Navbar.Collapse>
      <div className="support-right-section">
        <div className="search-container">
          <button>
            <img src={SearchIcon} alt="Search" />
          </button>
          <input required="" type="text" name="text" className="input-field" />
          <label className="label">Search by Ticket ID || AWB || Pickup ID</label>
        </div>
        <button
          onClick={() => props.setFilterTickets(!props.FilterTickets)}
          className="btn main-button-outline">
          <RiFilterLine /> More Filters
        </button>

        <button
          onClick={() => props.setNewTicket(!props.NewTicket)}
          className="btn main-button">
          <FontAwesomeIcon icon={faPlus} /> New Ticket
        </button>
      </div>
    </Navbar>
  );
}
