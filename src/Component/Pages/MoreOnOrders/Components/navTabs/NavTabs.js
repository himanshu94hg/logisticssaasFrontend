import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

const navItems = [
  { name: 'Reassign Order', title: 'Reassign Order' },
  { name: 'Merge Order', title: 'Merge Order' },
  { name: 'Split Order', title: 'Split Order' },
]

export default function NavTabs(props) {
  const [isOpen, setIsOpen] = useState(false);

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
        <Nav className="ml-auto w-100 alignContent">
          <div className="alignContent">
            {navItems.map((item) => (
              <Nav.Link
                key={item.name}
                className={`d-none d-lg-block ${props.activeTab === item.name ? "active" : ""}`}
                onClick={() => {
                  props.setCurrentPage(1)
                  props.setItemsPerPage(20)
                  props.setActiveTab(item.name);
                  props.setMostPopular({ most_popular_search: '' })
                }}
                title={item.name}
              >
                <div className="navItemsContainer">
                  {item.title}<span className="tab-counter">
                    {item?.name === "Reassign Order" && props?.counterData?.reassign_order_count}
                    {item?.name === "Merge Order" && props?.counterData?.merge_order_count}
                    {item?.name === "Split Order" && props?.counterData?.split_order_count}
                  </span>
                </div>
              </Nav.Link>
            ))}
            <NavDropdown
              title={props.activeTab || "Select Option"}
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
