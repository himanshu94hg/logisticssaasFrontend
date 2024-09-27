import React, { useState } from "react";
import {
  Navbar,
  Nav,
  NavDropdown
} from "react-bootstrap";
// import "./navTabs.css";
import { HiOutlineFilter } from "react-icons/hi";

const navItems = [
  { name: 'Shipping Charges', title: 'Shipping Charges' },
  { name: 'Remittance Logs', title: 'Remittance Logs' },
  { name: 'Recharge Logs', title: 'Recharge Logs' },
  { name: 'Invoices', title: 'Invoices' },
  { name: 'Passbook', title: 'Passbook' },
  { name: 'Credit Receipt', title: 'Credit Receipt' },
]

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


  const handleSelect = (selectedTab) => {
    setActiveTab(selectedTab);
  };

  const activeTabTitle = navItems.find(item => item.name === activeTab)?.title;

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
              {
                navItems.map((item) => (
                  <Nav.Link
                    key={item.name}
                    className={`d-none d-lg-block ${activeTab === item.name ? "active" : ""}`}
                    onClick={() => {
                      setActiveTab(item.name);
                    }}
                    title={item.title}
                  >
                    <div className="navItemsContainer">
                      {/* <FontAwesomeIcon icon={faBinoculars} /> */}
                      {item.title}<span className="tab-counter">100</span>
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
                    active={activeTab === item.name}
                  >
                    {item.title}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>

            </div>
          </Nav>
        </Navbar.Collapse>
        {activeTab === "Remittance Logs" &&
          <div className="btn-group">
            <button
              style={{ paddingBlock: '4px' }}
              onClick={() => setMoreFilters(true)}
              type="button"
              className="btn main-button-outline"
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
