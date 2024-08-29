import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import { dateRangeDashboard } from '../../../../customFunction/dateRange';
import { useSelector } from 'react-redux';

const CourierDashboard = ({activeTab}) => {
  const dispatch=useDispatch()
  const [openIndex, setOpenIndex] = useState(0); 
  const partnerList = JSON.parse(localStorage.getItem('partnerList'));
  const {courierData}=useSelector(state=>state?.dashboardCourierReducer);

  useEffect(()=>{
    if(activeTab==="Courier Delays"){
      dispatch({type:"DASHBOARD_COURIER_ACTION",payload:dateRangeDashboard})
    }
  },[activeTab])

  const toggleRow = (index) => {
    setOpenIndex(index === openIndex ? -1 : index); 
  };

  const generateStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStars = rating - fullStars >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FontAwesomeIcon className='text-golden' key={i} icon={faStar} />);
    }

    if (halfStars) {
      stars.push(<FontAwesomeIcon className='text-golden' key={'half'} icon={faStarHalfAlt} />);
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FontAwesomeIcon className='text-golden' key={`empty-${i}`} icon={farStar} />);
    }

    return stars;
  };



  return (
    <>
      <section className='courier-dashboard'>
        <div className="accordion">
          {courierData?.map((item, index) => (
            <div key={index} className="accordion-row box-shadow shadow-sm mb-3 p10">
              <div className="accordion-header" onClick={() => toggleRow(index)}>
                {/* <h4>{item?.courier_name}</h4> */}
                <h4>{item?.courier_name && partnerList[item?.courier_name]["title"]}</h4>
                <div>Mode: Surface</div>
                <div>Shipment Count: {item?.total_shipment}</div>
                <div>
                  Performance Rating: {generateStars(item?.rating)}
                </div>
                <span>{openIndex === index ? <FontAwesomeIcon icon={faChevronDown} /> : <FontAwesomeIcon icon={faChevronUp} />}</span>
              </div>

              {openIndex === index && (
                <div className="accordion-content">
                  <hr className='my-3' />
                  <div className='counters-container'>
                    <div className='counter-item'>Prepaid: {item?.prepaid}</div>
                    <div className='counter-item'>Delivered: {item?.delivered}</div>
                    <div className='counter-item'>NDR Delivered: {item?.ndr_delivered}</div>
                    <div className='counter-item'>RTO: {item?.rto}</div>
                    <div className='counter-item'>COD: {item?.cod}</div>
                    <div className='counter-item'>1st Attempt Delivered: {item?.first_attempt_delivered}</div>
                    <div className='counter-item'>NDR Raised: {item?.ndr_raised}</div>
                    <div className='counter-item'>Lost / Damaged: {item?.lost_damaged}</div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default CourierDashboard;
