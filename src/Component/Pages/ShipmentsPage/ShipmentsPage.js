import React, { useEffect, useState } from 'react';
import NavTabs from './Components/navTabs/NavTabs';
import { useDispatch, useSelector } from 'react-redux';
import RTOShipment from './Components/RTOShipment/RTOShipment';
import ActionRequired from './Components/ActionRequired/ActionRequired';
import ActionRequested from './Components/ActionRequested/ActionRequested';
import DeliveredShipment from './Components/DeliveredShipment/DeliveredShipment';
import axios from "axios";


const ShipmentsPage = () => {
    const [activeTab, setActiveTab] = useState("Action Required");
    const dispatch = useDispatch()
    const [selectedOption, setSelectedOption] = useState("Domestic");
    const [isOpen, setIsOpen] = useState(false);

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
                param = "delivered";
                break;
            case "Delivered":
                param = "rto";
                break;
            default:
                param = '';
        }

        dispatch({ type: "SHIPMENT_DATA_ACTION", payload: param });
    }, [dispatch, activeTab]);


    const { shipmentCard } = useSelector(state => state?.shipmentSectionReducer)

    console.log(activeTab,"Active Tab")

    return (
        <>
            <NavTabs activeTab={activeTab} setActiveTab={setActiveTab} />

            <div className={`${activeTab === "Action Required" ? "d-block" : "d-none"}`}>
                <ActionRequired shipmentCard={shipmentCard} />
            </div>

            <div className={`${activeTab === "Action Requested" ? "d-block" : "d-none"}`}>
                <ActionRequested shipmentCard={shipmentCard} />
            </div>

            <div className={`${activeTab === "RTO" ? "d-block" : "d-none"}`}>
                <RTOShipment shipmentCard={shipmentCard} />
            </div>

            <div className={`${activeTab === "Delivered" ? "d-block" : "d-none"}`}>
                <DeliveredShipment shipmentCard={shipmentCard} />
            </div>

        </>
    )
}

export default ShipmentsPage