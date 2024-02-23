import axios from 'axios';
import moment from 'moment';
import Cookies from 'js-cookie';
import './CustomerSupportPage.css';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import NavTabs from './Components/navTabs/NavTabs';
import CreateTicketForm from './Components/CreateTicketForm';
import FilterTicketsForm from './Components/FilterTicketsForm';
import InProgressTickets from './Components/InProgressTickets';
import ViewTicketSlider from './Components/ViewTicketSlider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faChevronRight, faCircleQuestion } from '@fortawesome/free-solid-svg-icons';

const CustomerSupportPage = () => {
  let navigate = useNavigate();
  const [viewId, setId] = useState('');
  const [allTicket, setAllTicket] = useState([]);
  const [ticketId, setTicketId] = useState(null);
  const [NewTicket, setNewTicket] = useState(false);
  const [FilterTickets, setFilterTickets] = useState(false);
  const [activeTab, setActiveTab] = useState('allTickets');
  const [ViewTicketInfo, setViewTicketInfo] = useState(false);


  console.log(ViewTicketInfo, "i am ViewTicketInfoViewTicketInfo")

  const authToken = Cookies.get("access_token")
  const apiUrl = "http://65.2.38.87:8088/core-api/features/support-tickets/";

  useEffect(() => {
    let url = apiUrl;
    switch (activeTab) {
      case "openTickets":
        url += "?status=Open";
        break;
      case "inProgressTickets":
        url += "?status=In-progress";
        break;
      case "closedTickets":
        url += "?status=Closed";
        break;
      default:
        break;
    }
    axios.get(url, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((response) => {
        setAllTicket(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [activeTab]);


  const handleFormSubmit = (categories, status, resDate, endDt, isFilter) => {
    const queryParams = new URLSearchParams();
    if (categories == []) {
      queryParams.append('sub_category', categories.value);
    }
    if (status != "") {
      queryParams.append('status', status);
    }
    if (resDate != null || undefined) {
      queryParams.append('resolution_due_by', moment(resDate).format("YYYY-MM-DD"));
    }
    if (endDt != null || undefined) {
      queryParams.append('last_updated', moment(endDt).format("YYYY-MM-DD"));
    }
    const apiUrlWithParams = `${apiUrl}?${queryParams.toString()}`;
    axios
      .get(apiUrlWithParams, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      })
      .then(response => {
        setAllTicket(response.data)
        setFilterTickets(false)
      })
      .catch(error => {
        console.error('Error:', error);
      });

  };

  const handleViewButtonClick = (ticketId) => {
    setId(ticketId);
  };

  return (
    <>
      <div className='p10 support-page position-relative'>
        <div onClick={() => navigate('/help-articles')} className='help-button'>
          <FontAwesomeIcon icon={faCircleQuestion} />
          <div className='ms-2'>
            <p className='mb-0 fw-bold'>Need Help?</p>
            <p className='mb-0 font12'>Click me!</p>
          </div>
        </div>
        <h4>Support</h4>
        <p className='text-blue fw-700'>Seek assistance by either generating a support ticket or perusing through informative help articles.</p>
        <NavTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          FilterTickets={FilterTickets}
          setFilterTickets={setFilterTickets}
          setNewTicket={setNewTicket}
          NewTicket={NewTicket}
        />
        <div className='row mt-3'>
          <InProgressTickets allTicket={allTicket} setTicketId={setTicketId} setViewTicketInfo={setViewTicketInfo} handleViewButtonClick={handleViewButtonClick} />
        </div>
      </div>
      <div className={`ticket-slider ${FilterTickets ? 'open' : ''}`}>
        <div id='sidepanel-closer' onClick={() => setFilterTickets(!FilterTickets)}>
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
        <section className='ticket-slider-header'>
          <h2 className='mb-0'>More Filters</h2>
          <p className='mb-0'>Filter tickets with our Expanded Filter Options!</p>
        </section>
        <FilterTicketsForm handleFormSubmit={handleFormSubmit} />
      </div>
      <div className={`ticket-slider ${NewTicket ? 'open' : ''}`}>
        <div id='sidepanel-closer' onClick={() => setNewTicket(!NewTicket)}>
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
        <section className='ticket-slider-header'>
          <h2 className='mb-0'>Create a new Ticket!</h2>
        </section>
        <section className='ticket-slider-body'>
          <CreateTicketForm setNewTicket={setNewTicket} NewTicket={NewTicket} />
        </section>
      </div>
      <div className={`ticket-slider ${ViewTicketInfo ? 'open' : ''}`}>
        <ViewTicketSlider setViewTicketInfo={setViewTicketInfo} ViewTicketInfo={ViewTicketInfo} viewId={viewId} />
      </div>
      <div className={`backdrop ${NewTicket || FilterTickets || ViewTicketInfo ? 'd-block' : 'd-none'}`}></div>
    </>
  );
};

export default CustomerSupportPage;