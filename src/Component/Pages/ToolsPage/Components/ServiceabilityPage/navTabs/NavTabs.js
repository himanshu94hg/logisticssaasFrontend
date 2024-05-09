import axios from "axios";
import Swal from "sweetalert2";
import { Navbar, Nav } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL_CORE } from "../../../../../../axios/config";

export default function NavTabs(props) {
  const navigation = useNavigate();
  const [selectedOption, setSelectedOption] = useState("Domestic");
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = () => {
    let sellerData = 3;

    const response = axios.get(`${BASE_URL_CORE}/core-api/channel/channel/?seller_id=${sellerData}&channel=shopify`);
    console.log("Data", response);

    if (response.status === 200) {
      const responseData = response.data;
      console.log('API Response:', responseData);
      Swal.fire({
        icon: 'success',
        title: 'Order Created!',
        text: 'Order Fetch Successfully.',
        customClass: {
          confirmButton: 'btn main-button',
        },
      }).then(() => {
        navigation('/Orders');
      });
    } else {
      const errorData = response.data;
      console.error('API Error:', errorData);

    }
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const toggleOptions = () => {
    setIsOpen(!isOpen);
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
            <Nav.Link className={`${props.activeTab === "Check Serviceability" ? "active" : ""}`}
              onClick={() => {
                props.setActiveTab("Check Serviceability");
              }}
            >
              <div className="navItemsContainer">
                {/* <FontAwesomeIcon icon={faBinoculars} /> */}
                Check Serviceability
              </div>
            </Nav.Link>
            <Nav.Link className={`${props.activeTab === "Get serviceability" ? "active" : ""}`}
              onClick={() => {
                props.setActiveTab("Get serviceability");
              }}
            >
              {" "}
              <div className="navItemsContainer">
                {/* <FontAwesomeIcon icon={faCube} /> */}
                Get serviceability
              </div>
            </Nav.Link>
          </div>
        </Nav>
      </Navbar.Collapse>
      {/* <div className="d-flex gap-10 align-items-center">
        <button className="btn main-button" onClick={handleSubmit}>Sync Orders</button>
        <button className="btn main-button">Import CSV</button>
        <Link to="/create-order" className="btn main-button"><FontAwesomeIcon icon={faPlus} /> Create Order</Link>
      </div> */}
    </Navbar>
  );
}
