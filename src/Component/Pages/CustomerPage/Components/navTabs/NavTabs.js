import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown, } from '@fortawesome/free-solid-svg-icons';
// import "./navTabs.css";

export default function NavTabs(props) {
  const [selectedOption, setSelectedOption] = useState("Parent Account");
  const [isOpen, setIsOpen] = useState(false);
  const { screenWidthData } = useSelector(state => state?.authDataReducer)

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
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

  const handleAccountChange = (value) => {
    props?.setAccountType(value)
    props.setActiveTab("Basic Information")
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
                {navItems?.map((item) => (
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
      <div>
        <select
          className="select-field-account"
          onChange={(e) => handleAccountChange(e.target.value)}
        >
          <option value="">Parent Account</option>
          {props?.subAccount?.map((item) =>
            <option value={item?.value}>{item.label}</option>
          )}
        </select>
      </div>
      {
        screenWidthData > 453 &&
        <div className="d-flex gap-10 align-items-center">
          <button className="btn main-button-outline">Sub Acount: <strong>{props.subAccountCount}</strong></button>
        </div>
      }
    </Navbar>
  );
}
