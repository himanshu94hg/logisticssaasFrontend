import React, { useState } from "react";
import {
  Navbar,
  Nav,
  NavDropdown
} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown, faPlus } from '@fortawesome/free-solid-svg-icons';
// import "./navTabs.css";

const navItems = [
  { name: 'Action Required', title: 'Action Required' },
  { name: 'Action Requested', title: 'Action Requested' },
  { name: 'Delivered', title: 'Delivered' },
  { name: 'RTO', title: 'RTO' },
]

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

  const handleSelect = (selectedTab) => {
    props.setActiveTab(selectedTab);
  };

  return (
    <Navbar
      className="w-100 box-shadow shadow-sm p7 gap-10"
      variant="light"
      id="shipEaseNavTabs"
    >
      <Navbar.Toggle aria-controls="navTabs" />
      <Navbar.Collapse id="navTabs">
        <Nav className="ml-auto w-100">
          <div className="alignContent">
            {
              navItems.map((item) => (
                <Nav.Link
                  key={item.name}
                  className={`d-none d-lg-block ${props.activeTab === item.name ? "active" : ""}`}
                  onClick={() => {
                    props.setActiveTab(item.name);
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
              title={props.activeTab || "Select Option"} // Set default value based on activeTab
              id="nav-dropdown"
              onSelect={handleSelect}
              // Show on mobile
              className="d-block d-lg-none"
              drop="left"
            >
              {navItems.map((item) => (
                <NavDropdown.Item
                  key={item.name}
                  eventKey={item.name}
                  active={props.activeTab === item.name}
                >
                  {item.name}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          </div>
        </Nav>
      </Navbar.Collapse>

      <div className="d-flex gap-10">
        {/* <button className="btn main-button">Sync Orders</button>
        <button className="btn main-button">Import CSV</button>
        <button className="btn main-button"><FontAwesomeIcon icon={faPlus} /> Create Order</button> */}
      </div>
    </Navbar>
  );
}
