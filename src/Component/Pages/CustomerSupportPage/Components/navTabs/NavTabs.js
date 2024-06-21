import React, { useEffect, useState } from "react";
import {
  Navbar,
  Nav
} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown, faPlus, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import SearchIcon from '../../../../../assets/image/icons/search-icon.png'
import { RiFilterLine } from "react-icons/ri";
import { RxReset } from "react-icons/rx";
import globalDebouncedClick from "../../../../../debounce";
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

  const handlereset = () => {
    props.setSearchValue('')
    props.setClearTicket(true)
    props.handleReset();
  }

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
                props.handleReset();
              }}
            >
              <div className="navItemsContainer">
                {/* <FontAwesomeIcon icon={faBinoculars} /> */}
                All
              </div>
            </Nav.Link>
            <Nav.Link className={`${props.activeTab === "openTickets" ? "active" : ""}`}
              onClick={() => {
                props.setActiveTab("openTickets");
                props.handleReset();
              }}
            >
              {" "}
              <div className="navItemsContainer">
                {/* <FontAwesomeIcon icon={faCube} /> */}
                Open
              </div>
            </Nav.Link>
            <Nav.Link className={`${props.activeTab === "inProgressTickets" ? "active" : ""}`}
              onClick={() => {
                props.setActiveTab("inProgressTickets");
                //props.handleReset();
              }}
            >
              {" "}
              <div className="navItemsContainer">
                {/* <FontAwesomeIcon icon={faCartFlatbed} /> */}
                In Progress
              </div>
            </Nav.Link>
            <Nav.Link className={`${props.activeTab === "closedTickets" ? "active" : ""}`}
              onClick={() => {
                props.setActiveTab("closedTickets");
                props.handleReset();
              }}
            >
              {" "}
              <div className="navItemsContainer">
                {/* <FontAwesomeIcon icon={faCube} /> */}
                Closed
              </div>
            </Nav.Link>
          </div>
        </Nav>
      </Navbar.Collapse>
      <div className="support-right-section">
        <div className="search-container">
          <label className="label">
            <input
              placeholder="Search by Ticket ID || AWB"
              type="search" value={props.searchValue}
              className={`input-field ${props.errors.searchValue ? 'input-field-error' : ''}`}
              onChange={(e) => props.setSearchValue(e.target.value)}
            />
            {/*(props.errors.searchValue) && <div className="custom-error">{props.errors.searchValue}</div>*/}

            <button onClick={() => globalDebouncedClick(() => props.handleSearch())}><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
          </label>
        </div>
        <button
          onClick={() => props.setFilterTickets(!props.FilterTickets)}
          className="btn main-button-outline">
          <RiFilterLine /> More Filters
        </button>
        <button className='btn main-button-outline' onClick={() => handlereset()}><RxReset className='align-text-bottom' /> Reset</button>
        <button
          onClick={() => props.setNewTicket(!props.NewTicket)}
          className="btn main-button">
          <FontAwesomeIcon icon={faPlus} /> New Ticket
        </button>
      </div>
    </Navbar>
  );
}
