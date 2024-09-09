import axios from "axios";
import moment from "moment";
import Cookies from 'js-cookie';
import { saveAs } from 'file-saver';
import { toast } from "react-toastify";
import Form from 'react-bootstrap/Form';
import { useSelector } from "react-redux";
import Modal from 'react-bootstrap/Modal';
import DatePicker from 'react-datepicker';
import React, { useEffect, useState } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { customErrorFunction } from "../../../../../customFunction/errorHandling";


export default function NavTabs(props) {
  const [show, setShow] = useState(false);
  const authToken = Cookies.get("access_token")
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [reportType, setReportType] = useState("all_order")

  const handleClose = () => {
    setShow(false)
    setReportType("all_order")
  };

  useEffect(() => {
    setStartDate(new Date())
    setEndDate(new Date())
  }, [show])

  const userData = useSelector(state => state?.paymentSectionReducer.sellerProfileCard);
  const navItems = [
    { name: 'ScheduledReportsMIS', title: 'Schedules' },
    { name: 'ReportsMIS', title: 'Reports' },
    { name: 'DownloadMIS', title: 'Downloads' },
    { name: 'ActivityLogsMIS', title: 'Activities' },
  ]

  const activeTabTitle = navItems.find(item => item.name === props.activeTab)?.title;

  const handleSelect = (selectedTab) => {
    props.setActiveTab(selectedTab);
  };

  const handleShow = () => {
    setShow(!show)
  }

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  // https://shipease.in/api/generate-report?type=all_order&from_date=2024-07-28&to_date=2024-07-28&seller_code=SE-127435

  const handleClick = async () => {
    try {
      const response = await axios.get(
        `https://shipease.in/api/generate-report?type=${reportType}&from_date=${moment(startDate).format("YYYY-MM-DD")}&to_date=${moment(startDate).format("YYYY-MM-DD")}&seller_code=${userData?.code}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`
          },
          responseType: 'blob',
        }
      );
      if (response.status === 200) {
        const csvText = await response.data.text();
        const rows = csvText.split('\n');
        let csvContent = '';
        rows.forEach((row) => {
          csvContent += row.trim() + '\n';
        });
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, 'report.csv');
        setShow(false)
        toast.success("Report downloaded successfully");
      }
    } catch (error) {
      customErrorFunction(error);
      setShow(false)
    }
  };

  const handleKeyDown = (e) => {
    const allowedCharacters = /[0-9/]/;
    if (e.key === 'Backspace' || e.key === 'Delete') {
      return;
    }
    if (!allowedCharacters.test(e.key)) {
      e.preventDefault();
    }
  }

  const handleChecked = (e) => {
    if (e.target.checked) {
      setReportType("archive")
    } else {
      setReportType("all_order")
    }
    console.log(e.target.checked, "this is a report data")
  }


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
                  <Nav.Link key={item.name} className={`d-none d-lg-block ${props.activeTab === item.name ? "active" : ""}`}
                    onClick={() => {
                      props.setActiveTab(item.name);
                    }}
                    title={item.title}
                  >
                    <div className="navItemsContainer">
                      {/* <FontAwesomeIcon icon={faCube} /> */}
                      {item.title}
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
                    active={props.activeTab === item.name}
                  >
                    {item.title}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            </div>
          </Nav>
          <button className='btn main-button' onClick={handleShow}>Download 1.0 Report</button>
        </Navbar.Collapse>
      </Navbar>

      <Modal
        show={show}
        onHide={handleClose}
        keyboard={false}
        size="lg"
        className='confirmation-modal-report'
      >
        <Modal.Header className="d-flex justify-content-center">
          <Modal.Title >Download Shipease 1.0 report</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <div className="d-flex justify-content-between px-4 align-items-center">
            <div className="mb-4">
              <label className="d-flex">From Date</label>
              <div className='date-picker-container'>
                <DatePicker
                  showIcon
                  isClearable
                  maxDate={new Date()}
                  selected={startDate}
                  className='input-field'
                  dateFormat='dd MMMM, yyyy'
                  shouldCloseOnSelect={true}
                  onChange={handleStartDateChange}
                  onKeyDown={(e) => handleKeyDown(e)}
                  icon={<FontAwesomeIcon icon={faCalendarAlt} className='calendar-icon' />}
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="d-flex">To Date</label>
              <div className='date-picker-container'>
                <DatePicker
                  showIcon
                  isClearable
                  selected={endDate}
                  maxDate={new Date()}
                  className='input-field'
                  dateFormat='dd MMMM, yyyy'
                  shouldCloseOnSelect={true}
                  onChange={handleEndDateChange}
                  onKeyDown={(e) => handleKeyDown(e)}
                  icon={<FontAwesomeIcon icon={faCalendarAlt} className='calendar-icon' />}
                />
              </div>
            </div>
            <div className="">
              <div className='d-flex gap-4 align-items-center'>
                <Form.Check
                  type="switch"
                  id="custom-switch"
                  checked={reportType !== "all_order" ? true : false}
                  style={{
                    transform: "scale(1.5)",
                    marginLeft: "10px",
                    marginTop: "9px"
                  }}
                  onChange={(e) => handleChecked(e)}
                />
                <span className="text-capitalize fw-bold" style={{ width: 50 }}>{reportType.split("_").join("")}</span>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className='d-flex gap-2'>
            <button className="btn cancel-button" onClick={handleClose}>
              Cancel
            </button>
            <button className="btn main-button" onClick={handleClick}>Download</button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
