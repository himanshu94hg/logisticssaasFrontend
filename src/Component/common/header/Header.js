import "./header.css";
import Cookies from "js-cookie";
import WalletIcon from "./Icons/WalletIcon";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserImage from '../../../assets/image/icons/UserImage.png'
import { Navbar, Nav, NavDropdown, Modal, Button } from "react-bootstrap";
import { faBell, faEdit, faSignOutAlt, faIndianRupeeSign, faCalculator, faHandHoldingDollar, faSortDown, faMagnifyingGlass, faUser } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import QuickIcon from "./Icons/QuickIcon";
import CreateOrderIcon from "./Icons/CreateOrderIcon";
import QuickShipIcon from "./Icons/QuickShipIcon";
import RateCalculatorIcon from "./Icons/RateCalculatorIcon";
import TicketIcon from "./Icons/TicketIcon";
import TrackingIcon from "./Icons/TrackingIcon";
import EarnAndGrow from "./Icons/EarnAndGrow";
import BusinessPlanIcon from "./Icons/BusinessPlanIcon";
import ReferEarnIcon from "./Icons/ReferEarnIcon";
import { RateCalculatorPattern, createOrderPattern, customerSupportPattern, ordersPattern, } from "../../../Routes";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import UserImageIcon from "./Icons/UserImageIcon";
import EmptyWalletIcon from "./Icons/EmptyWalletIcon";
import { useReactToPrint } from "react-to-print";

export default function Header(props) {
  const navigate = useNavigate()
  const [inputValue, setInputValue] = useState('');
  const sellerData = Cookies.get("user_id")
  let authToken = Cookies.get("access_token")
  const [userData,setUserData]=useState(null)
  //const paymentCard = useSelector(state => state?.paymentSectionReducer.paymentCard)

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      navigate(ordersPattern)
      setInputValue('')
    }
  }


  const handleLogout = () => {
    localStorage.clear();
    Cookies.remove('access_token');
    window.location.reload()
  };

  const [temp, setTemp] = useState({
    var1: null,
    var2: null,
  });

  const paymentCard = useSelector(state => state?.paymentSectionReducer.paymentCard);
  const paymentSetCard = useSelector(state => state?.paymentSectionReducer?.paymentSetCard);

  useEffect(() => {
    setTemp(prev => ({
      ...prev,
      var1: paymentCard,
      var2: paymentSetCard
    }));
  }, [paymentCard, paymentSetCard]);

  useEffect(() => {
    const authToken = Cookies.get("access_token");
    const fetchData = async () => {
        try {
            const response = await axios.get(`https://dev.shipease.in/core-api/seller/get-seller-profile/`, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            setUserData(response.data[0]); 
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    fetchData();
  }, [])
  

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
            <div className="quick-actions-container">
              <div className="quick-action-text">
                <EarnAndGrow />Earn & Grow
              </div>
              <div className="quick-actions-hover hl">
                <div className="qa-hovered-content">
                  <p><BusinessPlanIcon />Business Plan</p>
                  <p><ReferEarnIcon />Refer to Earn Coins</p>

                </div>
              </div>
            </div>

            <div className="d-flex align-items-center" style={{ gap: "10px" }}>
              <div className="header-search-input">
                <input className="input-field"
                  type="search" placeholder="Search AWB || Order ID"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress} />
                <button><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
              </div>
              <div className="quick-actions-container">
                <div className="quick-action-text">
                  <QuickIcon /> Quick Actions
                </div>
                <div className="quick-actions-hover right-header">
                  <div className="qa-hovered-content">
                    <p onClick={() => navigate(createOrderPattern, { state: { orderType: "normalOrder" } })}><CreateOrderIcon />Create Order</p>
                    <p onClick={() => navigate(createOrderPattern, { state: { orderType: "quickOrder" } })}><QuickShipIcon />Quick Ship</p>
                    <p onClick={() => navigate(RateCalculatorPattern)}><RateCalculatorIcon />Rate Calculator</p>
                    <p onClick={() => navigate(customerSupportPattern)}><TicketIcon />Create a Ticket</p>
                    <p><Link to="https://www.shipease.in/order-tracking" target="_blank"><TrackingIcon />Track Shipments</Link></p>
                  </div>
                </div>
              </div>

              <Nav.Link>
                <div className="walletContainer" onClick={() => props.setWalletRecharge(!props.WalletRecharge)}>
                  <span className={`walletIcon px-2 ${(temp.var2?.balance || temp.var1?.balance) < 1000 ? 'empty' : ''}`}>
                    {(temp.var2?.balance || temp.var1?.balance) < 1000 ? <EmptyWalletIcon /> : <WalletIcon />}
                    <div className="walletBalance">
                      ₹ {temp.var2?.balance ?? temp.var1?.balance}
                    </div>
                    {(temp.var2?.balance || temp.var1?.balance) < 1000 &&
                      <span className="low-balance">!Low Balance</span>
                    }
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
                  <span className="user-image-icon">
                    {/* <img
                      src={UserImage}
                      className="user-photo"
                    /> */}
                    {/* <FontAwesomeIcon icon={faUser} /> */}
                    <UserImageIcon />
                  </span>
                }
                id="basic-nav-dropdown"
                className="user-image-container"
              >
                <NavDropdown.Item eventKey="4.1">
                  Hello, {userData?.company_name?userData?.company_name:"Seller"}
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item eventKey="4.2">
                  <FontAwesomeIcon icon={faEdit} /><span className="ms-2">Edit Profile</span>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  eventKey="4.3"
                  onClick={() => handleLogout()}
                >
                  <FontAwesomeIcon icon={faSignOutAlt} /><span className="ms-2">Logout</span>
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
