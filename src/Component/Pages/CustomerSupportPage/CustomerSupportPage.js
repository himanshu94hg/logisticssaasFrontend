import React, { useState, useEffect } from 'react';
import './CustomerSupportPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faChevronRight, faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import AllTickets from './Components/AllTickets';
import { useNavigate } from 'react-router-dom';
import CreateTicketForm from './Components/CreateTicketForm';
import FilterTicketsForm from './Components/FilterTicketsForm';
import InProgressTickets from './Components/InProgressTickets';
import OpenTickets from './Components/OpenTickets';
import ClosedTickets from './Components/ClosedTickets';
import ViewTicketSlider from './Components/ViewTicketSlider';
import NavTabs from './Components/navTabs/NavTabs';
import axios from 'axios';

const CustomerSupportPage = () => {
  const [ViewTicketInfo, setViewTicketInfo] = useState(false);
  const [NewTicket, setNewTicket] = useState(false);
  const [FilterTickets, setFilterTickets] = useState(false);
  const [ActiveTab, setActiveTab] = useState('AllTickets');
  const [allTicket, setAllTicket] = useState([]);
  const [categories, setSelectedCategories] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [resolutionDate, setResolutionDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isFilter, setIsFilter] = useState(false);
  const [viewId, setId] = useState('');

  let navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const hardcodedToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA3OTkyNDk2LCJpYXQiOjE3MDczODc2OTYsImp0aSI6IjEzODE0YWE2ZjE2ZTQyNzk5NzhhNzAwZmY0MTM1YTZhIiwidXNlcl9pZCI6Mn0.neIQZnSs3vkyMxm0QrfIOpu_RTjDNz5j3vF-OPNNXTA';
        let params = {};

        if (isFilter) {
          params = {
            sub_category: categories.map(category => category.value).join(','),
            status: selectedStatus,
            // resolution_due_by: resolutionDate,
            // last_updated: endDate
          };
        } else {
          // params = {
          //   sub_category: 14,
          //   status: 'Closed',
          //   resolution_due_by: '2024-01-01',
          //   last_updated: '2024-02-01',
          // };
        }

        const response = await axios.get(
          'http://65.2.38.87:8088/core-api/features/support-tickets/',
          {
            params: params,
            headers: {
              Authorization: `Bearer ${hardcodedToken}`,
            },
          }
        );
        setAllTicket(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [isFilter, categories, selectedStatus, resolutionDate, endDate]);

  const handleFormSubmit = (categories, status, resDate, endDt, isFilter) => {
    setSelectedCategories(categories);
    setSelectedStatus(status);
    setResolutionDate(resDate);
    setEndDate(endDt);
    setIsFilter(isFilter);
  };

  console.log("filterd data is", categories, selectedStatus, resolutionDate, endDate, isFilter)
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
          activeTab={ActiveTab}
          setActiveTab={setActiveTab}
          FilterTickets={FilterTickets}
          setFilterTickets={setFilterTickets}
          setNewTicket={setNewTicket}
          NewTicket={NewTicket}
        />
        <div className='row mt-3'>
          {ActiveTab === 'AllTickets' ? <AllTickets ViewTicketInfo={ViewTicketInfo} setViewTicketInfo={setViewTicketInfo} allTicket={allTicket} setAllTicket={setAllTicket} handleViewButtonClick={handleViewButtonClick} /> : ''}
          {ActiveTab === 'OpenTickets' ? <OpenTickets ViewTicketInfo={ViewTicketInfo} setViewTicketInfo={setViewTicketInfo} /> : ''}
          {ActiveTab === 'InProgressTickets' ? <InProgressTickets ViewTicketInfo={ViewTicketInfo} setViewTicketInfo={setViewTicketInfo} /> : ''}
          {ActiveTab === 'ClosedTickets' ? <ClosedTickets ViewTicketInfo={ViewTicketInfo} setViewTicketInfo={setViewTicketInfo} /> : ''}
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