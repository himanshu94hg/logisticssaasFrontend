import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CourierDashboard = () => {
  const [openIndex, setOpenIndex] = useState(0); // Defaulting the first row to be open

  const toggleRow = (index) => {
    setOpenIndex(index === openIndex ? -1 : index); // Toggle the index
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

  const data = [
    {
      title: 'Bluedart',
      Mode: 'Surface',
      Surface: 15,
      'Shipment Count': 100,
      'COD Order': 40,
      'Prepaid Order': 60,
      Delivered: 80,
      '1st Attempt Delivered': 60,
      'NDR Delivered': 5,
      'NDR Raised': 3,
      RTO: 10,
      'Lost / Damaged': 2,
      'Performance Rating': 4.5 // Example rating out of 5
    },
    {
      title: 'Shadowfax',
      Mode: 'Surface',
      Surface: 30,
      'Shipment Count': 200,
      'COD Order': 80,
      'Prepaid Order': 120,
      Delivered: 160,
      '1st Attempt Delivered': 120,
      'NDR Delivered': 10,
      'NDR Raised': 6,
      RTO: 20,
      'Lost / Damaged': 3,
      'Performance Rating': 3.8 // Example rating out of 5
    },
    // Add more rows as needed
  ];

  return (
    <>
      <section className='courier-dashboard'>
        <div className="accordion">
          {data.map((item, index) => (
            <div key={index} className="accordion-row box-shadow shadow-sm mb-3 p10">
              <div className="accordion-header" onClick={() => toggleRow(index)}>
                <h4>{item.title}</h4>
                <div>Mode: {item.Mode}</div>
                <div>Shipment Count: {item['Shipment Count']}</div>
                <div>
                  Performance Rating: {generateStars(item['Performance Rating'])}
                </div>
                <span>{openIndex === index ? <FontAwesomeIcon icon={faChevronDown} /> : <FontAwesomeIcon icon={faChevronUp} />}</span>
              </div>

              {openIndex === index && (
                <div className="accordion-content p10">
                  <hr className='my-3' />
                  <div className='counters-container'>
                    <div className='counter-item'>Prepaid: {item['Prepaid Order']}</div>
                    <div className='counter-item'>Delivered: {item['Delivered']}</div>
                    <div className='counter-item'>NDR Delivered: {item['NDR Delivered']}</div>
                    <div className='counter-item'>RTO: {item['RTO']}</div>
                    <div className='counter-item'>COD: {item['COD Order']}</div>
                    <div className='counter-item'>1st Attempt Delivered: {item['1st Attempt Delivered']}</div>
                    <div className='counter-item'>NDR Raised: {item['NDR Raised']}</div>
                    <div className='counter-item'>Lost / Damaged: {item['Lost / Damaged']}</div>
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
