import React, { useState } from "react";
import {
  Navbar,
  Nav
} from "react-bootstrap";
// import "./navTabs.css";
import { HiOutlineFilter } from "react-icons/hi";

export default function NavTabs({ activeTab, setActiveTab, MoreFilters, setMoreFilters }) {
  const [selectedOption, setSelectedOption] = useState("Domestic");
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const toggleOptions = () => {
    setIsOpen(!isOpen);
  };


  return (
    <>
      <Navbar
        className="w-100 box-shadow shadow-sm p7 gap-10"
        variant="light"
        id="shipEaseNavTabs"
      >
        <Navbar.Toggle aria-controls="navTabs" />
        <Navbar.Collapse id="navTabs">
          <Nav className="ml-auto w-100 alignContent">
            <div className="alignContent">
              <Nav.Link className={`${activeTab === "Shipping Charges" ? "active" : ""}`}
                onClick={() => {
                  setActiveTab("Shipping Charges");
                }}
              >
                <div className="navItemsContainer">
                  {/* <FontAwesomeIcon icon={faBinoculars} /> */}
                  Shipping Charges
                </div>
              </Nav.Link>
              <Nav.Link className={`${activeTab === "Remittance Logs" ? "active" : ""}`}
                onClick={() => {
                  setActiveTab("Remittance Logs");
                }}
              >
                {" "}
                <div className="navItemsContainer">
                  {/* <FontAwesomeIcon icon={faCube} /> */}
                  Remittance Logs
                </div>
              </Nav.Link>
              <Nav.Link className={`${activeTab === "Recharge Logs" ? "active" : ""}`}
                onClick={() => {
                  setActiveTab("Recharge Logs");
                }}
              >
                {" "}
                <div className="navItemsContainer">
                  {/* <FontAwesomeIcon icon={faCartFlatbed} /> */}
                  Recharge Logs
                </div>
              </Nav.Link>
              <Nav.Link className={`${activeTab === "Invoices" ? "active" : ""}`}
                onClick={() => {
                  setActiveTab("Invoices");
                }}
              >
                {" "}
                <div className="navItemsContainer">
                  {/* <FontAwesomeIcon icon={faCube} /> */}
                  Invoices
                </div>
              </Nav.Link>
              <Nav.Link className={`${activeTab === "Passbook" ? "active" : ""}`}
                onClick={() => {
                  setActiveTab("Passbook");
                }}
              >
                {" "}
                <div className="navItemsContainer">
                  {/* <FontAwesomeIcon icon={faCube} /> */}
                  Passbook
                </div>
              </Nav.Link>
              <Nav.Link className={`${activeTab === "Credit Receipt" ? "active" : ""}`}
                onClick={() => {
                  setActiveTab("Credit Receipt");
                }}
              >
                {" "}
                <div className="navItemsContainer">
                  Credit Receipt
                </div>
              </Nav.Link>
            </div>
          </Nav>
        </Navbar.Collapse>
        {activeTab === "Remittance Logs" &&
          <div className="btn-group">
            <button
              style={{ paddingBlock: '4px' }}
              onClick={() => setMoreFilters(true)}
              type="button"
              className="btn main-button-outline ms-2"
            >
              <HiOutlineFilter className='align-text-bottom' /> More Filters
            </button>
            <button style={{ paddingBlock: '4px' }} className="btn main-button dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
              <span className="visually-hidden" >Toggle Dropdown</span>
            </button>
            <ul
              className="dropdown-menu"
              type="button"
              style={{
                paddingInline: '0px',
                minWidth: '110px',
              }}
            >
              {/* {queryName?.map((item) => <li onClick={() => handleQueryfilter(item?.filter_query)}>{item?.filter_name}</li>)} */}
            </ul>
          </div>
        }
        {/* <div className="d-flex gap-10 align-items-center">
        <button className="btn main-button">Export CSV</button>
      </div> */}
      </Navbar>
    </>
  );
}
