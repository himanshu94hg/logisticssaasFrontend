import React, { useEffect, useState } from 'react';
import NavTabs from './Components/navTabs/NavTabs';
import { useDispatch, useSelector } from 'react-redux';
import RTOShipment from './Components/RTOShipment/RTOShipment';
import ActionRequired from './Components/ActionRequired/ActionRequired';
import ActionRequested from './Components/ActionRequested/ActionRequested';
import DeliveredShipment from './Components/DeliveredShipment/DeliveredShipment';
import MoreFiltersPanel from './Components/MoreFiltersPanel/MoreFiltersPanel';
import Pagination from '../../common/Pagination/Pagination';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
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


const ShipmentsPage = () => {
    const [activeTab, setActiveTab] = useState("Action Required");
    const dispatch = useDispatch()
    const [selectedOption, setSelectedOption] = useState("Domestic");
    const [isOpen, setIsOpen] = useState(false);
    const [itemsPerPage, setItemsPerPage] = useState(20);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState("");
    const [MoreFilters, setMoreFilters] = useState(false);
    const [backDrop, setBackDrop] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [searchValue, setSearchValue] = useState("")
    const reattemptOrderIds = selectedRows.join(',');
    const [SearchOption, setSearchOption] = useState(SearchOptions[0]);
    const [BulkActionShow, setBulkActionShow] = useState(false)


    const [exportButtonClick, setExportButtonClick] = useState(false)
    const exportCard = useSelector(state => state?.exportSectionReducer?.exportCard)

    const handleSidePanel = () => {
        setMoreFilters(true);
        setBackDrop(true)
    }

    const CloseSidePanel = () => {
        setMoreFilters(false);
        setBackDrop(false)
    }

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    const toggleOptions = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        let param = '';
        switch (activeTab) {
            case "Action Required":
                param = "pending";
                break;
            case "Action Requested":
                param = "requested";
                break;
            case "RTO":
                param = "rto";
                break;
            case "Delivered":
                param = "delivered";
                break;
            default:
                param = '';
        }

        dispatch({ type: "SHIPMENT_DATA_ACTION", payload: param });
    }, [dispatch, activeTab]);


    const { shipmentCard } = useSelector(state => state?.shipmentSectionReducer)

    console.log(shipmentCard.length, "Active Tab DADA")

    useEffect(() => {
        if (shipmentCard && shipmentCard.length) {
            setTotalItems(shipmentCard.length);
        }
    }, [shipmentCard]);


    console.log(activeTab, "Active Tab")

    const handleReattemptOrder = (() => {
        dispatch({ type: "SHIPMENT_REATTEMPT_DATA_ACTION", payload: { "order_ids": reattemptOrderIds } });
    });

    const handleRtoOrder = (() => {
        dispatch({ type: "SHIPMENT_RTO_DATA_ACTION", payload: { "order_ids": reattemptOrderIds } });
    });

    const handleChange = (SearchOption) => {
        setSearchOption(SearchOption);
    };

    const handleSearch = () => { }

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
            <div className='orders-section-tabs'>
                <div className={`${activeTab === "Action Required" ? "d-block" : "d-none"}`}>
                    <ActionRequired shipmentCard={shipmentCard}
                        selectedRows={selectedRows}
                        setSelectedRows={setSelectedRows}
                        setBulkActionShow={setBulkActionShow}
                    />
                </div>

                <div className={`${activeTab === "Action Requested" ? "d-block" : "d-none"}`}>
                    <ActionRequested shipmentCard={shipmentCard}
                        selectedRows={selectedRows}
                        setSelectedRows={setSelectedRows}
                        setBulkActionShow={setBulkActionShow}
                    />
                </div>

                <div className={`${activeTab === "RTO" ? "d-block" : "d-none"}`}>
                    <RTOShipment shipmentCard={shipmentCard}
                        selectedRows={selectedRows}
                        setSelectedRows={setSelectedRows}
                        setBulkActionShow={setBulkActionShow}
                    />
                </div>

                <div className={`${activeTab === "Delivered" ? "d-block" : "d-none"}`}>
                    <DeliveredShipment shipmentCard={shipmentCard}
                        selectedRows={selectedRows}
                        setSelectedRows={setSelectedRows}
                        setBulkActionShow={setBulkActionShow}
                    />
                </div>
                <Pagination
                    totalItems={totalItems}
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    setItemsPerPage={setItemsPerPage}
                    setCurrentPage={setCurrentPage}
                />
                {BulkActionShow && (
                    <BulkActionsComponent activeTab={activeTab} selectedRows={selectedRows} setSelectedRows={setSelectedRows}/>
                )
                }
            </div>


            <MoreFiltersPanel
                MoreFilters={MoreFilters}
                activeTab={activeTab}
                CloseSidePanel={CloseSidePanel}
            //handleMoreFilter={handleMoreFilter}
            />
            <div className={`backdrop ${backDrop ? 'd-block' : 'd-none'}`}></div>

        </>
    )
}

export default ShipmentsPage;
