import React, { useEffect, useState } from 'react';
import NavTabs from './Components/navTabs/NavTabs';
import { useDispatch, useSelector } from 'react-redux';
import RTOShipment from './Components/RTOShipment/RTOShipment';
import ActionRequired from './Components/ActionRequired/ActionRequired';
import ActionRequested from './Components/ActionRequested/ActionRequested';
import DeliveredShipment from './Components/DeliveredShipment/DeliveredShipment';
import SearchIcon from '../../../assets/image/icons/search-icon.png'
import MoreFiltersPanel from './Components/MoreFiltersPanel/MoreFiltersPanel';
import Pagination from '../../common/Pagination/Pagination';


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

    const [exportButtonClick, setExportButtonClick] = useState(false)
    const exportCard = useSelector(state => state?.exportSectionReducer?.exportCard)
    console.log(exportCard, "Export")

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

    const handleExport = () => {
        setExportButtonClick(true);
        const requestData = {
            "order_tab": {
                "type": "shipment",
                "subtype": activeTab === "Action Required" ? "action_required" : activeTab === "Action Requested" ? "action_requested" : activeTab === "Delivered" ? "delivered" : activeTab === "RTO" ? "rto" : ""
            },
            "order_id": `${selectedRows.join(',')}`,
            "courier": "",
            "awb_number": "",
            "min_awb_assign_date": "",
            "max_awb_assign_date": "",
            "status": "",
            "order_type": "",
            "customer_order_number": "",
            "channel": "",
            "min_invoice_amount": "",
            "max_invoice_amount": "",
            "warehouse_id": "",
            "product_name": "",
            "delivery_address": "",
            "min_weight": "",
            "max_weight": "",
            "min_product_qty": "",
            "max_product_qty": "",
            "rto_status": false,
            "global_type": "",
            "payment_type": ""
        };
        dispatch({ type: "EXPORT_DATA_ACTION", payload: requestData });
    };

    useEffect(() => {
        if (exportButtonClick) {
            var FileSaver = require('file-saver');
            var blob = new Blob([exportCard], { type: 'application/ms-excel' });
            FileSaver.saveAs(blob, `${activeTab === "Action Required" ? "action_required" : activeTab === "Action Requested" ? "action_requested" : activeTab === "Delivered" ? "delivered" : activeTab === "RTO" ? "rto" : ""}.xlsx`);
            setExportButtonClick(false);
        }
    }, [exportCard]);

    const handleReattemptOrder = (() => {
        dispatch({ type: "SHIPMENT_REATTEMPT_DATA_ACTION", payload: { "order_ids": reattemptOrderIds } });
    });

    const handleRtoOrder = (() => {
        dispatch({ type: "SHIPMENT_RTO_DATA_ACTION", payload: { "order_ids": reattemptOrderIds } });
    });

    return (
        <>
            <NavTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            {activeTab != "Manifest" && <div className="box-shadow shadow-sm p7 mb-3 filter-container">
                <div className="search-container">
                    <div className='d-flex'>
                        <label>
                            <input type="text" value={searchValue} placeholder="Search for AWB | Order ID | Mobile Number | Email | SKU | Pickup ID" />
                            <button>
                                <img src={SearchIcon} alt="Search" />
                            </button>
                        </label>
                        <button className='btn main-button ms-2'>search</button>
                        <button className='btn main-button ms-2' onClick={handleSidePanel}>More Filters</button>
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
                <div className='button-container'>
                    {(activeTab === "Action Required" || activeTab === "Action Requested") && (
                        <>
                            {activeTab === "Action Requested" && (
                                <>
                                    {selectedRows.length > 0 && (
                                        <button className='btn main-button me-2' onClick={() => handleRtoOrder()}>RTO</button>
                                    )}
                                </>
                            )}
                            {activeTab === "Action Required" && (
                                <>
                                    {selectedRows.length > 0 && (
                                        <button className='btn main-button me-2' onClick={() => handleReattemptOrder()}>Reattempt</button>
                                    )}
                                    {selectedRows.length > 0 && (
                                        <button className='btn main-button me-2' onClick={() => handleRtoOrder()}>RTO</button>
                                    )}
                                </>
                            )}
                        </>
                    )}
                    <button className='btn main-button me-2' onClick={() => handleExport()}>Export</button>
                </div>
            </div>}

            <div className={`${activeTab === "Action Required" ? "d-block" : "d-none"}`}>
                <ActionRequired shipmentCard={shipmentCard}
                    selectedRows={selectedRows}
                    setSelectedRows={setSelectedRows}
                />
            </div>

            <div className={`${activeTab === "Action Requested" ? "d-block" : "d-none"}`}>
                <ActionRequested shipmentCard={shipmentCard}
                    selectedRows={selectedRows}
                    setSelectedRows={setSelectedRows}
                />
            </div>

            <div className={`${activeTab === "RTO" ? "d-block" : "d-none"}`}>
                <RTOShipment shipmentCard={shipmentCard}
                    selectedRows={selectedRows}
                    setSelectedRows={setSelectedRows}
                />
            </div>

            <div className={`${activeTab === "Delivered" ? "d-block" : "d-none"}`}>
                <DeliveredShipment shipmentCard={shipmentCard}
                    selectedRows={selectedRows}
                    setSelectedRows={setSelectedRows}
                />
            </div>

            <Pagination
                totalItems={totalItems}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                setItemsPerPage={setItemsPerPage}
                setCurrentPage={setCurrentPage}
            />

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
