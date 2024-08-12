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
  const [selectedOption, setSelectedOption] = useState("Parent Account");
  const [isOpen, setIsOpen] = useState(false);
  const { screenWidthData } = useSelector(state => state?.authDataReducer)

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const toggleOptions = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { name: 'Basic Information', title: 'Basic Information' },
    { name: 'Account Information', title: 'Account Information' },
    { name: 'KYC Information', title: 'KYC Information' },
    { name: 'Agreement', title: 'Agreement' },
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
          {
            !props.DetailsView &&
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
          }
        </Nav>
      </Navbar.Collapse>
      <div className={`down-sliding-select ${isOpen ? "open" : ""}`} onMouseEnter={() => { setIsOpen(true); }} onMouseLeave={() => { setIsOpen(false); }}>
        <div className="selected-option">
          {selectedOption || "Select an option"}
          <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />

        </div>

        <div className={`options-container ${isOpen ? "open" : ""}`}>
          <div
            className={`option ${selectedOption === "Parent Account" ? "selected" : ""}`}
            onClick={() => handleOptionSelect("Parent Account")}
          >
            Parent Account
          </div>
          {/* <div
            className={`option ${selectedOption === "Sub Acount One" ? "selected" : ""}`}
            onClick={() => handleOptionSelect("Sub Acount One")}
          >
            Sub Acount One
          </div> */}
          {/* <div
            className={`option ${selectedOption === "Sub Acount Two" ? "selected" : ""}`}
            onClick={() => handleOptionSelect("Sub Acount Two")}
          >
            Sub Acount Two
          </div> */}
        </div>

      </div>
      {
        screenWidthData > 453 &&
        <div className="d-flex gap-10 align-items-center">
          <button className="btn main-button-outline">Sub Acount: <strong>0</strong></button>
        </div>
      }
    </Navbar>
  );
}
