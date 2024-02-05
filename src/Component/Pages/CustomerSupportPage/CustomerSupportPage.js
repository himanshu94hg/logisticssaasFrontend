import React, { useState } from 'react'
import './CustomerSupportPage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt, faChevronRight, faCircleQuestion, faFilter, faPlus } from '@fortawesome/free-solid-svg-icons'
import SearchIcon from '../../../assets/image/icons/search-icon.png'
import AllTickets from './Components/AllTickets'
import { useNavigate } from 'react-router-dom'
import 'react-datepicker/dist/react-datepicker.css';
import CreateTicketForm from './Components/CreateTicketForm'
import FilterTicketsForm from './Components/FilterTicketsForm'
import InProgressTickets from './Components/InProgressTickets'
import OpenTickets from './Components/OpenTickets'
import ClosedTickets from './Components/ClosedTickets'
import { RiFilterLine } from "react-icons/ri";
import ViewTicketSlider from './Components/ViewTicketSlider'
import NavTabs from './Components/navTabs/NavTabs'

const CustomerSupportPage = () => {

  const [ViewTicketInfo, setViewTicketInfo] = useState(false)

  const [NewTicket, setNewTicket] = useState(false);

  const [FilterTickets, setFilterTickets] = useState(false);

  const [ActiveTab, setActiveTab] = useState('AllTickets');

  let navigate = useNavigate();

  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  return (
    <>
      <div className='p10 support-page position-relative'>
        <div
          onClick={() => navigate('/help-articles')}
          className='help-button'
        >
          {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              height={24}
              viewBox="0 -960 960 960"
              width={24}
            >
              <path d="M478-240q21 0 35.5-14.5T528-290q0-21-14.5-35.5T478-340q-21 0-35.5 14.5T428-290q0 21 14.5 35.5T478-240Zm-36-154h74q0-33 7.5-52t42.5-52q26-26 41-49.5t15-56.5q0-56-41-86t-97-30q-57 0-92.5 30T342-618l66 26q5-18 22.5-39t53.5-21q32 0 48 17.5t16 38.5q0 20-12 37.5T506-526q-44 39-54 59t-10 73Zm38 314q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" fill='#fff' />
            </svg> */}
          <FontAwesomeIcon icon={faCircleQuestion} />
          <div className='ms-2'>
            <p className='mb-0 fw-bold'>Need Help?</p>
            <p className='mb-0 font12'>Click me!</p>
          </div>
        </div>
        <h4>Support</h4>
        <p className='text-blue fw-700'>Seek assistance by either generating a support ticket or perusing through informative help articles.</p>
        <NavTabs
          activeTab={ActiveTab} setActiveTab={setActiveTab}
          FilterTickets={FilterTickets} setFilterTickets={setFilterTickets}
          setNewTicket={setNewTicket} NewTicket={NewTicket}
        />


        <div className='row mt-3'>
          {ActiveTab === 'AllTickets' ?
            (
              <div className="col-12">
                <AllTickets
                  ViewTicketInfo={ViewTicketInfo}
                  setViewTicketInfo={setViewTicketInfo} />
              </div>
            ) : ""}

          {ActiveTab === 'OpenTickets' ?
            (
              <div className="col-12">
                <OpenTickets
                  ViewTicketInfo={ViewTicketInfo}
                  setViewTicketInfo={setViewTicketInfo} />
              </div>
            ) : ""}

          {ActiveTab === 'InProgressTickets' ?
            (
              <div className="col-12">
                <InProgressTickets
                  ViewTicketInfo={ViewTicketInfo}
                  setViewTicketInfo={setViewTicketInfo} />
              </div>
            ) : ""}

          {ActiveTab === 'ClosedTickets' ?
            (
              <div className="col-12">
                <ClosedTickets
                  ViewTicketInfo={ViewTicketInfo}
                  setViewTicketInfo={setViewTicketInfo} />
              </div>
            ) : ""}

        </div>

      </div>
      <div className={`ticket-slider ${FilterTickets ? 'open' : ''}`}>
        <div
          id='sidepanel-closer'
          onClick={() => setFilterTickets(!FilterTickets)}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </div>

        <section className='ticket-slider-header'>
          <h2 className='mb-0'>More Filters</h2>
          <p className='mb-0'>Filter tickets with our Expanded Filter Options!</p>
        </section>

        <FilterTicketsForm />

      </div>

      <div className={`ticket-slider ${NewTicket ? 'open' : ''}`}>
        <div
          id='sidepanel-closer'
          onClick={() => setNewTicket(!NewTicket)}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </div>

        <section className='ticket-slider-header'>
          <h2 className='mb-0'>Create a new Ticket!</h2>
        </section>
        <section className='ticket-slider-body'>
          <CreateTicketForm setNewTicket={setNewTicket} NewTicket={NewTicket} />
        </section>

      </div>

      {/* View Ticket */}
      <div className={`ticket-slider ${ViewTicketInfo ? 'open' : ''}`}>
        <ViewTicketSlider setViewTicketInfo={setViewTicketInfo} ViewTicketInfo={ViewTicketInfo} />
      </div>
      <div className={`backdrop ${NewTicket || FilterTickets || ViewTicketInfo ? 'd-block' : 'd-none'}`}></div>
    </>
  )
}

export default CustomerSupportPage