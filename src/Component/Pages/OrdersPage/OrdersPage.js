import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import Form from 'react-bootstrap/Form';
import NavTabs from './navTabs/NavTabs';
import './OrdersPage.css'


const OrdersPage = () => {
    const [selectedOption, setSelectedOption] = useState("Option 1");
    const [isOpen, setIsOpen] = useState(false);

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    const toggleOptions = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <section className='w-100 orders-menu-header'>
                <div className='d-flex justify-content-between'>
                <div className={`down-sliding-select ${isOpen ? "open" : ""}`} onClick={toggleOptions}>
                    <div className="selected-option">
                        {selectedOption || "Select an option"}
                        <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />
                        
                    </div>
                    {isOpen && (
                        <div className="options-container">
                            <div
                                className={`option ${selectedOption === "Option 1" ? "selected" : ""}`}
                                onClick={() => handleOptionSelect("Option 1")}
                            >
                                Domestic
                            </div>
                            <div
                                className={`option ${selectedOption === "Option 2" ? "selected" : ""}`}
                                onClick={() => handleOptionSelect("Option 2")}
                            >
                                International
                            </div>
                        </div>
                    )}
                </div>
                    <div>new import sync</div>
                </div>
            </section>

            


            <NavTabs />
        </>
    )
}

export default OrdersPage