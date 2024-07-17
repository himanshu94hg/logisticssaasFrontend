import './Pagination.css'
import NextIcon from './Icons/NextIcon';
import LastIcon from './Icons/LastIcon';
import FirstIcon from './Icons/FirstIcon';
import PreviousIcon from './Icons/PreviousIcon';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const Pagination = ({ totalItems, itemsPerPage, setItemsPerPage, currentPage, setCurrentPage }) => {
    const [goToPage, setGoToPage] = useState("");
    const [totalItemsCount, setTotalItemsCount] = useState(totalItems);
    const { screenWidthData } = useSelector(state => state?.authDataReducer)

    useEffect(() => {
        if (totalItems >= 0) {
            setTotalItemsCount(totalItems)
        }
    }, [totalItems])

    useEffect(() => {
        setCurrentPage("1");
    }, [itemsPerPage, totalItemsCount]);

    const totalPages = itemsPerPage === "All" ? 1 : Math.ceil(totalItemsCount / itemsPerPage);

    console.log(totalPages,"totalPages",itemsPerPage,currentPage)

    const handleFirstPage = () => {
        setCurrentPage(1);
    };

    const handleLastPage = () => {
        if(totalPages>1){
            setCurrentPage(totalPages);
        }else{
            setCurrentPage(totalPages+1);
        }
    };

    const handlePrevious = () => {
        if (parseInt(currentPage) > 1) {
            setCurrentPage(parseInt(currentPage) - 1);
        }
    };

    const handleNext = () => {
        if (parseInt(currentPage) < totalPages) {
            setCurrentPage(parseInt(currentPage) + 1);
        }
    };

    const handleChange = (e) => {
        const value = e.target.value;
        if (value === "" || (parseInt(value) <= totalPages && parseInt(value) > 0)) {
            setGoToPage(value);
        }
    };

    const handleGoToPage = () => {
        if (goToPage !== "" && parseInt(goToPage) !== parseInt(currentPage)) {
            setCurrentPage(parseInt(goToPage));
        }
    };


    return (
        <div className='my-2'>
            <div className='pagination-container'>
                <div className={`d-flex align-items-center ${screenWidthData > 991 && 'gap-3'} ${screenWidthData < 992 && 'gap-0 justify-content-between w-100'}`}>
                    <div className="pagination">
                        <p onClick={handleFirstPage} disabled={currentPage === 1}><FirstIcon /></p>
                        <p onClick={handlePrevious} disabled={currentPage === 1}><PreviousIcon /></p>
                        <p>{currentPage} of {totalPages || 1}</p>
                        <p onClick={handleNext} disabled={currentPage === totalPages}><NextIcon /></p>
                        <p onClick={handleLastPage} disabled={currentPage === totalPages}><LastIcon /></p>
                    </div>
                    {/* Go to page */}
                    <div className='go-to-page'>
                        Go to page: <input type="text" min="1" max={totalPages} value={goToPage} onChange={handleChange} />
                        <button onClick={handleGoToPage}>Go</button>
                    </div>
                </div>

                {screenWidthData < 992 ?
                    <>
                        <div className='d-flex justify-content-between w-100 mt-3'>
                            {/* Result count */}
                            <div className="result-count">
                                Showing {totalItems < 20 ? totalItemsCount : itemsPerPage > totalItems ?
                                    totalItems : currentPage === totalPages ? totalItems % itemsPerPage : itemsPerPage === "All" ? totalItems : itemsPerPage}  of {totalItemsCount} records
                            </div>

                            {/* Dropdown for items per page */}
                            <div className="items-per-page-dropdown">
                                Rows per page:
                                <select value={itemsPerPage} onChange={(e) => setItemsPerPage(`${e.target.value}`)}>
                                    <option value="20">20</option>
                                    <option value="100">100</option>
                                    <option value="500">500</option>
                                    <option value="1000">1000</option>
                                    {/* <option value="All">All</option> */}
                                </select>
                            </div>
                        </div>
                    </>
                    :
                    <>
                        {/* Result count */}
                        <div className="result-count">
                            Showing {totalItems < 20 ? totalItemsCount : itemsPerPage > totalItems ?
                                totalItems : currentPage === totalPages ? totalItems % itemsPerPage : itemsPerPage === "All" ? totalItems : itemsPerPage}  of {totalItemsCount} records
                        </div>

                        {/* Dropdown for items per page */}
                        <div className="items-per-page-dropdown">
                            Rows per page:
                            <select value={itemsPerPage} onChange={(e) => setItemsPerPage(`${e.target.value}`)}>
                                <option value="20">20</option>
                                <option value="100">100</option>
                                <option value="500">500</option>
                                <option value="1000">1000</option>
                                {/* <option value="All">All</option> */}
                            </select>
                        </div>
                    </>
                }
            </div>
        </div>
    );
};

export default Pagination;
