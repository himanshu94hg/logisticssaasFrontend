import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { dateRangeDashboard } from '../../../../customFunction/dateRange';
import { Skeleton } from 'antd';  // Importing Skeleton
import RatingStars from '../../../common/RatingStars/RatingStars';
import NonActiveService from '../Components/NonActiveService/NonActiveService';

const CourierDashboard = ({ activeTab }) => {
  const dispatch = useDispatch();
  const [openIndex, setOpenIndex] = useState(0);
  const partnerList = JSON.parse(localStorage.getItem('partnerList'));
  const { planStatusData } = useSelector(state => state?.authDataReducer)
  const { courierData } = useSelector(state => state?.dashboardCourierReducer);

  useEffect(() => {
    if (activeTab === "Courier Delays") {
      dispatch({ type: "DASHBOARD_COURIER_ACTION", payload: dateRangeDashboard });
    }
  }, [activeTab]);

  const toggleRow = (index) => {
    setOpenIndex(index === openIndex ? -1 : index);
  };

  const generateRandomRating = () => {
    return (Math.random() + 3.9).toFixed(1);
  };

  return (
    <>
      <section className='courier-dashboard position-relative'>
      {process.env.REACT_APP_BYPASS_LOGIN !== 'true' && !planStatusData?.analytics_dashboard && <NonActiveService />}
        <div className="accordion">
          {courierData ? (
            courierData.map((item, index) => (
              <div key={index} className="accordion-row box-shadow shadow-sm mb-3 p10">
                <div className="accordion-header" onClick={() => toggleRow(index)}>
                  <h4>{item?.courier_name && partnerList[item?.courier_name]["title"]}</h4>
                  <div>Mode: Surface</div>
                  <div>Shipment Count: {item?.total_shipment}</div>
                  <div className='d-flex align-items-center'>
                    Performance Rating: <RatingStars rating={generateRandomRating()} />
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
            ))
          ) : (
            // Show Skeleton while data is loading
            Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="accordion-row box-shadow shadow-sm mb-3 p10">
                <Skeleton active>
                  <Skeleton.Paragraph
                    rows={3}
                    style={{ width: '100%' }}
                    active
                  />
                </Skeleton>
              </div>
            ))
          )}
        </div>
      </section>
    </>
  );
};

export default CourierDashboard;
