import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function NavTabs(props) {
  const { screenWidthData } = useSelector(state => state?.authDataReducer);

  const navItems = [
    { name: "DomesticCreateOrder", title: "Domestic Order" },
    { name: "InternationalCreateOrders", title: "International Orders" },
    { name: "BulkCreateOrder", title: "Bulk Orders" },
    { name: "QuickCreateOrder", title: "Quick Orders" },
  ];

  const handleSelect = (selectedTab) => {
    props.setActiveTab(selectedTab);
  };

  const activeTabTitle = navItems.find(item => item.name === props.activeTab)?.title;

  return (
    <Navbar className="w-100 box-shadow shadow-sm p10" variant="light" id="shipEaseNavTabs">
      <Navbar.Toggle aria-controls="navTabs" />
      <Navbar.Collapse id="navTabs">
        <Nav className="ml-auto w-100">
          <div className="alignContent">
            {/* Show only the active tab title on large screens */}
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

            {/* Show the dropdown on mobile */}
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
