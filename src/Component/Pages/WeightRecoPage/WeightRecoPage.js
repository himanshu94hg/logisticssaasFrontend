import React, { useEffect, useState } from 'react';
import NavTabs from './Components/navTabs/NavTabs';
import './WeightRecoPage.css'
import WeightRecoTab from './Components/WeightRecoTab/WeightRecoTab';
import SettledReco from './Components/SettledReco/SettledReco';
import OnHoldReco from './Components/OnHoldReco/OnHoldReco';
import { useDispatch } from 'react-redux';
import Pagination from '../OrdersPage/Components/Pagination/Pagination';


const WeightRecoPage = () => {
    const dispatch = useDispatch()
    const [activeTab, setActiveTab] = useState("Weight Reconciliation");
    const [selectedOption, setSelectedOption] = useState("Domestic");
    const [isOpen, setIsOpen] = useState(false);
    const [itemsPerPage, setItemsPerPage] = useState(20);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState("");
    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    const toggleOptions = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        dispatch({ type: "COURIER_WEIGHT_RECO_ACTION" })
    }, [])

    return (
        <>
            <NavTabs activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* Weight Reconciliation */}
            <div className={`${activeTab === "Weight Reconciliation" ? "d-block" : "d-none"}`}>
                <WeightRecoTab />
            </div>

            {/* Settled Reco */}
            <div className={`${activeTab === "Settled Reconciliation" ? "d-block" : "d-none"}`}>
                {/* <SettledReco /> */}
                <WeightRecoTab />
            </div>

            {/* On-Hold Reco */}
            <div className={`${activeTab === "On Hold Reconciliation" ? "d-block" : "d-none"}`}>
                <OnHoldReco />
            </div>

            <Pagination
                totalItems={totalItems}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                setItemsPerPage={setItemsPerPage}
                setCurrentPage={setCurrentPage}
            />


        </>
    )
}

export default WeightRecoPage