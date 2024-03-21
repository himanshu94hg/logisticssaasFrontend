import React, { useState, useEffect } from 'react';
import { faBackwardStep, faForwardStep } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Pagination.css'

const Pagination = ({ totalItems }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [goToPage, setGoToPage] = useState("");
    const [totalItemsCount, setTotalItemsCount] = useState(totalItems);

    useEffect(() => {
        // Ensure current page stays within bounds when items per page changes
        setCurrentPage(1);
    }, [itemsPerPage, totalItemsCount]);

    // Calculate total pages
    const totalPages = Math.ceil(totalItemsCount / itemsPerPage);

    const handleFirstPage = () => {
        setCurrentPage(1);
    };

    const handleLastPage = () => {
        setCurrentPage(totalPages);
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleChange = (e) => {
        const value = e.target.value;
        if (value === "" || (parseInt(value) <= totalPages && parseInt(value) > 0)) {
            setGoToPage(value);
        }
    };

    const handleGoToPage = () => {
        if (goToPage !== "" && parseInt(goToPage) !== currentPage) {
            setCurrentPage(parseInt(goToPage));
        }
        setGoToPage("");
    };

    // Calculate start and end indices
    const startIndex = Math.min((currentPage - 1) * itemsPerPage + 1, totalItemsCount);
    const endIndex = Math.min(currentPage * itemsPerPage, totalItemsCount);

    // Debugging statements
    console.log("totalItemsCount:", totalItemsCount);
    console.log("itemsPerPage:", itemsPerPage);
    console.log("totalPages:", totalPages);

    return (
        <div className='my-2'>
            <div className='pagination-container'>
                <div className="pagination">
                    <p onClick={handleFirstPage} disabled={currentPage === 1}><FontAwesomeIcon icon={faBackwardStep} /></p>
                    <p onClick={handlePrevious} disabled={currentPage === 1}>Previous</p>
                    <p>{currentPage} of {totalPages}</p>
                    <p onClick={handleNext} disabled={currentPage === totalPages}>Next</p>
                    <p onClick={handleLastPage} disabled={currentPage === totalPages}><FontAwesomeIcon icon={faForwardStep} /></p>
                </div>
                {/* Result count */}
                <div className="result-count">
                    Showing {startIndex} to {endIndex} of {totalItemsCount} results.
                </div>

                {/* Dropdown for items per page */}
                <div className="items-per-page-dropdown">
                    Rows per page:
                    <select value={itemsPerPage} onChange={(e) => setItemsPerPage(parseInt(e.target.value))}>
                        <option value="20">20</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                </div>
                {/* Go to page */}
                <div className='go-to-page'>
                    Go to page: <input type="number" min="1" max={totalPages} value={goToPage} onChange={handleChange} />
                    <button onClick={handleGoToPage}>Go</button>
                </div>
            </div>
        </div>
    );
};

export default Pagination;
