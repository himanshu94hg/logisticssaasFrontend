import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import './SidePanel.css'

const SidePanel = (props) => {

    const [filters, setFilters] = useState({
        startDate: '',
        endDate: '',
        category: '',
        price: '',
        date: '',
        // Add more filter options as needed
    });

    const [openAccordion, setOpenAccordion] = useState(0);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    const handleAccordionToggle = (index) => {
        setOpenAccordion(index);
    };

    const handleReset = () => {
        setFilters({
            startDate: '',
            endDate: '',
            category: '',
            price: '',
            date: '',
            // Reset other filter options as needed
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle the submission logic here
        console.log('Submitted Filters:', filters);
    };


    return (
        <>
            <div id='sidePanel' className="side-panel">
                <div id='sidepanel-closer' onClick={props.CloseSidePanel}>
                    <FontAwesomeIcon icon={faChevronRight} />
                </div>
                <section className='sidepanel-header'>
                    <h4>Explore Additional Filters</h4>
                    <p>Fine-Tune Your Search</p>
                </section>
                <section className='sidepanel-body'>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>
                                Start Date:
                                <input
                                    type="date"
                                    name="startDate"
                                    value={filters.startDate}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <label>
                                End Date:
                                <input
                                    type="date"
                                    name="endDate"
                                    value={filters.endDate}
                                    onChange={handleInputChange}
                                />
                            </label>
                        </div>

                        <div className="accordion">
                            {['Category', 'Price', 'Additional Filter'].map((item, index) => (
                                <div className="accordion-item" key={index}>
                                    <h2 className="accordion-header" id={`heading${item}`}>
                                        <button
                                            className="accordion-button"
                                            type="button"
                                            onClick={() => handleAccordionToggle(index)}
                                            aria-expanded={openAccordion === index}
                                            aria-controls={`collapse${item}`}
                                        >
                                            {item}
                                        </button>
                                    </h2>
                                    <div
                                        id={`collapse${item}`}
                                        className={`accordion-collapse collapse ${openAccordion === index ? 'show' : ''
                                            }`}
                                        aria-labelledby={`heading${item}`}
                                    >
                                        <div className="accordion-body">
                                            {/* Filter inputs */}
                                            {item === 'Category' && (
                                                <label>
                                                    Select Category:
                                                    <select
                                                        name="category"
                                                        value={filters.category}
                                                        onChange={handleInputChange}
                                                    >
                                                        {/* Add category options */}
                                                        <option value="">All Categories</option>
                                                        <option value="electronics">Electronics</option>
                                                        <option value="clothing">Clothing</option>
                                                        {/* Add more category options as needed */}
                                                    </select>
                                                </label>
                                            )}
                                            {item === 'Price' && (
                                                <label>
                                                    Enter Price Range:
                                                    <input
                                                        type="text"
                                                        name="price"
                                                        value={filters.price}
                                                        onChange={handleInputChange}
                                                    />
                                                </label>
                                            )}
                                            {item === 'Additional Filter' && (
                                                <label>
                                                    Additional Filter:
                                                    <input
                                                        type="text"
                                                        name="additionalFilter"
                                                        value={filters.additionalFilter}
                                                        onChange={handleInputChange}
                                                    />
                                                </label>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div>
                            <button type="button" onClick={handleReset}>
                                Reset
                            </button>
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                </section>
            </div>
        </>
    )
}

export default SidePanel