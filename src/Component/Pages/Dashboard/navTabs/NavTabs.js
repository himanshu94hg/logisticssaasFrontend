import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import '@fortawesome/fontawesome-svg-core/styles.css';
import "./navTabs.css";

const navItems = [
  { name: "Overview", title: "" },
  { name: "Orders", title: "" },
  { name: "Shipment", title: "" },
  { name: "NDR", title: "Non-Delivery Report" },
  { name: "RTO", title: "Return to Origin" },
  { name: "Courier Delays", title: "" },
  { name: "Whatsapp Comm", title: "" },
  { name: "Sub Accounts", title: "" },
  { name: "Employees", title: "" },
  { name: "P & L", title: "Business Health" }
];

export default function NavTabs(props) {
  // Function to handle dropdown item click
  const handleSelect = (selectedTab) => {
    props.setActiveTab(selectedTab);
  };

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
                className={`d-none d-md-block ${props.activeTab === item.name ? "active" : ""}`}
                onClick={() => props.setActiveTab(item.name)}
                title={item.title}
              >
                <div className="navItemsContainer">
                  {item.name}
                </div>
              </Nav.Link>
            ))}

            {/* Render NavDropdown for mobile */}
            <NavDropdown
              title={props.activeTab || "Select Option"} // Set default value based on activeTab
              id="nav-dropdown"
              onSelect={handleSelect}
              // Show on mobile
              className="d-block d-md-none"
              drop="left"
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
    </Navbar>
  );
}
