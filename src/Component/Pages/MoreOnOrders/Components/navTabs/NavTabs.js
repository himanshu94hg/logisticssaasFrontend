import React, {useEffect, useState} from "react";
import {
  Navbar,
  Nav
} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
// import "./navTabs.css";
import Cookies from 'js-cookie';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function NavTabs(props) {
  const navigation = useNavigate();
  const [selectedOption, setSelectedOption] = useState("Domestic");
  const [isOpen, setIsOpen] = useState(false);
  const sellerData = Cookies.get("user_id");

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
              <Nav.Link className={`${props.activeTab === "Reassign Order" ? "active" : ""}`}
                        onClick={() => {
                          props.setActiveTab("Reassign Order");
                        }}
              >
                <div className="navItemsContainer">
                  {/* <FontAwesomeIcon icon={faBinoculars} /> */}
                  Reassign Order
                </div>
              </Nav.Link>
              <Nav.Link className={`${props.activeTab === "Merge Order" ? "active" : ""}`}
                        onClick={() => {
                          props.setActiveTab("Merge Order");
                        }}
              >
                {" "}
                <div className="navItemsContainer">
                  {/* <FontAwesomeIcon icon={faCube} /> */}
                  Merge Order
                </div>
              </Nav.Link>
              <Nav.Link className={`${props.activeTab === "Split Order" ? "active" : ""}`}
                        onClick={() => {
                          props.setActiveTab("Split Order");
                        }}
              >
                {" "}
                <div className="navItemsContainer">
                  {/* <FontAwesomeIcon icon={faCartFlatbed} /> */}
                  Split Order
                </div>
              </Nav.Link>
              
            </div>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
  );
}
