import React, { useState } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

const navItems = [
  { name: 'Action Required', title: 'Action Required' },
  { name: 'Action Requested', title: 'Action Requested' },
  { name: 'Delivered', title: 'Delivered' },
  { name: 'RTO', title: 'RTO' },
]

export default function NavTabs(props) {

  const handleSelect = (selectedTab) => {
    props.setActiveTab(selectedTab);
  };

  return (
    <Navbar
      className="w-100 box-shadow shadow-sm p7 gap-10"
      variant="light"
      id="shipEaseNavTabs"
    >
      <Navbar.Toggle aria-controls="navTabs" />
      <Navbar.Collapse id="navTabs">
        <Nav className="ml-auto w-100">
          <div className="alignContent">
            {
              navItems.map((item) => (
                <Nav.Link
                  key={item.name}
                  className={`d-none d-lg-block ${props.activeTab === item.name ? "active" : ""}`}
                  onClick={() => {
                    props.setActiveTab(item.name);
                    props.setMostPopular({ most_popular_search: '' })
                  }}
                  title={item.title}
                >
                  <div className="navItemsContainer">
                    {item.title}<span className="tab-counter">
                      {item.name === "Action Required" && props?.counterData?.pending_order_count}
                      {item.name === "Action Requested" && props?.counterData?.requested_order_count}
                      {item.name === "Delivered" && props?.counterData?.delivered_order_count}
                      {item.name === "RTO" && props?.counterData?.rto_order_count}
                    </span>
                  </div>
                </Nav.Link>
              ))
            }
            <NavDropdown
              drop="left"
              id="nav-dropdown"
              onSelect={handleSelect}
              className="d-block d-lg-none"
              title={props.activeTab || "Select Option"}
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

      <div className="d-flex gap-10">
        {/* <button className="btn main-button">Sync Orders</button>
        <button className="btn main-button">Import CSV</button>
        <button className="btn main-button"><FontAwesomeIcon icon={faPlus} /> Create Order</button> */}
      </div>
    </Navbar>
  );
}
