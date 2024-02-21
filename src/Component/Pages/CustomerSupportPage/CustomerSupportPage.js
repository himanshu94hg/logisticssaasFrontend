import axios from 'axios';
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
  const [isFilter, setIsFilter] = useState(false);
  const [NewTicket, setNewTicket] = useState(false);
  const [endDate, setEndDate] = useState(new Date());
  const [FilterTickets, setFilterTickets] = useState(false);
  const [activeTab, setActiveTab] = useState('allTickets');
  const [categories, setSelectedCategories] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [ViewTicketInfo, setViewTicketInfo] = useState(false);
  const [ticketId, setTicketId] = useState(null);
  const [resolutionDate, setResolutionDate] = useState(new Date());

  console.log(ticketId, "ticketIdticketIdticketId")

  const authToken = Cookies.get("access_token")

  const apiUrl = `http://65.2.38.87:8088/core-api/features/support-tickets/`

  console.log(allTicket, "alltickets");


  useEffect(() => {
    axios
      .get(`${activeTab == "allTickets" ? apiUrl : activeTab == "openTickets" ? `${apiUrl}?status=Open` : activeTab == "inProgressTickets" ? `${apiUrl}?status=In-progess` : activeTab == "closedTickets" ? `${apiUrl}?status=Closed` : ""}`, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      })
      .then(response => {
        setAllTicket(response.data)
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [activeTab]);


  const handleFormSubmit = (categories, status, resDate, endDt, isFilter) => {
    setSelectedCategories(categories);
    setSelectedStatus(status);
    setResolutionDate(resDate);
    setEndDate(endDt);
    setIsFilter(isFilter);
  };

  const handleViewButtonClick = (ticketId) => {
    setId(ticketId);
  };


  console.log(activeTab, "activeTabactiveTabactiveTab")

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
          {<InProgressTickets allTicket={allTicket} setTicketId={setTicketId} setViewTicketInfo={setViewTicketInfo}  handleViewButtonClick={handleViewButtonClick}/>}
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