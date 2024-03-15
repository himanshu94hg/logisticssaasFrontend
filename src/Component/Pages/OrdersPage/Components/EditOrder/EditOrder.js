import React, { useState } from 'react';
import './EditOrder.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

const EditOrder = ({ EditOrderSection, setEditOrderSection }) => {
    const [activeSection, setActiveSection] = useState(1);

    const handleSectionClick = (sectionIndex) => {
        setActiveSection(sectionIndex === activeSection ? null : sectionIndex);
    };
    return (
        <>
            <section className={`edit-order-section ${EditOrderSection ? 'open-edit' : ''}`}>
                <div id='sidepanel-closer' onClick={() => setEditOrderSection(false)}>
                    <FontAwesomeIcon icon={faChevronRight} />
                </div>
                <section className='ticket-slider-header'>
                    <h2 className='mb-0'>Edit Your Order!</h2>
                </section>
                <section className=''>
                    <form>


                        <AccordionSection
                            title="Order Details"
                            isActive={activeSection === 1}
                            onClick={() => handleSectionClick(1)}
                        >
                            {/* Your Order Details */}
                            <label>
                                Customer Order Number:
                                <input type="text" />
                            </label>
                            <label>
                                Order Type:
                                <input type="text" />
                            </label>
                            <label>
                                Order Date:
                                <input type="text" />
                            </label>
                        </AccordionSection>
                        <AccordionSection
                            title="Shipping Details"
                            isActive={activeSection === 0}
                            onClick={() => handleSectionClick(0)}
                        >
                            {/* Your Shipping Details fields */}
                            <label>
                                Recipient Name:
                                <input type="text" />
                            </label>
                            <label>
                                Mobile Number:
                                <input type="text" />
                            </label>
                        </AccordionSection>

                        {/* Add more AccordionSection components for other sections */}

                        <button type="submit">Submit</button>
                    </form>
                </section>
            </section>
            <div onClick={() => setEditOrderSection(false)} className={`backdrop ${EditOrderSection ? 'd-block' : 'd-none'}`}></div>
        </>
    );
};

const AccordionSection = ({ title, isActive, onClick, children }) => {
    return (
        <div>
            <div
                style={{ cursor: 'pointer' }}
                onClick={onClick}
            >
                {title} {isActive ? '▲' : '▼'}
            </div>
            {isActive && <div>{children}</div>}
        </div>
    );
};

export default EditOrder;
