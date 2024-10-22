import "./header.css";
import axios from "axios";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import QuickIcon from "./Icons/QuickIcon";
import { useDispatch } from "react-redux";
import WalletIcon from "./Icons/WalletIcon";
import { useEffect, useState } from "react";
import TicketIcon from "./Icons/TicketIcon";
import EarnAndGrow from "./Icons/EarnAndGrow";
import TrackingIcon from "./Icons/TrackingIcon";
import QuickShipIcon from "./Icons/QuickShipIcon";
import UserImageIcon from "./Icons/UserImageIcon";
import ReferEarnIcon from "./Icons/ReferEarnIcon";
import { Link, useNavigate } from "react-router-dom";
import CreateOrderIcon from "./Icons/CreateOrderIcon";
import globalDebouncedClick from "../../../debounce";
import EmptyWalletIcon from "./Icons/EmptyWalletIcon";
import BusinessPlanIcon from "./Icons/BusinessPlanIcon";
import SideNavToggleIcon from "./Icons/SideNavToggleIcon";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import RateCalculatorIcon from "./Icons/RateCalculatorIcon";
import FullLogo from '../../../assets/image/logo/mobileLogo.svg'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { clearAllCookies } from "../../Pages/Dashboard/Dashboard";
import { BASE_URL_CORE, BASE_URL_ORDER } from "../../../axios/config";
import SellerProfilePage from "./SellerProfilePage/SellerProfilePage";
import { customErrorFunction } from "../../../customFunction/errorHandling";
import ShowNotificationPanel from "./ShowNotificationPanel/ShowNotificationPanel";
import { faBell, faEdit, faSignOutAlt, faMagnifyingGlass, faShuffle } from "@fortawesome/free-solid-svg-icons";
import { ReferAndEarnPattern, BusinessPlanPattern, RateCalculatorPattern, createOrderPattern, customerSupportPattern, loginBypassPattern, indexPattern } from "../../../Routes";

export default function Header({ isExpanded, setExpanded, WalletRecharge, setWalletRecharge }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [alerts, setAlerts] = useState([])
  let authToken = Cookies.get("access_token")
  const [whatsNew, setWhatsNew] = useState([])
  const [refresh, setRefresh] = useState(null);
  let staticToken = Cookies.get("static_token")
  const [viewAll, setViewAll] = useState(false)
  const [impUpdate, setImpUpdate] = useState([])
  const [inputValue, setInputValue] = useState('');
  const [highlight, setHighlight] = useState(false);
  const [impRefresh, setImpRefresh] = useState(null);
  const [ViewProfile, setViewProfile] = useState(false)

  const [ShowNotification, setShowNotification] = useState(false)
  const [NotificationCount, setNotificationCount] = useState(null)
  const [temp, setTemp] = useState({
    var1: null,
    var2: null,
  });
  const { screenWidthData } = useSelector(state => state?.authDataReducer)
  const paymentCard = useSelector(state => state?.paymentSectionReducer.paymentCard);
  const userData = useSelector(state => state?.paymentSectionReducer.sellerProfileCard);
  const paymentSetCard = useSelector(state => state?.paymentSectionReducer?.paymentSetCard);

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      axios.get(`${BASE_URL_ORDER}/orders-api/orders/top-search/?q=${encodeURIComponent(inputValue)}`, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      })
        .then(response => {
          if (response.status === 200) {
            navigate(`/orderdetail/${inputValue}`, { state: { orderData: response.data, path: "searchOrderData" } });
          }
        })
        .catch(error => {
          customErrorFunction(error)
        });
    }
  }

  const handleNavigate = () => {
    axios.get(`${BASE_URL_ORDER}/orders-api/orders/top-search/?q=${encodeURIComponent(inputValue)}`, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    })
      .then(response => {
        if (response.status === 200) {
          navigate(`/orderdetail/${inputValue}`, { state: { orderData: response.data, path: "searchOrderData" } });
        }
      })
      .catch(error => {
        customErrorFunction(error)
      });
  }

  const handleLogout = () => {
    localStorage.clear();
    Cookies.remove('access_token', { path: '/' });
    Cookies.remove('user_id', { path: '/' });
    localStorage.removeItem('partnerList');
    clearAllCookies()
    navigate(indexPattern)
    if (indexPattern) {
      window.location.reload()
    }
  };

  const handleSwitch = () => {
    window.location.href = `http://www.shipease.in${loginBypassPattern}?mobile=${userData?.contact_number}&token=${staticToken}`
  }

  const handleProfile = () => {
    setViewProfile(!ViewProfile)
  }

  const handlesideMenu = () => {
    setExpanded(!isExpanded)
  }

  useEffect(() => {
    setTemp(prev => ({
      ...prev,
      var1: paymentCard,
      var2: paymentSetCard
    }));
  }, [paymentCard, paymentSetCard]);

  useEffect(() => {
    dispatch({ type: "SELLER_PROFILE_DATA_ACTION" });
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL_CORE}/core-api/features/notifications/?seller_id=${userData?.id}&view_all=${viewAll}`, {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        });

        if (response.status === 200) {
          setAlerts(response?.data)
        }
      } catch (error) {
        customErrorFunction(error);
      }
    }
    if (userData?.id !== undefined) {
      fetchData()
    }
  }, [userData, refresh, viewAll])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL_CORE}/core-api/features/whats-new/list/?type=whatsnew`, {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        });
        if (response.status === 200) {
          setWhatsNew(response?.data)
        }
      } catch (error) {
        customErrorFunction(error);
      }
    }
    fetchData()
  }, [impRefresh])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL_CORE}/core-api/features/whats-new/list/?type=promotion`, {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        });
        if (response.status === 200) {
          setImpUpdate(response?.data)
        }
      } catch (error) {
        customErrorFunction(error);
      }
    }
    fetchData()
  }, [impRefresh])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL_CORE}/core-api/features/notifications-counter/?seller_id=${userData?.id}`, {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        });
        if (response.status === 200) {
          setNotificationCount(response?.data)
        }
      } catch (error) {
        customErrorFunction(error);
      }
    }
    if (userData?.id != null) {
      fetchData()
    }
  }, [userData, refresh])

  useEffect(() => {
    if (NotificationCount?.unread_notifications_count > 0) {
      const interval = setInterval(() => {
        setHighlight((prevHighlight) => !prevHighlight);
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [NotificationCount?.unread_notifications_count,impRefresh]);

  return (
    <>
      <Navbar
        collapseOnSelect expand="lg"
        className="box-shadow shadow-sm p10-inline py-1"
        variant="light"
        id="shipEaseNavbarNav"
      >
        <Navbar.Collapse id="navbarNav">
          <Nav className="ml-auto w-100 alignContent">
            <div className="d-flex justify-content-between w-100 align-items-center">
              {
                screenWidthData < 992 &&
                <>
                  <div className="sidenav-toggle-icon">
                    <button onClick={handlesideMenu} type="button"><SideNavToggleIcon /></button>
                    <img src={FullLogo} alt="Logo" height={18} />
                  </div>
                </>
              }
              {
                screenWidthData > 991 &&
                <div className="quick-actions-container">
                  <div className="quick-action-text">
                    <EarnAndGrow />Earn & Grow
                  </div>
                  <div className="quick-actions-hover hl">
                    <div className="qa-hovered-content">
                      <p onClick={() => navigate(BusinessPlanPattern)}><BusinessPlanIcon />Business Plans</p>
                      <p onClick={() => navigate(ReferAndEarnPattern)}><ReferEarnIcon />Refer to Earn Coins</p>

                    </div>
                  </div>
                </div>
              }
              <div className="d-flex align-items-center" style={{ gap: "10px" }}>
                {
                  screenWidthData > 991 &&
                  <>
                    <div className="header-search-input">
                      <input className="input-field"
                        type="search" placeholder="Search AWB || Order ID"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress} />
                      <button onClick={() => globalDebouncedClick(() => handleNavigate())}><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
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
                          <Link to="https://www.shipease.in/order-tracking" target="_blank"><TrackingIcon />Track Shipments</Link>
                        </div>
                      </div>
                    </div>
                  </>
                }

                <Nav.Link>
                  <div className="walletContainer" onClick={() => setWalletRecharge(!WalletRecharge)}>
                    <span className={`walletIcon px-2 ${(temp.var2?.balance || temp.var1?.balance) < 1000 ? 'empty' : ''}`}>
                      {(temp.var2?.balance || temp.var1?.balance) < 1000 ? <EmptyWalletIcon /> : <WalletIcon />}
                      <div className="walletBalance">
                        ₹ {temp.var2?.balance ?? temp.var1?.balance ?? '0.00'}
                      </div>
                      {(temp.var2?.balance || temp.var1?.balance) < 1000 &&
                        <span className="low-balance">!Low Balance</span>
                      }
                      {/* <FontAwesomeIcon icon={faWallet} /> */}
                    </span>
                  </div>
                </Nav.Link>
                {/* {
                  screenWidthData > 991 && */}
                <div className="icons links ">
                  <div onClick={() => setShowNotification(true)} className={`iconContainer notificationIcon bell ${highlight ? 'highlight' : ''}`}>
                    <FontAwesomeIcon icon={faBell} />
                    {NotificationCount !== null &&
                      <span className="bellColor">
                        {NotificationCount?.unread_notifications_count}
                      </span>
                    }
                  </div>
                </div>
                {/* } */}

                <NavDropdown
                  title={
                    // screenWidthData > 991 &&
                    <span className="user-image-icon">
                      <UserImageIcon />
                    </span>
                  }
                  id="basic-nav-dropdown"
                  className="user-image-container"
                >
                  <NavDropdown.Item eventKey="4.1" className="d-flex flex-column align-items-start">
                    <div style={{ maxWidth: '150px', whiteSpace: 'break-spaces' }}>Hello, {userData?.first_name || "Seller"}</div>
                    <div>{userData?.code && `(${userData?.code})`}</div>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    eventKey="4.2"
                    onClick={handleProfile}
                  >
                    <FontAwesomeIcon icon={faEdit} /><span className="ms-2">View Profile</span>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />

                  <NavDropdown.Item
                    eventKey="4.4"
                    onClick={() => handleSwitch()}
                  >
                    <FontAwesomeIcon icon={faShuffle} /><span className="ms-2">Switch To Classic</span>
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
      </Navbar>
      {/* Edit Profile section */}
      {ViewProfile}

      <SellerProfilePage userData={userData} setViewProfile={setViewProfile} ViewProfile={ViewProfile} />
      <ShowNotificationPanel
        alerts={alerts}
        viewAll={viewAll}
        whatsNew={whatsNew}
        impUpdate={impUpdate}
        setViewAll={setViewAll}
        setRefresh={setRefresh}
        setImpRefresh={setImpRefresh}
        showNotification={ShowNotification}
        setShowNotification={setShowNotification}
      />
      {
        screenWidthData < 992 &&
        <div onClick={() => setExpanded(false)} className={`backdrop ${!isExpanded && 'd-none'}`}></div>
      }

    </>
  );
}
