import React, { useState } from "react";
import {
  Navbar,
  Nav,
  NavDropdown
} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
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

  const navItems = [
    { name: 'ScheduledReportsMIS', title: 'Schedules' },
    { name: 'ReportsMIS', title: 'Reports' },
    { name: 'DownloadMIS', title: 'Downloads' },
    { name: 'ActivityLogsMIS', title: 'Activities' },
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
                <Nav.Link key={item.name} className={`d-none d-lg-block ${props.activeTab === item.name ? "active" : ""}`}
                  onClick={() => {
                    props.setActiveTab(item.name);
                  }}
                  title={item.title}
                >
                  <div className="navItemsContainer">
                    {/* <FontAwesomeIcon icon={faCube} /> */}
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

      {/* <div className="d-flex gap-10 align-items-center">
        <button className="btn main-button">Import CSV</button>
        <Link to="/create-order" className="btn main-button"><FontAwesomeIcon icon={faPlus} /> Create Order</Link>
      </div> */}
    </Navbar>
  );
}
