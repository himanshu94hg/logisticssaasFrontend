import { RxReset } from "react-icons/rx";
import { useSelector } from "react-redux";
import { RiFilterLine } from "react-icons/ri";
import React, { useCallback, useState } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import globalDebouncedClick from "../../../../../debounce";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ThreeDots from '../../../../../assets/image/icons/ThreeDots.png'
import { faPlus, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export default function NavTabs(props) {
  const { screenWidthData } = useSelector(state => state?.authDataReducer)

  const handleClick = () => {
    props.setSearchValue('')
    props.handleReset();
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
                    // props.handleReset();
                    props.setCurrentPage(1)
                  }}
                  title={item.title}

                >
                  <div className="navItemsContainer">
                    {item.title}<span className="tab-counter">
                      {item.name === "allTickets" && props?.counterData?.all}
                      {item.name === "openTickets" && props?.counterData?.open}
                      {item.name === "inProgressTickets" && props?.counterData?.progress}
                      {item.name === "closedTickets" && props?.counterData?.closed}
                    </span>
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
              className={`input-field`}
              onChange={(e) => props.setSearchValue(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  props.handleSearch()
                }
              }}
            />
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
                <li onClick={() => handleClick()}><RxReset className='align-text-bottom' /> Reset</li>
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
            <button className='btn main-button-outline' onClick={() => handleClick()}><RxReset className='align-text-bottom' /> Reset</button>
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
