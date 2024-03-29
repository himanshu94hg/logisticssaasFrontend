import "./header.css";
import Cookies from "js-cookie";
import WalletIcon from "./Icons/WalletIcon";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserImage from '../../../assets/image/icons/UserImage.png'
import { Navbar, Nav, NavDropdown, Modal, Button } from "react-bootstrap";
import { faBell, faEdit, faSignOutAlt, faIndianRupeeSign, faCalculator, faHandHoldingDollar, faSortDown, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import QuickIcon from "./Icons/QuickIcon";
import CreateOrderIcon from "./Icons/CreateOrderIcon";
import QuickShipIcon from "./Icons/QuickShipIcon";
import RateCalculatorIcon from "./Icons/RateCalculatorIcon";
import TicketIcon from "./Icons/TicketIcon";
import TrackingIcon from "./Icons/TrackingIcon";
import EarnAndGrow from "./Icons/EarnAndGrow";
import { RateCalculatorPattern, createOrderPattern, customerSupportPattern } from "../../../Routes";

export default function Header(props) {
  const navigate = useNavigate()

  //const paymentCard = useSelector(state => state?.paymentSectionReducer.paymentCard)


  const handleLogout = () => {
    Cookies.remove('access_token');
    window.location.reload()
  };

  const gettoken = Cookies.get('access_token');

  const getPayment = JSON.parse(localStorage.getItem('paymentCard')) ?? null;
  const setPayment = JSON.parse(localStorage.getItem('paymentSetCard')) ?? null;

  return (
    <Navbar
      className="box-shadow shadow-sm p10-inline py-1"
      variant="light"
      id="shipEaseNavbarNav"
    >
      <Navbar.Toggle aria-controls="navbarNav" />
      <Navbar.Collapse id="navbarNav">
        <Nav className="ml-auto w-100 alignContent">
          <div className="d-flex justify-content-between w-100 align-items-center">
            <div className="header-left-container">
              <p><EarnAndGrow />Earn & Grow</p>
            </div>

            <div className="d-flex align-items-center" style={{ gap: "10px" }}>
              <div className="header-search-input">
                <input className="input-field" type="search" placeholder="Search AWB || Order ID" />
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </div>
              <div className="quick-actions-container">
                <div className="quick-action-text">
                  <QuickIcon /> Quick Actions
                </div>
                <div className="quick-actions-hover">
                  <div className="qa-hovered-content">
                    <p onClick={() => navigate(createOrderPattern)}><CreateOrderIcon />Create Order</p>
                    <p onClick={() => navigate(createOrderPattern, { state: { orderType: "quickOrder" } })}><QuickShipIcon />Quick Ship</p>
                    <p onClick={() => navigate(RateCalculatorPattern)}><RateCalculatorIcon />Rate Calculator</p>
                    <p onClick={() => navigate(customerSupportPattern)}><TicketIcon />Create a Ticket</p>
                    <p><Link to="https://www.shipease.in/order-tracking" target="_blank"><TrackingIcon />Track Shipments</Link></p>
                  </div>
                </div>
              </div>

              <Nav.Link>
                <div className="walletContainer" onClick={() => props.setWalletRecharge(!props.WalletRecharge)}>
                  <span className="walletIcon px-2">
                    <WalletIcon />
                    <div className="walletBalance">₹ {setPayment?.balance ?? getPayment?.balance}</div>
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
                  onClick={() => handleLogout()}
                >
                  <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                </NavDropdown.Item>
              </NavDropdown>
            </div>
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
