import React, { useEffect, useState } from 'react';
import NavTabs from './Components/navTabs/NavTabs';
import './WeightRecoPage.css';
import WeightRecoTab from './Components/WeightRecoTab/WeightRecoTab';
import SettledReco from './Components/SettledReco/SettledReco';
import OnHoldReco from './Components/OnHoldReco/OnHoldReco';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '../OrdersPage/Components/Pagination/Pagination';

const WeightRecoPage = () => {
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState("Weight Reconciliation");
    const [selectedOption, setSelectedOption] = useState("Domestic");
    const [isOpen, setIsOpen] = useState(false);
    const [itemsPerPage, setItemsPerPage] = useState(20);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState("");

    const recoSectionReducer = useSelector(state => state?.weightRecoReducer);
    const { weightData, holdData, settledData } = recoSectionReducer;

    useEffect(() => {
        const fetchData = async () => {
            switch (activeTab) {
                case "Weight Reconciliation":
                    await dispatch({ type: "WEIGHT_ACTION",payload:{"itemsPerPage":itemsPerPage,"currentPage":currentPage} });
                    if (weightData && Array.isArray(weightData)) {
                        setTotalItems(weightData.length);
                    }
                    break;
                case "Settled Reconciliation":
                    await dispatch({ type: "SETTELED_ACTION",payload:{"itemsPerPage":itemsPerPage,"currentPage":currentPage} });
                    if (settledData && Array.isArray(settledData)) {
                        setTotalItems(settledData.length);
                    }
                    break;
                case "On Hold Reconciliation":
                    await dispatch({ type: "HOLD_ACTION",payload:{"itemsPerPage":itemsPerPage,"currentPage":currentPage} });
                    if (holdData && Array.isArray(holdData)) {
                        setTotalItems(holdData.length);
                    }
                    break;
                default:
                    break;
            }
        };

        fetchData();
    }, [dispatch, activeTab,itemsPerPage,currentPage]);

    return (
        <>
            <NavTabs activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* Weight Reconciliation */}
            <div className={`${activeTab === "Weight Reconciliation" ? "d-block" : "d-none"}`}>
                <WeightRecoTab weightRecoData={weightData} />
            </div>

            {/* Settled Reco */}
            <div className={`${activeTab === "Settled Reconciliation" ? "d-block" : "d-none"}`}>
                <SettledReco weightRecoData={settledData} />
            </div>

            {/* On-Hold Reco */}
            <div className={`${activeTab === "On Hold Reconciliation" ? "d-block" : "d-none"}`}>
                <OnHoldReco weightRecoData={holdData} />
            </div>

            <Pagination
                totalItems={totalItems}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                setItemsPerPage={setItemsPerPage}
                setCurrentPage={setCurrentPage}
            />
        </>
    );
};

export default WeightRecoPage;