import React, { useEffect, useState } from "react";
import {
  Navbar,
  Nav,
  NavDropdown
} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
// import "./navTabs.css";
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const navItems = [
  { name: 'Reassign Order', title: 'Reassign Order' },
  { name: 'Merge Order', title: 'Merge Order' },
  { name: 'Split Order', title: 'Split Order' },
]

export default function NavTabs(props) {
  const navigation = useNavigate();
  const [selectedOption, setSelectedOption] = useState("Domestic");
  const [isOpen, setIsOpen] = useState(false);
  const sellerData = Cookies.get("user_id");

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleSelect = (selectedTab) => {
    props.setActiveTab(selectedTab);
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
            {navItems.map((item) => (
              <Nav.Link
                key={item.name}
                className={`d-none d-lg-block ${props.activeTab === item.name ? "active" : ""}`}
                onClick={() => {
                  props.setActiveTab(item.name);
                }}
                title={item.name}
              >
                <div className="navItemsContainer">
                  {/* <FontAwesomeIcon icon={faBinoculars} /> */}
                  {item.title}
                </div>
              </Nav.Link>
            ))}
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
    </Navbar>
  );
}
