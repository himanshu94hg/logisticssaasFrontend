import React, { useEffect, useState } from 'react';
import NavTabs from './Components/navTabs/NavTabs';
import './WeightRecoPage.css';
import moment from 'moment';
import WeightRecoTab from './Components/WeightRecoTab/WeightRecoTab';
import SettledReco from './Components/SettledReco/SettledReco';
import OnHoldReco from './Components/OnHoldReco/OnHoldReco';
import { useDispatch, useSelector } from 'react-redux';
import MoreFiltersPanel from './Components/MoreFiltersPanel/MoreFiltersPanel';
import Pagination from '../../common/Pagination/Pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';
import { HiOutlineFilter } from "react-icons/hi";
import { RxReset } from "react-icons/rx";
import BulkActionsComponent from './Components/BulkActionsComponent/BulkActionsComponent';

const SearchOptions = [
    { value: 'awb', label: 'AWB' },
    { value: 'order_id', label: 'Order ID' },
    { value: 'mobile', label: 'Mobile' },
    { value: 'email', label: 'Email' },
    { value: 'name', label: 'Name' },
    { value: 'sku', label: 'SKU' },
    { value: 'picup_address', label: 'Pickup Address' },
];

const WeightRecoPage = () => {
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState("Weight Reconciliation");
    const [selectedOption, setSelectedOption] = useState("Domestic");
    const [isOpen, setIsOpen] = useState(false);
    const [itemsPerPage, setItemsPerPage] = useState(20);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState("");
    const [exportButtonClick, setExportButtonClick] = useState(false)
    const [selectedRows, setSelectedRows] = useState([]);
    const [queryParamTemp, setQueryParamTemp] = useState({})
    const [MoreFilters, setMoreFilters] = useState(false);
    const [backDrop, setBackDrop] = useState(false);
    const [SearchOption, setSearchOption] = useState(SearchOptions[0]);
    const [searchValue, setSearchValue] = useState("")
    const [BulkActionShow, setBulkActionShow] = useState(false)

    const exportCard = useSelector(state => state?.exportSectionReducer?.exportCard)
    const { orderCancelled, orderdelete, orderClone } = useSelector(state => state?.orderSectionReducer)

    const recoSectionReducer = useSelector(state => state?.weightRecoReducer);
    const { weightData, holdData, setteledData } = recoSectionReducer;
    console.log(setteledData, "Setteled Data")

    const handleSidePanel = () => {
        setMoreFilters(true);
        setBackDrop(true)
    }
    const CloseSidePanel = () => {
        setMoreFilters(false);
        setBackDrop(false)
    }

    const handleSearch = () => {
    }

    const handleMoreFilter = (data) => {
        const queryParams = {};
        Object.keys(data).forEach(key => {
            if (data[key] !== '' && data[key] !== null) {
                if (key === 'start_date' || key === 'end_date') {
                    queryParams[key] = moment(data[key]).format('YYYY-MM-DD');
                } else {
                    queryParams[key] = data[key];
                }
            }
        });
        setQueryParamTemp(queryParams);
    };

    useEffect(() => {
        const fetchData = async () => {
            switch (activeTab) {
                case "Weight Reconciliation":
                    await dispatch({ type: "WEIGHT_ACTION", payload: { "itemsPerPage": itemsPerPage, "currentPage": currentPage } });
                    if (weightData && Array.isArray(weightData)) {
                        setTotalItems(weightData.length);
                    }
                    break;
                case "Settled Reconciliation":
                    await dispatch({ type: "SETTELED_ACTION", payload: { "itemsPerPage": itemsPerPage, "currentPage": currentPage } });
                    if (setteledData && Array.isArray(setteledData)) {
                        setTotalItems(setteledData.length);
                    }
                    break;
                case "On Hold Reconciliation":
                    await dispatch({ type: "HOLD_ACTION", payload: { "itemsPerPage": itemsPerPage, "currentPage": currentPage } });
                    if (holdData && Array.isArray(holdData)) {
                        setTotalItems(holdData.length);
                    }
                    break;
                default:
                    break;
            }
        };

        fetchData();
    }, [dispatch, activeTab, itemsPerPage, currentPage]);

    const handleChange = (SearchOption) => {
        setSearchOption(SearchOption);
    };

    useEffect(() => {
        if (BulkActionShow) {
            setBulkActionShow(false)
            setSelectedRows([])

        }
    }, [activeTab])

    return (
        <>
            <NavTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            {activeTab != "Manifest" && <div className="box-shadow shadow-sm p7 filter-container">
                <div className="search-container ot-filters">
                    <div className='d-flex'>
                        <label>
                            <Select
                                value={SearchOption}
                                onChange={handleChange}
                                options={SearchOptions}
                            />
                            <input className='input-field' type="search" value={searchValue} placeholder="Search for AWB | Order ID | Mobile Number | Email | SKU | Pickup ID" onChange={(e) => setSearchValue(e.target.value)} />
                            <button onClick={() => handleSearch()}>
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </button>
                        </label>
                        <div className="btn-group">
                            <button
                                onClick={handleSidePanel}
                                type="button"
                                className="btn main-button-outline ms-2"
                            >
                                <HiOutlineFilter className='align-text-bottom' /> More Filters
                            </button>
                            <button type="button" className="btn main-button dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                                <span className="visually-hidden">Toggle Dropdown</span>
                            </button>
                            <ul className="dropdown-menu" style={{ paddingInline: '12px', minWidth: '190px' }}>
                                <li>Filter 1</li>
                                <li>Filter 2</li>
                                <li>Filter 3</li>
                                <li>Filter 4</li>
                            </ul>
                        </div>
                        <button className='btn main-button-outline ms-2'><RxReset className='align-text-bottom' /> Reset</button>
                    </div>
                    <p className='font10'>Most Popular Search by
                        <span>COD</span> |
                        <span>Prepaid</span> |
                        <span>Yesterday</span> |
                        <span>One Week</span> |
                        <span>Last Month</span> |
                        <span>Delivered</span> |
                        <span>Cancel order</span> </p>
                </div>
            </div>}
            <div className='wt-page-container'>
                {/* Weight Reconciliation */}
                <div className={`${activeTab === "Weight Reconciliation" ? "d-block" : "d-none"}`}>
                    <WeightRecoTab weightRecoData={weightData} 
                    selectedRows={selectedRows}
                    setSelectedRows={setSelectedRows}
                    setBulkActionShow={setBulkActionShow}/>
                </div>

                {/* Settled Reco */}
                <div className={`${activeTab === "Settled Reconciliation" ? "d-block" : "d-none"}`}>
                    <SettledReco weightRecoData={setteledData} 
                    selectedRows={selectedRows}
                    setSelectedRows={setSelectedRows}
                    setBulkActionShow={setBulkActionShow}/>
                </div>

                {/* On-Hold Reco */}
                <div className={`${activeTab === "On Hold Reconciliation" ? "d-block" : "d-none"}`}>
                    <OnHoldReco weightRecoData={holdData} 
                    selectedRows={selectedRows}
                    setSelectedRows={setSelectedRows}
                    setBulkActionShow={setBulkActionShow}/>
                </div>

                <Pagination
                    totalItems={totalItems}
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    setItemsPerPage={setItemsPerPage}
                    setCurrentPage={setCurrentPage}
                />
                {BulkActionShow && (
                    <BulkActionsComponent
                        activeTab={activeTab}
                        selectedRows={selectedRows}
                        setSelectedRows={setSelectedRows}
                    />
                )
                }
            </div>
            <MoreFiltersPanel
                MoreFilters={MoreFilters}
                activeTab={activeTab}
                CloseSidePanel={CloseSidePanel}
                handleMoreFilter={handleMoreFilter}
            />
            <div className={`backdrop ${backDrop ? 'd-block' : 'd-none'}`}></div>
        </>
    );
};

export default WeightRecoPage;