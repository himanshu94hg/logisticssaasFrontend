import React from "react";
import { Navbar, Nav } from "react-bootstrap";

export default function NavTabs({ activeTab, setActiveTab }) {

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
            <Nav.Link className={`${activeTab === "Channel" ? "active" : ""}`}
              onClick={() => {
                setActiveTab("Channel");

              }}
            >
              <div className="navItemsContainer">
                Channel
              </div>
            </Nav.Link>
            <Nav.Link className={`${activeTab === "OMS" ? "active" : ""}`}
              onClick={() => {
                setActiveTab("OMS");

              }}
            >
              <div className="navItemsContainer">
                OMS
              </div>
            </Nav.Link>
            <Nav.Link className={`${activeTab === "Courier" ? "active" : ""}`}
              onClick={() => {
                setActiveTab("Courier");

              }}
            >
              <div className="navItemsContainer">
                Courier
              </div>
            </Nav.Link>
            <Nav.Link className={`${activeTab === "Other" ? "active" : ""}`}
              onClick={() => {
                setActiveTab("Other");

              }}
            >
              {" "}
              <div className="navItemsContainer">
                Other
              </div>
            </Nav.Link>

          </div>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
