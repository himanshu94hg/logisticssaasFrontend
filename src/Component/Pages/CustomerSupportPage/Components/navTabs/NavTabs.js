import React, { useCallback, useEffect, useState } from "react";
import {
  Navbar,
  Nav,
  NavDropdown
} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown, faPlus, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import SearchIcon from '../../../../../assets/image/icons/search-icon.png'
import { RiFilterLine } from "react-icons/ri";
import { RxReset } from "react-icons/rx";
import globalDebouncedClick from "../../../../../debounce";
import { debounce } from "lodash";
import { useSelector } from "react-redux";
import ThreeDots from '../../../../../assets/image/icons/ThreeDots.png'
// import "./navTabs.css";

export default function NavTabs(props) {
  const [selectedOption, setSelectedOption] = useState("Domestic");
  const [isOpen, setIsOpen] = useState(false);
  const { screenWidthData } = useSelector(state => state?.authDataReducer)

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const toggleOptions = () => {
    setIsOpen(!isOpen);
  };

  const handleClick = () => {
    props.setSearchValue('')
    props.setClearTicket(true)
    props.handleReset();
  }

  const debouncedHandleClick = useCallback(
    debounce((param) => handleClick(param), 1000),
    []
  );
  const handlereset = () => {
    debouncedHandleClick();
  }

  const navItems = [
    { name: 'allTickets', title: 'All' },
    { name: 'openTickets', title: 'Open' },
    { name: 'inProgressTickets', title: 'In Progress' },
    { name: 'closedTickets', title: 'Closed' },
  ]

  const handleSelect = (selectedTab) => {
    props.setActiveTab(selectedTab);
  };

  const activeTabTitle = navItems.find(item => item.name === props.activeTab)?.title;

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
            {
              navItems.map((item) => (
                <Nav.Link
                  key={item.name}
                  className={`d-none d-lg-block ${props.activeTab === item.name ? "active" : ""}`}
                  onClick={() => {
                    props.setActiveTab(item.name);
                    props.handleReset();
                  }}
                  title={item.title}
                >
                  <div className="navItemsContainer">
                    {/* <FontAwesomeIcon icon={faBinoculars} /> */}
                    {item.title}
                  </div>
                </Nav.Link>
              ))
            }

            <NavDropdown
              title={activeTabTitle}
              id="nav-dropdown"
              onSelect={handleSelect}
              className="d-block d-lg-none"
              drop="left"
            >
              {navItems.map((item) => (
                <NavDropdown.Item
                  key={item.name}
                  eventKey={item.name}
                  active={props.activeTab === item.name}
                >
                  {item.title}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
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

        {screenWidthData < 992 &&
          <div className="nav-actions-container">
            <div className="nav-action-dots">
              <img src={ThreeDots} alt="ThreeDots" width={24} />
            </div>
            <div className="nav-actions-list">
              <ul>
                <li onClick={() => props.setFilterTickets(!props.FilterTickets)}><RiFilterLine /> More Filters</li>
                <li onClick={() => handlereset()}><RxReset className='align-text-bottom' /> Reset</li>
                <li onClick={() => { props.setNewTicket(!props.NewTicket); props.setCategoryStatus(true) }}><FontAwesomeIcon icon={faPlus} /> New Ticket</li>
              </ul>
            </div>
          </div>
        }

        {
          screenWidthData > 991 &&
          <>
            <button
              onClick={() => props.setFilterTickets(!props.FilterTickets)}
              className="btn main-button-outline">
              <RiFilterLine /> More Filters
            </button>
            <button className='btn main-button-outline' onClick={() => handlereset()}><RxReset className='align-text-bottom' /> Reset</button>
            <button
              onClick={() => { props.setNewTicket(!props.NewTicket); props.setCategoryStatus(true) }}
              className="btn main-button">
              <FontAwesomeIcon icon={faPlus} /> New Ticket
            </button>
          </>
        }
      </div>
    </Navbar>
  );
}
