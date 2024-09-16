import axios from "axios";
import Cookies from 'js-cookie';
import { debounce } from "lodash";
import { toast } from 'react-toastify';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { IoMdSync } from "react-icons/io";
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineImport } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { BASE_URL_CORE } from "../../../../../axios/config";
import { createOrderPattern } from "../../../../../Routes";
import React, { useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ThreeDots from '../../../../../assets/image/icons/ThreeDots.png'
import { faChevronUp, faChevronDown, faPlus } from '@fortawesome/free-solid-svg-icons';
// import "./navTabs.css";

export default function NavTabs(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const sellerData = Cookies.get("user_id");
  const [selectedOption, setSelectedOption] = useState("Domestic");
  const { screenWidthData } = useSelector(state => state?.authDataReducer)
  const channelGetCard = useSelector(state => state?.channelSectionReducer?.channelGetCard)
  const userData = useSelector(state => state?.paymentSectionReducer.sellerProfileCard);


  // const navItems = ["All", "Processing", "Ready to Ship", "Pickup", "Manifest", "Returns"];
  const navItems = ["All", "Unprocessable", "Processing", "Ready to Ship", "Pickup", "Manifest", "Returns"];

  useEffect(() => {
    dispatch({ type: "CHANNEL_GET_DATA_ACTION" });
  }, [])
  const [sellerId, setSellerId] = useState(null)

  // useEffect(() => {
  //   dispatch({ type: "SELLER_PROFILE_DATA_ACTION" });
  // }, [])

  // useEffect(() => {
  //   if (userData) {
  //     setSellerId(userData?.id)
  //   }
  // }, [userData])


  // const handleClick = async () => {
  //   if (sellerId != null || sellerId != undefined) {
  //     try {
  //       const response = await axios.get(`${BASE_URL_CORE}/core-api/channel/channel/?seller_id=${sellerId}`);

  //       if (response.status === 200) {
  //         toast.success('Order fetched successfully');
  //         props.setRateRef(new Date());
  //       }
  //     } catch (error) {
  //       toast.error('Order fetch failed!');
  //     }
  //   }
  // };


  // const debouncedHandleClick = useCallback(
  //   debounce((param) => handleClick(param), 700),
  //   []
  // );

  const handleSubmit = async () => {
    if (channelGetCard?.results?.length > 0) {
      try {
        const response = await axios.get(`${BASE_URL_CORE}/core-api/channel/channel/?seller_id=${userData?.id}`);

        if (response.status === 200) {
          toast.success('Order fetched successfully');
          props.setRateRef(new Date());
        }
      } catch (error) {
        toast.error('Order fetch failed!');
      }
    } else {
      toast.error('No channel integrated right now!');
    }
  }

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleSelect = (selectedKey) => {
    props.setActiveTab(selectedKey);
  };

  return (
    <Navbar
      className="w-100 box-shadow shadow-sm p7"
      variant="light"
      id="shipEaseNavTabs"
    >
      <Navbar.Toggle aria-controls="navTabs" />
      <Navbar.Collapse id="navTabs" className="d-none d-lg-block">
        <Nav className="ml-auto w-100 alignContent">
          {screenWidthData > 991 &&
            <div className="alignContent">
              {navItems.map((tab) => (
                <Nav.Link
                  key={tab}
                  className={`d-none d-lg-block ${props.activeTab === tab ? "active" : ""}`}
                  onClick={() => { props.setActiveTab(tab); props.setCurrentPage(1); props.setItemsPerPage(20); props.setSearchValue(''); props.setsearchType(props.SearchOptions[0].value) }}
                >
                  <div className="navItemsContainer">{tab}</div>
                </Nav.Link>
              ))}
            </div>
          }

          {screenWidthData < 992 &&
            <NavDropdown
              title={props.activeTab || "Select Option"}
              id="nav-dropdown"
              onSelect={handleSelect}
              drop="left"
            >
              {navItems.map((item) => (
                <NavDropdown.Item
                  key={item}
                  eventKey={item}
                  active={props.activeTab === item}
                >
                  {item}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          }

          <div className="d-flex gap-2">
            {screenWidthData > 991 &&
              <div className={`down-sliding-select ${isOpen ? "open" : ""}`} onMouseEnter={() => { setIsOpen(true); }} onMouseLeave={() => { setIsOpen(false); }}>
                <div className="selected-option">
                  {selectedOption || "Select an option"}
                  <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />

                </div>

                <div className={`options-container ${isOpen ? "open" : ""}`}>
                  <div
                    className={`option ${selectedOption === "Domestic" ? "selected" : ""}`}
                    onClick={() => handleOptionSelect("Domestic")}
                  >
                    Domestic
                  </div>
                  <div
                    title="Disabled"
                    // className={`option ${selectedOption === "International" ? "selected" : ""}`}
                    className={`option`}
                  // onClick={() => handleOptionSelect("International")}
                  >
                    International <br />(Will be activated on Request)
                  </div>
                </div>

              </div>
            }
            {screenWidthData > 991 &&
              <div className="d-flex gap-10 align-items-center">
                <button
                  className="btn main-button-outline"
                  onClick={() => navigate(createOrderPattern, { state: { orderType: "BulkCreateOrder" } })}
                >
                  <AiOutlineImport className="align-text-bottom" /> Import
                </button>
                <button className="btn main-button-outline" onClick={handleSubmit}><IoMdSync /> Sync</button>
                <button onClick={() => navigate(createOrderPattern, { state: { orderType: "normalOrder" } })} className="btn main-button"><FontAwesomeIcon icon={faPlus} /> Create</button>
              </div>
            }

            {screenWidthData < 992 &&
              <div className="nav-actions-container">
                <div className="nav-action-dots">
                  <img src={ThreeDots} alt="ThreeDots" width={24} />
                </div>
                <div className="nav-actions-list">
                  <ul>
                    <li
                      className=""
                      onClick={() => navigate(createOrderPattern, { state: { orderType: "BulkCreateOrder" } })}
                    >
                      <AiOutlineImport className="align-text-bottom" /> Import
                    </li>
                    <li className="" onClick={handleSubmit}><IoMdSync /> Sync</li>
                    <li onClick={() => navigate(createOrderPattern, { state: { orderType: "normalOrder" } })} className="">
                      <FontAwesomeIcon icon={faPlus} /> Create
                    </li>
                  </ul>
                </div>
              </div>
            }
          </div>
        </Nav>
      </Navbar.Collapse>

    </Navbar>
  );
}
