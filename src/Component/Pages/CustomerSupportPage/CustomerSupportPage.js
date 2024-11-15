import axios from 'axios';
import moment from 'moment';
import Cookies from 'js-cookie';
import './CustomerSupportPage.css';
import { useSelector } from 'react-redux';
import AllTickets from './Components/AllTickets';
import NavTabs from './Components/navTabs/NavTabs';
import { BASE_URL_CORE } from '../../../axios/config';
import LoaderScreen from '../../LoaderScreen/LoaderScreen';
import React, { useState, useEffect, useRef } from 'react';
import CreateTicketForm from './Components/CreateTicketForm';
import Pagination from '../../common/Pagination/Pagination';
import ViewTicketSlider from './Components/ViewTicketSlider';
import FilterTicketsForm from './Components/FilterTicketsForm';
import InProgressTickets from './Components/InProgressTickets';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { customErrorFunction } from '../../../customFunction/errorHandling';
import { faChevronRight, faCircleQuestion } from '@fortawesome/free-solid-svg-icons';

const CustomerSupportPage = () => {
  const [viewId, setId] = useState('');
  const [reset, setReset] = useState(null)
  const [status, setStatus] = useState(false);
  const [loader, setLoader] = useState(false)
  const authToken = Cookies.get("access_token")
  const [allTicket, setAllTicket] = useState([]);
  const [ticketId, setTicketId] = useState(null);
  const [totalItems, setTotalItems] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [NewTicket, setNewTicket] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [clearTicket, setClearTicket] = useState(false)
  const [filterClick, setFilterClick] = useState(false);
  const [queryParamTemp, setQueryParamTemp] = useState({})
  const [activeTab, setActiveTab] = useState('allTickets');
  const [FilterTickets, setFilterTickets] = useState(false);
  const [categoryStatus, setCategoryStatus] = useState(false);
  const [ViewTicketInfo, setViewTicketInfo] = useState(false);
  const apiUrl = `${BASE_URL_CORE}/core-api/features/support-tickets/`;
  const { ticketStatus } = useSelector(state => state?.customerSupportReducer)


  useEffect(() => {
    let url = apiUrl;
    switch (activeTab) {
      case "openTickets":
        url += `?status=Open&page=${currentPage}&page_size=${itemsPerPage}&q=${searchValue}`;
        break;
      case "inProgressTickets":
        url += `?status=In-progress&page=${currentPage}&page_size=${itemsPerPage}&q=${searchValue}`;
        break;
      case "closedTickets":
        url += `?status=Closed&page=${currentPage}&page_size=${itemsPerPage}&q=${searchValue}`;
        break;
      case "allTickets":
        url += `?page=${currentPage}&page_size=${itemsPerPage}&q=${searchValue}`;
        break;
      default:
        break;
    }

    if (url) {
      const queryParams = { ...queryParamTemp };
      const queryString = Object.keys(queryParams)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(queryParams[key]))
        .join('&');
      if (queryString) {
        url += '&' + queryString;
      }
      axios.get(url, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      })
        .then(response => {
          setAllTicket(response?.data?.results);
          setTotalItems(response?.data?.count);
        })
        .catch(error => {
          customErrorFunction(error)
        });
    }
  }, [activeTab, reset, currentPage]);

  const handleFormSubmit = (categories, status, resDate, endDt, isFilter, createdDate, Severity) => {
    const queryParams = new URLSearchParams();

    if (categories && categories.value) {
      queryParams.append('sub_category', categories.value);
    }
    if (status) {
      queryParams.append('status', status);
    }
    if (resDate) {
      const formattedResDate = moment(resDate).isValid() ? moment(resDate).format("YYYY-MM-DD") : null;
      if (formattedResDate) queryParams.append('resolution_due_by', formattedResDate);
    }
    if (endDt) {
      const formattedEndDt = moment(endDt).isValid() ? moment(endDt).format("YYYY-MM-DD") : null;
      if (formattedEndDt) queryParams.append('last_updated', formattedEndDt);
    }
    if (createdDate) {
      const formattedCreatedDate = moment(createdDate).isValid() ? moment(createdDate).format("YYYY-MM-DD") : null;
      if (formattedCreatedDate) queryParams.append('created_at', formattedCreatedDate);
    }
    if (Severity) {
      queryParams.append('Severity', Severity);
    }

    const apiUrlWithParams = `${apiUrl}?${queryParams.toString()}`;

    axios
      .get(apiUrlWithParams, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      })
      .then(response => {
        setAllTicket(response?.data?.results);
        setFilterTickets(false);
        setTotalItems(response?.data?.count);
      })
      .catch(error => {
        console.error("API request failed: ", error);
        customErrorFunction(error);
      });
  };

  const handleViewButtonClick = (ticketId) => {
    setId(ticketId);
  };

  useEffect(() => {
    setLoader(true)
    if (activeTab) {
      setSearchValue('')
      setTimeout(() => {
        setLoader(false)
      }, 500);
    }
  }, [activeTab])

  useEffect(() => {
    setAllTicket(allTicket)
  }, [allTicket])

  const handleSearch = () => {
    setReset(new Date())
    setCurrentPage(1)
  }

  const handleReset = () => {
    setSearchValue("")
    setQueryParamTemp({})
    setReset(new Date())
  }

  const handleNeedHelpPage = () => {
    window.open('https://www.shipease.in/support', '_blank');
  };

  return (
    <>
      <div className='support-page position-relative'>
        <div onClick={() => handleNeedHelpPage()} className='help-button'>
          <FontAwesomeIcon icon={faCircleQuestion} />
          <div className='ms-2 d-none d-lg-block'>
            <p className='mb-0 fw-bold'>Need Help?</p>
            <p className='mb-0 font12'>Click me!</p>
          </div>
        </div>
        <h4>Support</h4>
        <p className='text-blue fw-700'>Seek assistance by either generating a support ticket or perusing through informative help articles.</p>
        <NavTabs
          activeTab={activeTab}
          NewTicket={NewTicket}
          searchValue={searchValue}
          handleReset={handleReset}
          handleSearch={handleSearch}
          setActiveTab={setActiveTab}
          setNewTicket={setNewTicket}
          FilterTickets={FilterTickets}
          setSearchValue={setSearchValue}
          setCurrentPage={setCurrentPage}
          setClearTicket={setClearTicket}
          setFilterTickets={setFilterTickets}
          setCategoryStatus={setCategoryStatus}
        />
        <div className='row mt-3'>
          {activeTab === "allTickets" &&
            <AllTickets activeTab={activeTab} allTicket={allTicket} setTicketId={setTicketId} setViewTicketInfo={setViewTicketInfo} handleViewButtonClick={handleViewButtonClick} />

          }
          {
            (activeTab === "openTickets" || activeTab === "closedTickets" || activeTab === "inProgressTickets") &&
            <InProgressTickets activeTab={activeTab} allTicket={allTicket} setTicketId={setTicketId} setViewTicketInfo={setViewTicketInfo} handleViewButtonClick={handleViewButtonClick} />
          }
        </div>
        <Pagination
          setReset={setReset}
          totalItems={totalItems}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          setCurrentPage={setCurrentPage}
        />
      </div>

      <div className={`ticket-slider ${FilterTickets ? 'open' : ''}`}>
        <div id='sidepanel-closer' onClick={() => { setFilterTickets(!FilterTickets); setFilterClick(true) }}>
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
        <section className='ticket-slider-header'>
          <h2 className='mb-0'> More Filters</h2>
          <p className='mb-0'>Filter tickets with our Expanded Filter Options!</p>
        </section>
        <FilterTicketsForm handleFormSubmit={handleFormSubmit} filterClick={FilterTickets} clearTicket={clearTicket} setClearTicket={setClearTicket} />
      </div>

      <div className={`ticket-slider ${NewTicket ? 'open' : ''}`}>
        <div id='sidepanel-closer' onClick={() => setNewTicket(false)}>
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
        <section className='ticket-slider-header'>
          <h2 className='mb-0'>Create a new Ticket!</h2>
        </section>
        <section className='ticket-slider-body'>
          <CreateTicketForm setNewTicket={setNewTicket} NewTicket={NewTicket} setStatus={setStatus} status={status} categoryStatus={categoryStatus} setCategoryStatus={setCategoryStatus} />
        </section>
      </div>
      <div className={`ticket-slider ${ViewTicketInfo ? 'open' : ''}`}>
        <ViewTicketSlider tktId={allTicket} setViewTicketInfo={setViewTicketInfo} ViewTicketInfo={ViewTicketInfo} viewId={viewId} />
      </div>
      {/* <div className={`backdrop ${NewTicket || FilterTickets || ViewTicketInfo ? 'd-block' : 'd-none'}`}></div> */}
      <div onClick={() => { setNewTicket(false); setFilterTickets(false); setViewTicketInfo(false) }} className={`backdrop ${NewTicket || FilterTickets || ViewTicketInfo ? 'd-block' : 'd-none'}`}></div>
      <LoaderScreen loading={loader} />
    </>
  );
};

export default CustomerSupportPage;