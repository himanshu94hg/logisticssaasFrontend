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
import { faChevronRight, faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import Pagination from '../../common/Pagination/Pagination';
import { toast } from 'react-toastify';
import { RxReset } from "react-icons/rx";
import { useSelector } from 'react-redux';
import AllTickets from './Components/AllTickets';

const CustomerSupportPage = () => {
  let navigate = useNavigate();
  const [viewId, setId] = useState('');
  const [allTicket, setAllTicket] = useState([]);
  const [ticketId, setTicketId] = useState(null);
  const [NewTicket, setNewTicket] = useState(false);
  const [FilterTickets, setFilterTickets] = useState(false);
  const [activeTab, setActiveTab] = useState('allTickets');
  const [ViewTicketInfo, setViewTicketInfo] = useState(false);
  const [filterClick, setFilterClick] = useState(false);
  const [status, setStatus] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState("");
  const [errors, setErrors] = useState({});
  const [clearTicket, setClearTicket] = useState(false)
  const [queryParamTemp, setQueryParamTemp] = useState({})

  const authToken = Cookies.get("access_token")
  const apiUrl = "https://dev.shipease.in/core-api/features/support-tickets/";
  const { ticketStatus } = useSelector(state => state?.customerSupportReducer)

  console.log(ticketStatus, "ticketStatus")

  useEffect(() => {
    let url = apiUrl;
    switch (activeTab) {
      case "openTickets":
        url += `?status=Open&page=${currentPage}&page_size=${itemsPerPage}`;
        break;
      case "inProgressTickets":
        url += `?status=In-progress&page=${currentPage}&page_size=${itemsPerPage}`;
        break;
      case "closedTickets":
        url += `?status=Closed&page=${currentPage}&page_size=${itemsPerPage}`;
        break;
      case "allTickets":
        url += `?page=${currentPage}&page_size=${itemsPerPage}`;
        break;
      default:
        break;
    }

    if (url) {
      const queryParams = { ...queryParamTemp };
      const queryString = Object.keys(queryParams)
          .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(queryParams[key]))
          .join('&');

          console.log(queryString,"queryStringqueryString")

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
              toast.error("Api Call failed!")
          });
    }


  }, [activeTab, status, currentPage, ticketStatus, itemsPerPage,queryParamTemp]);

  const handleFormSubmit = (categories, status, resDate, endDt, isFilter, createdDate) => {
    const queryParams = new URLSearchParams(); 
    /*if (Array.isArray(categories) && categories.length > 0) {
      queryParams.append('sub_category', categories.value);
    }*/
    if (categories != "") {
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
    if (createdDate != null || undefined) {
      queryParams.append('created_at', moment(endDt).format("YYYY-MM-DD"));
    }
    const apiUrlWithParams = `${apiUrl}?${queryParams.toString()}`;
    axios
      .get(apiUrlWithParams, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      })
      .then(response => {
        setAllTicket(response?.data?.results)
        setFilterTickets(false)

      })
      .catch(error => {
        console.error('Error:', error);
      });

  };

  const handleViewButtonClick = (ticketId) => {
    setId(ticketId);
  };

  useEffect(() => {
    setSearchValue('')
  }, [activeTab])

  useEffect(() => {
    setAllTicket(allTicket)
  }, [allTicket])


  const validateData = () => {
    const newErrors = {};
    if (!searchValue) {
      newErrors.searchValue = 'Field is required!';
    }
    setErrors(newErrors);
    console.log(newErrors, "this is new errors")
    return Object.keys(newErrors).length === 0;
  };

  /*const handleSearch = (value) => {
    setSearchValue(value)
  }*/
  const handleSearch = () => {
    if (validateData()) {
      axios.get(`https://dev.shipease.in/core-api/features/support-tickets/?q=${searchValue}&page_size=${20}&page=${1}`, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      })
        .then(response => {
          setTotalItems(response?.data?.count)
          setAllTicket(response.data.results);
        })
        .catch(error => {
          toast.error("Something went wrong!")
        });
        setCurrentPage(1)
        setQueryParamTemp({
          q:searchValue
      })
      setCurrentPage(1)
    }
  }

  const handleReset = () => {
    setSearchValue("")
    setQueryParamTemp({})
    if(activeTab === 'allTickets'){
      axios.get(`https://dev.shipease.in/core-api/features/support-tickets/?page_size=${20}&page=${1}&courier_status${activeTab==="allTickets" ?'':activeTab}`, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      })
        .then(response => {
          setTotalItems(response?.data?.count)
          setAllTicket(response.data.results);
        })
        .catch(error => {
          toast.error("Something went wrong!")
        }); 
    }else if (activeTab === 'openTickets') {
      axios.get(`https://dev.shipease.in/core-api/features/support-tickets/?status=Open&page_size=${20}&page=${1}&courier_status${activeTab==="openTickets" ?'':activeTab}`, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      })
        .then(response => {
          setTotalItems(response?.data?.count)
          setAllTicket(response.data.results);
        })
        .catch(error => {
          toast.error("Something went wrong!")
        });

    }
    else if (activeTab === "closedTickets") {
      axios.get(`https://dev.shipease.in/core-api/features/support-tickets/?status=Closed&page_size=${20}&page=${1}&courier_status${activeTab==="closedTickets" ?'':activeTab}`, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      })
        .then(response => {
          setTotalItems(response?.data?.count)
          setAllTicket(response.data.results);
        })
        .catch(error => {
          toast.error("Something went wrong!")
        });

    }else if(activeTab === "inProgressTickets"){
      axios.get(`https://dev.shipease.in/core-api/features/support-tickets/?status=In-progress&page_size=${20}&page=${1}&courier_status${activeTab==="inProgressTickets" ?'':activeTab}`, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      })
        .then(response => {
          setTotalItems(response?.data?.count)
          setAllTicket(response.data.results);
        })
        .catch(error => {
          toast.error("Something went wrong!")
        });
    }
   
  }


  return (
    <>
      <div className='support-page position-relative'>
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
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          handleSearch={handleSearch}
          errors={errors}
          setClearTicket={setClearTicket}
          handleReset={handleReset}
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
        <div id='sidepanel-closer' onClick={() => setNewTicket(!NewTicket)}>
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
        <section className='ticket-slider-header'>
          <h2 className='mb-0'>Create a new Ticket!</h2>
        </section>
        <section className='ticket-slider-body'>
          <CreateTicketForm setNewTicket={setNewTicket} NewTicket={NewTicket} setStatus={setStatus} status={status} />
        </section>
      </div>
      <div className={`ticket-slider ${ViewTicketInfo ? 'open' : ''}`}>
        <ViewTicketSlider tktId={allTicket} setViewTicketInfo={setViewTicketInfo} ViewTicketInfo={ViewTicketInfo} viewId={viewId} />
      </div>
      <div className={`backdrop ${NewTicket || FilterTickets || ViewTicketInfo ? 'd-block' : 'd-none'}`}></div>
    </>
  );
};

export default CustomerSupportPage;