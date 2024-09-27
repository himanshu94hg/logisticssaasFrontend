import React, { useState } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

const navItems = [
  { name: 'Weight Reconciliation', title: 'Weight Reconciliation' },
  { name: 'On-Hold Reconciliation', title: 'On-Hold Reconciliation' },
  { name: 'Settled Reconciliation', title: 'Settled Reconciliation' },
]

export default function NavTabs(props) {

  const handleSelect = (selectedTab) => {
    props.setActiveTab(selectedTab);
  };
  const activeTabTitle = navItems.find(item => item.name === props.activeTab)?.title;
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
            {
              navItems.map((item) => (
                <Nav.Link
                  key={item.name}
                  className={`d-none d-lg-block ${props.activeTab === item.name ? "active" : ""}`}
                  onClick={() => {
                    props.setActiveTab(item.name);
                  }}
                  title={item.title}
                >
                  <div className="navItemsContainer">
                    {item.title}<span className="tab-counter">
                      {item.name === "Weight Reconciliation" && props?.counterData?.total_weight_reconciliation}
                      {item.name === "On-Hold Reconciliation" && props?.counterData?.on_hold_weight_reconciliation}
                      {item.name === "Settled Reconciliation" && props?.counterData?.settled_weight_reconciliation}
                    </span>
                  </div>
                </Nav.Link>
              ))
            }
            <NavDropdown
              title={activeTabTitle}
              id="nav-dropdown"
              onSelect={handleSelect}
              className="d-block d-lg-none wr-nav-item"
              drop="left"
            >
              {navItems.map((item) => (
                <NavDropdown.Item
                  key={item.name}
                  eventKey={item.name}
                  active={props.activeTab === item.name}
                >
                  {item.title}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          </div>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
