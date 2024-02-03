import React from "react";
import { Navbar, Nav, NavDropdown, Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faCog,
  faWallet,
  faEdit,
  faSignOutAlt,
  faIndianRupeeSign,
  faCalculator,
  faHandHoldingDollar,
} from "@fortawesome/free-solid-svg-icons";
import "./header.css";
import UserImage from '../../../assets/image/icons/UserImage.png'
import WalletIcon from "./WalletIcon";

export default function Header() {
  return (
    <Navbar
      className="box-shadow shadow-sm p10-inline"
      bg="light"
      variant="light"
      id="shipEaseNavbarNav"
    >
      <Navbar.Toggle aria-controls="navbarNav" />
      <Navbar.Collapse id="navbarNav">
        <Nav className="ml-auto w-100 alignContent">
          <div className="alignContent">
            <Nav.Link>
              <div className="navItemsContainer buisnessItem">
                Business Plan
                <span className="iconContainer">
                  <FontAwesomeIcon icon={faIndianRupeeSign} />
                </span>
              </div>
            </Nav.Link>
            <Nav.Link>
              <div className="navItemsContainer rateCalculatorColor">
                Rate Calculator
                <span className="iconContainer">
                  <FontAwesomeIcon icon={faCalculator} />
                </span>
              </div>
            </Nav.Link>
            <Nav.Link>
              <div className="navItemsContainer referColor">
                Refer to earn coins
                <span className="iconContainer">
                  <FontAwesomeIcon icon={faHandHoldingDollar} />
                </span>
              </div>
            </Nav.Link>
          </div>
          {/* <div className="icons links ">
            <div className="iconContainer notificationIcon bell">
              <FontAwesomeIcon icon={faBell} />
              <span className="bellColor">3</span>
            </div>
            <div className="iconContainer settingIcon cart">
              <FontAwesomeIcon icon={faCog} />
              <span className="settingColor">5</span>
            </div>
          </div> */}

          <div className="d-flex" style={{ gap: "10px" }}>

            <Nav.Link>
              <div className="walletContainer">
                  <span className="iconContainer walletIcon">
                    <div className="walletBalance">₹ 6206.45</div>
                    <WalletIcon />
                    {/* <FontAwesomeIcon icon={faWallet} /> */}
                  </span>
              </div>
            </Nav.Link>
            <div className="icons links ">
              <div className="iconContainer notificationIcon bell">
                <FontAwesomeIcon icon={faBell} />
                <span className="bellColor">3</span>
              </div>
            </div>
            <NavDropdown
              title={
                <span>
                  <img
                    src={UserImage}
                    className="user-photo"
                  // style={{ width: "50px", height: "50px" }}
                  />
                  {/* <FontAwesomeIcon icon={faUser} /> */}
                </span>
              }
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item eventKey="4.1">
                Hello, Himanshu
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item eventKey="4.2">
                <FontAwesomeIcon icon={faEdit} /> Edit Profile
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                eventKey="4.3"
                onClick={() => alert("Logout clicked")}
              >
                <FontAwesomeIcon icon={faSignOutAlt} /> Logout
              </NavDropdown.Item>
            </NavDropdown>
          </div>
        </Nav>
      </Navbar.Collapse>

      {/* Edit Profile Modal */}
      <Modal show={false} onHide={() => { }}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Add your edit profile form here */}
          <p>Edit Profile Form</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => { }}>
            Close
          </Button>
          <Button variant="primary" onClick={() => alert("Save changes")}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Navbar>
  );
}
