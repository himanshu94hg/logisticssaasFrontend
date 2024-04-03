import React, { useState, useEffect } from 'react';
import { faBackwardStep, faForwardStep } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Pagination.css'
import PreviousIcon from './Icons/PreviousIcon';
import NextIcon from './Icons/NextIcon';
import LastIcon from './Icons/LastIcon';
import FirstIcon from './Icons/FirstIcon';

const Pagination = ({ totalItems, itemsPerPage, setItemsPerPage, currentPage, setCurrentPage }) => {
    const [goToPage, setGoToPage] = useState("");
    const [totalItemsCount, setTotalItemsCount] = useState(totalItems);

    useEffect(() => {
        if (totalItems) {
            setTotalItemsCount(totalItems)
        }
    }, [totalItems])

    useEffect(() => {
        setCurrentPage(1);
    }, [itemsPerPage, totalItemsCount]);

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

    const startIndex = Math.min((currentPage - 1) * itemsPerPage + 1, totalItemsCount);
    const endIndex = Math.min(currentPage * itemsPerPage, totalItemsCount);

    return (
        <div className='my-2'>
            <div className='pagination-container'>
                <div className='d-flex align-items-center gap-3'>
                    <div className="pagination">
                        <p onClick={handleFirstPage} disabled={currentPage === 1}><FirstIcon /></p>
                        <p onClick={handlePrevious} disabled={currentPage === 1}><PreviousIcon /></p>
                        <p>{currentPage} of {totalPages}</p>
                        <p onClick={handleNext} disabled={currentPage === totalPages}><NextIcon /></p>
                        <p onClick={handleLastPage} disabled={currentPage === totalPages}><LastIcon /></p>
                    </div>
                    {/* Go to page */}
                    <div className='go-to-page'>
                        Go to page: <input type="text" min="1" max={totalPages} value={goToPage} onChange={handleChange} />
                        <button onClick={handleGoToPage}>Go</button>
                    </div>
                </div>
                {/* Result count */}
                <div className="result-count">
                    {/* Showing {startIndex} to {endIndex} of {totalItemsCount} results. */}
                    Showing {endIndex} of {totalItemsCount} records.
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

            </div>
        </div>
    );
};

export default Pagination;
