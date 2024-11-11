import React, { useState } from "react";
import { HiOutlineFilter } from "react-icons/hi";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

const navItems = [
  { name: 'Shipping Charges', title: 'Shipping Charges' },
  { name: 'Remittance Logs', title: 'Remittance Logs' },
  { name: 'Recharge Logs', title: 'Recharge Logs' },
  { name: 'Invoices', title: 'Invoices' },
  { name: 'Passbook', title: 'Passbook' },
  { name: 'Credit Receipt', title: 'Credit Receipt' },
]

export default function NavTabs({ activeTab, setActiveTab, setMoreFilters,counterData }) {

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
                      {item.title}<span className="tab-counter">
                        {item.name === "Shipping Charges" && counterData?.shipping_charge}
                        {item.name === "Remittance Logs" && counterData?.remittance_log}
                        {item.name === "Recharge Logs" && counterData?.recharge_log}
                        {item.name === "Invoices" && counterData?.invoice}
                        {item.name === "Passbook" && counterData?.passbook}
                        {item.name === "Credit Receipt" && counterData?.credit_receipt}
                      </span>
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
        {(activeTab === "Remittance Logs"||activeTab === "Passbook" ) &&
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
            </ul>
          </div>
        }
      </Navbar>
    </>
  );
}
