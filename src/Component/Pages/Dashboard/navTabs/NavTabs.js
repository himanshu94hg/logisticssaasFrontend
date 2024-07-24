import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import '@fortawesome/fontawesome-svg-core/styles.css';
import "./navTabs.css";

const navItems = [
  { name: "Overview", title: "Overview" },
  { name: "Orders", title: "Orders" },
  { name: "Shipment", title: "Shipment" },
  { name: "NDR", title: "NDR" },
  { name: "RTO", title: "RTO" },
  { name: "Courier Delays", title: "Couriers" },
  { name: "Whatsapp Comm", title: "Whatsapp Comm" },
  { name: "Sub Accounts", title: "Sub Accounts" },
  { name: "Employees", title: "Employees" },
  { name: "P & L", title: "Business Health" }
];

export default function NavTabs(props) {
  // Function to handle dropdown item click
  const handleSelect = (selectedTab) => {
    props.setActiveTab(selectedTab);
  };

  const activeTabTitle = navItems.find(item => item.name === props.activeTab)?.title;


  return (
    <Navbar className="w-100 box-shadow shadow-sm p-3" variant="light" id="shipEaseNavTabs">
      <Navbar.Toggle aria-controls="navTabs" />
      <Navbar.Collapse id="navTabs">
        <Nav className="ml-auto w-100">
          <div className="alignContent">
            {/* Render NavLinks for desktop */}
            {navItems.map((item) => (
              <Nav.Link
                key={item.name}
                className={`d-none d-lg-block ${props.activeTab === item.name ? "active" : ""}`}
                onClick={() => props.setActiveTab(item.name)}
                title={item.title}
              >
                <div className="navItemsContainer">
                  {item.title}
                </div>
              </Nav.Link>
            ))}

            {/* Render NavDropdown for mobile */}
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
